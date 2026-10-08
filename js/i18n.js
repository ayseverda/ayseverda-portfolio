// Sayfadaki sabit metinlerin İngilizce karşılıkları.
// Türkçe metinler index.html'de durur; buradaki her anahtar oradaki
// data-i18n / data-i18n-attr değeriyle eşleşir. Değerler HTML içerebilir.
const PAGE_EN = {
  'meta.title': 'Ayşe Verda Gülcemal — Computer Engineer | AI &amp; Software Developer',
  'meta.description': 'Portfolio of Ayşe Verda Gülcemal, a Computer Engineer building AI, computer vision, backend, mobile and software projects.',

  'header.homeLabel': 'Ayşe Verda Gülcemal, home',
  'header.menu': 'Open navigation',
  'header.nav': 'Main navigation',
  'nav.home': 'Home',
  'nav.projects': 'Projects',
  'nav.experience': 'Experience',
  'nav.skills': 'Skills',
  'nav.contact': 'Contact',
  'nav.languageToggle': 'TR',
  'nav.languageToggleLabel': 'Dili Türkçeye çevir',
  'nav.cv': 'Download CV',

  'hero.hello': 'Hi, I’m',
  'hero.tagline': 'Most of my projects started with one question: “can I build this?”',
  'hero.desc': 'I’m a computer engineer building AI, backend and software projects.',
  'hero.cta': 'View Projects',
  'hero.status': 'Open to opportunities',
  'hero.location': 'Ankara, Türkiye',
  'hero.artAlt': 'Ayşe working at a cozy desk with her cat, plants and laptop',

  'projects.title': 'Some things',
  'projects.titleAccent': 'I’ve built',
  'projects.filterLabel': 'Filter projects',

  'cozy.title': 'Cozy Café Game',
  'cozy.text': 'A cozy pixel-art café game built from scratch with C++ and Raylib — every sprite drawn by me.',
  'cozy.tryHere': 'Play here',
  'cozy.demo': 'Full demo',
  'cozy.code': 'View code',
  'cozy.consoleAlt': 'Cozy Cafe game on a pink pixel-art console screen',
  'cozy.esp32': 'ESP32 <small>coming soon</small>',
  'cozy.watch': 'Watch video',
  'cozy.details': 'Details',

  'game.score': 'happy customers',
  'game.sound': 'Sound',
  'game.hint': 'Harvest in the garden, cook in the kitchen, serve customers in the café',
  'game.scenesLabel': 'Scenes',
  'game.inventoryLabel': 'Inventory',
  'game.start': 'Play',
  'game.canvasLabel': 'Cozy Café mini game',

  'experience.title': 'Experience',

  'skills.title': 'Tools I work with',

  'education.eyebrow': 'EDUCATION',
  'education.school': 'Sakarya University',
  'education.degree': 'B.Sc. in Computer Engineering',
  'education.meta': 'Oct 2022 – June 2026 · GPA 2.92 / 4.00',
  'education.thesisTitle': 'Graduation project',
  'education.thesis': 'The <strong>Facial Paralysis Monitoring and Rehabilitation System</strong>, supported under TÜBİTAK 2209-A. I built a mobile app on a React Native and FastAPI architecture that measures facial asymmetry against the user’s own neutral face with MediaPipe Face Mesh; the work is being prepared as a journal paper.',
  'education.communityTitle': 'Community &amp; volunteering',
  'education.community': '<li>Spent 2.5 years on the management team of the SAÜ Artificial Intelligence Community, contributing to the community’s social media. In 2024, our community won second place in the “Most Active Student Community on Social Media” category.</li><li>Ran the club’s social media for a year as part of the Fikir ile Gelecek Club’s social media team.</li>',
  'education.languageTitle': 'Languages:',
  'education.language': 'English (B1+)',
  'certificates.eyebrow': 'ACHIEVEMENTS &amp; CERTIFICATES',

  'archive.title': 'More',
  'archive.titleAccent': 'things I’ve built',
  'archive.lead': 'Small experiments, class projects and systems explored along the way.',
  'archive.searchPlaceholder': 'Search projects or technologies…',
  'archive.searchLabel': 'Search projects or technologies',
  'archive.filterLabel': 'Filter the archive',
  'archive.empty': 'No projects match your search. Try another term.',
  'archive.github': 'All my repositories on GitHub',

  'now.title': 'Currently building Cozy Cafe',
  'now.lookingLabel': 'ROLES I’M OPEN TO',
  'now.roles': '<li>Junior Software Engineer</li><li>AI Engineer</li><li>Backend Engineer</li><li>AI Product Engineer</li><li>Computer Vision Engineer</li>',
  'now.play': 'Try the mini game',

  'contact.title': 'Got something that makes you wonder “can this be done?”',
  'contact.cta': 'Let’s look at it together.',

  'footer.note': 'Made with curiosity in Ankara.',
  'footer.top': 'Back to top ↑',

  'modal.close': 'Close project details',
  'modal.closeVideo': 'Close video'
};

