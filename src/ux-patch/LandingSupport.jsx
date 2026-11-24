// ESL-IKR UX PATCH 1: additive landing content only.
import { useState } from 'react';
import { BookOpen, Brain, Wrench, ClipboardCheck } from 'lucide-react';
import './ux-patch.css';

export function LearningGuide() {
  return (
<section className="eslux-guide" aria-labelledby="eslux-guide-title">
  <h2 id="eslux-guide-title">Bagaimana hendak bermula?</h2>
  <ol>
    <li><BookOpen aria-hidden="true" /><span><strong>01 · Baca nota</strong><small>Kenali konsep asas.</small></span></li>
    <li><Brain aria-hidden="true" /><span><strong>02 · Jawab kuiz</strong><small>Semak kefahaman.</small></span></li>
    <li><Wrench aria-hidden="true" /><span><strong>03 · Buat amali</strong><small>Berlatih dalam simulator.</small></span></li>
    <li><ClipboardCheck aria-hidden="true" /><span><strong>04 · Ambil ujian</strong><small>Uji kemahiran anda.</small></span></li>
  </ol>
</section>
  );
}

const faq = [
  ['Apa itu eSL-IKR?', 'Portal pembelajaran Teknologi Komputer Rangkaian yang menyediakan nota, kuiz dan simulasi amali.'],
  ['Saya baru belajar komputer. Di mana perlu bermula?', 'Tekan Mula Belajar, pilih Semester 1 dan buka IKR3013 Computer Hardware & Software untuk mengenali komponen asas.'],
  ['Bagaimana saya mencari modul?', 'Gunakan carian di header atau pilih rack semester. Anda juga boleh menekan Ctrl + K pada komputer.'],
  ['Bagaimana menukar PC 3D kepada Rack Server 3D?', 'Tekan anak panah kiri atau kanan pada pemapar model di halaman utama. Gunakan pilihan komponen untuk meneroka bahagian model.'],
  ['Apakah perbezaan dua makmal?', 'Makmal PC 3D meliputi perkakasan, perisian dan pembina PC. Structured Cabling 3D meliputi pengkabelan, RJ45 dan ujian kabel.'],
  ['Bolehkah saya menggunakan telefon?', 'Ya, portal menyokong paparan telefon. Komputer atau laptop disarankan untuk amali yang kompleks.'],
  ['Adakah kemajuan disimpan?', 'Kemajuan modul disimpan dalam pelayar pada peranti anda. Gunakan fungsi sandaran kemajuan jika perlu.'],
  ['Bagaimana hendak memberikan cadangan?', 'Isi maklum balas di bawah. Salin atau muat turun teks untuk dikongsi kepada pasukan projek.'],
];
export function LandingSupport() {
  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('Navigasi');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const valid = Boolean(rating && comment.trim());
  const payload = () => `Maklum balas eSL-IKR\nPenilaian kefahaman: ${rating}/5\nKategori: ${category}\nUlasan: ${comment.trim()}\n`;
  const download = () => {
    if (!valid) return;
    const url = URL.createObjectURL(new Blob([payload()], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'maklum-balas-esl-ikr.txt';
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    setStatus('Muat turun dimulakan. Kongsi fail dengan pasukan projek.');
  };
  const copy = async () => {
    if (!valid) return;
    try { await navigator.clipboard.writeText(payload()); setStatus('Maklum balas disalin. Tampalkan ke saluran pasukan projek.'); }
    catch { setStatus('Salinan tidak tersedia. Gunakan Muat turun.'); }
  };
  return <div className="eslux-support">
    <section id="faq" aria-labelledby="eslux-faq-title">
      <h2 id="eslux-faq-title">Soalan lazim (FAQ)</h2><p>Jawapan ringkas untuk pengguna baharu.</p>
      {faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </section>
    <section id="feedback" aria-labelledby="eslux-feedback-title">
      <h2 id="eslux-feedback-title">Maklum balas (Feedback)</h2>
      <p>Bantu kami memperbaiki pengalaman pembelajaran. Tidak perlu nama atau maklumat peribadi.</p>
      <form onSubmit={e => { e.preventDefault(); download(); }} onChange={() => setStatus('')}>
        <fieldset><legend>Sejauh mana anda memahami cara menggunakan portal?</legend>
          <div className="eslux-ratings">{[1,2,3,4,5].map(n => <label key={n}><input type="radio" name="eslux-rating" value={String(n)} required checked={rating === String(n)} onChange={e => setRating(e.target.value)} /><span>{n}</span></label>)}</div>
          <small>1 — Sangat keliru · 5 — Sangat jelas</small>
        </fieldset>
        <label htmlFor="eslux-category">Kategori</label>
        <select id="eslux-category" value={category} onChange={e => setCategory(e.target.value)}>{['Navigasi','Nota dan kuiz','Makmal 3D','Paparan telefon','Dark / Light Mode','Lain-lain'].map(x => <option key={x}>{x}</option>)}</select>
        <label htmlFor="eslux-comment">Cadangan atau masalah</label>
        <textarea id="eslux-comment" rows={4} required maxLength={1000} value={comment} onChange={e => setComment(e.target.value)} placeholder="Ceritakan pengalaman anda..." />
        <small>{comment.length}/1000 aksara</small>
        <div className="eslux-actions"><button type="submit" disabled={!valid}>Muat turun</button><button type="button" disabled={!valid} onClick={copy}>Salin</button><button type="button" onClick={() => {setRating('');setCategory('Navigasi');setComment('');setStatus('');}}>Kosongkan</button></div>
        <p className="eslux-note">Maklum balas ini tidak dihantar secara automatik. Sila kongsi teks atau fail kepada pasukan projek.</p><p role="status">{status}</p>
      </form>
    </section>
  </div>;
}
