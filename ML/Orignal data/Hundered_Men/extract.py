import time
import random
import pandas as pd
import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# ==============================
# HUNDRED TEAMS
# ==============================
teams = {
    "Birmingham Phoenix": 6681,
    "London Spirit": 6680,
    "Manchester Originals": 6679,
    "Northern Superchargers": 6676,
    "Oval Invincibles": 6678,
    "Southern Brave": 6675,
    "Trent Rockets": 6674,
    "Welsh Fire": 6677,
}

base_batting = "https://www.espncricinfo.com/records/trophy/averages-batting/the-hundred-men-s-competition-826?team={}"

# ==============================
# Scraping Function
# ==============================
def scrape_team(driver, team_name, url):
    print(f"🔎 Scraping Batting - {team_name}")
    driver.get(url)

    retries = 3
    for attempt in range(retries):
        try:
            WebDriverWait(driver, 20).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, "table.ds-table tbody tr"))
            )
            time.sleep(random.uniform(2, 4))  # human-like wait
            break
        except Exception as e:
            print(f"⚠ Attempt {attempt+1} failed for {team_name} — {e}")
            if attempt < retries - 1:
                time.sleep(random.uniform(5, 10))  # wait longer then retry
                driver.refresh()
            else:
                print(f"❌ Skipping {team_name} after {retries} retries")
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
options.headless = False  # set True if you want invisible mode
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                     "AppleWebKit/537.36 (KHTML, like Gecko) "
                     "Chrome/118.0.5993.70 Safari/537.36")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-infobars")
options.add_argument("--start-maximized")

with uc.Chrome(options=options) as driver:
    for team, team_id in teams.items():
        batting_url = base_batting.format(team_id)
        all_data.extend(scrape_team(driver, team, batting_url))
        time.sleep(random.uniform(3, 6))  # random wait between teams

# ==============================
# Save
# ==============================
df = pd.DataFrame(all_data)
df.to_csv("hundred.csv", index=False, encoding="utf-8-sig")
print(f"✅ Saved {len(df)} rows to hundred.csv")
