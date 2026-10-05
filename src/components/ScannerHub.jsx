import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import scannerBg from '../assets/prambanan-background.png';

export default function ScannerHub() {
  const [student, setStudent] = useState({});
  const [scannerError, setScannerError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStudent = JSON.parse(sessionStorage.getItem('mathventure_student') || '{}');
    if (!savedStudent.name) {
      navigate('/auth');
      return;
    }
    setStudent(savedStudent);

    let html5QrCode = null;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode("qr-reader");
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 230, height: 230 },
          },
          (decodedText) => {
            html5QrCode.stop().catch(() => {});
            sessionStorage.setItem('current_gate', decodedText);
            
            if (decodedText.includes('Pengging') || decodedText.includes('QR1')) {
              navigate('/mission/qr1');
            } else if (decodedText.includes('Baka') || decodedText.includes('QR2')) {
              navigate('/mission/qr2');
            } else if (decodedText.includes('Sanggabuwana') || decodedText.includes('QR3')) {
              navigate('/mission/qr3');
            } else if (decodedText.includes('Mpu Pustaka') || decodedText.includes('QR4')) {
              navigate('/mission/qr4');
            } else if (decodedText.includes('Roro Jonggrang') || decodedText.includes('QR5')) {
              navigate('/mission/qr5');
            } else if (decodedText.includes('Fajar') || decodedText.includes('QR6')) {
              navigate('/mission/qr6');
            } else if (decodedText.includes('Sertifikat') || decodedText.includes('QR7')) {
              navigate('/mission/qr7');
            } else {
              navigate('/mission/qr1');
            }
          },
          () => {}
        );
        setIsScanning(true);
      } catch (err) {
        console.error("Gagal memulai kamera:", err);
        setScannerError("Gagal mengakses kamera. Pastikan izin kamera diizinkan pada browser Anda.");
      }
    };

    const timer = setTimeout(() => {
      startScanner();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(err => console.log(err));
      }
    };
  }, [navigate]);

  return (
    <main className="flex flex-col relative w-full min-h-screen text-on-surface items-center justify-center py-6">
      
      <div className="fixed inset-0 z-0">
        <img 
          src={scannerBg} 
          alt="Latar Belakang Candi Prambanan" 
          className="w-full h-full object-cover object-center filter brightness-95"
        />
        <div className="absolute inset-0 bg-neutral-950/65 backdrop-blur-[3px]"></div>
      </div>

      <div className="relative z-10 flex flex-col w-full px-4 pb-12 space-y-4 select-none max-w-md mx-auto my-auto">
        
        <div className="flex items-center justify-between pt-3 pb-1 w-full bg-[#fff1e4]/95 backdrop-blur-md px-4 rounded-2xl shadow-lg border border-amber-500/30">
          <button 
            onClick={() => navigate('/auth')}
            className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-amber-900 shadow-sm hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back_ios_new</span>
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold font-serif tracking-tight text-amber-950">MATHVENTURE PRAMBANAN</h1>
            <p className="text-[10px] text-secondary font-semibold">Legenda & Pola Bilangan • Scanner Chamber</p>
          </div>
          <div className="flex items-center space-x-1.5">
            <button 
              onClick={() => { sessionStorage.clear(); navigate('/auth'); }}
              className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-amber-900 shadow-sm cursor-pointer"
              title="Keluar"
            >
              <span className="material-symbols-outlined text-base">account_circle</span>
            </button>
          </div>
        </div>

        <div className="w-full rounded-2xl bg-[#fff1e4]/95 backdrop-blur-md p-4 shadow-xl border border-amber-500/30 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-1.5 mb-1">
            <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Pusat Pemindaian</span>
          </div>
          <h2 className="text-sm font-bold text-amber-950 font-serif">Kamera Scanner Gerbang Candi</h2>
          <p className="text-[11px] text-stone-700 mt-0.5 leading-relaxed font-medium">
            Arahkan kamera smartphone ke <strong>QR Code</strong> pada pos candi untuk membuka tantangan matematika.
          </p>
          {scannerError && (
            <p className="text-[11px] text-red-600 mt-2 font-bold bg-red-100 p-2 rounded-lg border border-red-300">
              {scannerError}
            </p>
          )}
        </div>

        <div className="w-full rounded-2xl bg-stone-900/95 backdrop-blur-md p-3 shadow-2xl relative overflow-hidden border border-amber-500/40 text-center">
          <div className="relative z-10 space-y-3">
            <div id="qr-reader" className="overflow-hidden rounded-xl bg-white/95 backdrop-blur border border-amber-900/20 min-h-[260px]"></div>
            {!isScanning && !scannerError && (
              <p className="text-xs text-amber-200 animate-pulse py-2">Memuat kamera perangkat...</p>
            )}
          </div>
        </div>

        <div className="w-full rounded-2xl bg-[#fff1e4]/95 backdrop-blur-md p-3.5 shadow-xl flex items-center justify-between border border-amber-500/30">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs shadow">
              {student.name ? student.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-amber-950">{student.name || 'Anwar'}</h4>
              <p className="text-[10px] text-stone-700 font-medium">{student.className || 'Teknik Informatika'} • #{student.absentNo || '14'}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-amber-900 bg-amber-200 px-2.5 py-1 rounded-full">
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            <span className="text-[10px] font-bold">Aktif</span>
          </div>
        </div>

      </div>
    </main>
  );
}