# ======================================
# 🏏 SA20 Player Team Prediction Model
# ======================================

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# -----------------------------
# 1️⃣ Load Data
# -----------------------------
df = pd.read_csv("SA20.csv")

# Preview
print("Before Cleaning:\n", df.head())

# -----------------------------
# 2️⃣ Clean Data
# -----------------------------
# Replace '-' or blanks with 0
df.replace('-', 0, inplace=True)
df.replace('', 0, inplace=True)

# Convert all numeric-looking columns to numeric
for col in df.columns:
    df[col] = pd.to_numeric(df[col], errors='ignore')

# Drop rows where target 'Team' is missing
df.dropna(subset=['Team'], inplace=True)

# -----------------------------
# 3️⃣ Encode Categorical Columns
# -----------------------------
cat_cols = df.select_dtypes(include=['object']).columns.tolist()
cat_cols.remove('Team')  # keep Team as target

label_encoders = {}
for col in cat_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col].astype(str))
    label_encoders[col] = le

# -----------------------------
# 4️⃣ Prepare Features & Target
# -----------------------------
X = df.drop(columns=['Player', 'Team'], errors='ignore')
y = df['Team']

# Encode target labels
team_encoder = LabelEncoder()
y_encoded = team_encoder.fit_transform(y)

# -----------------------------
# 5️⃣ Normalize Numeric Features
# -----------------------------
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# -----------------------------
# 6️⃣ Train-Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y_encoded, test_size=0.2, random_state=42
)

# -----------------------------
# 7️⃣ Train Model
# -----------------------------
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=10,
    random_state=42
)
model.fit(X_train, y_train)

# -----------------------------
# 8️⃣ Evaluate Model
# -----------------------------
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"\n🎯 Model Accuracy: {acc * 100:.2f}%\n")
print(classification_report(y_test, y_pred, target_names=team_encoder.classes_))

# -----------------------------
# 9️⃣ Save Model (Optional)
# -----------------------------
import joblib
joblib.dump(model, "player_team_model.pkl")
joblib.dump(team_encoder, "team_encoder.pkl")
joblib.dump(scaler, "scaler.pkl")

print("\n✅ Model, encoder, and scaler saved successfully!")
