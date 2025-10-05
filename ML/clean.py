import pandas as pd
import os

def process_names_to_txt(file_name, name_column="Player"):
    # Read CSV
    df = pd.read_csv(file_name)

    # Check if name column exists
    if name_column not in df.columns:
        raise ValueError(f"CSV must contain '{name_column}' column")

    # Get unique names
    unique_names = df[name_column].drop_duplicates().dropna()

    # Prepare output file name: filename_Players.txt
    base_name_noext, _ = os.path.splitext(file_name)
    output_file = f"{base_name_noext}_Players.txt"

    # Save unique names to txt
    with open(output_file, "w", encoding="utf-8") as f:
        for name in unique_names:
            f.write(str(name) + "\n")

    print(f"✅ Unique names saved to: {output_file}")


# -------- Run on your file --------
if __name__ == "__main__":
    file_name = "ilt20_players.csv"   # <<-- Change your file name here
    process_names_to_txt(file_name, name_column="Player")
