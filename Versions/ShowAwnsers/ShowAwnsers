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
