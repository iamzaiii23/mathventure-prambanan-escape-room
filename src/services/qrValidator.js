// src/services/qrValidator.js

export function validateQRCode(code) {
  // Simulasi pemetaan kode QR ke jalur misi per pos
  const missionMap = {
    'MATHVENTURE_PRAMBANAN_POS1_QR1': {
      valid: true,
      missionTitle: 'Pos 1: Strategi Pengging',
      redirectPath: '/mission/qr1'
    },
    'MATHVENTURE_PRAMBANAN_POS2_QR2': {
      valid: true,
      missionTitle: 'Pos 2: Gerbang Istana Baka',
      redirectPath: '/mission/qr2'
    },
    'MATHVENTURE_PRAMBANAN_POS3_QR3': {
      valid: true,
      missionTitle: 'Pos 3: Ajian Sanggabuwana',
      redirectPath: '/mission/qr3'
    },
    'MATHVENTURE_PRAMBANAN_POS4_QR4': {
      valid: true,
      missionTitle: 'Pos 4: Mpu Pustaka',
      redirectPath: '/mission/qr4'
    },
    'MATHVENTURE_PRAMBANAN_POS5_QR5': {
      valid: true,
      missionTitle: 'Pos 5: Roro Jonggrang',
      redirectPath: '/mission/qr5'
    },
    'MATHVENTURE_PRAMBANAN_POS6_QR6': {
      valid: true,
      missionTitle: 'Pos 6: Kebenaran Fajar',
      redirectPath: '/mission/qr6'
    },
    'MATHVENTURE_PRAMBANAN_POS7_QR7': {
      valid: true,
      missionTitle: 'Pos 7: Final & Sertifikat',
      redirectPath: '/mission/qr7'
    }
  };

  // Jika kode terdaftar di sistem misi
  if (missionMap[code]) {
    return missionMap[code];
  }

  // Fallback untuk simulasi otomatis (jika kode simulasi masuk, arahkan ke QR1)
  if (code && code.includes('MATHVENTURE')) {
    return {
      valid: true,
      missionTitle: 'Pos 1: Strategi Pengging',
      redirectPath: '/mission/qr1'
    };
  }

  return {
    valid: false,
    message: 'Kode QR tidak dikenali dalam sistem Candi Prambanan.'
  };
}