let seconds = 0;
let timerRef = null;
let isRunning = false;
let isFarsi = false;

const timerLabel = document.getElementById('timerLabel');
const langBtn = document.getElementById('langBtn');
const txtStart = document.getElementById('txtStart');
const txtStop = document.getElementById('txtStop');
const txtReset = document.getElementById('txtReset');
const appBody = document.getElementById('appBody');

const translations = {
    en: { start: "Start", stop: "Stop", reset: "Reset", lang: "FA" },
    fa: { start: "شروع", stop: "توقف", reset: "ریست", lang: "EN" }
};

function start() {
    if (isRunning) return; // جلوگیری از ساخت تایمر جدید
    isRunning = true;

    timerRef = setInterval(updateTime, 1000);
    txtStart.innerText = translations[isFarsi ? "fa" : "en"].stop;
}

function pause() {
    clearInterval(timerRef);
    timerRef = null;
    isRunning = false;

    txtStart.innerText = translations[isFarsi ? "fa" : "en"].start;
}

function fullReset() {
    pause();
    seconds = 0;
    timerLabel.innerHTML = "00:00:00";
}

function updateTime() {
    seconds++;

    let h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    let m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    let s = String(seconds % 60).padStart(2, "0");

    timerLabel.innerHTML = `${h}:${m}:${s}`;
}

function toggleLang() {
    isFarsi = !isFarsi;
    const lang = isFarsi ? "fa" : "en";

    langBtn.innerText = translations[lang].lang;
    txtStart.innerText = isRunning ? translations[lang].stop : translations[lang].start;
    txtStop.innerText = translations[lang].stop;
    txtReset.innerText = translations[lang].reset;

    appBody.classList.toggle("rtl", isFarsi);
}

