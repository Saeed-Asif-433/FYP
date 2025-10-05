import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load data
df = pd.read_csv("merged_player_stats.csv")

# Clean columns
df['HS'] = df['HS'].str.replace(r'\*', '', regex=True).astype(float)
df['BBI'] = df['BBI'].str.extract(r'(\d+)/')[0].astype(float)

# Drop rows with missing values
df.dropna(inplace=True)

# Use only the selected features
df_model = df[['Team', 'Runs', 'HS', 'Bat Av', '100', 'Wkts', 'BBI', 'Bowl Av', '5']]

# Train model
X = df_model.drop(columns=['Team'])
y = df_model['Team']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Get input from user
print("\nEnter T20 stats for prediction:")
Runs = float(input("Total Runs: "))
HS = float(input("Highest Score: "))
Bat_Av = float(input("Batting Average: "))
hundreds = float(input("100s: "))
Wkts = float(input("Total Wickets: "))
BBI_input = input("Best Bowling (e.g. 4/11): ")
BBI = float(BBI_input.split('/')[0])
Bowl_Av = float(input("Bowling Average: "))
fifers = float(input("5-wicket hauls: "))

# Create input DataFrame
new_data = pd.DataFrame([{
    'Runs': Runs,
    'HS': HS,
    'Bat Av': Bat_Av,
    '100': hundreds,
    'Wkts': Wkts,
    'BBI': BBI,
    'Bowl Av': Bowl_Av,
    '5': fifers
}])

# Predict
prediction = model.predict(new_data)[0]
probs = model.predict_proba(new_data)[0]
team_probs = dict(zip(model.classes_, probs))

# Get top 2 predictions
top_2 = sorted(team_probs.items(), key=lambda x: x[1], reverse=True)[:2]

print(f"\n🔮 Predicted Team: {prediction}")
print("\n📊 Top 2 Probable Teams:")
for team, prob in top_2:
    print(f"{team}: {prob * 100:.2f}%")
