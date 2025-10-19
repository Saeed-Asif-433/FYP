import pandas as pd

# ================================
# 🧾 1. Load Dataset
# ================================
df = pd.read_csv('sa20.csv')

# ================================
# 🧹 2. Clean & Convert Numeric Columns
# ================================
for col in ['Bat Av', 'Wkts', 'St', 'Runs']:
    if col in df.columns:
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

# ================================
# 🧩 3. Define Role Assignment Function
# ================================
def assign_role(row):
    batting_avg = row['Bat Av']
    runs = row['Runs']
    wickets = row['Wkts']
    stumpings = row['St']
    bowling_style = str(row.get('Bowling Style', '')).strip().lower()

    # 1️⃣ Wicketkeeper — more than 20 stumpings
    if stumpings > 20:
        return 'Wicketkeeper'

    # 2️⃣ Batter — strong batting stats and runs
    if runs >= 1000 and batting_avg >= 15 and wickets < 30:
        return 'Batter'

    # 3️⃣ Bowler — good bowling stats, weak batting
    if (wickets >= 50) or any(word in bowling_style for word in ['bowler', 'fast', 'medium', 'spin']):
        if batting_avg < 15:
            return 'Bowler'

    # 4️⃣ All-rounder — decent both bat & ball
    if batting_avg >= 15 and wickets >= 30:
        return 'All-rounder'

    # 5️⃣ Default fallback
    return 'All-rounder'

# ================================
# 🧠 4. Apply Function
# ================================
df['Role'] = df.apply(assign_role, axis=1)

# ================================
# 💾 5. Save Updated File
# ================================
df.to_csv('SA20.csv', index=False)

print("✅ Roles assigned successfully — saved as 'SA20.csv'")
print(df['Role'].value_counts())
