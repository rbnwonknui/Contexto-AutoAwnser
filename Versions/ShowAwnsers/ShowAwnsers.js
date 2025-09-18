console.clear();
console.log("By rbnwonknui");

function playAudio(url) {
  const audio = new Audio(url);
  audio.play().catch(e => console.log('Audio play failed:', e));
}

playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');

const url = window.location.href.replace(/\/$/, "");
const lang = url.split("/").pop();

const versions = {
    pt: "ShowAwnsersPt.js",
    en: "ShowAwnsersEn.js",
    es: "ShowAwnsersEs.js"
};

if (versions[lang]) {
    fetch(`https://raw.githubusercontent.com/rbnwonknui/Contexto-AutoAwnser/refs/heads/main/Versions/ShowAwnsers/${versions[lang]}`)
        .then(r => r.text())
        .then(r => eval(r));
} else {
    window.location.href = "https://contexto.me/";
}
