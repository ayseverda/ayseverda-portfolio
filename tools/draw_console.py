"""Cozy Cafe videosu için piksel sanatı el konsolu çizer → project-assets/konsol-cozy.png

Ekran 4:3 (oyunun oranı) ve saydamdır; video bu alanın arkasında oynar.
Önce küçük bir piksel ızgarasında çizilir, sonra keskin (NEAREST) büyütülür.
Çalıştırma:  python tools/draw_console.py
"""
from pathlib import Path

from PIL import Image, ImageDraw

OUT = Path(__file__).resolve().parent.parent / "project-assets" / "konsol-cozy.png"
SCALE = 8

# Referans konsoldan alınan sıcak pastel palet
OUTLINE = (126, 78, 68, 255)
BODY = (252, 234, 174, 255)
BODY_LIGHT = (255, 246, 214, 255)
BODY_SHADE = (247, 214, 150, 255)
PINK = (246, 189, 172, 255)
PINK_LIGHT = (255, 222, 210, 255)
PINK_DARK = (214, 140, 128, 255)
BEZEL = (110, 66, 58, 255)
CLEAR = (0, 0, 0, 0)

W, H = 124, 150
SCREEN = (14, 18, 14 + 96, 18 + 72)  # 96 × 72 = 4:3

img = Image.new("RGBA", (W, H), CLEAR)
d = ImageDraw.Draw(img)


def rounded(box, radius, fill, outline=None):
    """Piksel köşeli yuvarlak dikdörtgen (kademeli köşeler)."""
    x0, y0, x1, y1 = box
    d.rounded_rectangle(box, radius=radius, fill=outline or fill)
    if outline:
        d.rounded_rectangle((x0 + 1, y0 + 1, x1 - 1, y1 - 1), radius=max(radius - 1, 0), fill=fill)


def pixels(x, y, rows, color):
    """Küçük ikonları satır satır çizer ('#' dolu piksel)."""
    for dy, row in enumerate(rows):
        for dx, ch in enumerate(row):
            if ch == "#":
                d.point((x + dx, y + dy), fill=color)


# Omuz ve yan tuşlar (gövdenin arkasında kalır)
for x in (14, 90):
    rounded((x, 1, x + 20, 9), 2, PINK, OUTLINE)
for y in (36, 76):
    rounded((0, y, 6, y + 16), 2, PINK, OUTLINE)
    rounded((W - 7, y, W - 1, y + 16), 2, PINK, OUTLINE)

# Gövde: alt gölge, ana yüzey, üst parlaklık
rounded((3, 6, W - 4, H - 2), 9, BODY_SHADE, OUTLINE)
rounded((3, 6, W - 4, H - 5), 9, BODY, OUTLINE)
d.line((12, 8, W - 13, 8), fill=BODY_LIGHT)
d.line((8, 11, 8, 30), fill=BODY_LIGHT)

# Ekran çerçevesi ve saydam ekran
x0, y0, x1, y1 = SCREEN
rounded((x0 - 4, y0 - 4, x1 + 3, y1 + 3), 3, BODY_SHADE, OUTLINE)
d.rectangle((x0 - 2, y0 - 2, x1 + 1, y1 + 1), fill=BEZEL)
d.rectangle((x0, y0, x1 - 1, y1 - 1), fill=CLEAR)

# Üstte kalp ve iki pırıltı
pixels(58, 10, [".#.#.", "#####", ".###.", "..#.."], PINK_DARK)
pixels(50, 11, [".#.", "###", ".#."], PINK)
pixels(69, 11, [".#.", "###", ".#."], PINK)

# Yön tuşu (artı)
cx, cy = 26, 112
for box in ((cx - 4, cy - 12, cx + 4, cy + 12), (cx - 12, cy - 4, cx + 12, cy + 4)):
    d.rectangle(box, fill=OUTLINE)
for box in ((cx - 3, cy - 11, cx + 3, cy + 11), (cx - 11, cy - 3, cx + 11, cy + 3)):
    d.rectangle(box, fill=PINK)
d.line((cx - 2, cy - 10, cx + 2, cy - 10), fill=PINK_LIGHT)
pixels(cx - 2, cy - 1, [".#.#.", "#####", ".###.", "..#.."], PINK_DARK)

# Dört yuvarlak tuş (elmas dizilim)
def round_button(x, y):
    d.ellipse((x - 6, y - 6, x + 6, y + 6), fill=OUTLINE)
    d.ellipse((x - 5, y - 5, x + 5, y + 5), fill=PINK)
    d.point((x - 2, y - 3), fill=PINK_LIGHT)
    d.point((x - 3, y - 2), fill=PINK_LIGHT)

for bx, by in ((97, 101), (85, 112), (109, 112), (97, 123)):
    round_button(bx, by)

# Ortada tavşan yüzü ve iki hap tuş
pixels(55, 95, [
    ".#...#.",
    "#.#.#.#",
    "#.#.#.#",
    "#.....#",
    "#.#.#.#",
    "#..#..#",
    ".#####.",
], OUTLINE)
pixels(47, 97, [".#.", "###", ".#."], PINK)
pixels(64, 97, [".#.", "###", ".#."], PINK)
for px in (44, 64):
    rounded((px, 126, px + 15, 132), 3, PINK, OUTLINE)

# Hoparlör delikleri
for sx in (10, 104):
    for i in range(3):
        for j in range(3):
            if (i + j) % 2 == 0:
                d.point((sx + i * 2, 133 + j * 2), fill=PINK_DARK)

img = img.resize((W * SCALE, H * SCALE), Image.NEAREST)
img.save(OUT)
print(f"{OUT.name}: {img.width}x{img.height}, ekran {x0 * SCALE},{y0 * SCALE} – {x1 * SCALE},{y1 * SCALE}")
