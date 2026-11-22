const TABS = [['cable', 'Kabel'], ['tool', 'Alat'], ['part', 'Komponen']];

export function createInventory({ tabsEl, cardsEl, dockEl, handleEl, comps, onPick }) {
  let tab = 'cable', selected = new Set();

  function entries(t) {
    const out = [];
    if (t === 'cable' || t === 'tool') for (const [id, c] of Object.entries(comps.items)) if (c.type === t) out.push({ id, name: c.name, sub: c.spec ? `${c.spec.Perisai} · ${c.spec['Lebar jalur']}` : (c.info || '') });
    if (t === 'part') {
      for (const [id, c] of Object.entries(comps.plugs)) out.push({ id, name: c.name, sub: c.note, proto: c.proto });
      for (const [id, c] of Object.entries(comps.panels)) out.push({ id, name: c.name, sub: c.note, proto: c.proto });
      for (const [id, c] of Object.entries(comps.items)) if (c.type === 'part' && !['rj45', 'panel'].includes(id)) out.push({ id, name: c.name, sub: 'Pilihan tambahan' });
    }
    return out;
  }
  function render() {
    tabsEl.innerHTML = '';
    for (const [k, label] of TABS) {
      const b = document.createElement('button'); b.className = 'tab' + (k === tab ? ' on' : ''); b.textContent = label;
      b.onclick = () => { tab = k; render(); }; tabsEl.appendChild(b);
    }
    cardsEl.innerHTML = '';
    for (const e of entries(tab)) {
      const b = document.createElement('button'); b.className = 'card-item' + (selected.has(e.id) ? ' sel' : '');
      b.innerHTML = `<b></b><span></span>${e.proto ? '<em class="badge">Prototaip: tiada model 3D</em>' : ''}`;
      b.querySelector('b').textContent = e.name; b.querySelector('span').textContent = e.sub;
      b.onclick = () => onPick(e.id); cardsEl.appendChild(b);
    }
  }
  handleEl.addEventListener('click', () => dockEl.classList.toggle('open'));
  render();
  return {
    setSelected(ids) { selected = new Set(ids.filter(Boolean)); render(); },
    showTabFor(id) {
      const t = comps.items[id] ? (comps.items[id].type === 'cable' ? 'cable' : comps.items[id].type === 'tool' ? 'tool' : 'part') : 'part';
      if (t !== tab) { tab = t; render(); }
    }
  };
}
