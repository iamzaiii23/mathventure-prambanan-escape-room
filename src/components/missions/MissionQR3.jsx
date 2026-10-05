import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitToGoogleSheet } from '../../services/sheetApi';
import qr3Bg from '../../assets/qr3-bg.png';
import mpuAvatar from '../../assets/mpu-pustaka.jpeg';

export default function MissionQR3() {
  const [ans5a, setAns5a] = useState('');
  const [ans5b, setAns5b] = useState('');
  const [ans6a, setAns6a] = useState('');
  const [ans6b, setAns6b] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  const handleSubmitMission = async (e) => {
    e.preventDefault();
    if (!ans5a || !ans5b || !ans6a || !ans6b) return;

    setIsSubmitting(true);

    // Ambil data siswa dari sessionStorage
    const student = JSON.parse(sessionStorage.getItem('mathventure_student') || '{"name": "Anwar", "className": "Teknik Informatika"}');

    // Validasi kunci jawaban (Contoh: Misi 5a memuat angka 8, Misi 5b memuat 32)
    const isCorrect = ans5a.replace(/\s+/g, '').includes("8") && 
                      ans5b.replace(/\s+/g, '').includes("32") && 
                      ans6a.replace(/\s+/g, '').length > 0 && 
                      ans6b.replace(/\s+/g, '').length > 0;

    const score = isCorrect ? 100 : 0;
    const answersObj = { ans5a, ans5b, ans6a, ans6b };

    // Kirim data ke Google Sheets via sheetApi
    await submitToGoogleSheet("Segel Ajian Sanggabuwana (QR3)", student, answersObj, score);

    setTimeout(() => {
      setIsSubmitting(false);
      if (isCorrect) {
        setFeedback({
          correct: true,
          message: "Luar biasa! Mantra Fibonacci dan pola rasio negatif berhasil dipecahkan.",
          score: 100
        });
      } else {
        setFeedback({
          correct: false,
          message: "Jawabanmu belum tepat. Periksa kembali penjumlahan Fibonacci atau rasio barisan geometrimu di Adventure Book!",
          score: 0
        });
      }
    }, 800);
  };

  return (
    <main className="flex flex-col relative w-full min-h-screen text-on-surface items-center justify-center py-6">
      
      {/* Latar Belakang Gambar Pos 3 (qr3-bg.png) */}
      <div className="fixed inset-0 z-0">
        <img 
          src={qr3Bg} 
          alt="Pos 3 Segel Ajian Sanggabuwana" 
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
            <p className="text-[10px] text-secondary font-semibold">Escape Room • QR Code 3</p>
          </div>
          <div className="w-9"></div>
        </div>

        {/* Banner Judul Misi */}
        <div className="w-full rounded-2xl bg-[#fff1e4]/95 backdrop-blur-md p-4 shadow-xl border border-amber-500/30 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/10 rounded-full blur-xl pointer-events-none"></div>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">QR Code 3 Active</span>
          <h2 className="text-sm font-bold text-amber-950 font-serif mt-0.5">Segel Ajian Sanggabuwana</h2>
          <p className="text-[11px] text-stone-700 mt-1 leading-relaxed font-medium">
            Periksa soal lengkap pada <strong>Adventure Book</strong> halaman fisik, lalu masukkan hasil pemecahan masalahmu di bawah ini.
          </p>
        </div>

        {/* Kotak Dialog Mpu Pustaka */}
        <div className="relative w-full rounded-2xl bg-[#fff1e4]/95 backdrop-blur-md p-3.5 shadow-xl flex items-start space-x-3 border border-amber-500/30 text-left">
          <div className="w-10 h-10 rounded-full bg-amber-700 overflow-hidden flex-shrink-0 border border-amber-900/20 mt-0.5">
            <img 
              src={mpuAvatar} 
              alt="Mpu Pustaka" 
              className="w-full h-full object-cover object-top scale-125 pt-1" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-stone-800 leading-relaxed font-medium">
              “Untuk Fibonacci, jumlahkan dua angka terakhir ya, Sahabat Muda! Hati-hati dengan pola berganti tanda.”
            </p>
          </div>
        </div>

        {/* Kartu Clue & Petunjuk Pengerjaan */}
        <div className="w-full rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-2xl border border-amber-500/30 text-left space-y-4">
          
          <div className="p-3 bg-amber-50/90 rounded-xl border border-amber-900/15 text-xs text-stone-800 space-y-1">
            <p className="font-bold text-amber-950 flex items-center space-x-1">
              <span className="material-symbols-outlined text-sm text-primary">lightbulb</span>
              <span>Clue:</span>
            </p>
            <p className="text-[11px] text-stone-700 pl-5 font-medium">
              Untuk Fibonacci, jumlahkan dua angka terakhir. Untuk pola berganti tanda positif-negatif, gunakan perkalian/pembagian dengan bilangan negatif!
            </p>
          </div>

          <div className="p-3 bg-stone-50/90 rounded-xl border border-stone-200 text-xs text-stone-800 space-y-2">
            <p className="font-bold text-amber-950 flex items-center space-x-1">
              <span className="material-symbols-outlined text-sm text-secondary">menu_book</span>
              <span>Petunjuk Pengerjaan:</span>
            </p>
            <ul className="list-disc list-inside text-[11px] text-stone-700 space-y-1 pl-1 font-medium">
              <li><strong>Misi 5a:</strong> 3 + 5 = 8, 5 + 8 = 13, dst.</li>
              <li><strong>Misi 6a:</strong> Pola dibagi dengan −4.</li>
              <li><strong>Misi 6b:</strong> Barisan geometri dengan rasio r = −2. Rumus U<sub>n</sub> = 5 × (−2)<sup>n−1</sup>.</li>
            </ul>
          </div>

          {!feedback ? (
            <form onSubmit={handleSubmitMission} className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-amber-950 border-b border-stone-200 pb-1">Input Jawaban:</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-stone-800 block mb-0.5">Misi 5a (3 Suku)</label>
                  <input 
                    type="text" required value={ans5a} onChange={(e) => setAns5a(e.target.value)}
                    placeholder="[ , , ]"
                    className="w-full bg-[#fff8f4] py-2 px-2 text-xs text-stone-900 text-center rounded-lg border border-amber-900/30 focus:outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-800 block mb-0.5">Misi 5b (3 Suku)</label>
                  <input 
                    type="text" required value={ans5b} onChange={(e) => setAns5b(e.target.value)}
                    placeholder="[ , , ]"
                    className="w-full bg-[#fff8f4] py-2 px-2 text-xs text-stone-900 text-center rounded-lg border border-amber-900/30 focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-800 block mb-0.5">Misi 6a</label>
                <input 
                  type="text" required value={ans6a} onChange={(e) => setAns6a(e.target.value)}
                  placeholder="[ _____ ]"
                  className="w-full bg-[#fff8f4] py-2.5 px-3 text-xs text-stone-900 text-center rounded-lg border border-amber-900/30 focus:outline-none font-mono font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-800 block mb-0.5">Misi 6b (U<sub>n</sub>, U<sub>10</sub>, U<sub>25</sub>, U<sub>100</sub>)</label>
                <input 
                  type="text" required value={ans6b} onChange={(e) => setAns6b(e.target.value)}
                  placeholder="[ _____ ]"
                  className="w-full bg-[#fff8f4] py-2.5 px-3 text-xs text-stone-900 text-center rounded-lg border border-amber-900/30 focus:outline-none font-mono font-bold"
                />
              </div>

              <button 
                type="submit" disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-800 to-orange-700 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-transform active:translate-y-0.5 cursor-pointer mt-2"
              >
                {isSubmitting ? <span>Memeriksa Jawaban...</span> : <span>Kirim Jawaban</span>}
              </button>
            </form>
          ) : (
            <div className={`p-4 rounded-xl border text-xs space-y-3 ${feedback.correct ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-red-50 border-red-300 text-red-950'}`}>
              <div className="flex items-center space-x-2">
                <span className={`material-symbols-outlined text-xl font-bold ${feedback.correct ? 'text-emerald-700' : 'text-red-700'}`}>
                  {feedback.correct ? 'verified' : 'error'}
                </span>
                <span className="font-bold text-sm">
                  {feedback.correct ? 'QR 3 Berhasil Diselesaikan! (+100 Poin)' : 'Jawaban Belum Tepat!'}
                </span>
              </div>
              <p className={`text-[11px] leading-relaxed font-medium ${feedback.correct ? 'text-emerald-900' : 'text-red-900'}`}>
                {feedback.message}
              </p>
              <button 
                onClick={() => {
                  if (feedback.correct) {
                    navigate('/scanner');
                  } else {
                    setFeedback(null); // Reset form untuk coba lagi
                  }
                }} 
                className={`w-full py-2.5 text-white font-bold rounded-lg shadow transition-colors flex items-center justify-center space-x-1.5 cursor-pointer ${feedback.correct ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-red-700 hover:bg-red-800'}`}
              >
                {feedback.correct ? (
                  <>
                    <span>Kembali ke Scanner Chamber</span>
                    <span className="material-symbols-outlined text-sm">qr_code_scanner</span>
                  </>
                ) : (
                  <span>Coba Perbaiki Jawaban</span>
                )}
              </button>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}