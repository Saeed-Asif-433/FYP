import time
import pandas as pd
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# ===============================
# Setup Chrome Driver
# ===============================
options = Options()
options.headless = False  # set True if you want headless
options.add_argument("--window-size=1920,1080")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
wait = WebDriverWait(driver, 15)

# ===============================
# Base URL (The Hundred 2025 squads page)
# ===============================
base_url = "https://www.espncricinfo.com/series/the-hundred-men-s-competition-2025-1471000/squads"
driver.get(base_url)
time.sleep(4)

# ===============================
# Collect all team links
# ===============================
teams = []
team_links = driver.find_elements(By.XPATH, "//div[@class='ds-p-0']/a")

for link in team_links:
    team_name = link.text.replace(" Squad", "").strip()
    team_url = link.get_attribute("href")
    if team_name and "squad" in team_url.lower():
        teams.append({"team_name": team_name, "team_url": team_url})

print(f"✅ Found {len(teams)} teams in The Hundred 2025.")

# ===============================
# Function to scrape players for a team
# ===============================
def scrape_team(team_name, team_url):
    driver.get(team_url)
    time.sleep(3)

    try:
        wait.until(EC.presence_of_all_elements_located(
            (By.XPATH, "//a[contains(@href, '/cricketers/')]")
        ))
    except:
        print(f"⚠️ Timeout loading team: {team_name}")
        return []

    soup = BeautifulSoup(driver.page_source, "html.parser")
    player_blocks = soup.find_all("div", class_="ds-relative ds-flex ds-flex-row ds-space-x-4 ds-p-3")

    players = []
    for block in player_blocks:
        name_tag = block.find("a", class_="ds-inline-flex ds-items-start ds-leading-none")
        name = name_tag.get_text(strip=True) if name_tag else ""

        role_tag = block.find("p", class_="ds-text-tight-s ds-font-regular ds-mb-2 ds-mt-1")
        role = role_tag.get_text(strip=True) if role_tag else ""

        if name:
            players.append({
                "Player Name": name,
                "Role": role,
                "Team": team_name
            })

    print(f"➡️ {team_name}: {len(players)} players scraped.")
    return players

# ===============================
# Scrape all teams
# ===============================
all_players = []
for team in teams:
    all_players.extend(scrape_team(team["team_name"], team["team_url"]))

# ===============================
# Clean & Save Data
# ===============================
df = pd.DataFrame(all_players)
df = df[df["Team"].str.lower() != "squad"]
df["Team"] = df["Team"].str.replace(" Squad", "", regex=False).str.strip()

df.to_csv("the_hundred_2025_players.csv", index=False, encoding="utf-8-sig")

print(f"\n🎯 Done! {len(df)} players saved to the_hundred_2025_players.csv")

driver.quit()
