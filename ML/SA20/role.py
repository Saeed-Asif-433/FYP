import pandas as pd

# Load dataset
df = pd.read_csv('sa20.csv')

# Convert numeric columns safely
for col in ['Bat Av', 'Wkts', 'St']:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

# --- Define function to classify player role ---
def assign_role(row):
    batting_avg = row['Bat Av']
    wickets = row['Wkts']
    bowling_style = str(row.get('Bowling Style', '')).strip().lower()
    stumpings = row['St']

    # 1️⃣ Wicketkeeper Batter
    if stumpings > 0:
        return 'Wicketkeeper Batter'

    # 2️⃣ Batter (no bowling style or few wickets)
    if (bowling_style == '' or bowling_style == '-' or 'none' in bowling_style) and batting_avg >= 20:
        return 'Batter'

    # 3️⃣ Bowler (low batting avg but many wickets)
    if bowling_style not in ['', '-'] and batting_avg < 15 and wickets >= 50:
        return 'Bowler'

    # 4️⃣ All-rounder (both bat & bowl effectively)
    if bowling_style not in ['', '-'] and batting_avg >= 15 and wickets >= 50:
        return 'All-rounder'

    # 5️⃣ Default fallback
    return 'All-rounder'

# Apply function to assign roles
df['Role'] = df.apply(assign_role, axis=1)

# Save updated CSV (overwrite as SA20.csv)
df.to_csv('SA20.csv', index=False)

print("✅ Roles assigned successfully — saved as 'SA20.csv'")
