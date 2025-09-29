import os, csv, qrcode
from qrcode.constants import ERROR_CORRECT_H

BASE = os.getenv("BASE_URL", "https://verify.helprush.in/emp")
OUT_DIR = "out"
os.makedirs(OUT_DIR, exist_ok=True)

def make_qr(emp_id: str):
    url = f"{BASE.rstrip('/')}/{emp_id}"
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=10,
        border=2
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    out_path = os.path.join(OUT_DIR, f"qr_{emp_id}.png")
    img.save(out_path)
    print(f"✅ {emp_id} -> {url} -> {out_path}")

with open("employees.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        emp_id = (row.get("emp_id") or "").strip()
        if emp_id:
            make_qr(emp_id)
