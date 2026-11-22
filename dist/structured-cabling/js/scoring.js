// Pemarkahan. Fasa 2: hanya komponen "Pemilihan kabel dan alat" (10 markah) dilaksanakan.
export const MAX = { select: 10, cutStrip: 15, arrange: 20, crimp: 15, punch: 25, test: 15 };
export const RULES = { wrongSelection: 3 };

export function missionScore(mistakes, missionIdx) {
  const lost = mistakes.filter(m => m.mission === missionIdx).reduce((a, m) => a + m.marks, 0);
  return Math.max(0, MAX.select - lost);
}
export function selectionScore(mistakes) { return missionScore(mistakes, 0); }
