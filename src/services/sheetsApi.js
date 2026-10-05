const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEWeHajskA6A42v4PkurMy43xR5cvstlwHcqqk6289sNvOstasQSenTvQStHgAyvqNAQ/exec";

export async function submitToGoogleSheet(missionName, studentData, answers, score) {
  try {
    const payload = {
      timestamp: new Date().toISOString(),
      name: studentData.name || "Anwar",
      className: studentData.className || "Teknik Informatika",
      mission: missionName,
      answers: JSON.stringify(answers),
      score: score
    };

    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Data berhasil dikirim ke Google Sheets via sheetApi!");
    return true;
  } catch (error) {
    console.error("Gagal mengirim ke Google Sheets:", error);
    return false;
  }
}