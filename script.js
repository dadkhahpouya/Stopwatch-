let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let isFarsi = false;

const timerLabel = document.getElementById('timerLabel');
const langBtn = document.getElementById('langBtn');
const txtStart = document.getElementById('txtStart');
const txtReset = document.getElementById('txtReset');
const appBody = document.getElementById('appBody');

const translations = {
    en: { start: "Start", stop: "Stop", reset: "Reset", lang: "FA" },
    fa: { start: "شروع", stop: "توقف", reset: "ریست", lang: "EN" }
};

function toggleStartStop() {
    if (!isRunning) {
        // Start logic
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // آپدیت سریع برای دقت بالا
        updateButtonText();
    } else {
        // Stop logic
        isRunning = false;
        clearInterval(timerInterval);
        updateButtonText();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    
    let totalSeconds = Math.floor(elapsedTime / 1000);
    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    timerLabel.innerText = 
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function fullReset() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerLabel.innerText = "00:00:00";
    updateButtonText();
}

function updateButtonText() {
    const lang = isFarsi ? "fa" : "en";
    if (isRunning) {
        txtStart.innerText = translations[lang].stop;
        txtStart.style.backgroundColor = "#e74c3c"; // تغییر رنگ اختیاری برای Stop
    } else {
        txtStart.innerText = translations[lang].start;
        txtStart.style.backgroundColor = "var(--primary-bold)";
    }
}

function toggleLang() {
    isFarsi = !isFarsi;
    const lang = isFarsi ? "fa" : "en";

    langBtn.innerText = translations[lang].lang;
    txtReset.innerText = translations[lang].reset;
    updateButtonText();

    if (isFarsi) {
        appBody.classList.add("rtl");
    } else {
        appBody.classList.remove("rtl");
    }
}
