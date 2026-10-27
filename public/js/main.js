/* ===== Jéssica Cakes =====
 * CONFIGURAÇÃO: preencha aqui e todos os botões de WhatsApp do site passam a funcionar.
 * whatsapp: só números, com 55 + DDD. Ex.: '5531999998888'
 */
var CONFIG = {
  whatsapp: '',
  whatsappExibido: '',          // como aparece no site. Ex.: '(31) 99999-8888'
  mensagem: 'Olá, Jéssica! Vim pelo site e quero fazer uma encomenda.',
  corDestaque: '#A8232E'        // cor da fita vermelha (botões, fita do bolo, rosas)
};

(function () {
  var ACC = CONFIG.corDestaque;
  document.documentElement.style.setProperty('--accent', ACC);

  /* ---------- WhatsApp ---------- */
  if (CONFIG.whatsapp) {
    var url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.mensagem);
    document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
    });
  }
  if (CONFIG.whatsappExibido) {
    document.querySelectorAll('[data-whatsapp-text]').forEach(function (s) { s.textContent = CONFIG.whatsappExibido; });
  }

  /* ---------- fotos: mostra o aviso enquanto a foto não existir ---------- */
  document.querySelectorAll('.photo img').forEach(function (img) {
    var mark = function () { img.closest('.photo').classList.add('empty'); };
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- bolo 3D ---------- */
  var scene = document.getElementById('cake-scene');
  if (!scene) return;
  var N = 28, CHOC = '#5B3324';

  function el(cls, style) {
    var d = document.createElement(cls === 'i' ? 'i' : 'div');
    if (cls !== 'i') d.className = cls;
    Object.assign(d.style, style);
    return d;
  }

  function tier(r, h, y, faceBg, topBg) {
    var w = 2 * r * Math.tan(Math.PI / N) + 1.4;
    var t = el('tier', { transform: 'translateY(' + y + 'px)' });
    t.appendChild(el('disc', {
      width: 2 * r + 'px', height: 2 * r + 'px', left: -r + 'px', top: -r + 'px',
      transform: 'translateY(' + (-h / 2) + 'px) rotateX(90deg)', background: topBg
    }));
    for (var i = 0; i < N; i++) {
      t.appendChild(el('face', {
        width: w + 'px', height: h + 'px', left: (-w / 2) + 'px', top: (-h / 2) + 'px',
        transform: 'rotateY(' + (360 / N * i) + 'deg) translateZ(' + r + 'px)', background: faceBg(i)
      }));
    }
    scene.appendChild(t);
  }

  // prato
  tier(192, 14, -7, function (i) { return i % 2 ? '#E6D9C8' : '#EDE2D3'; },
    'radial-gradient(circle, #FFFDF9 0 62%, #F3EADF 63% 100%)');
  // andar de baixo: baunilha, renda e fita
  tier(150, 110, -69, function (i) {
    return 'radial-gradient(circle at 50% 0, #FFFDF8 0 8px, #E9D6BF 8.5px 9.5px, transparent 10px) top / 100% 20px no-repeat, ' +
      'linear-gradient(to bottom, transparent 0 64%, ' + ACC + ' 64% 79%, rgba(0,0,0,0.12) 79% 80.5%, transparent 80.5%), ' +
      (i % 2 ? '#F4E5D3' : '#F9EEE1');
  }, 'radial-gradient(circle, #FBF2E6 0 70%, #F3E3CF 100%)');
  // andar do meio: rosa
  tier(110, 92, -170, function (i) {
    return 'radial-gradient(circle at 50% 0, #FFF8F2 0 6px, transparent 6.5px) top / 100% 14px no-repeat, ' +
      (i % 2 ? '#EDBDB6' : '#F2C9C2');
  }, 'radial-gradient(circle, #F5D3CD 0 70%, #EFC2BB 100%)');
  // andar de cima: calda de chocolate
  var drips = [12, 26, 16, 32, 14, 22, 28];
  tier(72, 76, -254, function (i) {
    var d = drips[i % drips.length];
    return 'linear-gradient(' + CHOC + ', ' + CHOC + ') top / 100% 12px no-repeat, ' +
      'radial-gradient(ellipse 8px ' + d + 'px at 50% 0, ' + CHOC + ' 96%, transparent 100%) top / 100% ' + (d + 2) + 'px no-repeat, ' +
      (i % 2 ? '#F6EADB' : '#FBF3E8');
  }, 'radial-gradient(circle, #6B3F2A 0 60%, ' + CHOC + ' 100%)');

  function bead(x, y, z, s, bg) {
    var b = el('bead', { transform: 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)' });
    [0, 60, 120].forEach(function (a) {
      b.appendChild(el('i', {
        width: s + 'px', height: s + 'px', left: (-s / 2) + 'px', top: (-s / 2) + 'px',
        background: bg, transform: 'rotateY(' + a + 'deg)'
      }));
    });
    scene.appendChild(b);
  }
  var pearl = 'radial-gradient(circle at 38% 35%, #FFFFFF 0 18%, #F4ECE2 45%, #D9C9B6 100%)';
  for (var k = 0; k < 22; k++) {
    var a = (Math.PI * 2 / 22) * k;
    bead(Math.sin(a) * 113, -129, Math.cos(a) * 113, 11, pearl);
  }
  var rose = 'radial-gradient(circle at 50% 50%, #7A1620 0 12%, ' + ACC + ' 13% 30%, #C9505A 31% 48%, ' + ACC + ' 49% 66%, #D9737B 67% 100%)';
  var leaf = 'radial-gradient(circle, #7C8B5A 0 55%, #5F6E42 100%)';
  bead(-24, -308, 12, 34, rose);
  bead(22, -306, -8, 30, rose);
  bead(2, -310, 28, 26, rose);
  bead(-6, -296, -26, 16, leaf);
  bead(38, -296, 16, 14, leaf);
})();
