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
options.headless = False  # True = run silently
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)


# ======================================
# 1️⃣ ESPN Cricinfo Stats Fetcher
# ======================================
def fetch_espn_stats(player_name):
    url_safe_name = player_name.strip().replace(" ", "-").lower()
    url = f"https://www.espncricinfo.com/ask/cricket-qna/{url_safe_name}&tournament=allt20"
    print(f"\n🔹 Fetching ESPN stats for: {player_name}")
    print(f"   URL: {url}")

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
        time.sleep(5)

        # Try to get stat pairs (label + value)
        rows = driver.find_elements(By.CLASS_NAME, "SimpleListCard_dataColumn__1etEB")

        for r in rows:
            try:
                text = r.text.strip()
                if ":" in text:
                    key, value = text.split(":", 1)
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

    except Exception as e:
        print(f"⚠️ Error scraping ESPN for {player_name}: {e}")

    return stats


# ======================================
# 2️⃣ Cricmetric Stats Fetcher (Strike Rate)
# ======================================
def fetch_cricmetric_stats(player_name):
    url = f"https://www.cricmetric.com/playerstats.py?player={player_name.replace(' ', '+')}&role=all&format=All_T20&groupby=year"
    print(f"🔸 Fetching Cricmetric SR for: {player_name}")
    print(f"   URL: {url}")

    stats = {"Player": player_name, "SR": ""}
    try:
        driver.get(url)
        time.sleep(4)

        # Try batting totals first
        try:
            batting_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Batting']//tfoot/tr")
            sr_value = batting_total.find_elements(By.TAG_NAME, "td")[6].text.strip()
            stats["SR"] = sr_value
        except:
            # Try bowling SR if no batting found
            try:
                bowling_total = driver.find_element(By.XPATH, "//div[@id='All_T20-Bowling']//tfoot/tr")
                sr_value = bowling_total.find_elements(By.TAG_NAME, "td")[7].text.strip()
                stats["SR"] = sr_value
            except:
                stats["SR"] = "0"

    except Exception as e:
        print(f"⚠️ Cricmetric error for {player_name}: {e}")

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
        raise ValueError("❌ No Player column found in input CSV")

    results = []

    for _, row in df.iterrows():
        player_name = str(row[player_col]).strip()
        if not player_name:
            continue

        espn_stats = fetch_espn_stats(player_name)
        cricmetric_stats = fetch_cricmetric_stats(player_name)

        combined = {**espn_stats, **cricmetric_stats}

        # Add team and role if exist in input
        combined["Team Name"] = row["Team Name"] if "Team Name" in df.columns else ""
        combined["Role"] = row["Role"] if "Role" in df.columns else ""

        results.append(combined)

    # Convert to DataFrame
    final_df = pd.DataFrame(results)

    # Final column order
    desired_order = [
        "Team Name", "Player", "Role", "Runs", "HS", "Bat Av", "100",
        "Wkts", "BBI", "Bowl Av", "5", "Ct", "St", "Ave Diff", "SR"
    ]

    for col in desired_order:
        if col not in final_df.columns:
            final_df[col] = ""

    final_df = final_df[desired_order]
    final_df.rename(columns={"Player": "Player Name"}, inplace=True)

    # Save
    final_df.to_csv(output_csv, index=False)
    print(f"\n✅ Scraping complete. Data saved as: {output_csv}")


# ======================================
# 4️⃣ Run Script
# ======================================
if __name__ == "__main__":
    run_combined_scraper("hundered23.csv", "Hundred_Final_Output.csv")
    driver.quit()
