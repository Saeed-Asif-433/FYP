import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# ---------------- Setup ----------------
options = Options()
options.headless = False  # set True to run in background
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# ---------------- Function ----------------
def fetch_player_stats(player_name):
    url = f"https://www.cricmetric.com/playerstats.py?player={player_name.replace(' ', '+')}&role=all&format=All_T20&groupby=year"
    print(f"Fetching: {url}")
    driver.get(url)
    time.sleep(2)

    stats = {"Player": player_name, "Country": "", "SR": "", "Bowling Style": ""}

    # Bowling Style
    try:
        panel_body = driver.find_element(By.XPATH, "//div[@class='panel-body']")
        text = panel_body.text
        if "Bowling style:" in text:
            stats["Bowling Style"] = text.split("Bowling style:")[1].split("\n")[0].strip()
    except:
        pass

    # Country = first team from "Teams played for"
    try:
        teams_panel = driver.find_element(By.XPATH, "//div[@class='panel-heading' and text()='All T20']/following-sibling::div")
        first_team = teams_panel.find_element(By.TAG_NAME, "a").text.strip()
        stats["Country"] = first_team
    except:
        pass

    # Strike Rate (prefer Batting SR, fallback Bowling SR)
    try:
        batting_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Batting']//tfoot/tr")
        sr_value = batting_total.find_elements(By.TAG_NAME, "td")[6].text.strip()
        stats["SR"] = sr_value
    except:
        try:
            bowling_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Bowling']//tfoot/tr")
            sr_value = bowling_total.find_elements(By.TAG_NAME, "td")[7].text.strip()
            stats["SR"] = sr_value
        except:
            stats["SR"] = "0"

    return stats

# ---------------- Run for all players ----------------
df = pd.read_csv("hundred.csv")  # must have Player,Span,Team
results = []

for _, row in df.iterrows():
    player = row["Player"]
    extra_stats = fetch_player_stats(player)
    results.append({
        "Player": player,
        "Span": row["Span"],
        "Team": row["Team"],
        "Country": extra_stats["Country"],
        "SR": extra_stats["SR"],
        "Bowling Style": extra_stats["Bowling Style"]
    })

out_df = pd.DataFrame(results)
out_df.to_csv("Hundered_players_stats.csv", index=False)
print("✅ Scraping complete. Data saved to players_stats.csv")

driver.quit()
