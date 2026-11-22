import './manual-logo.css';

/** Logo besar rasmi sentiasa diam. Putaran hanya untuk simbol kecil selepas scroll. */
export default function ManualLogo({ onHome }) {
  return (
    <button type="button" className="esl-logo-button" onClick={() => onHome?.()}
      aria-label="eSL-IKR – kembali ke halaman utama" title="Kembali ke halaman utama">
      <span className="esl-logo-static">
        <img className="esl-logo-image" src={`${import.meta.env.BASE_URL}eSL-IKR-logo.png`}
          alt="eSL-IKR – eSmart Learning IKR" draggable="false" />
      </span>
    </button>
  );
}
