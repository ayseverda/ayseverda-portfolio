// Sayfa davranışı: dil değiştirme, projeler, arşiv, deneyim, yetenekler, proje penceresi ve menü.
// Veriler data.js'de, İngilizce sayfa metinleri ve arayüz metinleri i18n.js'de. Mini oyun game.js'de.

const LANG_STORAGE_KEY = 'portfolio-lang';
const ARCHIVE_PREVIEW_COUNT = 8;
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';

const state = {
  lang: 'tr',
  projectFilter: 'all',
  archiveFilter: 'all',
  archiveExpanded: false,
  openProject: null // açık proje penceresi (dil değişince yeniden çizmek için)
};

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

// { tr, en } çiftinden aktif dildeki değeri döndürür.
const pick = value => (value && typeof value === 'object' && !Array.isArray(value) && 'tr' in value ? value[state.lang] : value);
const ui = () => UI_TEXT[state.lang];
const icon = (name, extraClass = '') => `<svg class="icon ${extraClass}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
// Etiket düz metin ya da { tr, en, soon } olabilir; soon: henüz geliştirilmekte olan teknoloji
const tagsHtml = (tags, className = '') => `<div class="tags ${className}">${tags.map(tag => `<span${tag.soon ? ' class="tag-soon"' : ''}>${pick(tag)}</span>`).join('')}</div>`;
const initials = name => name.replace(/[^A-Za-z0-9#+ ]/g, '').split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();

/* ---------- Sabit sayfa metinleri ---------- */

// Türkçe metinler HTML'den bir kez okunur, böylece tekrar Türkçeye dönülebilir.
const PAGE_TR = {};

function attrBindings(element) {
  return element.dataset.i18nAttr.split(',').map(pair => pair.split(':').map(part => part.trim()));
}

function collectTurkishText() {
  $$('[data-i18n]').forEach(element => { PAGE_TR[element.dataset.i18n] = element.innerHTML; });
  $$('[data-i18n-attr]').forEach(element => {
    attrBindings(element).forEach(([attr, key]) => { PAGE_TR[key] = element.getAttribute(attr); });
  });
}

function translatePage() {
  const dictionary = state.lang === 'tr' ? PAGE_TR : PAGE_EN;
  const lookup = key => {
    if (key in dictionary) return dictionary[key];
    console.warn(`Eksik çeviri: "${key}" (${state.lang})`);
    return PAGE_TR[key];
  };
  $$('[data-i18n]').forEach(element => { element.innerHTML = lookup(element.dataset.i18n); });
  $$('[data-i18n-attr]').forEach(element => {
    attrBindings(element).forEach(([attr, key]) => element.setAttribute(attr, lookup(key)));
  });
}

/* ---------- Öne çıkan projeler ---------- */

function chipsHtml(keys, active) {
  return keys.map(key =>
    `<button type="button" class="chip${key === active ? ' active' : ''}" data-filter="${key}" aria-pressed="${key === active}">${ui().categories[key]}</button>`
  ).join('');
}

// Laptop mockup'ı; projenin videosu varsa ekranın üstünde bir oynat butonu durur.
// Video yalnızca butona basılınca yüklenir (YouTube oynatıcısı ağır olduğu için).
function featuredVisualHtml(visual, video) {
  if (visual.layout === 'laptop') {
    const image = visual.images[0];
    const play = video ? playButtonHtml(video) : '';
    return `<div class="laptop-wrap"><img class="laptop" src="${image.src}" alt="${pick(image.alt)}" loading="lazy">${play}</div>`;
  }
  // 'phones': iki iPhone mockup'ı yan yana; video varsa ortada oynat butonu (dikey video telefonda oynar)
  const phones = visual.images.map(image => `<img class="phone" src="${image.src}" alt="${pick(image.alt)}" loading="lazy">`).join('');
  return phones + (video ? playButtonHtml(video) : '');
}

// Oynat butonunun yerine laptop ekranında YouTube oynatıcısını açar.
const playButtonHtml = video => `
  <button type="button" class="video-play" data-video="${video}" aria-label="${ui().watchVideo}">
    ${icon('play')}
  </button>`;

const youtubeIframe = id => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="${ui().watchVideo}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;

/* ---------- Video sahnesi ----------
   "Videoyu izle"ye basınca karttaki cihaz (laptop ya da telefon) yerinden kalkar, büyüyerek
   ekranın ortasına gelir, arka plan kararır ve video cihazın ekranında oynar.
   Kapatınca aynı yoldan kartındaki yerine geri döner. */

// laptop.png'de ekranın konumu (yüzde olarak; tools/optimize_images.py ile ölçüldü)
const LAPTOP_SCREEN = { left: 11.97, top: 5.95, width: 76.14, height: 81.16 };
const LAPTOP_RATIO = 1203 / 706;
// iphone.png içindeki ekran alanı (tools/optimize_images.py ile ölçüldü)
const PHONE_SCREEN = { left: 5.43, top: 2.48, width: 88.73, height: 95.45 };
const PHONE_RATIO = 497 / 966;
// konsol-cozy.png içindeki ekran alanı (tools/draw_console.py: 96×72 piksel, ×8)
const CONSOLE_SCREEN = { left: 11.29, top: 12, width: 77.42, height: 48 };
const CONSOLE_RATIO = 992 / 1200;
const ZOOM_EASING = 'cubic-bezier(.2, .8, .2, 1)';
const videoState = { source: null, open: false };

// Cihazın sahnedeki son boyutu: ekrana sığan en büyük hal
function stageSize(kind) {
  const maxW = Math.min(window.innerWidth * 0.92, 1180);
  const maxH = window.innerHeight * 0.84;
  if (kind === 'laptop' || kind === 'console' || kind === 'phone') {
    const ratio = { laptop: LAPTOP_RATIO, console: CONSOLE_RATIO, phone: PHONE_RATIO }[kind];
    const width = Math.min(maxW, maxH * ratio);
    return { width, height: width / ratio };
  }
  const height = Math.min(maxH, 800, (maxW / 1.04) * 16 / 9);
  return { width: height * 9 / 16 * 1.04, height };
}

// Kaynak eleman görünmüyorsa (ör. filtrelenmiş kart) cihaz ekranın ortasından küçükten büyür
function visibleRect(element) {
  const rect = element.getBoundingClientRect();
  if (rect.width && rect.height) return rect;
  const size = 80;
  return { left: (window.innerWidth - size) / 2, top: (window.innerHeight - size) / 2, width: size, height: size };
}

// Kaynak elemandan sahnedeki cihaza kaydırma + tek tip ölçek (oran bozulmaz, cihaz esnemez)
function flipTransform(from, to) {
  const dx = (from.left + from.width / 2) - (to.left + to.width / 2);
  const dy = (from.top + from.height / 2) - (to.top + to.height / 2);
  const scale = Math.min(from.width / to.width, from.height / to.height);
  return `translate(${dx}px, ${dy}px) scale(${scale})`;
}

// Konsolu oyun modunda açar: oyun (js/game.js) konsolun ekranına taşınır.
function openGame() {
  window.CozyGame?.reset();
  playVideo($('#cozy .video-play'), 'game');
}

function playVideo(button, mode = 'video') {
  if (videoState.open) return;
  videoState.mode = mode;
  // Cihaz türü: Cozy Cafe'de konsol, laptop'lı kartlarda laptop, diğerlerinde telefon
  const visual = button.closest('.project-card-visual');
  const kind = button.dataset.device || (visual.classList.contains('layout-laptop') ? 'laptop' : 'phone');
  const source = kind === 'console' ? button.closest('.cozy-console').querySelector('.console-mockup')
    : kind === 'laptop' ? visual.querySelector('.laptop-wrap')
    : visual.querySelector('.phone:last-of-type');
  const stage = $('#video-stage');
  const device = $('#video-device');
  const { width, height } = stageSize(kind);
  const screenStyle = area => `left:${area.left}%;top:${area.top}%;width:${area.width}%;height:${area.height}%`;

  device.className = `video-device is-${kind}`;
  device.style.width = `${width}px`;
  device.style.height = `${height}px`;
  if (kind === 'laptop') {
    device.innerHTML = `<img src="${visual.querySelector('.laptop').src}" alt=""><div class="video-screen" style="${screenStyle(LAPTOP_SCREEN)}"></div>`;
  } else if (kind === 'console') {
    // Ekran çerçevenin altında durur; çerçevenin piksel köşeleri videonun üstüne biner
    device.innerHTML = `<div class="video-screen" style="${screenStyle(CONSOLE_SCREEN)}"><img src="${IMG}projects/cozzy-bahce.webp" alt=""></div><img class="console-frame" src="${IMG}konsol.webp" alt="">`;
  } else {
    // Karttaki iPhone mockup'ı büyür, video telefonun ekranında oynar
    device.innerHTML = `<img src="${source.src}" alt=""><div class="video-screen" style="${screenStyle(PHONE_SCREEN)}"></div>`;
  }

  stage.hidden = false;
  document.body.classList.add('video-open');
  const from = visibleRect(source);
  const to = device.getBoundingClientRect();
  source.style.visibility = 'hidden';
  button.style.visibility = 'hidden';
  videoState.source = source;
  videoState.button = button;
  videoState.open = true;

  stage.querySelector('.video-backdrop').animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: 'ease', fill: 'both' });
  stage.querySelector('.video-close').animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'none' }], { duration: 300, delay: 450, easing: ZOOM_EASING, fill: 'both' });
  const zoom = device.animate([{ transform: flipTransform(from, to) }, { transform: 'none' }], { duration: 650, easing: ZOOM_EASING, fill: 'both' });
  zoom.onfinish = () => {
    // Cihaz yerine oturunca ekranda video ya da oyun başlar
    const screen = device.querySelector('.video-screen');
    if (mode === 'game') {
      screen.replaceChildren($('#game-screen'));
    } else {
      screen.insertAdjacentHTML('beforeend', youtubeIframe(button.dataset.video));
    }
    screen.classList.add('is-playing');
  };
}

function closeVideo() {
  if (!videoState.open) return;
  videoState.open = false;
  const stage = $('#video-stage');
  const device = $('#video-device');
  const source = videoState.source;
  device.querySelector('iframe')?.remove();
  device.querySelector('.video-screen').classList.remove('is-playing');

  const from = visibleRect(source);
  const to = device.getBoundingClientRect();
  stage.querySelector('.video-close').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 150, fill: 'both' });
  stage.querySelector('.video-backdrop').animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 100, easing: 'ease', fill: 'both' });
  const zoom = device.animate([{ transform: 'none' }, { transform: flipTransform(from, to) }], { duration: 550, easing: ZOOM_EASING, fill: 'both' });
  zoom.onfinish = () => {
    source.style.visibility = '';
    videoState.button.style.visibility = '';
    // Oyun ekranı gizli yerine geri döner (durumu korunur)
    const gameScreen = device.querySelector('#game-screen');
    if (gameScreen) { window.CozyGame?.stop(); $('#game-holder').append(gameScreen); }
    stage.hidden = true;
    device.innerHTML = '';
    document.body.classList.remove('video-open');
    stage.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
  };
}

function renderFeatured() {
  $('#project-filters').innerHTML = chipsHtml(PROJECT_FILTERS, state.projectFilter);
  $('#featured').innerHTML = FEATURED_PROJECTS.map(project => `
    <article class="project-card theme-${project.theme}" data-project="${project.id}" data-filters="${project.filters.join(' ')}">
      <div class="project-card-body">
        ${project.badge ? `<span class="badge">${pick(project.badge)}</span>` : ''}
        <h3>${pick(project.name)}</h3>
        <p>${pick(project.description)}</p>
        <button type="button" class="btn btn-light btn-sm" aria-label="${pick(project.name)} ${ui().openDetails}">${ui().viewProject}${icon('arrow')}</button>
        <div class="card-tech"><span>${ui().technologies}</span>${tagsHtml(project.tags)}</div>
      </div>
      <div class="project-card-visual layout-${project.visual.layout}">${featuredVisualHtml(project.visual, project.video)}</div>
    </article>`).join('');
  applyProjectFilter();
}

// Filtre; öne çıkan kartları, Cozy afişini ve mini oyunu birlikte gizler/gösterir.
function applyProjectFilter() {
  $$('#projects [data-filters]').forEach(element => {
    const matches = state.projectFilter === 'all' || element.dataset.filters.split(' ').includes(state.projectFilter);
    element.hidden = !matches;
  });
}

/* ---------- Diğer çalışmalar (arşiv) ---------- */

const categoryText = project => project.categories.map(key => ui().categories[key]).join(' · ');

function archiveThumbHtml(project) {
  if (project.thumb) {
    const { src, fit = 'cover', tone = 'light' } = project.thumb;
    return `<div class="thumb fit-${fit} tone-${tone}"><img src="${src}" alt="" loading="lazy"></div>`;
  }
  // Görseli olmayan projeler için ana kategorisine göre renklenen bir kapak
  return `<div class="thumb thumb-placeholder cat-${project.categories[0]}"><span>${project.tags[0]}</span></div>`;
}

function matchesSearch(project, query) {
  if (!query) return true;
  const haystack = [pick(project.name), pick(project.description), categoryText(project), ...project.tags].join(' ');
  return haystack.toLocaleLowerCase(state.lang).includes(query);
}

function renderArchive() {
  const query = $('#project-search').value.trim().toLocaleLowerCase(state.lang);
  const matching = ARCHIVE_PROJECTS
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => state.archiveFilter === 'all' || project.categories.includes(state.archiveFilter))
    .filter(({ project }) => matchesSearch(project, query));

  // Filtre ya da arama yoksa liste kısaltılır; "Tümünü göster" ile açılır.
  const isBrowsing = state.archiveFilter === 'all' && !query;
  const visible = isBrowsing && !state.archiveExpanded ? matching.slice(0, ARCHIVE_PREVIEW_COUNT) : matching;

  $('#archive').innerHTML = visible.map(({ project, index }) => `
    <article class="archive-card" tabindex="0" role="button" data-archive="${index}" aria-label="${pick(project.name)} ${ui().openDetails}">
      ${archiveThumbHtml(project)}
      <div class="archive-body">
        <p class="archive-cats">${categoryText(project)}</p>
        <h3>${pick(project.name)}</h3>
        <p>${pick(project.description)}</p>
        <div class="card-tech"><span>${ui().technologies}</span>${tagsHtml(project.tags.slice(0, 4), 'tags-sm')}</div>
        ${project.team ? `<div class="card-foot"><span class="team-badge">${pick(project.team)}</span></div>` : ''}
      </div>
    </article>`).join('');

  $('.empty-state').hidden = matching.length > 0;
  const moreButton = $('#archive-more');
  moreButton.hidden = !isBrowsing || matching.length <= ARCHIVE_PREVIEW_COUNT;
  moreButton.textContent = state.archiveExpanded ? ui().showLess : ui().showMore(matching.length);
}

/* ---------- Deneyim, sertifikalar, yetenekler ---------- */

const XP_ICONS = { work: 'briefcase', training: 'cap', program: 'rocket' };

function renderExperience() {
  $('#experience-list').innerHTML = EXPERIENCE.map(job => `
    <article class="xp-item">
      <div class="xp-icon xp-${job.type || 'work'}">${icon(XP_ICONS[job.type] || 'briefcase')}</div>
      <div class="xp-main">
        <h3>${job.company}</h3>
        <p class="xp-role">${pick(job.role)}</p>
        <p class="xp-meta">${pick(job.meta)}</p>
      </div>
      <ul class="xp-points">${pick(job.points).map(point => `<li>${point}</li>`).join('')}</ul>
      <div class="xp-logo">${job.logo ? `<img src="${job.logo.src}" alt="${job.logo.alt}" loading="lazy">` : ''}</div>
    </article>`).join('');
}

// Sertifika görseli: küçük önizleme; üstüne gelince büyür, tıklayınca tam boyutu yeni sekmede açılır
function certThumbHtml(cert) {
  if (!cert.image) return '<span></span>';
  const name = pick(cert.name);
  return `<a class="cert-thumb" href="${cert.image}" target="_blank" rel="noopener" aria-label="${name} — ${ui().viewCertificate}">
      <img src="${cert.image}" alt="" loading="lazy">
      <span class="cert-preview" aria-hidden="true"><img src="${cert.image}" alt="" loading="lazy"></span>
    </a>`;
}

function renderCertificates() {
  $('#certificates').innerHTML = CERTIFICATES.map(cert => `
    <li>
      <span class="cert-icon c-${cert.color}">${icon('award')}</span>
      <span class="cert-name">${pick(cert.name)}${cert.issuer ? `<small>${cert.issuer}</small>` : ''}</span>
      <span class="cert-year">${cert.year}</span>
      ${certThumbHtml(cert)}
    </li>`).join('');
}

function skillIconHtml(name, iconRef) {
  if (!iconRef) return `<span class="skill-initials">${initials(name)}</span>`;
  const src = typeof iconRef === 'string' ? `${DEVICON}${iconRef}/${iconRef}-original.svg`
    : iconRef.local ? `${IMG}icons/${iconRef.local}.svg`
    : `https://cdn.simpleicons.org/${iconRef.simple}`;
  return `<img class="skill-icon" src="${src}" alt="" loading="lazy" data-initials="${initials(name)}">`;
}

