import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# =====================================================
# 1️⃣ Setup Chrome Driver
# =====================================================
options = Options()
options.headless = False  # Set True to hide browser
options.add_argument("--window-size=1920,1080")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
wait = WebDriverWait(driver, 15)

# =====================================================
# 2️⃣ Open initial team page (Abu Dhabi Knight Riders)
# =====================================================
start_url = "https://www.espncricinfo.com/series/international-league-t20-2024-25-1462172/abu-dhabi-knight-riders-squad-1462282/series-squads"
driver.get(start_url)
time.sleep(4)

# =====================================================
# 3️⃣ Get all team links from squads page
# =====================================================
try:
    wait.until(EC.presence_of_all_elements_located((By.XPATH, "//div[@class='ds-p-0']/a")))
    team_links = driver.find_elements(By.XPATH, "//div[@class='ds-p-0']/a")
except:
    print("⚠️ Could not find team list container.")
    driver.quit()
    exit()

teams = []
for link in team_links:
    name = link.text.replace(" Squad", "").strip()
    href = link.get_attribute("href")
    if name and href:
        teams.append({"team_name": name, "team_url": href})

print(f"✅ Found {len(teams)} ILT20 teams.")

# =====================================================
# 4️⃣ Scrape player list for each team
# =====================================================
def scrape_team(team_name, team_url):
    driver.get(team_url)
    time.sleep(3)

    try:
        wait.until(EC.presence_of_all_elements_located(
            (By.XPATH, "//div[contains(@class,'ds-flex') and contains(@class,'ds-flex-col') and contains(@class,'ds-p-4')]//a[contains(@href,'/cricketers/')]")
        ))
    except:
        print(f"⚠️ Timeout loading {team_name}")
        return []

    player_elements = driver.find_elements(
        By.XPATH, "//div[contains(@class,'ds-flex') and contains(@class,'ds-flex-col') and contains(@class,'ds-p-4')]"
    )

    players = []
    for card in player_elements:
        try:
            player_name = card.find_element(By.XPATH, ".//a[contains(@href,'/cricketers/')]").text.strip()
            try:
                role = card.find_element(By.XPATH, ".//p[contains(@class,'ds-text-tight-s')]").text.strip()
            except:
                role = ""

            if player_name:
                players.append({
                    "Player": player_name,
                    "Team": team_name,
                    "Role": role
                })
        except:
            continue

    print(f"➡️ {team_name}: {len(players)} players scraped.")
    return players

# =====================================================
# 5️⃣ Loop through all ILT20 teams
# =====================================================
all_players = []
for team in teams:
    all_players.extend(scrape_team(team["team_name"], team["team_url"]))

# =====================================================
# 6️⃣ Save results
# =====================================================
df = pd.DataFrame(all_players)
df.to_csv("ilt20_squads.csv", index=False, encoding="utf-8-sig")

print(f"\n🎉 Done! {len(df)} players saved to ilt20_squads.csv")

driver.quit()