// JavaScript'in oluşturduğu kartlar, filtreler, oyun ve proje penceresi için iki dilli metinler.
const UI_TEXT = {
  tr: {
    viewProject: 'Projeyi İncele',
    watchVideo: 'Videoyu izle',
    viewCertificate: 'sertifikayı görüntüle',
    openDetails: 'ayrıntılarını aç',
    notebook: 'PROJE DEFTERİ',
    problem: 'PROBLEM',
    built: 'NE GELİŞTİRDİM',
    approach: 'TEKNİK YAKLAŞIM',
    challenge: 'KARŞILAŞTIĞIM ZORLUK',
    result: 'SONUÇ',
    technologies: 'KULLANDIĞIM TEKNOLOJİLER',
    galleryAlt: 'proje görseli',
    showMore: count => `Tümünü göster (${count})`,
    showLess: 'Daha az göster',
    // Arşiv projelerinde ayrıntılı metin yoksa kullanılan varsayılanlar
    fallbackProblem: 'Problemi ve olası çözümlerini uygulamalı olarak keşfettiğim bir proje.',
    fallbackApproach: tags => `${tags.join(', ')} ile geliştirildi.`,
    fallbackResult: 'Aşağıdaki teknolojileri ve kavramları pratikte keşfetmek için geliştirilmiş bir proje.',
    categories: {
      all: 'Tümü', ai: 'Yapay zeka', vision: 'Bilgisayarlı görü', backend: 'Backend', web: 'Web',
      mobile: 'Mobil', systems: 'Sistemler', cpp: 'C / C++', data: 'Veri', iot: 'IoT', game: 'Oyun geliştirme'
    },
    game: {
      thanks: ['Teşekkürler!', 'Tam istediğim gibi!', 'Çok güzel görünüyor!', 'Afiyet olsun bana!'],
      wrong: 'Hmm, bunu istememiştim…',
      empty: 'Vitrinde kalmadı, önce mutfakta hazırla!',
      growing: 'Henüz olgunlaşmadı…',
      needIngredients: 'Malzeme yetmiyor, bahçeye uğra!',
      scenes: { cafe: 'Kafe', garden: 'Bahçe', kitchen: 'Mutfak' },
      items: { carrot: 'havuç', strawberry: 'çilek', cucumber: 'salatalık', wheat: 'buğday', apple: 'elma' },
      foods: { cake: 'havuçlu kek', granola: 'granola', pie: 'turta', sandwich: 'salatalıklı sandviç' },
    }
  },
  en: {
    viewProject: 'View Project',
    watchVideo: 'Watch video',
    viewCertificate: 'view certificate',
    openDetails: 'open details',
    notebook: 'PROJECT NOTEBOOK',
    problem: 'THE PROBLEM',
    built: 'WHAT I BUILT',
    approach: 'TECHNICAL APPROACH',
    challenge: 'INTERESTING CHALLENGE',
    result: 'RESULT',
    technologies: 'TECHNOLOGIES I USED',
    galleryAlt: 'project image',
    showMore: count => `Show all (${count})`,
    showLess: 'Show less',
    fallbackProblem: 'A hands-on project exploring the problem and its possible solutions.',
    fallbackApproach: tags => `Built with ${tags.join(', ')}.`,
    fallbackResult: 'Project built as a practical exploration of the technologies and concepts listed below.',
    categories: {
      all: 'All', ai: 'AI', vision: 'Computer Vision', backend: 'Backend', web: 'Web',
      mobile: 'Mobile', systems: 'Systems', cpp: 'C / C++', data: 'Data', iot: 'IoT', game: 'Game Development'
    },
    game: {
      thanks: ['Thank you!', 'Just what I wanted!', 'That looks lovely!', 'Yum!'],
      wrong: 'Hmm, that’s not what I ordered…',
      empty: 'Sold out — cook some in the kitchen first!',
      growing: 'Not ripe yet…',
      needIngredients: 'Not enough ingredients — visit the garden!',
      scenes: { cafe: 'Café', garden: 'Garden', kitchen: 'Kitchen' },
      items: { carrot: 'carrot', strawberry: 'strawberry', cucumber: 'cucumber', wheat: 'wheat', apple: 'apple' },
      foods: { cake: 'carrot cake', granola: 'granola', pie: 'pie', sandwich: 'cucumber sandwich' },
    }
  }
};
