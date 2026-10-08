(() => {
  const ASSETS = 'project-assets/oyun-assets/assets/';
  const SOUND_STORAGE_KEY = 'portfolio-sound';
  const COUNTER_TOP = 148;            // müşteriler tezgahın bu çizgisinin arkasında kalır
  const CUSTOMER_POS = { x: 126, y: 70 };
  const FOOD_SIZE = 20;
  const GROW_TIME = 4;                // hasattan sonra ekinin yeniden olgunlaşma süresi (sn)

  const INGREDIENTS = {
    carrot: 'carrot.png',
    strawberry: 'cilek.png',
    cucumber: 'cucumber.png',
    wheat: 'bugday.png',
    apple: 'apple.png'
  };

  // Vitrin (kafe) ve tarifler (mutfak).
  const FOODS = [
    { id: 'cake', src: 'carrot_cake.png', shelf: { x: 255, y: 97 }, recipe: { carrot: 2, wheat: 1 } },
    { id: 'granola', src: 'granola.png', shelf: { x: 283, y: 99 }, scale: 1.35, recipe: { wheat: 1, apple: 1 } },
    { id: 'pie', src: 'turta.png', shelf: { x: 253, y: 128 }, recipe: { strawberry: 2, wheat: 1 } },
    { id: 'sandwich', src: 'salatalik_sandivic.png', shelf: { x: 284, y: 127 }, recipe: { cucumber: 1, wheat: 1 } }
  ];

  // Bahçedeki tarlalar (bahce.png üzerindeki toprak alanları) ve elma ağacı
  const PLOTS = [
    { crop: 'wheat', box: [56, 39, 135, 95] },
    { crop: 'carrot', box: [184, 38, 263, 95] },
    { crop: 'strawberry', box: [56, 143, 135, 199] },
    { crop: 'cucumber', box: [184, 143, 263, 199] }
  ];
  const TREE = { box: [0, 0, 60, 60], apples: [[40, 16], [46, 32], [20, 30]] };
  const HARVEST_AMOUNT = 3;

  // Mutfakta tariflerin kartları (duvarın önünde)
  const RECIPE_CARDS = FOODS.map((food, index) => ({ food, box: [12 + index * 76, 98, 12 + index * 76 + 68, 152] }));

  // Sprite sayfaları yatay karelerden oluşur: [dosya, kare sayısı]
  const CUSTOMERS = [
    { id: 'bunny', order: ['bunny_siparis.png', 5], happy: ['bunny_happy.png', 4], talk: 'tavsan_talk_kisa.wav', thanks: 'tavsan-thanku.wav' },
    { id: 'capy', order: ['capybara_siparis.png', 2], happy: ['capybara_happy.png', 3], talk: 'capy_talk_kisa.wav', thanks: 'capy-thanku.wav' },
    { id: 'hedgehog', order: ['kirpi_siparis.png', 2], happy: ['kirpi_happy.png', 2], talk: 'kirpi_talk_kisa.wav', thanks: 'kirpi-thanku.wav' },
    { id: 'frog', order: ['kurba_siparis.png', 3], happy: ['kurba_happy.png', 3], talk: 'frog_talk_kisa.wav', thanks: 'kurba-thanku.wav' }
  ];
  const PLAYER = ['karakter_on.png', 4];

  const TIMING = { enter: 0.35, happy: 1.2, leave: 0.35 };

  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const startButton = document.getElementById('game-start');
  const toast = document.getElementById('game-toast');
  const scoreLabel = document.getElementById('game-score');
  const soundButton = document.getElementById('game-sound');
  const sceneTabs = document.getElementById('game-tabs');
  const inventoryBar = document.getElementById('game-inventory');

  const images = {};
  let loading = null;
  let game;

  function freshState() {
    return {
      running: false,
      visible: true,
      scene: 'cafe',      // cafe | garden | kitchen
      phase: 'idle',      // idle | enter | order | happy | leave
      phaseTime: 0,
      customer: CUSTOMERS[0],
      want: FOODS[0],
      shake: 0,
      score: 0,
      lastFrame: 0,
      // Başlangıçta vitrinde her yiyecekten bir tane var; malzemeler bahçeden toplanır
      stock: Object.fromEntries([...Object.keys(INGREDIENTS).map(key => [key, 0]), ...FOODS.map(food => [food.id, 1])]),
      plots: PLOTS.map(() => ({ growth: GROW_TIME })),
      apples: TREE.apples.map(() => true),
      appleTimer: 0,
      flash: null         // kısa vurgu: { box, time }
    };
  }

  let soundOn = true;
  try { soundOn = localStorage.getItem(SOUND_STORAGE_KEY) !== 'off'; } catch (error) { /* yok say */ }

  const text = () => UI_TEXT[document.documentElement.lang === 'en' ? 'en' : 'tr'].game;
  const random = list => list[Math.floor(Math.random() * list.length)];
  const inside = (point, [x0, y0, x1, y1]) => point.x >= x0 && point.x <= x1 && point.y >= y0 && point.y <= y1;

  /* ---------- Yükleme (ilk açılışta) ---------- */

  function loadImage(name) {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = ASSETS + name;
      images[name] = image;
    });
  }

  function loadAll() {
    if (loading) return loading;
    const names = ['tezgah.png', 'bahce.png', 'mutfak.png', 'balon.png', PLAYER[0],
      ...FOODS.map(food => food.src), ...Object.values(INGREDIENTS)];
    CUSTOMERS.forEach(customer => names.push(customer.order[0], customer.happy[0]));
    loading = Promise.all(names.map(loadImage));
    return loading;
  }

  function playSound(name, volume = 0.45) {
    if (!soundOn) return null;
    const audio = new Audio(ASSETS + 'sesler/' + name);
    audio.volume = volume;
    audio.play().catch(() => {});
    return audio;
  }

  let talkAudio = null;
  function stopTalk() {
    if (talkAudio) { talkAudio.pause(); talkAudio = null; }
  }

  /* ---------- Çizim yardımcıları ---------- */

  function drawImage(name, x, y, size, alpha = 1) {
    const image = images[name];
    if (!image || !image.complete) return;
    ctx.globalAlpha = alpha;
    ctx.drawImage(image, x, y, size, size);
    ctx.globalAlpha = 1;
  }

  function drawFood(food, x, y, size, maxScale = Infinity, alpha = 1) {
    const scaled = size * Math.min(food.scale || 1, maxScale);
    const shift = (scaled - size) / 2;
    drawImage(food.src, x - shift, y - shift, scaled, alpha);
  }

  function drawSprite([file, frames], frameIndex, x, y) {
    const sheet = images[file];
    if (!sheet || !sheet.complete) return;
    const width = sheet.width / frames;
    ctx.drawImage(sheet, (frameIndex % frames) * width, 0, width, sheet.height, x, y, width, sheet.height);
  }

  // Krem renkli, kahverengi kenarlı küçük kart (oyunun arayüz paletinde)
  function drawCard([x0, y0, x1, y1], highlight) {
    ctx.fillStyle = highlight ? '#fff6d8' : '#fdf3e3';
    ctx.strokeStyle = highlight ? '#e47aa7' : '#8a5a48';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x0 + 0.5, y0 + 0.5, x1 - x0, y1 - y0, 6);
    ctx.fill();
    ctx.stroke();
  }

  function drawFlash() {
    if (!game.flash) return;
    const [x0, y0, x1, y1] = game.flash.box;
    ctx.fillStyle = `rgb(255 255 255 / ${Math.max(0, 0.6 - game.flash.time * 1.5)})`;
    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
  }

  /* ---------- Sahneler ---------- */

  function drawCafe(time) {
    ctx.drawImage(images['tezgah.png'], 0, 0, 320, 240);
    FOODS.forEach(food => drawFood(food, food.shelf.x, food.shelf.y, FOOD_SIZE, Infinity, game.stock[food.id] > 0 ? 1 : 0.3));
    if (game.phase !== 'idle' || !game.running) drawCustomer(time);
    drawBubble();
  }

  function drawCustomer(time) {
    const { phase, phaseTime, customer } = game;
    let offset = 0;
    if (phase === 'enter') offset = (1 - Math.min(phaseTime / TIMING.enter, 1)) * 70;
    if (phase === 'leave') offset = Math.min(phaseTime / TIMING.leave, 1) * 70;
    const sheet = phase === 'happy' ? customer.happy : customer.order;
    const fps = phase === 'happy' ? 7 : 4;
    const shakeX = game.shake > 0 ? Math.sin(time * 60) * 2 : 0;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, COUNTER_TOP);
    ctx.clip();
    drawSprite(sheet, Math.floor(time * fps), CUSTOMER_POS.x + shakeX, CUSTOMER_POS.y + offset);
    ctx.restore();
  }

  function drawBubble() {
    if (game.phase !== 'order') return;
    const bob = Math.round(Math.sin(performance.now() / 300));
    const shakeX = game.shake > 0 ? Math.round(Math.sin(performance.now() / 20) * 2) : 0;
    if (images['balon.png']) ctx.drawImage(images['balon.png'], 180 + shakeX, 42 + bob, 96, 64);
    drawFood(game.want, 216 + shakeX, 52 + bob, 24, 1.15);
  }

  function drawGarden(time) {
    ctx.drawImage(images['bahce.png'], 0, 0, 320, 240);
    PLOTS.forEach((plot, index) => {
      const [x0, y0, x1, y1] = plot.box;
      const ripeness = Math.min(game.plots[index].growth / GROW_TIME, 1);
      const ripe = ripeness >= 1;
      const size = ripe ? 16 : 6 + ripeness * 8;
      const bounce = ripe ? Math.round(Math.sin(time * 4 + index) * 1) : 0;
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const cx = x0 + 14 + col * 24;
          const cy = y0 + 12 + row * 24;
          drawImage(INGREDIENTS[plot.crop], cx + (16 - size) / 2, cy + (16 - size) / 2 + bounce, size, ripe ? 1 : 0.75);
        }
      }
      if (ripe) {
        ctx.strokeStyle = 'rgb(255 255 255 / 55%)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x0 + 1.5, y0 + 1.5, x1 - x0 - 3, y1 - y0 - 3);
      }
    });
    TREE.apples.forEach(([x, y], index) => {
      if (game.apples[index]) drawImage(INGREDIENTS.apple, x, y, 12);
    });
    drawSprite(PLAYER, Math.floor(time * 3), 136, 92);
  }

  function drawKitchen() {
    ctx.drawImage(images['mutfak.png'], 0, 0, 320, 240);
    RECIPE_CARDS.forEach(({ food, box }) => {
      const canCook = Object.entries(food.recipe).every(([key, need]) => game.stock[key] >= need);
      drawCard(box, canCook);
      const [x0, y0] = box;
      drawFood(food, x0 + 24, y0 + 5, 20, 1.15, canCook ? 1 : 0.45);
      const parts = Object.entries(food.recipe).flatMap(([key, need]) => Array(need).fill(key));
      const startX = x0 + 34 - parts.length * 6;
      parts.forEach((key, index) => drawImage(INGREDIENTS[key], startX + index * 12, y0 + 32, 12, canCook ? 1 : 0.45));
    });
  }

  function draw(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!images['tezgah.png'] || !images['tezgah.png'].complete) return;
    if (game.scene === 'garden') drawGarden(time);
    else if (game.scene === 'kitchen') drawKitchen();
    else drawCafe(time);
    drawFlash();
  }

  /* ---------- Oyun akışı ---------- */

  function setPhase(phase) {
    game.phase = phase;
    game.phaseTime = 0;
    if (phase === 'order' && game.scene === 'cafe') talkAudio = playSound(game.customer.talk, 0.35);
  }

  function nextCustomer() {
    game.customer = random(CUSTOMERS.filter(customer => customer !== game.customer));
    game.want = random(FOODS);
    setPhase('enter');
  }

  function update(delta) {
    game.phaseTime += delta;
    game.shake = Math.max(0, game.shake - delta);
    if (game.flash && (game.flash.time += delta) > 0.4) game.flash = null;
    game.plots.forEach(plot => { plot.growth = Math.min(plot.growth + delta, GROW_TIME); });
    if (game.apples.some(apple => !apple) && (game.appleTimer += delta) > GROW_TIME) {
      game.apples[game.apples.indexOf(false)] = true;
      game.appleTimer = 0;
    }
    if (game.phase === 'enter' && game.phaseTime >= TIMING.enter) setPhase('order');
    if (game.phase === 'happy' && game.phaseTime >= TIMING.happy) setPhase('leave');
    if (game.phase === 'leave' && game.phaseTime >= TIMING.leave) nextCustomer();
  }

  function loop(now) {
    if (!game.running || !game.visible) { game.lastFrame = 0; return; }
    const delta = game.lastFrame ? Math.min((now - game.lastFrame) / 1000, 0.1) : 0;
    game.lastFrame = now;
    update(delta);
    draw(now / 1000);
    requestAnimationFrame(loop);
  }

  function resumeLoop() {
    if (game.running && game.visible && !game.lastFrame) requestAnimationFrame(loop);
  }

  let toastTimer = 0;
  function showToast(message, kind) {
    toast.textContent = message;
    toast.className = `game-toast show ${kind}`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.className = 'game-toast'; }, 1400);
  }

  function serve(food) {
    if (game.phase !== 'order') return;
    if (game.stock[food.id] <= 0) {
      showToast(text().empty, 'bad');
      return;
    }
    playSound('pop_hizli.wav', 0.35);
    if (food === game.want) {
      stopTalk();
      game.stock[food.id] -= 1;
      game.score += 1;
      scoreLabel.textContent = game.score;
      showToast(random(text().thanks), 'good');
      playSound(game.customer.thanks);
      setPhase('happy');
    } else {
      game.shake = 0.4;
      showToast(text().wrong, 'bad');
    }
    renderInventory();
  }

  function harvest(point) {
    const plotIndex = PLOTS.findIndex(plot => inside(point, plot.box));
    if (plotIndex >= 0) {
      const plot = game.plots[plotIndex];
      if (plot.growth < GROW_TIME) { showToast(text().growing, 'info'); return; }
      plot.growth = 0;
      game.stock[PLOTS[plotIndex].crop] += HARVEST_AMOUNT;
      game.flash = { box: PLOTS[plotIndex].box, time: 0 };
      showToast(`+${HARVEST_AMOUNT} ${text().items[PLOTS[plotIndex].crop]}`, 'good');
      playSound('pop_yeni.wav', 0.35);
      renderInventory();
      return;
    }
    const appleIndex = TREE.apples.findIndex(([x, y], index) => game.apples[index] && inside(point, [x - 4, y - 4, x + 16, y + 16]));
    if (appleIndex >= 0) {
      game.apples[appleIndex] = false;
      game.stock.apple += 1;
      showToast(`+1 ${text().items.apple}`, 'good');
      playSound('pop_hizli.wav', 0.35);
      renderInventory();
    }
  }

  function cook(point) {
    const card = RECIPE_CARDS.find(({ box }) => inside(point, box));
    if (!card) return;
    const { food, box } = card;
    const missing = Object.entries(food.recipe).filter(([key, need]) => game.stock[key] < need);
    if (missing.length) { showToast(text().needIngredients, 'bad'); return; }
    Object.entries(food.recipe).forEach(([key, need]) => { game.stock[key] -= need; });
    game.stock[food.id] += 1;
    game.flash = { box, time: 0 };
    showToast(`+1 ${text().foods[food.id]}`, 'good');
    playSound('pop_yeni.wav', 0.35);
    renderInventory();
  }

  /* ---------- Arayüz ---------- */

  function setScene(scene) {
    game.scene = scene;
    if (scene !== 'cafe') stopTalk();
    sceneTabs.querySelectorAll('[data-scene]').forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.scene === scene)));
    renderInventory();
    playSound('page.wav', 0.25);
  }

  function renderTabs() {
    const labels = text().scenes;
    sceneTabs.innerHTML = ['cafe', 'garden', 'kitchen'].map(scene =>
      `<button type="button" class="scene-tab" data-scene="${scene}" aria-pressed="${game.scene === scene}">${labels[scene]}</button>`).join('');
  }

  function renderInventory() {
    const ingredients = Object.entries(INGREDIENTS).map(([key, src]) => ({ key, src, name: text().items[key] }));
    const foods = FOODS.map(food => ({ key: food.id, src: food.src, name: text().foods[food.id], food: true }));
    const items = game.scene === 'garden' ? ingredients : game.scene === 'cafe' ? foods : [...ingredients, ...foods];
    inventoryBar.innerHTML = items.map(item => `
      <span class="inv-item${item.food ? ' is-food' : ''}${game.stock[item.key] ? '' : ' is-empty'}" title="${item.name}">
        <img src="${ASSETS + item.src}" alt="${item.name}"><b>${game.stock[item.key]}</b>
      </span>`).join('');
  }

  function updateSoundButton() {
    soundButton.setAttribute('aria-pressed', String(soundOn));
    soundButton.classList.toggle('off', !soundOn);
  }

  function canvasPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * canvas.width / rect.width,
      y: (event.clientY - rect.top) * canvas.height / rect.height
    };
  }

  function foodAt(point) {
    return FOODS.find(food => inside(point, [food.shelf.x - 5, food.shelf.y - 5, food.shelf.x + FOOD_SIZE + 5, food.shelf.y + FOOD_SIZE + 5]));
  }

  function isClickable(point) {
    if (game.scene === 'cafe') return Boolean(foodAt(point));
    if (game.scene === 'kitchen') return RECIPE_CARDS.some(({ box }) => inside(point, box));
    return PLOTS.some(plot => inside(point, plot.box)) || inside(point, TREE.box);
  }

  function start() {
    startButton.hidden = true;
    game.running = true;
    nextCustomer();
    resumeLoop();
  }

  // Her açılışta oyun baştan başlar
  function reset() {
    game = freshState();
    scoreLabel.textContent = 0;
    startButton.hidden = false;
    stopTalk();
    renderTabs();
    renderInventory();
    loadAll().then(() => draw(0));
  }

  startButton.addEventListener('click', start);
  canvas.addEventListener('click', event => {
    if (!game.running) return;
    const point = canvasPoint(event);
    if (game.scene === 'cafe') {
      const food = foodAt(point);
      if (food) serve(food);
    } else if (game.scene === 'garden') {
      harvest(point);
    } else {
      cook(point);
    }
  });
  canvas.addEventListener('mousemove', event => {
    canvas.style.cursor = game.running && isClickable(canvasPoint(event)) ? 'pointer' : '';
  });
  sceneTabs.addEventListener('click', event => {
    const tab = event.target.closest('[data-scene]');
    if (tab && game.running) setScene(tab.dataset.scene);
  });
  soundButton.addEventListener('click', () => {
    soundOn = !soundOn;
    if (!soundOn) stopTalk();
    try { localStorage.setItem(SOUND_STORAGE_KEY, soundOn ? 'on' : 'off'); } catch (error) { /* yok say */ }
    updateSoundButton();
  });
  document.addEventListener('languagechange', () => { renderTabs(); renderInventory(); });

  // Ekranda değilken çizim döngüsü durur
  new IntersectionObserver(([entry]) => {
    game.visible = entry.isIntersecting;
    resumeLoop();
  }).observe(canvas);

  game = freshState();
  updateSoundButton();
  renderTabs();
  renderInventory();

  window.CozyGame = {
    reset,
    stop() { game.running = false; stopTalk(); }
  };
})();
