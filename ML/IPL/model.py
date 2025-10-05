# ===============================
# IPL Player Team Prediction (Exact Match Weighted by Latest Team)
# ===============================

import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict

# -------------------------------
# Step 1: Load dataset
# -------------------------------
df = pd.read_csv("ipl.csv")  # make sure path is correct

# -------------------------------
# Step 2: Data Cleaning
# -------------------------------
df = df.replace("-", np.nan)

# Clean HS (remove * and convert to numeric)
df["HS"] = df["HS"].astype(str).str.replace("*", "", regex=False)
df["HS"] = pd.to_numeric(df["HS"], errors="coerce").fillna(0)

# Convert numeric columns
numeric_cols = ["SR", "Runs", "HS", "Bat Av", "Wkts", "Bowl Av", "5"]
df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors="coerce").fillna(0)

# Encode Team
le_team = LabelEncoder()
df["Team_encoded"] = le_team.fit_transform(df["Team"])

# -------------------------------
# Step 3: Get User Input
# -------------------------------
print("\nEnter the new player stats:")

SR = float(input("Strike Rate (SR): "))
Runs = int(input("Total Runs: "))
HS = int(input("Highest Score (HS): "))
BatAv = float(input("Batting Average: "))
Wkts = int(input("Wickets: "))
BowlAv = float(input("Bowling Average: "))
five_wkt = int(input("5-wicket hauls: "))

new_player = pd.DataFrame([{
    "SR": SR,
    "Runs": Runs,
    "HS": HS,
    "Bat Av": BatAv,
    "Wkts": Wkts,
    "Bowl Av": BowlAv,
    "5": five_wkt
}])

# -------------------------------
# Step 4: Similarity Search
# -------------------------------
X = df[numeric_cols].values
distances = np.linalg.norm(X - new_player.values, axis=1)

# ✅ Exact Match Handling
if np.min(distances) == 0.0:
    match_indices = np.where(distances == 0.0)[0]
    matched_players = df.iloc[match_indices]

    player_name = matched_players.iloc[0]["Player"]

    # If Season column exists → sort so last season is prioritized
    if "Season" in df.columns:
        matched_players = matched_players.sort_values("Season", ascending=False)

    # Weight distribution (latest team gets extra priority)
    team_weights = defaultdict(float)
    for i, row in matched_players.iterrows():
        if i == matched_players.index[0]:  # latest team
            team_weights[row["Team"]] += 2.0  # double weight
        else:
            team_weights[row["Team"]] += 1.0

    # Normalize to percentages
    total = sum(team_weights.values())
    team_percentages = {team: (weight / total) * 100 for team, weight in team_weights.items()}

    print(f"\n🎯 Exact Match Found: {player_name}")
    print("\n📊 Team Distribution for this player (latest team favored):")
    for team, pct in sorted(team_percentages.items(), key=lambda x: x[1], reverse=True):
        print(f"- {team}: {pct:.2f}%")

    exit()

# -------------------------------
# Step 5: Similarity Search (if no exact match)
# -------------------------------
N = 5
closest_indices = np.argsort(distances)[:N]

print("\n--- Similar Players Found ---")
team_scores = defaultdict(float)

for idx in closest_indices:
    player_name = df.iloc[idx]["Player"]
    team_name = df.iloc[idx]["Team"]
    dist = distances[idx]

    base_weight = 1 / (dist + 1e-6)

    # Boost latest team if Season exists
    if "Season" in df.columns:
        player_history = df[df["Player"] == player_name].sort_values("Season", ascending=False)
        for j, row in player_history.iterrows():
            if row["Team"] == team_name:
                team_scores[team_name] += base_weight * 1.0
            else:
                team_scores[row["Team"]] += base_weight * 0.5
    else:
        team_scores[team_name] += base_weight

    print(f"{player_name} ({team_name}) - Distance: {dist:.2f}")

# -------------------------------
# Step 6: Predict Team
# -------------------------------
predicted_team = max(team_scores, key=team_scores.get)

print("\n✅ Suggested Team for this player:", predicted_team)
