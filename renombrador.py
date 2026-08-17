import json
from pathlib import Path
from tkinter import Tk, filedialog, messagebox

root = Tk()
root.withdraw()

# Seleccionar album.json
album_file = filedialog.askopenfilename(
    title="Selecciona album.json",
    filetypes=[("JSON", "*.json")]
)

if not album_file:
    raise SystemExit("No se seleccionó album.json")

# Seleccionar urls.txt
urls_file = filedialog.askopenfilename(
    title="Selecciona urls.txt",
    filetypes=[("Text", "*.txt")]
)

if not urls_file:
    raise SystemExit("No se seleccionó urls.txt")

# Cargar album
with open(album_file, "r", encoding="utf-8") as f:
    album = json.load(f)

# Cargar URLs
with open(urls_file, "r", encoding="utf-8") as f:
    urls = [line.strip() for line in f if line.strip()]

items = album.get("items", [])

if len(urls) != len(items):
    messagebox.showerror(
        "Error",
        f"Items en album.json: {len(items)}\n"
        f"URLs en urls.txt: {len(urls)}\n\n"
        "Las cantidades deben coincidir."
    )
    raise SystemExit()

# Asignar URLs por posición
for item, url in zip(items, urls):
    item["url"] = url

# Guardar resultado
output_file = Path(album_file).with_name("album_imgpile.json")

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(album, f, ensure_ascii=False, indent=2)

messagebox.showinfo(
    "Terminado",
    f"Archivo generado:\n\n{output_file}"
)