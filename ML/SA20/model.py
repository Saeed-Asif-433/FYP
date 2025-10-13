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
def clean_numeric(val):
    """Remove non-numeric characters and handle missing values."""
    if isinstance(val, str):
        val = re.sub(r'[^0-9.\-]', '', val)
        try:
            return float(val) if val != '' else 0.0
        except:
            return 0.0
    elif pd.isna(val):
        return 0.0
    return val

# Apply cleaning to numeric-like columns
for col in train_df.columns:
    if train_df[col].dtype == object and col not in ['Player', 'Team', 'Country', 'Bowling Style', 'Role', 'Span']:
        train_df[col] = train_df[col].apply(clean_numeric)

train_df = train_df.fillna(0)

# Ensure Role column exists
if 'Role' not in train_df.columns:
    train_df['Role'] = 'Unknown'
else:
    train_df['Role'] = train_df['Role'].fillna('Unknown')

# ================================
# 🧩 3. Feature Engineering
# ================================
def extract_years(span):
    try:
        start, end = span.split('-')
        return int(start), int(end)
    except:
        return 0, 0

train_df['Start_Year'], train_df['End_Year'] = zip(*train_df['Span'].apply(extract_years))
train_df = train_df.drop(columns=['Span'], errors='ignore')

# Encode categorical features
le_team = LabelEncoder()
le_country = LabelEncoder()
le_role = LabelEncoder()

train_df['Team'] = le_team.fit_transform(train_df['Team'])
train_df['Country'] = le_country.fit_transform(train_df['Country'])
train_df['Role'] = le_role.fit_transform(train_df['Role'])

# Prepare X and y
drop_cols = ['Player', 'Bowling Style']
X = train_df.drop(columns=[col for col in drop_cols if col in train_df.columns] + ['Team'])
y = train_df['Team']

# ================================
# 🤖 4. Train Model
# ================================
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

print(f"✅ Data cleaned successfully!\nTotal records: {len(train_df)}")
print("🎯 Model trained successfully!")

# ================================
# 🏏 5. Team Selection
# ================================
teams = le_team.classes_
print("\n🏏 SA20 Team Selection")
for i, team in enumerate(teams, 1):
    print(f"{i}. {team}")

team_choice = int(input("\nSelect the team (1–6): "))
selected_team = teams[team_choice - 1]
print(f"\nYou selected: {selected_team}")

# ================================
# 📂 6. Load Test Data
# ================================
test_file = "test.csv"
test_df = pd.read_csv(test_file)
test_df = test_df.fillna(0)

# Clean numeric columns
for col in test_df.columns:
    if test_df[col].dtype == object and col not in ['Player', 'Team', 'Country', 'Bowling Style', 'Role', 'Span']:
        test_df[col] = test_df[col].apply(clean_numeric)

if 'Role' not in test_df.columns:
    test_df['Role'] = 'Unknown'
else:
    test_df['Role'] = test_df['Role'].fillna('Unknown')

# Extract years
test_df['Start_Year'], test_df['End_Year'] = zip(*test_df['Span'].apply(extract_years))
test_df = test_df.drop(columns=['Span'], errors='ignore')

# Encode test data
test_df['Country'] = le_country.transform(test_df['Country'])
test_df['Role'] = le_role.transform(test_df['Role'])

# ================================
# 🔍 7. Predict Fit Scores
# ================================
test_features = test_df.drop(columns=['Player', 'Bowling Style', 'Team'], errors='ignore')
pred_probs = model.predict_proba(test_features)

team_index = np.where(le_team.classes_ == selected_team)[0][0]
team_probs = pred_probs[:, team_index] * 100

# ================================
# ⚡ 8. Apply Boost for Same-Team Players
# ================================
boosted_scores = []
boosted_flags = []

for i, row in test_df.iterrows():
    player = row['Player']
    base_score = team_probs[i]
    boost = 0.0

    # Check if player has played for this team in training data
    player_history = train_df[train_df['Player'] == player]

    if not player_history.empty:
        player_team = le_team.inverse_transform([int(player_history['Team'].values[0])])[0]

        if player_team == selected_team:
            boost = 0.25  # stronger boost for exact same team
            boosted_flags.append("Boosted ✅")
        else:
            boosted_flags.append("")
    else:
        boosted_flags.append("")

    final_score = base_score * (1 + boost)
    boosted_scores.append(final_score)

test_df['Fit_Score'] = boosted_scores
test_df['Boosted'] = boosted_flags

# ================================
# 🏆 9. Final Ranking
# ================================
# Players who have played with selected team appear higher
test_df['Has_Played'] = test_df['Player'].apply(
    lambda p: 1 if not train_df[(train_df['Player'] == p) &
                                (le_team.inverse_transform([int(train_df.loc[train_df['Player'] == p, 'Team'].values[0])])[0] == selected_team)].empty else 0
)

# Sort: first by Has_Played (descending), then by Fit_Score (descending)
test_df = test_df.sort_values(by=['Has_Played', 'Fit_Score'], ascending=[False, False])

# ================================
# 📊 10. Show Final Results
# ================================
print(f"\n📊 Player Fit Scores for {selected_team}\n")
for _, row in test_df.iterrows():
    print(f" - {row['Player']}: {row['Fit_Score']:.2f}% match {row['Boosted']}")

best_player = test_df.iloc[0]
print(f"\n🏆 Recommended Player for {selected_team}: {best_player['Player']} ({best_player['Fit_Score']:.2f}% match)")