function renderSkills() {
  $('#skills-grid').innerHTML = SKILL_GROUPS.map(group => `
    <div class="skill-group tone-${group.color}">
      <h3>${pick(group.title)}</h3>
      <ul class="skill-list">
        ${group.items.map(([name, iconRef]) => `<li>${skillIconHtml(name, iconRef)}<span>${name}</span></li>`).join('')}
      </ul>
    </div>`).join('');
}

// Logo yüklenemezse (ör. çevrimdışı) baş harf rozeti gösterilir.
document.addEventListener('error', event => {
  const image = event.target;
  if (image.classList && image.classList.contains('skill-icon')) {
    image.outerHTML = `<span class="skill-initials">${image.dataset.initials}</span>`;
  }
}, true);

/* ---------- Proje penceresi ---------- */

function modalSection(title, text) {
  return text ? `<div class="modal-section"><h3>${title}</h3><p>${text}</p></div>` : '';
}

function galleryImages(project) {
  if (project.id) return (project.gallery || []).map(name => `${IMG}projects/${name}.webp`);
  return project.gallery || (project.thumb ? [project.thumb.src] : []);
}

// Bağlantının türüne göre ikon: GitHub, video ya da yok.
function linkIcon(url) {
  if (url.includes('github.com')) return icon('github');
  if (url.includes('youtu')) return icon('play');
  return '';
}

