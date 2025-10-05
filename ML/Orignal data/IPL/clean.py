import pandas as pd

# Load your CSV
df = pd.read_csv("ipl_players.csv", header=None, names=["Name", "Span", "Team", "Role", "StartYear", "EndYear"])

# Drop duplicates (keep one row per Name + Span + Team)
df_unique = df.drop_duplicates(subset=["Name", "Span", "Team"], keep="first")

# Drop unwanted columns
df_unique = df_unique.drop(columns=["Role", "StartYear", "EndYear"])

# Save cleaned file
df_unique.to_csv("ipl_cleaned.csv", index=False)

print("✅ Cleaned file created: players_cleaned.csv")
