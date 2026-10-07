// Sitedeki tüm içerik verileri: projeler, deneyim, eğitim, sertifikalar ve yetenekler.
// Çevrilen her alan { tr, en } çifti olarak tutulur; main.js aktif dile göre seçer.
// Görseller project-assets/web/ altındaki optimize kopyalardır (bkz. tools/optimize_images.py).

const IMG = 'project-assets/web/';

/* ---------- Öne çıkan projeler ---------- */
// visual.layout: 'phones' (iki telefon yan yana) | 'laptop' (laptop mockup'ı, bkz. tools/optimize_images.py)
// video: YouTube video kimliği; varsa laptop ekranında oynatılabilir.
// filters: proje filtrelerindeki anahtarlar (bkz. PROJECT_FILTERS)

const FEATURED_PROJECTS = [
  {
    id: 'facial',
    video: 'HfE0S7npgbQ',
    theme: 'lavender',
    badge: { tr: 'TÜBİTAK 2209-A', en: 'TÜBİTAK 2209-A' },
    filters: ['ai', 'vision', 'mobile'],
    name: { tr: 'Yüz Felci Takip ve Rehabilitasyon Sistemi', en: 'Facial Paralysis Monitoring & Rehabilitation System' },
    category: { tr: 'YAPAY ZEKA · BİLGİSAYARLI GÖRÜ · MOBİL', en: 'AI · COMPUTER VISION · MOBILE' },
    tags: ['React Native', 'FastAPI', 'Python', 'MediaPipe Face Mesh'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/bellspalsy' }],
    description: {
      tr: 'MediaPipe ile yüz asimetrisini kişinin kendi nötr yüzüne göre ölçen ve rehabilitasyon ilerlemesini takip eden bir mobil uygulama geliştirdim. TÜBİTAK 2209-A destekli bitirme projem.',
      en: 'I built a mobile app that measures facial asymmetry against the user’s own neutral face with MediaPipe and tracks rehabilitation progress. It is my TÜBİTAK 2209-A supported graduation project.'
    },
    problem: {
      tr: 'Yüz felci değerlendirmesi çoğunlukla hekimin gözlemine dayanıyor; hastanın evde yaptığı egzersizlerde ilerlemesini nesnel olarak görmesi zor. Derin öğrenme çözümleri ise büyük etiketli veri ve güçlü donanım istiyor.',
      en: 'Facial paralysis is mostly assessed by a doctor’s eye, so patients exercising at home can’t objectively see their progress. Deep learning solutions need large labeled datasets and powerful hardware.'
    },
    built: {
      tr: 'Kullanıcının nötr yüzünü kişisel referans olarak kaydeden, ardından kaş kaldırma, göz kapatma, gülümseme, dudak büzme ve kaş çatma hareketleri için 0–100 arası anlaşılır bir skor veren ve seanslar arasındaki ilerlemeyi grafikle gösteren bir uygulama yaptım.',
      en: 'I made an app that saves the user’s neutral face as a personal reference, then gives an easy-to-read 0–100 score for brow raise, eye closure, smile, lip pucker and frown, and charts progress between sessions.'
    },
    approach: {
      tr: 'Mobil tarafı React Native, sunucuyu FastAPI ile yazdım. MediaPipe Face Mesh’in 468 yüz noktasından geometrik ölçümler çıkarıp bunları kişinin kendi referansıyla karşılaştırdım. Model eğitmeye gerek duymayan, kural tabanlı ve açıklanabilir bir yöntem kurdum; bir seansın analizi ortalama 2,5 saniye sürüyor.',
      en: 'I wrote the mobile side in React Native and the server in FastAPI. I extracted geometric measurements from MediaPipe Face Mesh’s 468 face points and compared them with the user’s own reference. I designed a rule-based, explainable method that needs no model training; analyzing a session takes about 2.5 seconds on average.'
    },
    challenge: {
      tr: 'Herkesin yüzü doğal olarak biraz asimetrik olduğu için genel bir şablon işe yaramıyordu; bu yüzden kişiye özel referans yaklaşımını geliştirdim. Bu referansı kaldırdığımda doğruluğun %85’ten %36’ya düştüğünü görerek yöntemin ne kadar kritik olduğunu ölçtüm.',
      en: 'Everyone’s face is naturally a bit asymmetric, so a generic template didn’t work; that’s why I developed the personal reference approach. When I removed it, accuracy dropped from 85% to 36%, which showed how essential it is.'
    },
    result: {
      tr: '53 test oturumunda üç sınıfta (Sağlıklı / Orta / Felç) %85 doğruluğa ulaştım ve çalışmayı makale olarak yayına hazırlıyorum. Test oturumları gönüllülerin canlandırdığı senaryolar ve sentetik görüntülerden oluşuyor; hekim etiketi içermiyor. Uygulama tanı koymuyor, takip ve rehabilitasyona destek oluyor.',
      en: 'I reached 85% accuracy across three classes (Healthy / Moderate / Palsy) on 53 test sessions and I’m preparing the work as a journal paper. The sessions are scenarios acted out by volunteers plus synthetic images, without clinical labels. The app does not diagnose; it supports tracking and rehabilitation.'
    },
    visual: {
      layout: 'phones',
      images: [
        { src: IMG + 'mockups/facial-iphone1.webp', alt: { tr: 'Yüz egzersizi ekranı', en: 'Facial exercise screen' } },
        { src: IMG + 'mockups/facial-iphone2.webp', alt: { tr: 'Seans analiz ekranı', en: 'Session analysis screen' } }
      ]
    },
    gallery: ['facial-phone1', 'facial-phone2', 'facial-screen1', 'facial-screen2', 'facial-screen3']
  },
  {
    id: 'ocr',
    video: 'Upxhqm5olo0',
    theme: 'ice',
    filters: ['ai', 'vision'],
    name: { tr: 'Kimlik Kartı OCR ve Veri Çıkarma Sistemi', en: 'Identity Card OCR & Data Extraction System' },
    category: { tr: 'BİLGİSAYARLI GÖRÜ · OCR · OTOMASYON', en: 'COMPUTER VISION · OCR · AUTOMATION' },
    tags: ['Python', 'OpenCV', 'EasyOCR', 'SIFT', 'Streamlit'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/kimlik-ocr-sistemi' }],
    description: {
      tr: 'Fotoğraflardaki kimlik kartını bulup düzelten, bilgileri otomatik okuyan ve sonuçları kontrol edip Excel’e aktarabildiğim bir masaüstü uygulaması geliştirdim.',
      en: 'I built a desktop app that finds and straightens the ID card in a photo, reads its details automatically, and lets me review the results and export them to Excel.'
    },
    problem: {
      tr: 'Kimlik bilgilerini fotoğraflardan elle yazmak hem yavaş hem de hataya açık. Fotoğraflar eğik, bulanık ya da farklı ışıkta çekildiğinde basit bir OCR da yanlış sonuç veriyor.',
      en: 'Typing ID details from photos by hand is slow and error-prone, and simple OCR fails when photos are tilted, blurry or badly lit.'
    },
    built: {
      tr: 'Kartı tespit edip perspektifini düzelten, standart boyuta kırpan, kimlik no / ad / soyad gibi alanları okuyan, emin olamadığı alanları işaretleyen ve elle düzeltmeye izin veren bir uygulama yaptım. Toplu klasör işleme, liste karşılaştırma ve Excel / PDF dışa aktarma da ekledim.',
      en: 'I made an app that detects the card, fixes its perspective, crops it to a standard size, reads fields such as ID number and name, flags uncertain fields and lets me correct them by hand. I also added batch folder processing, list comparison and Excel / PDF export.'
    },
    approach: {
      tr: 'Görüntü işleme ve perspektif düzeltme için OpenCV ve SIFT, metin okuma için EasyOCR kullandım. Okunan değerleri benzerlik eşleştirmesiyle doğruladım ve arayüzü Python ile kurdum.',
      en: 'I used OpenCV and SIFT for image processing and perspective correction and EasyOCR for text recognition. I validated the results with fuzzy matching and built the interface in Python.'
    },
    challenge: {
      tr: 'Düşük kaliteli görüntülerde ve Türkçe karakterlerde OCR sık hata yapıyordu; bunun için ek doğrulama kuralları ve şüpheli alanlarda yeniden analiz yapan bir mekanizma geliştirdim.',
      en: 'OCR often failed on low-quality images and Turkish characters, so I added extra validation rules and a mechanism that re-analyzes suspicious fields.'
    },
    result: {
      tr: 'Küçük bir OCR denemesini, sonuçları gözden geçirip dışa aktarabildiğim kullanışlı bir veri çıkarma aracına dönüştürdüm; projeyi geliştirmeye devam ediyorum.',
      en: 'I turned a small OCR experiment into a practical extraction tool where I can review results and export them; I’m still improving it.'
    },
    visual: {
      layout: 'laptop',
      images: [{ src: IMG + 'mockups/ocr-laptop.webp', alt: { tr: 'Laptop ekranında Kimlik OCR uygulaması', en: 'Identity OCR app on a laptop screen' } }]
    },
    gallery: ['ocr-cover', 'ocr-duzenle', 'ocr-karsilastir']
  },
  {
    id: 'derma',
    video: 'I9QDYyXa__0',
    theme: 'lilac',
    badge: { tr: 'Bootcamp Finalisti', en: 'Bootcamp Finalist' },
    filters: ['ai', 'vision', 'web', 'backend'],
    name: { tr: 'DermaAI', en: 'DermaAI' },
    category: { tr: 'YAPAY ZEKA · BİLGİSAYARLI GÖRÜ · SAĞLIK', en: 'AI · COMPUTER VISION · HEALTHCARE' },
    tags: ['TensorFlow', 'DenseNet121', 'Flask', 'Spring Boot', 'MySQL', 'Gemini API'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/Sudeozubek/dermAI' }],
    description: {
      tr: 'Bootcamp’te 5 kişilik ekiple geliştirdiğimiz yapay zeka destekli cilt analizi platformu. Frontend’i ve yapay zeka entegrasyonlarını üstlendim.',
      en: 'An AI-powered skin analysis platform our five-person team built in a bootcamp. I handled the frontend and the AI integrations.'
    },
    problem: {
      tr: 'İnsanlar bende, sivilcede veya lekede bir değişiklik fark ettiğinde ne yapacağını bilemiyor. Tanı koymadan farkındalık yaratan ve gerektiğinde doktora gitmeye teşvik eden erişilebilir bir araç istedik.',
      en: 'People often don’t know what to do when they notice a change in a mole, acne or a spot. We wanted an accessible tool that raises awareness without diagnosing and encourages seeing a doctor when needed.'
    },
    built: {
      tr: 'Kullanıcı bir cilt fotoğrafı yüklüyor, model olasılık tahmini yapıyor, Gemini destekli sohbet botu sonucu açıklıyor ve kullanıcıya cilt tipine uygun bakım ürünleri öneriliyor. Ben splash ekranı, sohbet botu arayüzü, kullanıcı ve içerik sayfaları dahil tüm ön yüzü responsive olarak geliştirdim; eğitilen modeli tahmin servisi üzerinden arayüze bağladım, Gemini sohbet botunu ve Sephora API’siyle ürün önerilerini entegre ettim.',
      en: 'Users upload a skin photo, the model predicts probabilities, a Gemini-powered chatbot explains the result and skincare products suited to their skin type are recommended. I built the whole responsive frontend — the splash screen, chatbot UI, user and content pages — connected the trained model to the UI through the prediction service, and integrated the Gemini chatbot and Sephora API product recommendations.'
    },
    approach: {
      tr: 'Model, HAM10000 veri setiyle TensorFlow / Keras’ta eğitilmiş bir DenseNet121; görseli 224×224’e getirip sınıflandıran bir Flask servisiyle çalışıyor. Web uygulaması Spring Boot, Spring Security ve Thymeleaf ile, veriler MySQL’de.',
      en: 'The model is a DenseNet121 trained on HAM10000 with TensorFlow / Keras, served by a Flask service that resizes images to 224×224 and classifies them. The web app uses Spring Boot, Spring Security and Thymeleaf, with data in MySQL.'
    },
    challenge: {
      tr: 'Model, backend ve ön yüz aynı anda ilerlerken parçaları birbirine bağlamak: üç sprintlik Scrum sürecinde Trello backlog’u, haftada iki daily scrum ve sprint sonu review’larla çalıştık; ben de modeli ve harici API’leri arayüze bağlayan köprü oldum.',
      en: 'Connecting the pieces while the model, backend and frontend progressed at the same time: we worked in a three-sprint Scrum process with a Trello backlog, two daily scrums a week and sprint reviews, and I acted as the bridge connecting the model and external APIs to the UI.'
    },
    result: {
      tr: 'Üç sprintte MVP’yi tamamladık, proje bootcamp finalisti oldu ve Bilişim Vadisi GO Path Ön Kuluçka Programı’na kabul edildi. Uygulamanın çıktısı tanı değildir; uzman değerlendirmesinin yerini tutmaz.',
      en: 'We completed the MVP in three sprints; the project became a bootcamp finalist and was accepted into the Bilişim Vadisi GO Path Pre-Incubation Program. Its output is not a diagnosis and does not replace a professional assessment.'
    },
    visual: {
      layout: 'laptop',
      images: [{ src: IMG + 'mockups/dermai-laptop.webp', alt: { tr: 'Laptop ekranında DermaAI ana sayfası', en: 'DermaAI home page on a laptop screen' } }]
    },
    gallery: ['dermai-cover', 'dermai-chat', 'dermai-alanlar']
  },
  {
    id: 'ielts',
    video: 'CimrOaKrc9Q', // YouTube video kimliği (youtu.be/ sonrasındaki kısım)
    theme: 'aqua',
    badge: { tr: 'Hackathon', en: 'Hackathon' },
    filters: ['ai', 'web', 'backend'],
    name: { tr: 'IELTSgo', en: 'IELTSgo' },
    category: { tr: 'YAPAY ZEKA · BACKEND · WEB', en: 'AI · BACKEND · WEB' },
    tags: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'Gemini API', 'ElevenLabs'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/ieltsGo' }, { label: { tr: 'Tanıtım videosu', en: 'Demo video' }, url: 'https://youtu.be/CimrOaKrc9Q' }],
    description: {
      tr: 'Hackathon’da ekibimle, okuma, yazma, dinleme ve konuşma becerilerini tek platformda çalıştıran yapay zeka destekli bir IELTS hazırlık uygulaması geliştirdik.',
      en: 'At a hackathon, my team and I built an AI-powered IELTS prep app that trains reading, writing, listening and speaking in one platform.'
    },
    problem: {
      tr: 'IELTS’e hazırlananlar dört beceri için farklı kaynaklar kullanıyor ve özellikle yazma ile konuşmada kişisel geri bildirim almak zor.',
      en: 'IELTS candidates use different resources for each of the four skills, and getting personal feedback on writing and speaking is especially hard.'
    },
    built: {
      tr: 'Dört beceri modülü, yapay zekayla üretilen sorular ve metinler, tarayıcıda sesli dinleme ve konuşma çalışmaları, puanlama ve sonuçları gösteren bir panel geliştirdik.',
      en: 'We built four skill modules, AI-generated questions and passages, in-browser listening and speaking practice, scoring and a dashboard for results.'
    },
    approach: {
      tr: 'Arayüzü React ve TypeScript, servisleri FastAPI ve MongoDB ile kurduk. İçerik ve değerlendirme için Gemini’yi, seslendirme için ElevenLabs’i kullandık.',
      en: 'We built the interface with React and TypeScript and the services with FastAPI and MongoDB, using Gemini for content and assessment and ElevenLabs for voice.'
    },
    challenge: {
      tr: 'Modelin yanıtları her zaman beklediğimiz formatta gelmiyordu; bu yüzden yanıtları doğrulayıp standart bir yapıya çeviren bir katman ekledik.',
      en: 'The model’s responses didn’t always arrive in the format we expected, so we added a layer that validates them and converts them into a standard structure.'
    },
    result: {
      tr: 'Hackathon süresinde dört beceriyi tek yerde toplayan, çalışan bir platform ortaya çıkardık.',
      en: 'Within the hackathon we delivered a working platform that brings all four skills together.'
    },
    visual: {
      layout: 'laptop',
      images: [{ src: IMG + 'mockups/ieltsgo-laptop.webp', alt: { tr: 'Laptop ekranında IELTSgo ana sayfası', en: 'IELTSgo home page on a laptop screen' } }]
    },
    gallery: ['ieltsgo-cover', 'ieltsgo-homepage', 'ieltsgo-moduls', 'ieltsgo-test', 'ieltsgo-deneme', 'ieltsgo-sonuc', 'ieltsgo-dashboard']
  }
];

// Cozy Café ayrı, geniş bir afiş olarak gösterilir.
const COZY_PROJECT = {
  id: 'cozy',
  filters: ['game'],
  name: { tr: 'Cozy Cafe Oyunu', en: 'Cozy Cafe Game' },
  category: { tr: 'OYUN GELİŞTİRME · C++ · GÖMÜLÜ SİSTEMLER', en: 'GAME DEVELOPMENT · C++ · EMBEDDED' },
  tags: ['C++', 'Raylib', { tr: 'ESP32 <small>yakında</small>', en: 'ESP32 <small>coming soon</small>', soon: true }],
  description: {
    tr: 'C++ ve Raylib ile sıfırdan geliştirdiğim, tüm çizimlerini kendim yaptığım piksel sanatı bir kafe oyunu.',
    en: 'A pixel-art café game I built from scratch with C++ and Raylib — I drew every sprite myself.'
  },
  problem: {
    tr: 'Kendi çizdiğim karakterlerle oynanabilir küçük bir kafe oyunu yapmak ve bu PC prototipini ileride ESP32 gibi gömülü bir donanıma taşımak istedim.',
    en: 'I wanted to make a small, playable café game with characters I drew myself, and later move this PC prototype to embedded hardware such as ESP32.'
  },
  built: {
    tr: 'Müşteri siparişlerini, yemek hazırlamayı, envanteri, tarifleri, bahçede ürün yetiştirmeyi, anı defterini ve oyun döngüsünü yazdım; tüm karakterleri, mekanları ve sesleri kendim hazırladım.',
    en: 'I wrote customer orders, cooking, inventory, recipes, growing crops in the garden, a memory journal and the game loop, and made all the characters, places and sounds myself.'
  },
  approach: {
    tr: 'Oyunu C++ ile Raylib kütüphanesi üzerinde geliştirdim; kodu ESP32’ye taşınabilecek şekilde sade tutmaya çalışıyorum.',
    en: 'I developed the game in C++ on the Raylib library and I try to keep the code simple enough to port to ESP32.'
  },
  challenge: {
    tr: 'Oyun sistemlerini gömülü donanımın sınırlı belleğini ve işlem gücünü düşünerek tasarlamak.',
    en: 'Designing the game systems with the limited memory and processing power of embedded hardware in mind.'
  },
  result: {
    tr: 'PC prototipi oynanabilir durumda ve itch.io’da demo olarak yayında; geliştirmeye devam ediyorum.',
    en: 'The PC prototype is playable and published as a demo on itch.io; I’m still developing it.'
  },
  links: [
    { label: { tr: 'Demoyu oyna', en: 'Play demo' }, url: 'https://ayseverda.itch.io/cozzy' },
    { label: { tr: 'Kodu incele', en: 'View code' }, url: 'https://github.com/ayseverda/cozzy-game' }
  ],
  gallery: ['cozzy-cover', 'cozzy', 'cozzy-mutfak', 'cozzy-bahce']
};

// Öne çıkan projelerin üstündeki filtreler. Etiketler i18n.js > UI_TEXT.categories içinde.
const PROJECT_FILTERS = ['all', 'ai', 'vision', 'backend', 'web', 'mobile', 'game'];

/* ---------- Diğer çalışmalar (arşiv) ---------- */
// thumb.fit: 'cover' (ekranı doldurur, üstten hizalı) | 'contain' (tamamı görünür)
// thumb.tone: 'dark' terminal / koyu arayüzler için koyu zemin kullanır.
// Mobil ekranlar için tools/optimize_images.py'nin ürettiği telefon mockup'ları (web/mockups/) kullanılır.
// Görseli olmayan projelerde kategori rengine göre bir kapak çizilir.

const ARCHIVE_FILTERS = ['all', 'ai', 'backend', 'web', 'systems', 'cpp', 'data', 'iot'];

const ARCHIVE_PROJECTS = [
  {
    name: { tr: 'Medikal Cihaz Takip Uygulaması', en: 'Medical Device Tracking App' },
    categories: ['backend', 'data'],
    description: {
      tr: 'Klinikler ve medikal firmalar için hangi cihazın hangi hastada olduğunu, ne zaman yenileneceğini ve stok durumunu takip eden bir masaüstü uygulaması geliştirdim.',
      en: 'I built a desktop app for clinics and medical suppliers that tracks which device is with which patient, when it needs renewal and how much stock is left.'
    },
    problem: {
      tr: 'Bu bilgiler çoğu zaman dağınık Excel tablolarında tutuluyor. Sunucusu ya da IT desteği olmayan küçük ekipler için tek bilgisayarda çalışan, kurulumu kolay bir çözüm gerekiyordu.',
      en: 'This information is often kept in scattered spreadsheets. Small teams without a server or IT support needed an easy-to-install solution that runs on one computer.'
    },
    built: {
      tr: 'Cihaz ve stok yönetimi, hasta kartları ve hastaya cihaz atama ekranlarını yaptım. Ana sayfada önümüzdeki 7 günde yenilenmesi gereken cihazları listeledim; günlük özet e-posta hatırlatması, haftalık otomatik yedekleme (USB, ağ klasörü veya buluta kopyayla) ve admin / kullanıcı rolleri ekledim.',
      en: 'I made screens for device and stock management, patient records and assigning devices to patients. The home screen lists renewals due in the next 7 days, and I added a daily summary reminder email, weekly automatic backups (with a copy to USB, a network folder or the cloud) and admin / user roles.'
    },
    approach: {
      tr: 'Uygulamayı .NET 8 ve Windows Forms ile yazdım; verileri Npgsql ile PostgreSQL’de, parametreli sorgularla tuttum. Veritabanı ilk açılışta kendini kuruyor; Windows Görev Zamanlayıcı ile uygulama kapalıyken de hatırlatma ve yedek kontrolü yapılıyor.',
      en: 'I wrote the app with .NET 8 and Windows Forms and stored data in PostgreSQL through Npgsql with parameterized queries. The database sets itself up on first launch, and Windows Task Scheduler runs reminder and backup checks even when the app is closed.'
    },
    challenge: {
      tr: 'Kurulumu teknik bilgi gerektirmeyecek kadar basit tutarken güvenli kalmak: şifreleri BCrypt ile hash’ledim, veritabanı ve e-posta bilgilerini Windows DPAPI ile şifreledim.',
      en: 'Keeping setup simple for non-technical users while staying secure: I hashed passwords with BCrypt and encrypted database and email credentials with Windows DPAPI.'
    },
    result: {
      tr: 'İnternete ya da sunucuya ihtiyaç duymadan çalışan, PostgreSQL olmadan denenebilen bir demo modu da olan bir takip uygulaması ortaya çıkardım.',
      en: 'I delivered a tracking app that works without internet or a server, plus a demo mode that runs without PostgreSQL.'
    },
    tags: ['.NET 8', 'Windows Forms', 'PostgreSQL', 'Npgsql', 'BCrypt', 'MailKit'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/Medikal-Cihaz-Takip-Uygulamas-' }],
    thumb: { src: IMG + 'archive/medikal.webp', fit: 'cover' }
  },
  {
    name: { tr: 'Yapay Zeka Destekli Kuaför Yönetim Sistemi', en: 'AI-Supported Hairdresser Management System' },
    categories: ['ai', 'web', 'backend'],
    description: {
      tr: 'Randevu, çalışan ve hizmet yönetimi olan; kullanıcının fotoğrafına göre yapay zekayla saç modeli öneren bir kuaför web sitesi geliştirdim.',
      en: 'I built a salon website with appointment, staff and service management that suggests hairstyles from the user’s photo using AI.'
    },
    problem: {
      tr: 'Bir salonda randevuların çakışmadan alınması, her çalışanın sadece yapabildiği işlemlere atanması ve yönetimin tek panelden yapılması gerekiyordu.',
      en: 'A salon needed appointments without clashes, staff assigned only to services they can do, and management from a single panel.'
    },
    built: {
      tr: 'Kayıt / giriş ve oturum yönetimini; 09–18 arası ve bugünden itibaren 2 hafta için çakışma kontrollü randevu almayı; randevuları onaylayıp reddedebilen admin panelini; çalışanların aylık kazancını gösteren grafiği ve kullanıcının yüklediği fotoğrafa göre saç modeli önerisini yaptım.',
      en: 'I made sign-up / login with sessions; booking between 09–18 up to two weeks ahead with clash checks; an admin panel to approve or reject appointments; a chart of each employee’s monthly earnings; and hairstyle suggestions from an uploaded photo.'
    },
    approach: {
      tr: 'ASP.NET Core MVC ve Entity Framework kullandım; kısıtları ve sorguları LINQ ile yazdım. Mesajları REST API ile çektim, fotoğrafı Base64’e çevirip OpenAI API’sine gönderdim; arayüzü Bootstrap ile tasarladım.',
      en: 'I used ASP.NET Core MVC and Entity Framework and wrote constraints and queries with LINQ. I loaded messages through a REST API, converted the photo to Base64 and sent it to the OpenAI API, and designed the UI with Bootstrap.'
    },
    challenge: {
      tr: 'Başta her çalışanı tek bir işleme bağlayabiliyordum; ayrı bir uzmanlık tablosu kurarak çalışan ile işlem arasında çoktan çoğa ilişkiye geçtim ve sorunu çözdüm.',
      en: 'At first I could link each employee to only one service; I fixed it by adding a separate specialization table and moving to a many-to-many relationship.'
    },
    tags: ['ASP.NET Core MVC', 'C#', 'Entity Framework', 'LINQ', 'Bootstrap', 'OpenAI API'],
    thumb: { src: IMG + 'archive/kuafor-anasayfa.webp', fit: 'cover' },
    gallery: [IMG + 'archive/kuafor-anasayfa.webp', IMG + 'archive/kuafor-hizmetler.webp', IMG + 'archive/kuafor-randevu.webp'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/kuafor-odevi-son' }],
  },
  {
    name: { tr: 'Yapay Zeka Destekli Seyahat Planlayıcı', en: 'AI-Powered Travel Planner' },
    categories: ['ai', 'web', 'backend'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: '3 kişilik ekibimle; şehir, tarih, beslenme tercihi ve hava durumuna göre GPT-4 ile gün gün seyahat planı hazırlayan bir web uygulaması geliştirdik.',
      en: 'With my three-person team, I built a web app that uses GPT-4 to create a day-by-day travel plan from the city, dates, diet and weather forecast.'
    },
    problem: {
      tr: 'Seyahat planlarken insanlar rota, restoran ve hava durumu için birden fazla uygulama arasında gidip geliyor ve bu çok zaman alıyor.',
      en: 'When planning a trip, people jump between several apps for routes, restaurants and weather, which takes a lot of time.'
    },
    built: {
      tr: 'Her gün için sabah, öğle ve akşam aktivitelerini, diyete uygun restoran önerilerini, hava durumuna göre kıyafet önerilerini ve yerel ipuçlarını içeren bir plan ekranı ile bir ana sayfa yaptık.',
      en: 'We made a home page and a plan screen with morning, afternoon and evening activities for each day, restaurant suggestions that fit the diet, weather-based outfit tips and local advice.'
    },
    approach: {
      tr: 'Ön yüzü React ve Material UI ile, backend’i Python FastAPI ile yazdık. Kullanıcı bilgilerini ve Weather API’den aldığımız tahmini özel bir prompt ile GPT-4’e gönderip yanıtı JSON olarak döndük.',
      en: 'We wrote the frontend with React and Material UI and the backend with Python FastAPI. We sent the user’s input and the Weather API forecast to GPT-4 with a custom prompt and returned the answer as JSON.'
    },
    challenge: {
      tr: 'Modelin her gün için aynı yapıda ve Türkçe yanıt vermesini sağlayan prompt’u tasarlamak; API anahtarını .env ile güvenli tutup hataları loglamak.',
      en: 'Designing a prompt that makes the model answer in the same structure for every day and in Turkish, and keeping the API key safe in .env while logging errors.'
    },
    result: {
      tr: 'Yapay Zeka dersi için, tatil öncesi planlamayı tek ekranda toplayan çalışan bir prototip geliştirdik.',
      en: 'For our Artificial Intelligence course, we built a working prototype that brings trip planning into a single screen.'
    },
    tags: ['React', 'Material UI', 'Python', 'FastAPI', 'OpenAI GPT-4', 'Weather API'],
    links: [{ label: { tr: 'Tanıtım videosu', en: 'Demo video' }, url: 'https://youtu.be/NJ_wS599Tr8' }],
    thumb: { src: IMG + 'archive/travel.webp', fit: 'cover' }
  },
  {
    name: { tr: 'Web Sunucusu Log Analizi ve Gösterge Paneli', en: 'Web Server Log Analysis & Dashboard' },
    categories: ['backend', 'systems', 'data'],
    description: {
      tr: 'Web sunucusu loglarını toplayıp trafiği, hataları ve şüpheli istekleri canlı panolarda izleyen ve alarm üreten bir sistem kurdum.',
      en: 'I set up a system that collects web server logs and monitors traffic, errors and suspicious requests on live dashboards with alerts.'
    },
    problem: {
      tr: 'Ham log dosyaları okunamayacak kadar büyük; hataları ya da tek bir IP’den gelen yoğun istekleri zamanında fark etmek için logların toplanıp anlamlı hale getirilmesi gerekiyor.',
      en: 'Raw log files are too large to read; to notice errors or bursts of requests from a single IP in time, the logs need to be collected and made meaningful.'
    },
    built: {
      tr: 'Python ile 7 güne yayılmış 10.000 satırlık örnek log ürettim; bunları Promtail ile toplayıp Loki’de sakladım ve Grafana’da zaman serisi, durum kodu dağılımı, en çok istenen sayfalar, IP tablosu, ısı haritası ve canlı log panelleri hazırladım. 5xx hatası artışı ve tek IP’den yoğun istek için alarm kuralları yazdım.',
      en: 'I generated 10,000 sample log lines spread over 7 days with Python, collected them with Promtail, stored them in Loki and built Grafana panels for time series, status codes, top pages, an IP table, a heatmap and live logs. I also wrote alert rules for 5xx spikes and request bursts from a single IP.'
    },
    approach: {
      tr: 'Promtail’de logları regex ile alanlara ayırdım ve zaman damgalarını İstanbul saat dilimine göre işledim; tüm servisleri Docker Compose ile tek komutla ayağa kaldırdım, Grafana panosunu JSON’dan otomatik yükledim.',
      en: 'I parsed the logs into fields with regex in Promtail and handled timestamps in the Istanbul time zone; I started all services with a single Docker Compose command and provisioned the Grafana dashboard from JSON.'
    },
    result: {
      tr: 'Ham log verisini yorumlanabilir ve aksiyon alınabilir panolara dönüştüren çalışan bir izleme ortamı elde ettim.',
      en: 'I ended up with a working monitoring setup that turns raw logs into readable, actionable dashboards.'
    },
    tags: ['Python', 'Promtail', 'Loki', 'Grafana', 'Docker Compose'],
    thumb: { src: IMG + 'archive/bigdata.webp', fit: 'cover', tone: 'dark' }
  },
  {
    name: { tr: 'TCP ile Güvenli Mesajlaşma Platformu', en: 'Secure Messaging Platform over TCP' },
    categories: ['systems', 'backend'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: '3 kişilik ekibimle; birebir, grup ve herkese açık mesajlaşmayı destekleyen, mesajları kendi yazdığımız şifreleme ve hash algoritmalarıyla koruyan gerçek zamanlı bir mesajlaşma uygulaması geliştirdik.',
      en: 'With my three-person team, I built a real-time messaging app with direct, group and broadcast chats that protects messages with encryption and hashing algorithms we wrote ourselves.'
    },
    problem: {
      tr: 'Mesajların ağ üzerinde okunamadığı, veritabanında değiştirilemediği ve alıcı çevrimdışıyken kaybolmadığı bir sistem tasarlamamız gerekiyordu.',
      en: 'We had to design a system where messages can’t be read on the network, can’t be altered in the database and aren’t lost while the recipient is offline.'
    },
    built: {
      tr: 'Birebir, grup ve yayın odalarını, “yazıyor…” göstergesini, çevrimiçi durumunu ve çevrimdışı mesaj kuyruğunu yaptık. Tuzlu parola hash’leme, DJB2 ile FNV-1a’yı birleştiren 64-bit mesaj bütünlük hash’i ve LCG anahtar akışı + XOR + bit döndürmeye dayanan kendi şifreleme algoritmamızı yazdık.',
      en: 'We made direct, group and broadcast rooms, a typing indicator, online status and an offline message queue. We wrote salted password hashing, a 64-bit integrity hash combining DJB2 and FNV-1a, and our own encryption algorithm based on an LCG key stream, XOR and bit rotation.'
    },
    approach: {
      tr: 'İletişimi TCP tabanlı WebSocket üzerinden Python Flask-SocketIO ile kurduk. Her bağlantı için ayrı oturum anahtarı ürettik; mesajları veritabanına yazarken sunucunun ana anahtarıyla ikinci kez şifreledik.',
      en: 'We built communication over TCP-based WebSocket with Python Flask-SocketIO. We generated a session key for every connection and encrypted messages a second time with the server’s master key before storing them.'
    },
    challenge: {
      tr: 'Bir mesajı hem iletimde hem depolamada iki katmanlı korumak ve okurken hash’i yeniden hesaplayıp değiştirilip değiştirilmediğini anlamak.',
      en: 'Protecting each message in two layers — in transit and at rest — and recomputing the hash on read to detect tampering.'
    },
    tags: ['Python', 'Flask-SocketIO', 'WebSocket', 'Kriptografi', 'Hashing'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/Ag-Programlama-Mesajlasma' }],
    thumb: { src: IMG + 'archive/tcp.webp', fit: 'contain', tone: 'dark' }
  },
  {
    name: { tr: 'Bulanık Mantık ve Sinir Ağı ile Sinirlilik Düzeyi Tahmini', en: 'Irritability Level Prediction with Fuzzy Logic & Neural Networks' },
    categories: ['ai'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: 'Grup arkadaşımla, çocuklarda günlük şeker tüketimi, yaş ve cinsiyete göre sinirlilik seviyesini önce bulanık mantıkla modelledik, ardından sinir ağıyla tahmin ettik.',
      en: 'With my teammate, I modeled children’s irritability level from daily sugar intake, age and gender with fuzzy logic, then predicted it with a neural network.'
    },
    problem: {
      tr: 'Şekerin, yaşın ve cinsiyetin sinirlilik üzerindeki etkisi “var / yok” gibi keskin sınırlarla anlatılamıyor; kısmi üyelikle çalışan bir modele ihtiyaç vardı.',
      en: 'The effect of sugar, age and gender on irritability can’t be described with sharp yes / no limits; we needed a model that works with partial membership.'
    },
    built: {
      tr: 'AHA, AAP, CDC ve NHS önerilerini araştırarak şeker miktarı (düşük / orta / yüksek), yaş (bebek / çocuk / ergen) ve cinsiyet için üyelik fonksiyonları, kural tablosu ve sinirlilik çıktısı tasarladık; ağırlık merkezi ve sol maksimum durulama yöntemlerini karşılaştırdık. Ardından 4.000 örnekli veriyle farklı ağ yapılarında bir MLP eğitip K-Fold ile değerlendirdik.',
      en: 'After researching AHA, AAP, CDC and NHS guidelines, we designed membership functions for sugar intake (low / medium / high), age (infant / child / teen) and gender, a rule table and an irritability output, and compared center-of-gravity and left-most-maximum defuzzification. We then trained an MLP with several network shapes on 4,000 samples and evaluated it with K-Fold.'
    },
    approach: {
      tr: 'Java ile çalıştık; bulanık modeli jFuzzyLogic, sinir ağını Neuroph ile kurduk.',
      en: 'We worked in Java, building the fuzzy model with jFuzzyLogic and the neural network with Neuroph.'
    },
    tags: ['Java', 'jFuzzyLogic', 'Neuroph', 'MLP', 'K-Fold'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/BulanikMantikCocuklardaSinir' }],
    thumb: { src: IMG + 'archive/bulanik-seker.webp', fit: 'cover' }
  },
  {
    name: { tr: 'PostgreSQL ve C# Müzik Veritabanı Entegrasyonu', en: 'PostgreSQL & C# Music Database Integration' },
    categories: ['data', 'backend'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: 'Grup arkadaşımla, kalıtım, tetikleyiciler ve fonksiyonlar içeren 18 tabloluk bir müzik veritabanı tasarlayıp C# uygulamasıyla ekleme, okuma, güncelleme ve silme işlemlerini bağladık.',
      en: 'With my teammate, I designed an 18-table music database with inheritance, triggers and functions, and connected create, read, update and delete operations to a C# app.'
    },
    tags: ['PostgreSQL', 'C#', 'Triggers', 'Stored Procedures'],
    thumb: { src: IMG + 'archive/muzik-1.webp', fit: 'cover' },
    gallery: [IMG + 'archive/muzik-1.webp', IMG + 'archive/muzik-2.webp', IMG + 'archive/muzik-3.webp'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/veritabaniuyg' }]
  },
  {
    name: { tr: 'Yapay Zeka Destekli Öğrenme Yol Haritası (Roadmapp)', en: 'AI-Supported Learning Roadmap (Roadmapp)' },
    categories: ['ai', 'web', 'backend'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: 'Ekibimle, öğrenilmek istenen konu ve süreye göre yapay zekayla gün gün yol haritası çıkaran ve her aşama için soru üreten bir web uygulaması geliştirdik.',
      en: 'With my team, I built a web app that uses AI to create a day-by-day learning roadmap from a goal and a time frame, with questions for each stage.'
    },
    problem: {
      tr: 'Yeni bir konuya başlarken neyi hangi sırayla ve kaç günde çalışacağını planlamak zor; hazır müfredatlar kişinin hedefine uymuyor.',
      en: 'When starting a new topic, it’s hard to plan what to study, in which order and over how many days, and ready-made curricula rarely fit your goal.'
    },
    built: {
      tr: 'E-posta ve şifreyle kayıt / giriş, “30 günde Python öğrenmek” gibi bir hedeften yol haritası oluşturma, kayıtlı haritaları listeleme, her aşama için açıklama ve çoktan seçmeli sorular, bir aşama bitmeden sonrakinin açılmadığı bir ilerleme akışı yaptık.',
      en: 'We made email / password sign-up and login, roadmap generation from goals like “learn Python in 30 days”, a list of saved roadmaps, explanations and multiple-choice questions for each stage, and a flow where the next stage unlocks only after the current one.'
    },
    approach: {
      tr: 'Ön yüzü React 19 ve React Router ile, backend’i FastAPI, SQLAlchemy ve SQLite ile kurduk; korumalı alanlar için JWT, içerik üretimi için OpenAI kullandık.',
      en: 'We built the frontend with React 19 and React Router and the backend with FastAPI, SQLAlchemy and SQLite, using JWT for protected areas and OpenAI for content generation.'
    },
    tags: ['React', 'FastAPI', 'SQLAlchemy', 'SQLite', 'JWT', 'OpenAI API']
  },
  {
    name: { tr: 'Blynk Entegreli Akıllı Çöp Kutusu', en: 'Blynk-Integrated Smart Trash Bin' },
    categories: ['iot'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: 'Grup arkadaşımla, el hareketiyle açılan, doluluğunu ağırlıkla ölçen ve telefona bildirim gönderen bir akıllı çöp kutusu prototipi yaptık.',
      en: 'With my teammate, I built a smart trash bin prototype that opens with a hand gesture, measures how full it is by weight and sends notifications to a phone.'
    },
    built: {
      tr: 'Ultrasonik sensör eli algılayınca servo motor kapağı açıp kapatıyor; load cell ağırlığı kilograma çeviriyor. Doluluk %60’ta “neredeyse doldu”, %90’da “dolu”, 1 kg’ın altına düşünce “çöp çıkarıldı” bildirimi gönderiyor.',
      en: 'When the ultrasonic sensor detects a hand, a servo opens or closes the lid, and a load cell converts the weight to kilograms. It sends “almost full” at 60%, “full” at 90% and “emptied” when the weight drops below 1 kg.'
    },
    approach: {
      tr: 'ESP8266 ile verileri Wi-Fi üzerinden Blynk’e gönderdik; devreyi Fritzing’de tasarladık, lehimleyip monte ettik ve 757 TL’lik maliyet analizi çıkardık.',
      en: 'We sent the data to Blynk over Wi-Fi with an ESP8266, designed the circuit in Fritzing, soldered and assembled it, and prepared a cost analysis of 757 TL.'
    },
    tags: ['ESP8266', 'HC-SR04', 'HX711 / Load Cell', 'Servo', 'Blynk IoT'],
    thumb: { src: IMG + 'archive/iot-cop.webp', fit: 'contain' },
    gallery: [IMG + 'archive/iot-cop.webp', IMG + 'archive/iot.webp']
  },
  {
    name: { tr: 'SimpleFS — Dosya Sistemi Simülatörü', en: 'SimpleFS — File System Simulator' },
    categories: ['systems', 'cpp'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: 'Grup arkadaşımla, tek bir disk dosyası üzerinde blok blok çalışan basit bir dosya sistemi simülatörü yazdık.',
      en: 'With my teammate, I wrote a simple file system simulator that works block by block on a single disk file.'
    },
    built: {
      tr: '20 seçenekli bir menüyle dosya oluşturma, okuma, yazma, ekleme, kırpma, kopyalama, taşıma, karşılaştırma, birleştirme (defragment), bütünlük kontrolü, yedekleme / geri yükleme ve işlem logları yaptık.',
      en: 'Through a 20-option menu, we implemented create, read, write, append, truncate, copy, move, compare, defragment, integrity check, backup / restore and operation logs.'
    },
    approach: {
      tr: 'C ile yazdık; dosyaların meta verilerini kendi tanımladığımız yapılarda tutup tüm işlemleri disk.sim dosyasında bloklar halinde yaptık.',
      en: 'We wrote it in C, kept file metadata in our own structs and performed every operation in blocks inside disk.sim.'
    },
    tags: ['C', 'System Calls', 'Makefile'],
    thumb: { src: IMG + 'archive/isletim-sis.webp', fit: 'cover', tone: 'dark' }
  },
  {
    name: { tr: 'Ürün Teslim Süresi Simülasyonu', en: 'Product Delivery Time Simulation' },
    categories: ['data'],
    team: { tr: 'Grup projesi', en: 'Team project' },
    description: {
      tr: 'Grup arkadaşımla, gerçek teslimat verilerinin dağılımını istatistiksel testlerle doğrulayıp teslim sürelerini simüle eden bir model kurduk.',
      en: 'With my teammate, I validated the distribution of real delivery data with statistical tests and built a model that simulates delivery times.'
    },
    built: {
      tr: 'Kaggle’daki “Food Delivery Route Efficiency” verisinin teslim sürelerini histogramla inceledik, Normal dağılım hipotezini Ki-Kare testiyle doğruladık (8,476 < 15,51). Ardından LCG ile rastgele sayı ürettik ve bu sayıların düzgün dağıldığını Kolmogorov–Smirnov testiyle kontrol ettik.',
      en: 'We examined delivery times from Kaggle’s “Food Delivery Route Efficiency” data with a histogram and confirmed the Normal distribution hypothesis with a Chi-square test (8.476 < 15.51). Then we generated random numbers with an LCG and checked their uniformity with a Kolmogorov–Smirnov test.'
    },
    approach: {
      tr: 'Tüm analizi ve simülasyonu Excel’de yaptık.',
      en: 'We did all the analysis and simulation in Excel.'
    },
    tags: ['Excel', 'Ki-Kare', 'Kolmogorov–Smirnov', 'LCG', 'Normal Dağılım'],
    thumb: { src: IMG + 'archive/simulasyon.webp', fit: 'contain' }
  },
  {
    name: { tr: 'Kişisel Tanıtım Web Sitesi', en: 'Personal Introduction Website' },
    categories: ['web'],
    description: {
      tr: 'Web Teknolojileri dersi için HTML, CSS, JavaScript ve PHP kullanarak giriş sistemi, API’den veri çeken sayfalar ve mesaj kutusu olan kişisel bir web sitesi yaptım.',
      en: 'For my Web Technologies course, I built a personal website with HTML, CSS, JavaScript and PHP, featuring a login system, pages that pull data from an API and a message box.'
    },
    built: {
      tr: 'PHP ile giriş sayfası (hatalı girişte uyarı veren), hakkımda ve özgeçmiş sayfaları, Ankara’yı tanıttığım Bootstrap slider’lı şehir sayfası, sevdiğim filmleri bir API’den çektiğim ilgi alanları sayfası ve ziyaretçilerin mesaj bırakabildiği, mesajları veritabanına kaydedip ayrı bir sayfada listelediğim iletişim bölümü yaptım.',
      en: 'I made a PHP login page that warns on wrong credentials, about and résumé pages, a city page introducing Ankara with a Bootstrap slider, an interests page that pulls my favorite films from an API, and a contact section where visitors leave messages that I store in a database and list on a separate page.'
    },
    thumb: { src: IMG + 'archive/kisisel-web.webp', fit: 'cover' },
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/kendiwebsitem' }]
  },
  {
    name: { tr: 'Yazılım Metrikleri Analiz Aracı', en: 'Software Metrics Analysis Tool' },
    categories: ['systems'],
    description: {
      tr: 'GitHub depolarını klonlayıp Java dosyalarındaki yorum, kod satırı ve fonksiyon sayılarını hesaplayan bir analiz aracı yazdım.',
      en: 'I wrote a tool that clones GitHub repositories and counts comments, lines of code and functions in Java files.'
    },
    tags: ['Java', 'Git Integration', 'Regex'],
    thumb: { src: IMG + 'archive/github-repo-analizi.webp', fit: 'contain', tone: 'dark' },
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/pdp-odev1-githubjava-analizi' }]
  },
  {
    name: { tr: 'Çarpışma Algılama Motoru', en: 'Collision Detection Engine' },
    categories: ['cpp'],
    description: {
      tr: '2B ve 3B geometrik şekiller arasında 16 farklı kesişim ve çarpışma kontrolü yapan bir motor yazdım.',
      en: 'I wrote an engine that runs 16 different intersection and collision checks between 2D and 3D shapes.'
    },
    tags: ['C#', 'Static Classes', 'Geometric Models'],
    thumb: { src: IMG + 'archive/carpisma.webp', fit: 'cover' },
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/OOP-nesnelerin-carpismasi-proje' }]
  },
  {
    name: { tr: 'DFA Minimizasyon Algoritması', en: 'DFA Minimization Algorithm' },
    categories: ['systems'],
    description: {
      tr: 'Deterministik sonlu otomatlarda ulaşılamayan durumları kaldırıp eşdeğer durumları birleştirerek otomatı küçülten bir program yazdım.',
      en: 'I wrote a program that minimizes deterministic finite automata by removing unreachable states and merging equivalent ones.'
    },
    tags: ['Python', 'Automata', 'Algorithms'],
    links: [{ label: { tr: 'Tanıtım videosu', en: 'Demo video' }, url: 'https://youtu.be/Rg6EO6mxN5o' }],
    thumb: { src: IMG + 'archive/dfa.webp', fit: 'contain', tone: 'dark' }
  },
  {
    name: { tr: 'İkili Arama Ağacı, Öncelik Kuyruğu ve Altıgen Yapı', en: 'BST, Priority Queue & Hexagon Structure' },
    categories: ['cpp'],
    description: {
      tr: 'İkili arama ağaçlarını tutan altıgen kuyrukların dairesel bir listeyle bağlandığı ve tur tur çalışan çok katmanlı bir veri yapısı tasarladım.',
      en: 'I designed a multi-layer data structure where hexagon queues holding binary search trees are linked in a circular list and processed in rounds.'
    },
    built: {
      tr: 'Dosyadan okuduğum sayılarla ağaçları kurdum; her altıgen en fazla altı ağaç tutuyor. Tek turlarda sıradaki ağacı, çift turlarda en yüksek ağacı çıkarıp postorder dolaşımla bir sonraki altıgene aktardım.',
      en: 'I built the trees from numbers read from a file; each hexagon holds up to six trees. In odd rounds I remove the next tree, in even rounds the tallest one, and pass it to the next hexagon with a postorder traversal.'
    },
    approach: {
      tr: 'C++ ile, her veri yapısını ayrı bir sınıf olarak nesne yönelimli yazdım; ağacın yüksekliğini öncelik ölçütü yaptım.',
      en: 'I wrote it in C++ with an object-oriented design, each data structure as its own class, and used tree height as the priority.'
    },
    tags: ['C++', 'Binary Search Tree', 'Priority Queue', 'Circular Linked List'],
    thumb: { src: IMG + 'archive/vy-sayi-altigen.webp', fit: 'cover', tone: 'dark' }
  },
  {
    name: { tr: 'İç İçe Bağlı Liste ile Şekil Yönetimi', en: 'Nested Linked Lists Shape Management System' },
    categories: ['cpp'],
    description: {
      tr: 'Her düğümünde bir şekil listesi taşıyan çift yönlü bir bağlı liste kurdum; şekilleri konsola çizip durumu JSON’a kaydettim.',
      en: 'I built a doubly linked list where each node carries a list of shapes; I drew the shapes in the console and saved the state to JSON.'
    },
    built: {
      tr: 'Üçgen, dikdörtgen ve yıldızı ortak bir taban sınıftan türettim ve derinlik sırasına göre ekledim. W/S tuşlarıyla düğümler arasında gezinme, rastgele veri üretme ve dosyadan yükleme ekledim.',
      en: 'I derived triangle, rectangle and star from a common base class and inserted them in depth order. I added W/S navigation between nodes, random data generation and loading from file.'
    },
    approach: {
      tr: 'C++ ile iç içe bağlı listeler, kalıtım ve dinamik bellek kullandım; JSON okuma / yazmayı ayrı bir sınıfta topladım.',
      en: 'I used nested linked lists, inheritance and dynamic memory in C++, and put JSON read / write in a separate class.'
    },
    tags: ['C++', 'OOP', 'JSON', 'Dynamic Memory'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/bagli-sekil-listeleri-veriyapilari' }],
    thumb: { src: IMG + 'archive/vy-sekil-listesi.webp', fit: 'cover', tone: 'dark' }
  },
  {
    name: { tr: 'Yaşam Simülasyonu', en: 'Life Simulation' },
    categories: ['systems', 'cpp'],
    description: {
      tr: 'Bir matris üzerindeki canlıların besin zinciri kurallarına göre birbirini yediği bir simülasyon yazdım.',
      en: 'I wrote a simulation where creatures on a grid eat each other according to food-chain rules.'
    },
    tags: ['C', 'Structs', 'Function Pointers', 'Polymorphism'],
    thumb: { src: IMG + 'archive/yeme-zinciri.webp', fit: 'cover', tone: 'dark' },
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/programlama-dillerinin-prensipleri-odev2-yemezinciri' }]
  },
  {
    name: { tr: 'AVL Ağaçları ile Alternatif Öncelik Eleme', en: 'AVL Trees & Alternative Priority Elimination' },
    categories: ['cpp'],
    description: {
      tr: 'AVL ağaçlarını dengeleyen, ASCII kodları üreten ve yığınlarla tur tur eleme yapan bir program yazdım.',
      en: 'I wrote a program that balances AVL trees, generates ASCII codes and runs round-based eliminations with stacks.'
    },
    tags: ['C++', 'AVL Trees', 'Raw Pointers', 'Stacks'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/veriyapilari2' }]
  },
  {
    name: { tr: 'Çok Seviyeli Bağlı Liste ve Düğüm Yönetimi', en: 'Multi-Level Linked Lists & Node Management' },
    categories: ['cpp'],
    description: {
      tr: 'Çok seviyeli bağlı listelerle dinamik bellek yönetimi ve yerinde bölme işlemleri yapan bir program yazdım.',
      en: 'I wrote a program that manages dynamic memory with multi-level linked lists and in-place partitioning.'
    },
    tags: ['C++', 'Raw Pointers', 'Linked Lists'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/veriyapilari1' }]
  },
  {
    name: { tr: 'Karmaşık Sayı Hesaplayıcı', en: 'Complex Number Calculator' },
    categories: ['cpp'],
    description: {
      tr: 'Operatör aşırı yükleme kullanarak karmaşık sayılarla dört işlem yapan bir hesaplayıcı yazdım.',
      en: 'I wrote a calculator that does arithmetic on complex numbers using operator overloading.'
    },
    tags: ['C++', 'OOP', 'Operator Overloading'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/pg-karmasiksayi' }]
  },
  {
    name: { tr: 'Restoran Yönetim Sistemi', en: 'Restaurant Management System' },
    categories: ['cpp'],
    description: {
      tr: 'Menü ve stok bilgilerini metin dosyalarında kalıcı olarak saklayan bir restoran yönetim programı yazdım.',
      en: 'I wrote a restaurant management program that stores menu and stock data persistently in text files.'
    },
    tags: ['C++', 'Structs', 'File I/O']
  },
  {
    name: { tr: 'Öğrenci Yönetim Sistemi', en: 'Student Management System' },
    categories: ['cpp'],
    description: {
      tr: 'Rastgele öğrenci verisi üretip konsolda istatistiklerini gösteren bir öğrenci yönetim programı yazdım.',
      en: 'I wrote a student management program that generates random student data and shows statistics in the console.'
    },
    tags: ['C++', 'Structs', 'iomanip'],
    links: [{ label: { tr: 'GitHub', en: 'GitHub' }, url: 'https://github.com/ayseverda/pg-sinifodevi' }]
  }
];

/* ---------- Deneyim ---------- */
// type: 'work' (iş / staj) | 'training' (eğitim programı) | 'program' (kuluçka / girişimcilik); ikonu belirler.

const EXPERIENCE = [
  {
    company: 'TürkTraktör',
    logo: { src: IMG + 'logos/turktraktor.webp', alt: 'TürkTraktör' },
    role: { tr: 'BT – İş Geliştirme (Aday Mühendis)', en: 'IT – Business Development (Candidate Engineer)' },
    meta: { tr: 'Şub 2026 – May 2026 · Ankara', en: 'Feb 2026 – May 2026 · Ankara' },
    points: {
      tr: ['SAP ABAP ile nesne yönelimli ALV raporları geliştirdim ve geliştirme–kalite ortamı geçişinde görev aldım', 'Microsoft Copilot Studio ile otomasyon çözümleri geliştirdim', 'SAP yetki ve doğruluk analizi çalışmalarına katkı sağladım'],
      en: ['Developed object-oriented ALV reports with SAP ABAP and took part in the development-to-quality system transport', 'Built automation solutions with Microsoft Copilot Studio', 'Contributed to SAP authorization and accuracy analysis']
    }
  },
  {
    company: 'GO Path Ön Kuluçka Programı — Bilişim Vadisi',
    type: 'program',
    logo: { src: IMG + 'logos/bilisimvadisi.webp', alt: 'Bilişim Vadisi' },
    role: { tr: 'Girişimci (DermaAI ekibi)', en: 'Founder-in-training (DermaAI team)' },
    meta: { tr: 'Eki 2025 – Şub 2026 · Gebze, Kocaeli', en: 'Oct 2025 – Feb 2026 · Gebze, Kocaeli' },
    points: {
      tr: ['DermaAI projemizle programa kabul edildik; girişimcilik, ürün geliştirme ve iş modeli üzerine eğitim, atölye ve mentorluk süreçlerine katıldım', 'Projede frontend geliştirmeyi ve yapay zeka servislerinin uygulamaya entegrasyonunu sürdürdüm', 'Teknik gelişimin yanında ürünleşme, iş modeli ve girişim stratejisi üzerinde çalıştım'],
      en: ['Our DermaAI project was accepted into the program, where I took part in training, workshops and mentoring on entrepreneurship, product development and business models', 'I continued developing the frontend and integrating the AI services into the app', 'Alongside the technical work, I worked on productization, the business model and startup strategy']
    }
  },
  {
    company: 'Argede Bilişim Teknolojileri',
    logo: { src: IMG + 'logos/argede.webp', alt: 'Argede' },
    role: { tr: 'Mobil Uygulama Geliştirici (Stajyer)', en: 'Mobile Application Developer (Intern)' },
    meta: { tr: 'Temmuz 2025 · Sakarya', en: 'July 2025 · Sakarya' },
    points: {
      tr: ['Masraf Yönetimi ve Araç Bilgi Sistemi projelerinde mobil uygulama–backend servis entegrasyonları üzerinde çalıştım', 'Mevcut bir e-ticaret web platformunun mobil yapıya dönüştürülmesine ve yayına hazırlık süreçlerine katkı sağladım'],
      en: ['Worked on mobile app–backend service integrations in the Expense Management and Vehicle Information System projects', 'Contributed to converting an existing e-commerce web platform into a mobile app and preparing it for release']
    }
  },
  {
    company: 'Google Yapay Zeka ve Teknoloji Akademisi',
    type: 'training',
    logo: { src: IMG + 'logos/google-yzta.webp', alt: 'Google Yapay Zeka ve Teknoloji Akademisi' },
    role: { tr: 'Katılımcı', en: 'Trainee' },
    meta: { tr: 'Ara 2024 – Ağu 2025 · Uzaktan', en: 'Dec 2024 – Aug 2025 · Remote' },
    points: {
      tr: ['DermaAI projesinde Gemini entegrasyonu ve frontend geliştirmeyi üstlendim; proje bootcamp finalisti oldu', 'Gerçek veri setleriyle yapay zeka, web uygulaması geliştirme ve harici servis entegrasyonu alanlarında uygulamalı deneyim kazandım'],
      en: ['Took on the Gemini integration and frontend development of DermaAI, which became a bootcamp finalist', 'Gained hands-on experience in AI, web application development and external service integrations with real datasets']
    }
  },
  {
    company: 'TürkTraktör',
    logo: { src: IMG + 'logos/turktraktor.webp', alt: 'TürkTraktör' },
    role: { tr: 'Yazılım Geliştirici (Stajyer)', en: 'Software Developer (Intern)' },
    meta: { tr: 'Temmuz 2024 · Ankara', en: 'July 2024 · Ankara' },
    points: {
      tr: ['Kurumsal bir proje için gereksinim analizi yürüttüm', 'Projenin teknik dokümantasyonunu hazırladım'],
      en: ['Carried out requirements analysis for an enterprise project', 'Prepared the project’s technical documentation']
    }
  }
];

/* ---------- Sertifikalar ve başarılar ---------- */

const CERTIFICATES = [
  { color: 'blue', year: '2025', name: { tr: 'Google Proje Yönetimi Profesyonel Sertifikası', en: 'Google Project Management Professional Certificate' }, issuer: 'Google' },
  { color: 'amber', year: '2025', name: { tr: 'Bootcamp Finalisti (DermaAI)', en: 'Bootcamp Finalist (DermaAI)' }, issuer: 'YZTA' },
  { color: 'rose', year: '2025', name: { tr: 'Web Uygulamaları Geliştirme Eğitimi', en: 'Web Application Development Training' }, issuer: 'YZTA' },
  { color: 'green', year: '2024', name: { tr: 'Kotlin Programlama Dili', en: 'Kotlin Programming Language' }, issuer: 'BTK Akademi' },
  { color: 'blue', year: '2025', name: { tr: 'BTK Akademi Hackathon — Katılımcı', en: 'BTK Akademi Hackathon — Participant' } },
  { color: 'rose', year: '2025', name: { tr: 'Pupilica Hackathon — Katılımcı', en: 'Pupilica Hackathon — Participant' } },
  { color: 'amber', year: '2025', name: { tr: 'YZTA Hackathon — Katılımcı', en: 'YZTA Hackathon — Participant' } },
  { color: 'violet', year: '2025', name: { tr: 'YZTA 4.0 Ideathon — Katılımcı', en: 'YZTA 4.0 Ideathon — Participant' } }
];

/* ---------- Yetenekler ---------- */
// icon: devicon adı ('python' → .../python/python-original.svg), { simple: 'claude' } (simpleicons.org)
// veya { local: 'easyocr' } (project-assets/web/icons/ içindeki kendi SVG'miz).
// İkonu olmayanlarda baş harflerden bir rozet gösterilir.

const SKILL_GROUPS = [
  {
    title: { tr: 'Diller', en: 'Languages' }, color: 'blue',
    items: [['Python', 'python'], ['C++', 'cplusplus'], ['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['C#', 'csharp']]
  },
  {
    title: { tr: 'Yapay Zeka / Görü', en: 'AI / Computer Vision' }, color: 'lavender',
    items: [['TensorFlow', 'tensorflow'], ['OpenCV', 'opencv'], ['EasyOCR', { local: 'easyocr' }]]
  },
  {
    title: { tr: 'Backend', en: 'Backend' }, color: 'aqua',
    items: [['FastAPI', 'fastapi'], ['Flask', 'flask'], ['ASP.NET Core', 'dotnetcore'], ['Spring Boot', 'spring'], ['REST API', { local: 'rest-api' }]]
  },
  {
    title: { tr: 'Ön Yüz & Mobil', en: 'Frontend & Mobile' }, color: 'ice',
    items: [['React', 'react'], ['React Native', 'react'], ['Flutter', 'flutter']]
  },
  {
    title: { tr: 'Veritabanları', en: 'Databases' }, color: 'periwinkle',
    items: [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['SQLite', 'sqlite'], ['MongoDB', 'mongodb'], ['Firebase', 'firebase']]
  },
  {
    title: { tr: 'Araçlar', en: 'Tools' }, color: 'pink',
    items: [['Git', 'git'], ['GitHub', 'github'], ['Docker', 'docker'], ['Postman', 'postman']]
  }
];
