import {
  ChevronDown, CircuitBoard, Cpu, Fan, Gpu, Layers2, MemoryStick, PcCase, PlugZap,
} from 'lucide-react';

const partIcons = {
  casing: PcCase,
  kaca: Layers2,
  mobo: CircuitBoard,
  penyejuk: Cpu,
  ram: MemoryStick,
  gpu: Gpu,
  psu: PlugZap,
  kipas: Fan,
};

export default function PCModelControls({
  parts, selected, onSelect, exploded, onExplode, spinning, onSpin, reduced, disabled,
}) {
  const part = parts.find(({ id }) => id === selected);
  const PartIcon = partIcons[selected] ?? Cpu;
  const rotationActive = spinning && !reduced;
  const rotationLabel = rotationActive ? 'Jeda putaran' : 'Sambung putaran';

  return (
    <div className="pc-tools" role="group" aria-label="Kawalan model PC 3D">
      <label className="pc-picker">
        <select
          aria-label="Pilih komponen"
          value={part?.id ?? ''}
          disabled={disabled}
          onChange={event => onSelect(event.target.value || null)}
        >
          <option value="">Semua komponen</option>
          {parts.map(({ id, label }) => <option key={id} value={id}>{label}</option>)}
        </select>
        <span className="pc-tool-face" aria-hidden="true">
          <span className="pc-part-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
              strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 2.5H2.5V7M17 2.5h4.5V7M21.5 17v4.5H17M7 21.5H2.5V17" />
              <PartIcon x="4.5" y="4.5" width="15" height="15" strokeWidth="2" />
            </svg>
          </span>
          <span className="pc-tool-label">{part?.label ?? 'Pilih komponen'}</span>
          <ChevronDown className="pc-tool-arrow" size={16} />
        </span>
      </label>
      <button className="pc-explode" type="button" disabled={disabled} onClick={onExplode}
        data-exploded={exploded}>
        <svg className="pc-driver" viewBox="0 0 24 24" width="24" height="24" fill="none"
          stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          <path d="m10.6 11.1 6.8-7.8a2.5 2.5 0 0 1 3.6-.2 2.5 2.5 0 0 1 .3 3.5l-6.9 7.8zM15 9.8l3.5-3.9" />
          <path d="m11.5 13.1-6 6.7-2.8 1.7 1.2-3.1 6.1-6.8" />
        </svg>
        <span>{exploded ? 'Pasang semula' : 'Bongkar'}</span>
      </button>
      <button className="pc-spin" type="button" disabled={disabled || reduced} onClick={onSpin}
        aria-label={rotationLabel} title={reduced ? 'Putaran dijeda mengikut tetapan pergerakan peranti' : rotationLabel}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
          strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.2 16.5a9 9 0 1 1-.8-10.2M20 2.9v4.5h-4.5" />
          {rotationActive
            ? <path d="M10.3 8.9v6.2m3.8-6.2v6.2" strokeWidth="2.2" />
            : <path d="m10.7 8.6 5 3.5-5 3.4z" fill="currentColor" strokeWidth=".6" />}
        </svg>
      </button>
    </div>
  );
}
