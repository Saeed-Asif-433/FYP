import pandas as pd

# ---------------- Load both CSVs ----------------
file1 = pd.read_csv("ilt20_strike.csv", header=0)  # Already has headers
file2 = pd.read_csv("ILT20_Stats.csv", header=0)

# ---------------- Merge ----------------
merged = pd.merge(file1, file2, left_on="Player", right_on="Player", how="outer")

# Drop duplicate/unwanted columns
# Keep Team from file2, drop Team from file1 if present
if "Team_x" in merged.columns and "Team_y" in merged.columns:
    merged.drop(columns=["Team_x"], inplace=True)
    merged.rename(columns={"Team_y": "Team"}, inplace=True)

# If Span got duplicated, keep from file1
if "Span_x" in merged.columns and "Span_y" in merged.columns:
    merged.drop(columns=["Span_y"], inplace=True)
    merged.rename(columns={"Span_x": "Span"}, inplace=True)

# ---------------- Sorting ----------------
# Extract StartYear from Span
merged["StartYear"] = merged["Span"].astype(str).str.split("-").str[0]
merged["StartYear"] = pd.to_numeric(merged["StartYear"], errors="coerce")

# Sort by Team, then StartYear
merged_sorted = merged.sort_values(by=["Team", "StartYear"]).reset_index(drop=True)

# Drop helper column
merged_sorted.drop(columns=["StartYear"], inplace=True)

# ---------------- Save ----------------
merged_sorted.to_csv("ILT20.csv", index=False)

print("✅ Combined & sorted file created: Hundered_data.csv")