function renderModal(project) {
  const text = ui();
  const category = project.id ? pick(project.category) : categoryText(project);
  const links = project.links
    ? `<div class="modal-links">${project.links.map(link => `<a class="btn btn-primary btn-sm" href="${link.url}" target="_blank" rel="noreferrer">${linkIcon(link.url)}${pick(link.label)}${icon('arrow')}</a>`).join('')}</div>`
    : '';
  const images = galleryImages(project);
  const gallery = images.length
    ? `<div class="modal-gallery">${images.map(src => `<figure><img src="${src}" alt="${pick(project.name)} ${text.galleryAlt}" loading="lazy"></figure>`).join('')}</div>`
    : '';

  $('#modal-content').innerHTML = `
    <div class="modal-body">
      <p class="eyebrow">${category}</p>
      <h2>${pick(project.name)}</h2>
      ${project.team ? `<span class="team-badge">${pick(project.team)}</span>` : ''}
      <p class="modal-desc">${pick(project.description)}</p>
      ${gallery}
      ${modalSection(text.problem, pick(project.problem) || text.fallbackProblem)}
      ${modalSection(text.built, pick(project.built) || pick(project.description))}
      ${modalSection(text.approach, pick(project.approach) || text.fallbackApproach(project.tags))}
      ${modalSection(text.challenge, pick(project.challenge))}
      ${modalSection(text.result, pick(project.result) || text.fallbackResult)}
      <div class="modal-section"><h3>${text.technologies}</h3>${tagsHtml(project.tags)}</div>
      ${links}
    </div>`;
}

