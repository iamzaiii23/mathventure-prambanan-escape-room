import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { submitToGoogleSheet } from '../../services/sheetApi';
import qr7Bg from '../../assets/qr7-bg.png';
import mpuAvatar from '../../assets/mpu-pustaka.jpeg';

export default function MissionQR7() {
  const [claimed, setClaimed] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  let student = { name: "Anwar", className: "Teknik Informatika" };
  try {
    const saved = sessionStorage.getItem('mathventure_student');
    if (saved) student = JSON.parse(saved);
  } catch (err) {
    console.log(err);
  }
  
  const navigate = useNavigate();

  const handleClaimCertificate = async () => {
    setClaimed(true);

    // Kirim data kelulusan final ke Google Sheets via sheetApi
    const answersObj = { status: "Lulus Sempurna", certificateClaimed: "True" };
    await submitToGoogleSheet("Klaim Sertifikat Final (QR7)", student, answersObj, 100);
  };

  // Fungsi untuk mengunduh sertifikat sebagai gambar PNG
  const handleDownloadCertificate = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 3, // Meningkatkan resolusi gambar agar tajam
        useCORS: true,
        backgroundColor: '#fffdfa'
      });
      
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `Sertifikat-Mathventure-${student.name || 'JuruTulis'}.png`;
      link.click();
    } catch (error) {
      console.error("Gagal mengunduh sertifikat:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="flex flex-col relative w-full min-h-screen text-stone-900 items-center justify-center py-6">
      
      {/* Latar Belakang Gambar Pos 7 (qr7-bg.png) */}
      <div className="fixed inset-0 z-0">
        <img 
          src={qr7Bg} 
          alt="Pos 7 Sertifikat Final" 
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        <div className="absolute inset-0 bg-neutral-950/65 backdrop-blur-[3px]"></div>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col w-full px-4 pb-12 space-y-4 select-none max-w-md mx-auto my-auto">
        
        {/* Header Navigasi Atas */}
        <div className="flex items-center justify-between pt-3 pb-1 bg-[#fff1e4]/95 backdrop-blur-md px-4 rounded-2xl shadow-lg border border-amber-500/30">
          <button 
            onClick={() => navigate('/scanner')}
            className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-amber-900 shadow-sm hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">arrow_back_ios_new</span>
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold font-serif tracking-tight text-amber-950">MATHVENTURE PRAMBANAN</h1>
            <p className="text-[10px] text-amber-800 font-semibold">Escape Room • QR Code 7 (Final)</p>
          </div>
          <div className="w-9"></div>
        </div>

        {/* Banner Judul Misi */}
        <div className="w-full rounded-2xl bg-[#fff1e4]/95 backdrop-blur-md p-4 shadow-xl border border-amber-500/30 text-left relative overflow-hidden">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">QR Code 7 Final Active</span>
          <h2 className="text-sm font-bold text-amber-950 font-serif mt-0.5">Lencana Mpu Pustaka & Sertifikat</h2>
          <p className="text-[11px] text-stone-700 mt-1 leading-relaxed font-medium">
            Babak akhir petualangan! Tinjau kembali ringkasan arsip kerajaan dan klaim sertifikat kelulusanmu.
          </p>
        </div>

        {/* Kotak Dialog Mpu Pustaka */}
        <div className="relative w-full rounded-2xl bg-[#fff1e4]/95 backdrop-blur-md p-3.5 shadow-xl flex items-start space-x-3 border border-amber-500/30 text-left">
          <div className="w-10 h-10 rounded-full bg-amber-700 overflow-hidden flex-shrink-0 border border-amber-900/20 mt-0.5">
            <img 
              src={mpuAvatar} 
              alt="Mpu Pustaka" 
              className="w-full h-full object-cover object-top scale-125 pt-1" 
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-stone-800 leading-relaxed font-medium">
              “Luar biasa, Sahabat Muda! Kamu telah membuktikan ketangkasan berpikirmu menembus seluruh gerbang candi.”
            </p>
          </div>
        </div>

        {/* Infografis Ringkasan Pola Bilangan */}
        <div className="w-full rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-2xl border border-amber-500/30 text-left space-y-3">
          <h3 className="text-xs font-bold text-amber-950 font-serif flex items-center space-x-1.5 border-b border-stone-200 pb-2">
            <span className="material-symbols-outlined text-amber-700 text-base">auto_stories</span>
            <span>Infografis Arsip Pola Bilangan Kerajaan</span>
          </h3>
          
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-900/15 space-y-1 font-medium">
              <p className="font-bold text-amber-950">Aritmetika</p>
              <p className="text-stone-700 text-[10px]">Beda tetap (b). Rumus: U<sub>n</sub> = a + (n−1)b.</p>
            </div>
            <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-900/15 space-y-1 font-medium">
              <p className="font-bold text-amber-950">Geometri</p>
              <p className="text-stone-700 text-[10px]">Rasio tetap (r). Rumus: U<sub>n</sub> = a · r<sup>n−1</sup>.</p>
            </div>
            <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-900/15 space-y-1 font-medium">
              <p className="font-bold text-amber-950">Fibonacci</p>
              <p className="text-stone-700 text-[10px]">Jumlah dua suku sebelumnya untuk suku berikutnya.</p>
            </div>
            <div className="p-2.5 bg-amber-50/90 rounded-xl border border-amber-900/15 space-y-1 font-medium">
              <p className="font-bold text-amber-950">Pola Berjenjang</p>
              <p className="text-stone-700 text-[10px]">Selisih atau pengali bertingkat di tiap tingkatannya.</p>
            </div>
          </div>

          {!claimed ? (
            <button 
              onClick={handleClaimCertificate}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-800 to-orange-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-transform active:translate-y-0.5 cursor-pointer mt-3"
            >
              <span className="material-symbols-outlined text-base">workspace_premium</span>
              <span>Klaim Sertifikat Kelulusan Digital</span>
            </button>
          ) : (
            <div className="space-y-3 mt-4">
              
              {/* Bagian Sertifikat yang akan ditangkap menjadi gambar (Ref) */}
              <div 
                ref={certificateRef}
                className="p-5 bg-gradient-to-b from-amber-50 to-orange-50 border-2 border-amber-600/50 rounded-2xl text-center space-y-3 shadow-inner relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="w-12 h-12 bg-amber-700 text-white rounded-full flex items-center justify-center mx-auto shadow">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">Sertifikat Kelulusan Resmi</span>
                  <h4 className="text-sm font-bold font-serif text-amber-950 mt-1">Juru Tulis Kerajaan Prambanan</h4>
                </div>
                <div className="py-2 border-y border-amber-900/15 my-2">
                  <p className="text-xs text-stone-700 font-medium">Diberikan dengan bangga kepada:</p>
                  <p className="text-sm font-bold text-amber-950 font-serif mt-0.5">{student.name} ({student.className})</p>
                </div>
                <p className="text-[11px] text-stone-700 italic leading-relaxed px-2 font-medium">
                  “Selamat! Kamu telah berhasil memecahkan seluruh teka-teki pola bilangan dan menyelesaikan Petualangan Candi Prambanan bersama Mpu Pustaka!”
                </p>
              </div>

              {/* Tombol Unduh & Kembali */}
              <div className="space-y-2 pt-1">
                <button 
                  onClick={handleDownloadCertificate}
                  disabled={isDownloading}
                  className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow transition-colors flex items-center justify-center space-x-2 cursor-pointer text-xs"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>{isDownloading ? 'Menyiapkan Sertifikat...' : 'Unduh Sertifikat (PNG)'}</span>
                </button>

                <button 
                  onClick={() => navigate('/scanner')} 
                  className="w-full py-2.5 bg-amber-800 text-white font-bold rounded-xl shadow hover:bg-amber-900 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer text-xs"
                >
                  <span>Kembali ke Scanner Chamber</span>
                  <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}