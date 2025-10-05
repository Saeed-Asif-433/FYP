import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager  # <-- new import

# -------------------- Setup --------------------
# Chrome options
options = Options()
options.headless = False  # Set to True for headless mode

# webdriver-manager handles the driver automatically
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# -------------------- Read Players --------------------
with open("bbl_player.csv", "r") as file:
    players = file.read().splitlines()

# -------------------- Fetch Function --------------------
def fetch_player_stats(player_name):
    url_safe_name = player_name.replace(" ", "-")
    url = f"https://www.espncricinfo.com/ask/cricket-qna/{url_safe_name}&tournament=allt20"
    print(f"Fetching: {url}")
    
    try:
        driver.get(url)
        time.sleep(8)  # Adjust wait time as needed

        stats = {
            "Player": player_name,
            "Span": "", 
            "Runs": "",
            "HS": "",
            "Bat Av": "",
            "100": "",
            "Wkts": "",
            "BBI": "",
            "Bowl Av": "",
            "5": "",
            "Ct": "",
            "St": "",
            "Ave Diff": "",
        }

        # Fetch all stat containers
        data_columns = driver.find_elements(By.CLASS_NAME, "SimpleListCard_dataColumn__1etEB")
        for column in data_columns:
            try:
                label_text = column.text.strip()
                if ":" in label_text:
                    key, value = label_text.split(":", 1)
                    key = key.strip()
                    value = value.strip()

                    # Map to expected keys
                    if key == "Span": stats["Span"] = value
                    elif key == "Runs": stats["Runs"] = value
                    elif key == "HS": stats["HS"] = value
                    elif key in ["Bat Av", "Bat Avg"]: stats["Bat Av"] = value
                    elif key == "100": stats["100"] = value
                    elif key == "Wkts": stats["Wkts"] = value
                    elif key == "BBI": stats["BBI"] = value
                    elif key == "Bowl Av": stats["Bowl Av"] = value
                    elif key == "5": stats["5"] = value
                    elif key == "Ct": stats["Ct"] = value
                    elif key == "St": stats["St"] = value
                    elif key == "Ave Diff": stats["Ave Diff"] = value
            except:
                continue

        return stats

    except Exception as e:
        print(f"Error fetching {player_name}: {e}")
        return {
            "Player": player_name,
            "Span": "N/A", "Runs": "N/A", "HS": "N/A", "Bat Av": "N/A", "100": "N/A",
            "Wkts": "N/A", "BBI": "N/A", "Bowl Av": "N/A", "5": "N/A", "Ct": "N/A", "St": "N/A", "Ave Diff": "N/A"
        }

# -------------------- Scrape Loop --------------------
results = []
for player in players:
    stats = fetch_player_stats(player)
    results.append(stats)
    
# -------------------- Save to CSV --------------------
df = pd.DataFrame(results)
df.to_csv("BBL_Stats.csv", index=False)
print("Scraping complete. Data saved to player_stats.csv.")

# -------------------- Cleanup --------------------
driver.quit()
