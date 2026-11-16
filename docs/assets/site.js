/* Progressive project filtering; content stays readable without JavaScript. */
(() => {
  const tools = document.querySelector('[data-work-tools]');
  if (!tools) return;
  const cards = Array.from(document.querySelectorAll('[data-project-card]'));
  const search = document.querySelector('#project-search');
  const filters = Array.from(document.querySelectorAll('[data-category]'));
  const count = document.querySelector('[data-result-count]');
  const empty = document.querySelector('[data-empty-state]');
  let selected = 'All';
  tools.hidden = false;
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const card of cards) {
      const match = (selected === 'All' || card.dataset.categoryName === selected)
        && (card.dataset.search || '').includes(query);
      card.hidden = !match;
      if (match) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} shown`;
    empty.hidden = visible !== 0;
  };
  for (const filter of filters) {
    filter.addEventListener('click', () => {
      selected = filter.dataset.category;
      for (const button of filters) {
        button.setAttribute('aria-pressed', String(button === filter));
      }
      update();
    });
  }
  search.addEventListener('input', update);
  update();
})();
