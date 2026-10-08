"""Sitede kullanılan görsellerin küçültülmüş WebP kopyalarını project-assets/web/ altına üretir.

Orijinaller olduğu gibi kalır. Yeni bir görsel eklediğinde bu dosyadaki IMAGES listesine
ekleyip çalıştır:  python tools/optimize_images.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "project-assets"
OUT = ROOT / "web"
GAME = "oyun-assets/assets/"

# (kaynak, hedef, en büyük genişlik, kenar boşluklarını kırp[, kırpma kutusu])
IMAGES = [
    ("hero/image.png", "hero.webp", 1400, False),
    ("konsol-cozy.png", "konsol.webp", 992, False),  # Cozy Cafe videosunun oynadığı konsol (tools/draw_console.py çizer)
    ("hero/veda.png", "contact.webp", 1000, True),  # iletişim bölümündeki veda çizimi
    # Sertifikalar
    ("yzta-finalist.jpg", "certs/yzta-finalist.webp", 1000, False),
    ("yzta-bootcamp.jpg", "certs/yzta-bootcamp.webp", 1000, False),
    ("girisimcilik.jpg", "certs/girisimcilik.webp", 1000, False),
    ("web-gelistirme.png", "certs/web-gelistirme.webp", 1000, False),
    ("google-proje-yonetimi.jpeg", "certs/google-proje-yonetimi.webp", 1000, False),
    ("kotlin.jpg", "certs/kotlin.webp", 1000, False),
    ("ankara-btk-hackathon.jpg", "certs/btk-hackathon.webp", 1000, False),
    ("pupilica-hackathon.jpg", "certs/pupilica-hackathon.webp", 1000, False),
    ("hackathon.jpg", "certs/yzta-hackathon.webp", 1000, False),
    # Logolar
    ("sau.png", "logos/sau.webp", 360, True),
    ("argede.png", "logos/argede.webp", 360, True),
    ("google-yzta.png", "logos/google-yzta.webp", 420, True),
    ("turktraktor.png", "logos/turktraktor.webp", 360, True),
    ("bilisimvadisi.png", "logos/bilisimvadisi.webp", 360, True),
    # Öne çıkan projeler
    ("facepalsy/yuzfelci-phone.png", "projects/facial-phone1.webp", 420, True),
    ("facepalsy/yuzfelci-phone2.png", "projects/facial-phone2.webp", 420, True),
    ("facepalsy/Ekran görüntüsü 2025-12-21 193024.png", "projects/facial-screen1.webp", 1200, False),
    ("facepalsy/facepalsy3 (1).png", "projects/facial-screen2.webp", 1200, False),
    ("facepalsy/facepalsy3 (2).png", "projects/facial-screen3.webp", 1200, False),
    ("ocr/ocr-cover.png", "projects/ocr-cover.webp", 1400, False),
    ("ocr/ocr-duzenle.png", "projects/ocr-duzenle.webp", 1400, False),  # gizlilik: PRIVATE_AREAS
    ("ocr/ocr-karsilastir.png", "projects/ocr-karsilastir.webp", 1400, False),
    ("dermai/dermai-cover.jpg", "projects/dermai-cover.webp", 1400, False),
    ("dermai/dermai-chat.jpg", "projects/dermai-chat.webp", 1400, False),
    ("dermai/dermai-alanlar.jpg", "projects/dermai-alanlar.webp", 1400, False),
    ("ieltsgo/ieltsgo-cover.png", "projects/ieltsgo-cover.webp", 1400, False),
    ("ieltsgo/ieltsgo-homepage.png", "projects/ieltsgo-homepage.webp", 1400, False),
    ("ieltsgo/moduls.png", "projects/ieltsgo-moduls.webp", 1400, False),
    ("ieltsgo/test.png", "projects/ieltsgo-test.webp", 1400, False),
    ("ieltsgo/deneme.png", "projects/ieltsgo-deneme.webp", 1400, False),
    ("ieltsgo/sonuc.png", "projects/ieltsgo-sonuc.webp", 1400, False),
    ("ieltsgo/dashboard.png", "projects/ieltsgo-dashboard.webp", 1400, False),
    ("cozzy/cozzy-cover.png", "projects/cozzy-cover.webp", 960, False),
    ("cozzy/cozzy.png", "projects/cozzy.webp", 960, False),
    ("cozzy/mutfak.png", "projects/cozzy-mutfak.webp", 960, False),
    ("cozzy/bahce.png", "projects/cozzy-bahce.webp", 960, False),
    # Arşiv projeleri
    ("bigdata.jpg", "archive/bigdata.webp", 1000, False),
    ("bulanik-seker.png", "archive/bulanik-seker.webp", 1000, False),
    ("dfa.png", "archive/dfa.webp", 1000, False),
    ("IOT.png", "archive/iot.webp", 1000, False),
    ("IOT-cop.png", "archive/iot-cop.webp", 1000, False),
    ("isletim-sis.png", "archive/isletim-sis.webp", 1000, False),
    ("kuafor3.png", "archive/kuafor-hizmetler.webp", 1000, False),
    ("github-repo-analizi.png", "archive/github-repo-analizi.webp", 800, False),
    ("yeme-zinciri.png", "archive/yeme-zinciri.webp", 800, False),
    ("carpisma.png", "archive/carpisma.webp", 1000, False),
    ("music-veritabani1.png", "archive/muzik-1.webp", 1000, False),
    ("music-veritabani2.png", "archive/muzik-2.webp", 1000, False),
    ("music-veritabani3.png", "archive/muzik-3.webp", 1000, False),
    ("kuafor2.png", "archive/kuafor-anasayfa.webp", 1000, False),
    ("kuafor1.png", "archive/kuafor-randevu.webp", 1000, False),
    ("kisisel-web.png", "archive/kisisel-web.webp", 1000, False),
    ("medikal.png", "archive/medikal.webp", 1000, False),
    ("simulasyon.png", "archive/simulasyon.webp", 1000, False),
    ("tcp.png", "archive/tcp.webp", 1000, False),
    ("travel.png", "archive/travel.webp", 1000, False),
    ("vy-sayi-altigen.png", "archive/vy-sayi-altigen.webp", 1000, False),
    ("vy-sekil-listesi.png", "archive/vy-sekil-listesi.webp", 1000, False),
]


# Kişisel bilgilerin (T.C. kimlik no, kimlik kartı, sonuç paneli) web kopyasında gizlenecek alanları.
# Koordinatlar orijinal görsel pikselleridir: (sol, üst, sağ, alt).
PRIVATE_AREAS = {
    "ocr/ocr-cover.png": [(880, 512, 1162, 578), (1915, 570, 2510, 960), (1890, 1150, 2455, 1560)],
    "ocr/ocr-duzenle.png": [(1512, 770, 2495, 1392)],
}


def hide_private(image: Image.Image, areas) -> Image.Image:
    """Verilen alanları pikselleştirip bulanıklaştırır (geri döndürülemez)."""
    from PIL import ImageFilter
    image = image.copy()
    for box in areas:
        region = image.crop(box)
        small = region.resize((max(1, region.width // 24), max(1, region.height // 24)), Image.BILINEAR)
        region = small.resize(region.size, Image.NEAREST).filter(ImageFilter.GaussianBlur(6))
        image.paste(region, box[:2])
    return image


def trim(image: Image.Image) -> Image.Image:
    """Saydam ya da beyaz kenar boşluklarını kırpar."""
    rgba = image.convert("RGBA")
    box = rgba.getchannel("A").getbbox()
    if box and box != (0, 0, *rgba.size):
        return rgba.crop(box)
    background = Image.new("RGB", rgba.size, rgba.convert("RGB").getpixel((0, 0)))
    from PIL import ImageChops
    diff = ImageChops.difference(rgba.convert("RGB"), background).convert("L").point(lambda v: 255 if v > 12 else 0)
    box = diff.getbbox()
    return rgba.crop(box) if box else rgba


def make_favicon() -> None:
    """Site ikonu: kurbağa sipariş sprite'ının ilk karesi, kare tuvale ortalanmış ve keskin büyütülmüş."""
    sheet = Image.open(ROOT / GAME / "kurba_siparis.png").convert("RGBA")
    frame_width = sheet.width // 3
    frame = trim(sheet.crop((0, 0, frame_width, sheet.height)))
    side = max(frame.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(frame, ((side - frame.width) // 2, (side - frame.height) // 2))
    for size in (32, 180):
        icon = square.resize((size, size), Image.NEAREST)
        destination = OUT / f"favicon-{size}.png"
        icon.save(destination, "PNG")
        print(f"{destination.name:38} {size}x{size}")


def main() -> None:
    make_favicon()
    for source, target, max_width, should_trim, *crop in IMAGES:
        image = Image.open(ROOT / source)
        if crop:
            image = image.crop(crop[0])
        image = trim(image) if should_trim else image.convert("RGBA")
        if source in PRIVATE_AREAS:
            image = hide_private(image, PRIVATE_AREAS[source])
        if image.width > max_width:
            image = image.resize((max_width, round(image.height * max_width / image.width)), Image.LANCZOS)
        if image.getchannel("A").getextrema() == (255, 255):
            image = image.convert("RGB")
        destination = OUT / target
        destination.parent.mkdir(parents=True, exist_ok=True)
        image.save(destination, "WEBP", quality=82, method=6)
        print(f"{target:38} {image.width}x{image.height}  {destination.stat().st_size // 1024} KB")
    make_mockups()


# ---------------------------------------------------------------------------
# Cihaz mockup'ları: ekran görüntüleri telefon / laptop çerçevesinin içine yerleştirilir.
# Kaynaklar yukarıda üretilen web kopyalarıdır (OCR gizlilik maskesi korunur).
# (cihaz, kaynak web görseli, hedef, ekrana yerleştirme: 'cover' | 'width')
#   cover → ekranı doldurur (üstten hizalı); width → genişliğe sığar, kalan alan
#   ekran görüntüsünün alt kenar rengiyle doldurulur (telefon oranında olmayan ekranlar için).
# (dosya, çıktı genişliği, açık nötr arka planı temizle)
# apple-iphone-11.png'de "saydamlık" görselin içine gömülü bir dama deseni; o yüzden temizlenir.
DEVICES = {
    "phone": ("apple-iphone-11.png", 420, True),
    "iphone": ("iphone.png", 420, False),  # yüz felci projesinin telefonu
    "laptop": ("laptop.png", 1100, False),
    "console": ("konsol-cozy.png", 760, False),
}
MOCKUPS = [
    ("console", "projects/cozzy-bahce.webp", "mockups/cozy-console.webp", "cover"),
    ("laptop", "projects/ocr-cover.webp", "mockups/ocr-laptop.webp", "cover"),
    ("laptop", "projects/dermai-cover.webp", "mockups/dermai-laptop.webp", "cover"),
    ("laptop", "projects/ieltsgo-homepage.webp", "mockups/ieltsgo-laptop.webp", "cover"),
    ("iphone", "projects/facial-phone1.webp", "mockups/facial-iphone1.webp", "cover"),
    ("iphone", "projects/facial-phone2.webp", "mockups/facial-iphone2.webp", "cover"),
]


def load_device(file_name: str, clear_light: bool):
    """Çerçeveyi yükler; soluk arka plan piksellerini siler, ekranın maskesini bulur."""
    from PIL import ImageDraw
    frame = Image.open(ROOT / file_name).convert("RGBA")
    if clear_light:
        pixels = frame.load()
        for y in range(frame.height):
            for x in range(frame.width):
                r, g, b, a = pixels[x, y]
                if min(r, g, b) >= 170 and max(r, g, b) - min(r, g, b) < 18:
                    pixels[x, y] = (r, g, b, 0)
    alpha = frame.getchannel("A").point(lambda a: 0 if a < 40 else a)
    frame.putalpha(alpha)
    frame = frame.crop(alpha.getbbox())
    # Ekran: ortadan başlayarak saydam bölgeyi flood-fill ile işaretle
    # Ekran camı yarı saydam olabilir; 200 altı alfa "ekran" sayılır
    probe = frame.getchannel("A").point(lambda a: 0 if a < 200 else 255).convert("L")
    center = (frame.width // 2, frame.height // 2 if frame.width < frame.height else int(frame.height * 0.45))
    ImageDraw.floodfill(probe, center, 128)
    screen_mask = probe.point(lambda v: 255 if v == 128 else 0)
    # Ekrandaki cam/parlama katmanını kaldır ki görüntü soluk görünmesin
    from PIL import ImageChops
    frame.putalpha(ImageChops.multiply(frame.getchannel("A"), ImageChops.invert(screen_mask)))
    return frame, screen_mask


def dominant_color(image: Image.Image) -> tuple:
    """Ekran görüntüsünün baskın rengi (uygulamanın arka planı); boş ekran alanını doldurmak için."""
    small = image.convert("RGB").resize((80, 80)).quantize(colors=8)
    palette = small.getpalette()
    index = max(small.getcolors(), key=lambda item: item[0])[1]
    return tuple(palette[index * 3:index * 3 + 3])


def make_mockups() -> None:
    devices = {name: load_device(file, clear) + (width,) for name, (file, width, clear) in DEVICES.items()}
    for device, source, target, fit in MOCKUPS:
        frame, mask, out_width = devices[device]
        box = mask.getbbox()
        screen_w, screen_h = box[2] - box[0], box[3] - box[1]
        shot = Image.open(OUT / source).convert("RGB")
        if fit == "width":
            shot = shot.crop((4, 4, shot.width - 4, shot.height - 4))  # rapordan gelen ince kenar çizgisi
        canvas = Image.new("RGB", (screen_w, screen_h), dominant_color(shot))
        if fit == "cover":
            scale = max(screen_w / shot.width, screen_h / shot.height)
            resized = shot.resize((round(shot.width * scale), round(shot.height * scale)), Image.LANCZOS)
            canvas.paste(resized, (0, 0))
        else:
            # Çentiğin altında kalmaması için üstten biraz boşluk; o şerit de üst kenar rengiyle dolar
            notch = round(screen_h * 0.045)
            resized = shot.resize((screen_w, round(shot.height * screen_w / shot.width)), Image.LANCZOS)
            canvas.paste(resized, (0, notch))
        result = Image.new("RGBA", frame.size, (0, 0, 0, 0))
        result.paste(canvas, box[:2], mask.crop(box))
        result.alpha_composite(frame)
        result = result.resize((out_width, round(result.height * out_width / result.width)), Image.LANCZOS)
        destination = OUT / target
        destination.parent.mkdir(parents=True, exist_ok=True)
        result.save(destination, "WEBP", quality=85, method=6)
        print(f"{target:38} {result.width}x{result.height}  {destination.stat().st_size // 1024} KB")


def make_phone_group(sources, target, height=520):
    """Telefon mockup'larını yelpaze gibi dizer: yanlar hafif küçük ve eğik, ortadaki önde."""
    phones = [Image.open(OUT / name).convert("RGBA") for name in sources]
    side_h, mid_h = int(height * 0.86), height
    left = phones[0].resize((round(phones[0].width * side_h / phones[0].height), side_h), Image.LANCZOS).rotate(6, expand=True, resample=Image.BICUBIC)
    right = phones[2].resize((round(phones[2].width * side_h / phones[2].height), side_h), Image.LANCZOS).rotate(-6, expand=True, resample=Image.BICUBIC)
    mid = phones[1].resize((round(phones[1].width * mid_h / phones[1].height), mid_h), Image.LANCZOS)
    overlap = int(mid.width * 0.32)
    width = left.width + mid.width + right.width - 2 * overlap
    canvas = Image.new("RGBA", (width, max(left.height, mid.height, right.height)), (0, 0, 0, 0))
    canvas.alpha_composite(left, (0, (canvas.height - left.height) // 2 + 10))
    canvas.alpha_composite(right, (width - right.width, (canvas.height - right.height) // 2 + 10))
    canvas.alpha_composite(mid, (left.width - overlap, (canvas.height - mid.height) // 2))
    canvas.save(OUT / target, "WEBP", quality=85, method=6)
    print(f"{target:38} {canvas.width}x{canvas.height}  {(OUT / target).stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
