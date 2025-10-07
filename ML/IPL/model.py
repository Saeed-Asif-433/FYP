import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score

# ===============================
# 1️⃣ Load Dataset
# ===============================
df = pd.read_csv("IPL.csv")

print("✅ Teams in dataset:", df["Team"].unique())
print("Total Records:", len(df))

# ===============================
# 2️⃣ Prepare Features
# ===============================
numeric_cols = ['Runs', 'HS', 'Bat Av', '100', 'Wkts', 'BBI', 'Bowl Av', '5']

# Clean numeric columns
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)

X = df[numeric_cols]
y = df['Team']

# ===============================
# 3️⃣ Train/Test Split & Model
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# Accuracy
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
cv_acc = cross_val_score(model, X, y, cv=5).mean()

print(f"🎯 Test Accuracy: {acc*100:.2f}%")
print(f"📊 Cross-Validation Accuracy: {cv_acc*100:.2f}%")
