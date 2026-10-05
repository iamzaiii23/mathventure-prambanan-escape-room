import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authBg from '../assets/auth-bg.png';
import mpuAvatar from '../assets/mpu-pustaka.jpeg';

export default function AuthScreen() {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [absentNo, setAbsentNo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !absentNo) return;

    setIsLoading(true);

    const studentData = {
      name: name.trim(),
      className: studentClass.trim(),
      absentNo: absentNo,
      timestamp: new Date().toISOString()
    };
    sessionStorage.setItem('mathventure_student', JSON.stringify(studentData));

    setTimeout(() => {
      navigate('/scanner');
    }, 600);
  };

  return (
    <main className="flex flex-col relative w-full min-h-screen text-on-surface items-center justify-center py-6">
      
      {/* Latar Belakang Gambar 2D auth-bg dengan Efek Gelap Lembut */}
      <div className="fixed inset-0 z-0">
        <img 
          src={authBg} 
          alt="Latar Belakang Candi" 
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        {/* Overlay gradasi transparan agar kontras dengan kartu */}
        <div className="absolute inset-0 bg-neutral-950/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Konten Utama Formulir */}
      <div className="relative z-10 flex flex-col w-full px-4 space-y-4 select-none max-w-md mx-auto my-auto">
        
        {/* Banner / Header Candi */}
        <div className="relative w-full rounded-xl bg-surface-container-low/95 backdrop-blur-md shadow-lg overflow-hidden p-6 flex flex-col items-center text-center border border-amber-900/20">
          
          <div className="relative mt-2 mb-3 flex items-center justify-center">
            <div className="absolute -inset-3 bg-secondary-fixed rounded-full blur-md opacity-70 animate-pulse"></div>
            <div className="relative bg-surface-container-lowest p-2.5 rounded-xl shadow-md border border-amber-900/10">
              <span className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                temple_buddhist
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-highest rounded-full text-on-secondary-fixed mb-3 shadow-sm">
            <span className="material-symbols-outlined text-secondary text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>temple_buddhist</span>
            <span className="text-xs font-semibold tracking-wider">ꦱꦸꦒꦼꦁꦫꦮꦸꦃ (Sugeng Rawuh!)</span>
          </div>

          <h1 className="text-2xl font-bold text-on-surface tracking-tight mb-1 font-serif">
            MATHVENTURE PRAMBANAN
          </h1>
          <p className="text-sm font-semibold text-secondary">
            Ekspedisi Matematika Candi Prambanan
          </p>
          <p className="text-xs text-on-surface-variant max-w-xs mt-1">
            Jelajahi misteri candi kuno abad ke-9 lewat tantangan geometri, aljabar, dan logika seru!
          </p>
        </div>

        {/* Mascot Dialogue Card dengan Avatar Mpu Pustaka */}
        <div className="relative w-full rounded-xl bg-surface-container/95 backdrop-blur-md p-4 shadow-md flex items-start space-x-4 border border-amber-900/20">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-700 to-amber-400 flex items-center justify-center shadow-md overflow-hidden border-2 border-amber-900/30">
              <img 
                src={mpuAvatar} 
                alt="Mpu Pustaka" 
                className="w-full h-full object-cover object-top scale-125 pt-2"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-secondary-container text-on-secondary-container px-1.5 py-0.2 rounded-full text-[10px] font-bold shadow">
              Mpu
            </div>
          </div>
          <div className="flex-1 min-w-0 text-left">
            <div className="flex items-center space-x-1 mb-0.5">
              <span className="text-sm font-bold text-on-surface">Mpu Pustaka</span>
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              “Buka <span className="font-semibold text-primary">Adventure Book</span> lembar pertama, tuliskan identitasmu, dan bersiaplah membuka segel pintu rahasia candi!”
            </p>
          </div>
        </div>

        {/* Lontar Form Identitas */}
        <div className="w-full rounded-xl bg-surface-container-lowest/95 backdrop-blur-md p-6 shadow-xl relative overflow-hidden border border-amber-900/20 text-left">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-container via-surface-container-highest to-primary-container"></div>
          
          <div className="flex items-center space-x-2 mb-4 mt-1">
            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>badge</span>
            <h2 className="text-base font-bold text-on-surface font-serif">Data Penjelajah Muda</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface block" htmlFor="student-name">
                Nama Lengkap Siswa
              </label>
              <div className="relative flex items-center bg-surface-container-low rounded-lg shadow-inner border border-amber-900/10">
                <div className="pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">person</span>
                </div>
                <input 
                  id="student-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Arya Bimasena"
                  className="w-full bg-transparent py-2.5 px-3 text-sm text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface block" htmlFor="selected-class">
                Tingkat & Rombel Kelas
              </label>
              <div className="relative flex items-center bg-surface-container-low rounded-lg shadow-inner border border-amber-900/10">
                <div className="pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">school</span>
                </div>
                <input 
                  id="selected-class"
                  type="text"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Contoh: Kelas VII-A / VIII-B"
                  className="w-full bg-transparent py-2.5 px-3 text-sm text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-on-surface" htmlFor="student-number">
                  Nomor Presensi (Absen)
                </label>
                <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  01 – 36
                </span>
              </div>
              <div className="relative flex items-center bg-surface-container-low rounded-lg shadow-inner border border-amber-900/10">
                <div className="pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">tag</span>
                </div>
                <input 
                  id="student-number"
                  type="number"
                  min="1"
                  max="36"
                  required
                  value={absentNo}
                  onChange={(e) => setAbsentNo(e.target.value)}
                  placeholder="Ketik nomor absen (cth: 14)"
                  className="w-full bg-transparent py-2.5 px-3 text-sm text-on-surface placeholder:text-outline focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="relative w-full h-12 rounded-xl bg-gradient-to-r from-secondary to-secondary-container text-on-primary font-bold text-sm shadow-lg shadow-secondary/30 flex items-center justify-center space-x-2 transition-transform active:translate-y-0.5 hover:brightness-105 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                    <span>Membuka Gerbang Candi...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
                    <span>Mulai Petualangan</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </main>
  );
}