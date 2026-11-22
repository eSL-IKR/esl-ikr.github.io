/* Memasang latar sinematik SEKALI, dalam akar React sendiri (di luar #root),
   supaya App.jsx dan logik portal tidak disentuh. Dimuat daripada index.html. */
import { createRoot } from 'react-dom/client';
import CinematicBackground from './CinematicBackground.jsx';

if (!document.getElementById('cinematic-root')) {
  const host = document.createElement('div');
  host.id = 'cinematic-root';
  document.body.prepend(host);
  createRoot(host).render(<CinematicBackground />);
}
