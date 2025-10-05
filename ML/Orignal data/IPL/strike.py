import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import os

# ---------------- Setup ----------------
options = Options()
options.headless = False  # True = hide browser
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                     "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0 Safari/537.36")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.set_page_load_timeout(60)

# ---------------- Function ----------------
def fetch_player_stats(player_name):
    url = f"https://www.cricmetric.com/playerstats.py?player={player_name.replace(' ', '+')}&role=all&format=All_T20&groupby=year"
    print(f"Fetching: {url}")

    stats = {"Player": player_name, "Country": "", "SR": "", "Bowling Style": ""}

    try:
        driver.get(url)
        time.sleep(3)
    except Exception as e:
        print(f"⚠️ Timeout for {player_name}, skipping. Error: {e}")
        return stats

    try:
        # Bowling Style
        panel_body = driver.find_element(By.XPATH, "//div[@class='panel-body']")
        text = panel_body.text
        if "Bowling style:" in text:
            stats["Bowling Style"] = text.split("Bowling style:")[1].split("\n")[0].strip()
    except:
        pass

    try:
        # Country = first team from Teams played for
        teams_panel = driver.find_element(By.XPATH, "//div[@class='panel-heading' and text()='All T20']/following-sibling::div")
        first_team = teams_panel.find_element(By.TAG_NAME, "a").text.strip()
        stats["Country"] = first_team
    except:
        pass

    try:
        # Batting SR (7th column in Total row)
        batting_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Batting']//tfoot/tr")
        sr_value = batting_total.find_elements(By.TAG_NAME, "td")[6].text.strip()
        stats["SR"] = sr_value
    except:
        try:
            # Bowling SR (8th column in Total row)
            bowling_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Bowling']//tfoot/tr")
            sr_value = bowling_total.find_elements(By.TAG_NAME, "td")[7].text.strip()
            stats["SR"] = sr_value
        except:
            stats["SR"] = "0"

    return stats


# ---------------- Main ----------------
df = pd.read_csv("ipl_cleaned.csv")  # file with Player,Span,Team

output_file = "ipl_players_stats.csv"

# Load already scraped players (if file exists)
if os.path.exists(output_file):
    done_df = pd.read_csv(output_file)
    done_players = set(done_df["Player"].tolist())
else:
    done_df = pd.DataFrame()
    done_players = set()

print(f"✅ Found {len(done_players)} already processed players, skipping them.")

# Open CSV in append mode
for _, row in df.iterrows():
    player = row["Player"]

    if player in done_players:
        print(f"⏩ Skipping {player}, already processed.")
        continue

    extra_stats = fetch_player_stats(player)

    # Save after every player
    new_row = pd.DataFrame([{
        "Player": player,
        "Span": row["Span"],
        "Team": row["Team"],
        "Country": extra_stats["Country"],
        "SR": extra_stats["SR"],
        "Bowling Style": extra_stats["Bowling Style"]
    }])

    if not os.path.exists(output_file):
        new_row.to_csv(output_file, index=False, mode="w")  # first write with header
    else:
        new_row.to_csv(output_file, index=False, mode="a", header=False)  # append without header

    print(f"💾 Saved {player} to {output_file}")

print("✅ Scraping complete.")

driver.quit()
