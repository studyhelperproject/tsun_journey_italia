import os

def verify():
    filepath = "docs/SCREEN_PLAN.md"
    if not os.path.exists(filepath):
        print(f"Error: {filepath} does not exist.")
        exit(1)

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    required_sections = [
        "## 1. デザインシステム (Design System)",
        "## 2. 画面一覧 (Screen Inventory)",
        "## 3. コンポーネント配置とレイアウト (Component Layouts)",
        "カラーパレット",
        "タイポグラフィ",
        "メインゲーム画面",
        "ヘッダー (Header)",
        "フッター (Footer)"
    ]

    missing = []
    for section in required_sections:
        if section not in content:
            missing.append(section)

    if missing:
        print(f"Error: Missing required sections: {missing}")
        exit(1)

    print("Verification successful: All required sections are present in docs/SCREEN_PLAN.md")

if __name__ == "__main__":
    verify()
