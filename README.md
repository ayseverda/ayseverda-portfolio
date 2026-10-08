# Ayşe Verda Gülcemal — Portfolyo

Yapay zeka, bilgisayarlı görü, backend, mobil ve oyun projelerimi topladığım kişisel portfolyo sitem.
Türkçe ve İngilizce; sağ üstteki **EN / TR** butonuyla dil değişir.

## Öne çıkanlar

- **Projeler:** öne çıkan beş proje ve 20'den fazla diğer çalışma; arama ve kategori filtreleri
- **Videolar:** projelerin YouTube videoları, karttaki laptop / telefon / konsolun büyüyüp ortaya gelmesiyle oynar
- **Cozy Cafe mini oyunu:** kendi çizdiğim piksel çizimlerle kafe, bahçe ve mutfaktan oluşan küçük bir oyun
- Duyarlı tasarım: telefon, tablet ve masaüstü

## Yapı

Derleme adımı yok; düz HTML, CSS ve JavaScript.

```
index.html               Sayfa (Türkçe metinler burada)
css/styles.css           Tüm stiller
js/data.js               Projeler, deneyim, sertifikalar, yetenekler
js/i18n.js               İngilizce metinler ve arayüz çevirileri
js/main.js               Sayfa davranışı, proje penceresi, video sahnesi
js/game.js               Cozy Cafe mini oyunu
project-assets/web/      Sitede kullanılan optimize görseller
tools/                   Görsel optimizasyonu (Python + Pillow)
```

## Yerelde çalıştırma

`index.html` dosyasını tarayıcıda açmak yeterli. YouTube videoları için yerel bir sunucu daha sağlıklı çalışır:

```
python -m http.server 8000
```

Ardından `http://localhost:8000` adresini aç.
