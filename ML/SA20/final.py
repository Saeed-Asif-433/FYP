import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

# ======================================
# Setup Chrome WebDriver
# ======================================
options = Options()
options.headless = False  # set True for silent run
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

# ======================================
# 1️⃣ ESPN Cricinfo Scraper
# ======================================
def fetch_espn_stats(player_name):
    url_safe_name = player_name.replace(" ", "-")
    url = f"https://www.espncricinfo.com/ask/cricket-qna/{url_safe_name}&tournament=allt20"
    print(f"Fetching (ESPN): {url}")

    stats = {
        "Player": player_name,
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

    try:
        driver.get(url)
        time.sleep(6)

        data_columns = driver.find_elements(By.CLASS_NAME, "SimpleListCard_dataColumn__1etEB")
        for column in data_columns:
            try:
                label_text = column.text.strip()
                if ":" in label_text:
                    key, value = label_text.split(":", 1)
                    key, value = key.strip(), value.strip()

                    if key == "Runs": stats["Runs"] = value
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
        print(f"Error fetching {player_name} from ESPN: {e}")
        return stats


# ======================================
# 2️⃣ Cricmetric Scraper
# ======================================
def fetch_cricmetric_stats(player_name):
    url = f"https://www.cricmetric.com/playerstats.py?player={player_name.replace(' ', '+')}&role=all&format=All_T20&groupby=year"
    print(f"Fetching (Cricmetric): {url}")

    stats = {"Player": player_name, "Strike Rate": ""}

    try:
        driver.get(url)
        time.sleep(3)

        # Strike Rate
        try:
            batting_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Batting']//tfoot/tr")
            sr_value = batting_total.find_elements(By.TAG_NAME, "td")[6].text.strip()
            stats["Strike Rate"] = sr_value
        except:
            try:
                bowling_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Bowling']//tfoot/tr")
                sr_value = bowling_total.find_elements(By.TAG_NAME, "td")[7].text.strip()
                stats["Strike Rate"] = sr_value
            except:
                stats["Strike Rate"] = "0"

    except Exception as e:
        print(f"Error fetching {player_name} from Cricmetric: {e}")

    return stats


# ======================================
# 3️⃣ Combined Scraper Pipeline
# ======================================
def run_combined_scraper(input_csv, output_csv):
    df = pd.read_csv(input_csv)
    df.rename(columns=lambda x: x.strip(), inplace=True)

    # Detect player column
    player_col = None
    for col in df.columns:
        if "player" in col.lower():
            player_col = col
            break
    if not player_col:
        raise ValueError("❌ No Player column found in the CSV file.")

    # Step 1: ESPN data
    espn_results = []
    for _, row in df.iterrows():
        player = row[player_col].strip()
        if not player:
            continue
        espn_stats = fetch_espn_stats(player)
        espn_results.append(espn_stats)

    espn_df = pd.DataFrame(espn_results)
    df = df.merge(espn_df, how="left", left_on=player_col, right_on="Player")
    df.drop(columns=["Player"], inplace=True)

    # Step 2: Cricmetric data
    cricmetric_results = []
    for _, row in df.iterrows():
        player = row[player_col].strip()
        if not player:
            continue
        cm_stats = fetch_cricmetric_stats(player)
        cricmetric_results.append(cm_stats)

    cricmetric_df = pd.DataFrame(cricmetric_results)
    df = df.merge(cricmetric_df, how="left", left_on=player_col, right_on="Player")
    df.drop(columns=["Player"], inplace=True)

    # Step 3: Rename columns to match desired format
    rename_map = {
        "Strike Rate": "SR",
        "Player Name": "Player Name",
        "Runs": "Runs",
        "HS": "HS",
        "Bat Av": "Bat Av",
        "100": "100",
        "Wkts": "Wkts",
        "BBI": "BBI",
        "Bowl Av": "Bowl Av",
        "5": "5",
        "Ct": "Ct",
        "St": "St",
        "Ave Diff": "Ave Diff",
    }
    df.rename(columns=rename_map, inplace=True)

    # Step 4: Final column order
    desired_order = [
        "Team Name", "Player Name", "Role", "Runs", "HS", "Bat Av", "100",
        "Wkts", "BBI", "Bowl Av", "5", "Ct", "St", "Ave Diff", "SR"
    ]

    # Ensure all desired columns exist
    for col in desired_order:
        if col not in df.columns:
            df[col] = ""

    df = df[desired_order]

    # Save to output
    df.to_csv(output_csv, index=False)
    print(f"✅ Scraping and merging complete. File saved as: {output_csv}")


# ======================================
# 4️⃣ Run Full Scraper
# ======================================
if __name__ == "__main__":
    run_combined_scraper("latest_squard.csv", "SAA20.csv")
    driver.quit()
