const url = window.location.href.replace(/\/$/, "");
const lang = url.split("/").pop();

const versions = {
    pt: "AutoCompletePt.js",
    en: "AutoCompleteEn.js",
    es: "AutoCompleteEs.js"
};

if (versions[lang]) {
    fetch(`https://raw.githubusercontent.com/rbnwonknui/Contexto-AutoAwnser/refs/heads/main/Versions/AutoComplete/${versions[lang]}`)
        .then(r => r.text())
        .then(r => eval(r));
} else {
    window.location.href = "https://contexto.me/";
}