function openModal(project) {
  state.openProject = project;
  renderModal(project);
  $('#project-modal').showModal();
  $('#modal-content').scrollTop = 0;
}

/* ---------- Dil ---------- */

function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (error) { /* gizli sekme vb. */ }

  translatePage();
  renderFeatured();
  $('#archive-filters').innerHTML = chipsHtml(ARCHIVE_FILTERS, state.archiveFilter);
  renderArchive();
  renderExperience();
  renderCertificates();
  renderSkills();
  if ($('#project-modal').open) renderModal(state.openProject);
  document.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
}

function savedLanguage() {
  try { return localStorage.getItem(LANG_STORAGE_KEY) === 'en' ? 'en' : 'tr'; } catch (error) { return 'tr'; }
}

/* ---------- Etkileşimler ---------- */

function bindChips(container, onSelect) {
  container.addEventListener('click', event => {
    const chip = event.target.closest('[data-filter]');
    if (!chip) return;
    container.querySelectorAll('.chip').forEach(item => {
      item.classList.toggle('active', item === chip);
      item.setAttribute('aria-pressed', String(item === chip));
    });
    onSelect(chip.dataset.filter);
  });
}

function bindNavigation() {
  const header = $('.site-header');
  const menuButton = $('.menu-toggle');
  const setMenuOpen = open => {
    header.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };
  menuButton.addEventListener('click', () => setMenuOpen(!header.classList.contains('menu-open')));
  $('.nav').addEventListener('click', event => { if (event.target.closest('a')) setMenuOpen(false); });

  let scrollQueued = false;
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => {
      header.classList.toggle('scrolled', window.scrollY > 12);
      scrollQueued = false;
    });
  }, { passive: true });

  // Ekrandaki bölüme göre menüdeki bağlantıyı vurgular.
  const links = [...$$('.nav a')];
  const sections = links.map(link => $(link.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(section => observer.observe(section));
}

function bindEvents() {
  $('.lang-toggle').addEventListener('click', () => setLanguage(state.lang === 'tr' ? 'en' : 'tr'));

  bindChips($('#project-filters'), key => { state.projectFilter = key; applyProjectFilter(); });
  bindChips($('#archive-filters'), key => { state.archiveFilter = key; renderArchive(); });
  $('#project-search').addEventListener('input', renderArchive);
  $('#archive-more').addEventListener('click', () => {
    state.archiveExpanded = !state.archiveExpanded;
    renderArchive();
  });

  $('#featured').addEventListener('click', event => {
    const playButton = event.target.closest('[data-video]');
    if (playButton) { playVideo(playButton); return; }
    const card = event.target.closest('[data-project]');
    if (card) openModal(FEATURED_PROJECTS.find(project => project.id === card.dataset.project));
  });
  $('[data-open-cozy]').addEventListener('click', () => openModal(COZY_PROJECT));
  $('#cozy .video-play').addEventListener('click', event => playVideo(event.currentTarget));
  $$('[data-open-game]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    openGame();
  }));
  $('#archive').addEventListener('click', event => {
    const card = event.target.closest('[data-archive]');
    if (card) openModal(ARCHIVE_PROJECTS[Number(card.dataset.archive)]);
  });
  $('#archive').addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-archive]')) {
      event.preventDefault();
      event.target.click();
    }
  });

  // Video sahnesi: kapat butonu, karanlık alana tıklama ya da Esc ile kapanır
  $$('[data-close-video]').forEach(element => element.addEventListener('click', closeVideo));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeVideo(); });

  const modal = $('#project-modal');
  $('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

  bindNavigation();
  bindMailLink();
}

// Bilgisayarda çoğu kişide mail programı kurulu değil, mailto tıklanınca hiçbir şey olmuyor.
// Fareli cihazlarda Gmail'in yeni mail penceresi açılır; telefonda mailto mail uygulamasını açar.
function bindMailLink() {
  const link = $('a[href^="mailto:"]');
  if (!link || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const address = link.getAttribute('href').slice('mailto:'.length);
  link.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(address)}`;
  link.target = '_blank';
  link.rel = 'noreferrer';
}

function init() {
  collectTurkishText();
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
  bindEvents();
  setLanguage(savedLanguage());
}

init();
