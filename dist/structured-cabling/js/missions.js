// Logik misi. Fasa 2: Misi 1 (pilih kabel dan komponen) berfungsi sepenuhnya.
// Misi 2-8 ialah ruang letak; dibina dalam fasa 3-6.

export function evaluateSelection(cableId, plugId, panelId, comps) {
  const cable = comps.items[cableId], plug = comps.plugs[plugId], panel = comps.panels[panelId];
  const problems = [];
  if (cable.shielded && !plug.shielded) problems.push(`${cable.name} berperisai, tetapi "${plug.name}" tiada perisai. Perisai kabel tidak dapat ditamatkan dan plug biasa juga tidak muat dengan kabel yang lebih tebal.`);
  if (!cable.shielded && plug.shielded) problems.push(`${cable.name} ialah UTP. Plug berperisai tidak diperlukan dan tidak sesuai dengan stok makmal untuk amali ini.`);
  if (cable.shielded && !panel.shielded) problems.push(`"${panel.name}" tidak berperisai, jadi ia tidak boleh menamatkan perisai ${cable.name}.`);
  if (!cable.shielded && panel.shielded) problems.push(`"${panel.name}" berperisai dan tidak sesuai dengan kabel UTP.`);
  if (plug.shielded !== panel.shielded) problems.push('Plug dan patch panel mesti sama jenis (kedua-duanya UTP atau kedua-duanya berperisai).');
  const ok = problems.length === 0;
  return { ok, problems: [...new Set(problems)], code: ok ? null : 'incompatible' };
}

// Langkah semasa (indeks) untuk Misi 1, diperoleh daripada state sebenar.
export function mission1Step(s) {
  if (!s.cable.id) return 0;
  if (!s.plug) return 1;
  if (!s.panel) return 2;
  if (!s.cable.confirmed) return 3;
  return 4; // selesai
}
