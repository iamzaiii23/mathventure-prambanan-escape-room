import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthScreen from './components/AuthScreen';
import ScannerHub from './components/ScannerHub';
import MissionQR1 from './components/missions/MissionQR1';
import MissionQR2 from './components/missions/MissionQR2';
import MissionQR3 from './components/missions/MissionQR3';
import MissionQR4 from './components/missions/MissionQR4';
import MissionQR5 from './components/missions/MissionQR5';
import MissionQR6 from './components/missions/MissionQR6';
import MissionQR7 from './components/missions/MissionQR7';

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
    </Router>
  );
}