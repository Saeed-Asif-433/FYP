import pandas as pd

# Load both CSVs
file1 = pd.read_csv("BBL_players_stats.csv", header=None, names=["Name", "Span", "Team", "OtherTeam", "SR", "BowlingStyle"])
file2 = pd.read_csv("BBL_Stats.csv")

# Merge on Player/Name
merged = pd.merge(file1, file2, left_on="Name", right_on="Player", how="outer")

# Always keep Span from file1 (team info)
merged.drop(columns=["Player", "Span_y"], inplace=True)
merged.rename(columns={"Span_x": "Span"}, inplace=True)

# Save combined file
merged.to_csv("BBL_data.csv", index=False)

print("✅ Combined file created: combined.csv (with team-file Span only)")
