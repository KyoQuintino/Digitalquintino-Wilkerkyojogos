(() => {
  const sites = [
    { title: 'Quebrando o Hábito de Ser Você Mesmo', eyebrow: 'Desenvolvimento pessoal', category: 'desenvolvimento', initials: 'QH', tone: 'ink', text: 'Uma leitura para reconhecer padrões, ampliar a consciência e experimentar novas possibilidades.', page: 'https://github.com/KyoQuintino/quebrando-o-habito-joaozinho', checkout: 'https://pay.hotmart.com/U107546962B' },
    { title: 'Como Fazer Amigos e Influenciar Pessoas', eyebrow: 'Relacionamentos', category: 'relacionamentos', initials: 'CF', tone: 'sky', text: 'Ideias práticas para criar conversas mais próximas, relações de confiança e influência sem forçar.', page: 'https://github.com/KyoQuintino/como-fazer-amigos-e-influenciar-pessoas-inovatek', checkout: '' },
    { title: 'Antimedo', eyebrow: 'Coragem e ação', category: 'desenvolvimento', initials: 'AM', tone: 'sand', text: 'Um novo passo diante dos medos, com uma jornada simples para transformar hesitação em movimento.', page: 'https://antimedopay-b9abndwm.manus.space/', checkout: 'https://pay.hotmart.com/B107533955S' },
    { title: 'As 7 Leis Espirituais do Sucesso', eyebrow: 'Jornada interior', category: 'desenvolvimento', initials: '7L', tone: 'violet', text: 'Uma landing page dedicada a princípios de presença, propósito e transformação pessoal.', page: 'https://jornadaeebk-ajgcrqn6.manus.space', checkout: 'https://pay.hotmart.com/T107544097M' },
    { title: 'Metanoia', eyebrow: 'Fé e transformação', category: 'fe', initials: 'M', tone: 'olive', image: '/manus-storage/mockup-metanoia-cinematic_cfc47edd_851e0374.png', text: 'Um convite para sair do automático, reencontrar direção e caminhar com mais fé e esperança.', page: 'https://github.com/KyoQuintino/Metanoia-markyoquintino', checkout: '' },
    { title: 'Sai da Caixão', eyebrow: 'Autogoverno e propósito', category: 'desenvolvimento', initials: 'SC', tone: 'coral', text: 'Uma leitura sobre autogoverno, propósito e ação para ativar uma nova fase da vida.', page: 'https://github.com/KyoQuintino/e-book-saia-do-caixao-joaokyoquintino', checkout: 'https://pay.hotmart.com/S107541237F' },
    { title: 'Ensinando a Criança a Orar', eyebrow: 'Guia prático para pais', category: 'fe', initials: 'EO', tone: 'coral', image: '/manus-storage/mockup-orar-cinematic_b76aa009_ed3ecf90.png', text: 'Um guia simples e amoroso para fortalecer a fé em família e transformar a rotina em conexão.', page: 'https://github.com/KyoQuintino/E-book-Ensinando-a-crianca-a-orar-Kaio', checkout: 'https://pay.hotmart.com/B106306611O' },
    { title: 'Detox Perfeito', eyebrow: 'Hábitos naturais e bem-estar', category: 'bem-estar', initials: 'DP', tone: 'mint', image: '/manus-storage/mockup-detox-cinematic_ba988552_9ca5dbb5.png', text: 'Receitas, organização e um plano passo a passo para começar uma mudança possível dentro da rotina.', page: 'https://github.com/KyoQuintino/e-book-detox-perfeito-kaio', checkout: 'https://pay.hotmart.com/K106566519N' },
    { title: 'A Paz do Diabo', eyebrow: 'Sabedoria cristã atemporal', category: 'fe', initials: 'PD', tone: 'dark', image: '/manus-storage/mockup-paz-cinematic_081f9cf7_e1ab949f.png', text: 'A obra de C. H. Spurgeon em uma leitura profunda sobre consciência, distração e vida espiritual.', page: 'https://pazdoebook-y5pqnwvd.manus.space', checkout: 'https://go.hotmart.com/R106774018S' }
  ];

  const filters = [
    ['todos', 'Todos'],
    ['fe', 'Fé'],
    ['bem-estar', 'Bem-estar'],
    ['relacionamentos', 'Relacionamentos'],
    ['desenvolvimento', 'Desenvolvimento pessoal']
  ];

  const makeCard = (site) => {
    const card = document.createElement('article');
    card.className = 'ebook-site-card';
    card.dataset.category = site.category;
    const cover = site.image
      ? `<div class="ebook-site-cover has-image"><img src="${site.image}" alt="Capa de ${site.title}" loading="lazy"><span>${site.initials}</span></div>`
      : `<div class="ebook-site-cover cover-${site.tone}"><span class="cover-orb"></span><b>${site.initials}</b><small>DIGITALQUINTINO</small></div>`;
    card.innerHTML = `${cover}
      <div class="ebook-site-card-body"><span class="ebook-site-eyebrow">${site.eyebrow}</span>
      <h3>${site.title}</h3><p>${site.text}</p>
      <div class="ebook-site-actions"><a href="${site.page}" target="_blank" rel="noreferrer">${site.page.includes('github.com') ? 'Ver projeto' : 'Abrir site'} <span>↗</span></a>
      ${site.checkout ? `<a class="ebook-site-buy" href="${site.checkout}" target="_blank" rel="noreferrer">Comprar e-book</a>` : ''}</div></div>`;
    return card;
  };

  const mount = () => {
    if (document.querySelector('#projetos-e-book')) return true;
    const anchor = document.querySelector('#como-funciona');
    if (!anchor || !anchor.parentElement) return false;
    const section = document.createElement('section');
    section.id = 'projetos-e-book';
    section.className = 'ebook-sites-section';
    section.innerHTML = `<div class="ebook-sites-heading"><div><span class="section-kicker">CURADORIA DIGITALQUINTINO</span><h2>Mais leituras para <em>explorar.</em></h2></div><p>Conheça também os sites e projetos de e-books criados para diferentes momentos de fé, família, bem-estar e transformação.</p></div><div class="ebook-sites-filters" role="tablist" aria-label="Filtrar e-books"></div><div class="ebook-sites-grid"></div>`;
    const grid = section.querySelector('.ebook-sites-grid');
    const filterBar = section.querySelector('.ebook-sites-filters');
    const render = (active) => {
      grid.replaceChildren(...sites.filter(site => active === 'todos' || site.category === active).map(makeCard));
      filterBar.querySelectorAll('button').forEach(btn => { const selected = btn.dataset.filter === active; btn.classList.toggle('is-active', selected); btn.setAttribute('aria-selected', String(selected)); });
    };
    filters.forEach(([key, label]) => { const button = document.createElement('button'); button.type = 'button'; button.dataset.filter = key; button.textContent = label; button.setAttribute('role', 'tab'); button.addEventListener('click', () => render(key)); filterBar.appendChild(button); });
    render('todos');
    anchor.parentElement.insertBefore(section, anchor);
    return true;
  };
  if (!mount()) { const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); }); observer.observe(document.body, { childList: true, subtree: true }); setTimeout(() => observer.disconnect(), 10000); }
})();
