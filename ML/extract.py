import time
import pandas as pd
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ==============================
# SA20 TEAMS
# ==============================
teams = {
    "Durban's Super Giants": 7007,
    "Joburg Super Kings": 7009,
    "MI Cape Town": 7011,
    "Paarl Royals": 7013,
    "Pretoria Capitals": 7015,
    "Sunrisers Eastern Cape": 7017,
}

base_batting = "https://www.espncricinfo.com/records/trophy/averages-batting/sa20-15071?team={}"

# ==============================
# Scraping Function
# ==============================
def scrape_team(driver, team_name, url):
    print(f"🔎 Scraping Batting - {team_name}")
    driver.get(url)

    try:
        WebDriverWait(driver, 20).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "table.ds-table tbody tr"))
        )
        time.sleep(3)  # let table fully load
    except Exception as e:
        print(f"⚠ Table not found for {team_name} — {e}")
        return []

    rows = driver.find_elements(By.CSS_SELECTOR, "table.ds-table tbody tr")
    team_data = []
    for row in rows:
        cols = row.find_elements(By.TAG_NAME, "td")
        if len(cols) > 1:
            player = cols[0].text.strip()
            span = cols[1].text.strip()
            team_data.append({
                "Player": player,
                "Span": span,
                "Team": team_name
            })
    return team_data

# ==============================
# Main
# ==============================
all_data = []

options = uc.ChromeOptions()
options.headless = False  # keep visible first
options.add_argument("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

with uc.Chrome(options=options) as driver:
    for team, team_id in teams.items():
        batting_url = base_batting.format(team_id)
        all_data.extend(scrape_team(driver, team, batting_url))
        time.sleep(2)

# ==============================
# Save
# ==============================
df = pd.DataFrame(all_data)
df.to_csv("sa20.csv", index=False, encoding="utf-8-sig")
print(f"✅ Saved {len(df)} rows to sa20.csv")
