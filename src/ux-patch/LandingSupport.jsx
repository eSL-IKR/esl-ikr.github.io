// ESL-IKR UX PATCH 1: additive landing content only.
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
  ['Apakah perbezaan mod Belajar, Latihan dan Ujian?', 'Mod Belajar membantu anda mengenali langkah amali. Mod Latihan membolehkan anda berlatih, manakala mod Ujian menguji kemahiran anda.'],
];
export function LandingSupport() {
  return <div className="eslux-support">
    <section id="faq" aria-labelledby="eslux-faq-title">
      <h2 id="eslux-faq-title">Soalan lazim (FAQ)</h2><p>Jawapan ringkas untuk pengguna baharu.</p>
      {faq.map(([q,a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </section>
  </div>;
}
