import pandas as pd

# Load CSV with proper header
df = pd.read_csv("psl_data.csv", header=0)

# Extract start year safely (handle NaN / bad values)
df["StartYear"] = df["Span"].astype(str).str.split("-").str[0]

# Keep only numeric years
df["StartYear"] = pd.to_numeric(df["StartYear"], errors="coerce")

# Sort by Team, then StartYear
df_sorted = df.sort_values(by=["Team", "StartYear"]).reset_index(drop=True)

# Drop helper column
df_sorted.drop(columns=["StartYear"], inplace=True)

# Save
df_sorted.to_csv("PSL.csv", index=False)

print("✅ Sorted file created: combined_sorted.csv")
