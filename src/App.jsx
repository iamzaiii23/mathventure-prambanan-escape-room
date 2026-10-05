import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import ScannerHub from './components/ScannerHub';
import MissionQR1 from './components/missions/MissionQR1';
import MissionQR2 from './components/missions/MissionQR2';
import MissionQR3 from './components/missions/MissionQR3';
import MissionQR4 from './components/missions/MissionQR4';
import MissionQR5 from './components/missions/MissionQR5';
import MissionQR6 from './components/missions/MissionQR6';
import MissionQR7 from './components/missions/MissionQR7';

function QuickLinksBar() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const currentDomain = window.location.origin + window.location.pathname;

  const links = [
    { name: '1. Auth Screen', path: '/auth', url: `${currentDomain}#/auth` },
    { name: '2. Scanner Hub', path: '/scanner', url: `${currentDomain}#/scanner` },
    { name: '3. QR 1: Strategi Pengging', path: '/mission/qr1', url: `${currentDomain}#/mission/qr1` },
    { name: '4. QR 2: Gerbang Istana Baka', path: '/mission/qr2', url: `${currentDomain}#/mission/qr2` },
    { name: '5. QR 3: Ajian Sanggabuwana', path: '/mission/qr3', url: `${currentDomain}#/mission/qr3` },
    { name: '6. QR 4: Mpu Pustaka', path: '/mission/qr4', url: `${currentDomain}#/mission/qr4` },
    { name: '7. QR 5: Roro Jonggrang', path: '/mission/qr5', url: `${currentDomain}#/mission/qr5` },
    { name: '8. QR 6: Kebenaran Fajar', path: '/mission/qr6', url: `${currentDomain}#/mission/qr6` },
    { name: '9. QR 7: Final & Sertifikat', path: '/mission/qr7', url: `${currentDomain}#/mission/qr7` },
  ];

  const handleNavigate = (path) => {
    if (path !== '/auth') {
      sessionStorage.setItem('mathventure_student', JSON.stringify({ name: 'Anwar', className: 'Teknik Informatika', absentNo: '14' }));
    }
    navigate(path);
  };

  return (
    <div className="fixed bottom-2 left-2 right-2 z-50 max-w-md mx-auto bg-stone-900/90 backdrop-blur-md rounded-xl p-3 shadow-2xl border border-amber-500/40 text-white text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
        <span className="font-bold text-amber-400 flex items-center space-x-1">
          <span className="material-symbols-outlined text-sm">link</span>
          <span>Vite Preview Link Manager</span>
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-stone-400 hover:text-white text-[10px] bg-stone-800 px-2 py-0.5 rounded cursor-pointer">
          {isOpen ? 'Sembunyikan' : 'Tampilkan'}
        </button>
      </div>
      {isOpen && (
        <div className="space-y-2 pt-2 max-h-48 overflow-y-auto">
          {links.map((link, idx) => (
            <div key={idx} className="flex items-center justify-between bg-stone-800/80 p-1.5 rounded-lg border border-stone-700">
              <div className="truncate pr-2">
                <p className="font-semibold text-amber-200">{link.name}</p>
                <p className="text-[10px] font-mono text-stone-400 truncate">{link.url}</p>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <button onClick={() => handleNavigate(link.path)} className="px-2.5 py-1 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded text-[10px] transition-colors cursor-pointer">Buka</button>
                <button onClick={() => { navigator.clipboard.writeText(link.url); alert(`Tautan disalin!`); }} className="p-1 bg-stone-700 hover:bg-stone-600 text-stone-300 rounded transition-colors cursor-pointer" title="Salin Link">
                  <span className="material-symbols-outlined text-xs">content_copy</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/scanner" element={<ScannerHub />} />
        
        <Route path="/mission/qr1" element={<MissionQR1 />} />
        <Route path="/mission/qr2" element={<MissionQR2 />} />
        <Route path="/mission/qr3" element={<MissionQR3 />} />
        <Route path="/mission/qr4" element={<MissionQR4 />} />
        <Route path="/mission/qr5" element={<MissionQR5 />} />
        <Route path="/mission/qr6" element={<MissionQR6 />} />
        <Route path="/mission/qr7" element={<MissionQR7 />} />

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
      <QuickLinksBar />
    </Router>
  );
}