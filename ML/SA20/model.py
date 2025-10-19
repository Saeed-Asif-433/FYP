import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import re

# ================================
# 🧾 1. Load Training Data
# ================================
train_file = "SA20.csv"
train_df = pd.read_csv(train_file)

# ================================
# 🧹 2. Data Cleaning
# ================================
def clean_numeric(x):
    """Clean numeric-like strings."""
    if pd.isna(x):
        return 0
    x = str(x).strip()
    if x == '-' or x == '':
        return 0
    x = re.sub(r'[^0-9\.]', '', x)
    try:
        return float(x)
    except:
        return 0

for col in train_df.columns:
    if train_df[col].dtype == object and col not in ['Player', 'Team', 'Country', 'Bowling Style', 'Role', 'Span']:
        train_df[col] = train_df[col].apply(clean_numeric)

# ================================
# 📆 3. Extract Start/End Year
# ================================
def extract_years(span):
    try:
        parts = str(span).split('-')
        if len(parts) == 2:
            return int(parts[0]), int(parts[1])
        elif len(parts) == 1:
            y = int(parts[0])
            return y, y
    except:
        return 0, 0

train_df['Start_Year'], train_df['End_Year'] = zip(*train_df['Span'].apply(extract_years))
train_df = train_df.drop(columns=['Span'], errors='ignore')

# ================================
# 🧩 4. Encode Categorical Features
# ================================
le_team = LabelEncoder()
le_country = LabelEncoder()
le_role = LabelEncoder()
le_bowl = LabelEncoder()  # ✅ Added for Bowling Style

# Fill missing categorical values
for col in ['Team', 'Country', 'Role', 'Bowling Style']:
    train_df[col] = train_df[col].fillna('Unknown')

train_df['Team'] = le_team.fit_transform(train_df['Team'])
train_df['Country'] = le_country.fit_transform(train_df['Country'])
train_df['Role'] = le_role.fit_transform(train_df['Role'])
train_df['Bowling Style'] = le_bowl.fit_transform(train_df['Bowling Style'])

# ================================
# 🎯 5. Define Features & Target
# ================================
X = train_df.drop(columns=['Player'])
y = train_df['Team']

# ✅ Ensure all numeric
X = X.apply(pd.to_numeric, errors='coerce').fillna(0)

# ================================
# 🧠 6. Train-Test Split & Model
# ================================
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

print(f"✅ Model trained successfully on {len(train_df)} records!")

# ================================
# 🏏 7. Team Selection
# ================================
teams = list(le_team.classes_)
print("\n🏏 Available Teams:")
for i, t in enumerate(teams, 1):
    print(f"{i}. {t}")

selected_index = int(input("\n👉 Select the team (1–6): "))
selected_team = teams[selected_index - 1]
print(f"\n✅ You selected: {selected_team}")

# ================================
# 📥 8. Input Test Data (Array)
# ================================
test_data = [
    {"Player": "Quinton de Kock", "Country": "South Africa", "Runs": 2100, "HS": 120, "Bat Av": 38, "100": 3,
     "Wkts": 0, "BBI": 0, "Bowl Av": 0, "5": 0, "Ct": 25, "St": 10, "Ave Diff": 0,
     "Bowling Style": "-", "Role": "Wicketkeeper Batter", "Span": "2018-2025"},

    {"Player": "Jos Buttler", "Country": "England", "Runs": 2600, "HS": 124, "Bat Av": 42, "100": 4,
     "Wkts": 0, "BBI": 0, "Bowl Av": 0, "5": 0, "Ct": 22, "St": 8, "Ave Diff": 0,
     "Bowling Style": "-", "Role": "Wicketkeeper Batter", "Span": "2016-2025"},

    {"Player": "Kagiso Rabada", "Country": "South Africa", "Runs": 250, "HS": 30, "Bat Av": 15, "100": 0,
     "Wkts": 110, "BBI": 5, "Bowl Av": 20, "5": 3, "Ct": 10, "St": 0, "Ave Diff": 0,
     "Bowling Style": "Right-arm fast", "Role": "Bowler", "Span": "2015-2025"},

    {"Player": "David Miller", "Country": "South Africa", "Runs": 1900, "HS": 95, "Bat Av": 37, "100": 1,
     "Wkts": 0, "BBI": 0, "Bowl Av": 0, "5": 0, "Ct": 18, "St": 0, "Ave Diff": 0,
     "Bowling Style": "-", "Role": "Batter", "Span": "2014-2025"},

    {"Player": "Rashid Khan", "Country": "Afghanistan", "Runs": 900, "HS": 48, "Bat Av": 20, "100": 0,
     "Wkts": 130, "BBI": 5, "Bowl Av": 18, "5": 2, "Ct": 15, "St": 0, "Ave Diff": 0,
     "Bowling Style": "Right-arm legbreak", "Role": "All-rounder", "Span": "2017-2025"},
]

test_df = pd.DataFrame(test_data)
test_df = test_df.fillna(0)

# Clean numeric columns
for col in test_df.columns:
    if test_df[col].dtype == object and col not in ['Player', 'Team', 'Country', 'Bowling Style', 'Role', 'Span']:
        test_df[col] = test_df[col].apply(clean_numeric)

# Normalize Role names
test_df['Role'] = test_df['Role'].replace({
    'Wicketkeeper Batter': 'Wicketkeeper',
    'WK-Batter': 'Wicketkeeper',
    'wk': 'Wicketkeeper',
})
test_df['Role'] = test_df['Role'].fillna('Unknown')

# Extract years
test_df['Start_Year'], test_df['End_Year'] = zip(*test_df['Span'].apply(extract_years))
test_df = test_df.drop(columns=['Span'], errors='ignore')

# ================================
# 🔒 9. Safe Label Encoding
# ================================
def safe_transform(le, values):
    known = set(le.classes_)
    transformed = []
    for v in values:
        if v in known:
            transformed.append(le.transform([v])[0])
        else:
            transformed.append(-1)
    return transformed

test_df['Country'] = safe_transform(le_country, test_df['Country'])
test_df['Role'] = safe_transform(le_role, test_df['Role'])
test_df['Bowling Style'] = safe_transform(le_bowl, test_df['Bowling Style'])

# ================================
# 🧩 10. Align Test Columns
# ================================
train_features = X.columns.tolist()

# Add missing columns
for col in train_features:
    if col not in test_df.columns:
        test_df[col] = 0

# Drop extra columns
test_df = test_df[train_features]

# ================================
# 🔍 11. Predict Team Fit Scores
# ================================
pred_probs = model.predict_proba(test_df)
team_index = np.where(le_team.classes_ == selected_team)[0][0]
team_probs = pred_probs[:, team_index] * 100  # percentage

test_df['Fit_Score'] = team_probs

# ================================
# 🏆 12. Show Results
# ================================
final_df = pd.DataFrame({
    'Player': [d['Player'] for d in test_data],
    'Fit_Score (%)': test_df['Fit_Score']
}).sort_values(by='Fit_Score (%)', ascending=False)

print(f"\n📊 Player Fit Scores for {selected_team}")
for _, row in final_df.iterrows():
    print(f" - {row['Player']}: {row['Fit_Score (%)']:.2f}% match")

best_player = final_df.iloc[0]
print(f"\n🏆 Recommended Player: {best_player['Player']} ({best_player['Fit_Score (%)']:.2f}% match)")
