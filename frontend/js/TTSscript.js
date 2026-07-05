const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "en-GB": "English",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

document.addEventListener("DOMContentLoaded", function () {
    const fromText = document.querySelector(".from-text"),
        toText = document.querySelector(".to-text"),
        exchageIcon = document.querySelector(".exchange"),
        selectTag = document.querySelectorAll("select"),
        icons = document.querySelectorAll(".row i"),
        translateBtn = document.querySelector("button"),
        imageInput = document.querySelector("#imageInput");

    // Populate Language Dropdowns
    selectTag.forEach((tag, id) => {
        for (let country_code in countries) {
            let selected = id === 0
                ? country_code === "en-GB" ? "selected" : ""
                : country_code === "hi-IN" ? "selected" : "";
            let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
            tag.insertAdjacentHTML("beforeend", option);
        }
    });

    // Swap Languages and Text
    exchageIcon.addEventListener("click", () => {
        let tempText = fromText.value,
            tempLang = selectTag[0].value;

        fromText.value = toText.value;
        toText.value = tempText;
        selectTag[0].value = selectTag[1].value;
        selectTag[1].value = tempLang;
    });

    // Clear Translation Field If No Input
    fromText.addEventListener("keyup", () => {
        if (!fromText.value.trim()) {
            toText.value = "";
        }
    });

    // Handle Image Upload and Extract Text
    imageInput.addEventListener("change", async () => {
        if (imageInput.files.length === 0) return;

        const file = imageInput.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
            const image = reader.result;

            // OCR: Extract text from image
            Tesseract.recognize(image, 'eng') // Change language code if needed
                .then(({ data: { text } }) => {
                    fromText.value = text.trim();
                    readText(text); // Read extracted text aloud
                })
                .catch(err => console.error("OCR Error:", err));
        };
    });

    // Function to Read Text Aloud
    function readText(text, lang = "en") {
        if (!text.trim()) return;
        let utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        speechSynthesis.speak(utterance);
    }

    // Translate Extracted or Typed Text
    translateBtn.addEventListener("click", () => {
        let text = fromText.value.trim(),
            translateFrom = selectTag[0].value || "en-GB",
            translateTo = selectTag[1].value || "hi-IN";

        if (!text) return;
        toText.setAttribute("placeholder", "Translating...");

        let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;
        
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.responseData && data.responseData.translatedText) {
                    toText.value = data.responseData.translatedText;
                    readText(toText.value, translateTo); // Read Translated Text Aloud
                } else {
                    toText.value = "Translation failed";
                }
                toText.setAttribute("placeholder", "Translation");
            })
            .catch(error => {
                console.error("Translation API Error:", error);
                toText.value = "Error translating text";
            });
    });

    // Handle Copy and Speech Icons
    icons.forEach(icon => {
        icon.addEventListener("click", ({ target }) => {
            if (!fromText.value && !toText.value) return;

            if (target.classList.contains("fa-copy")) {
                let textToCopy = target.id === "from" ? fromText.value : toText.value;
                navigator.clipboard.writeText(textToCopy);
            } else {
                let textToSpeak = target.id === "from" ? fromText.value : toText.value;
                let langToUse = target.id === "from" ? selectTag[0].value : selectTag[1].value;
                readText(textToSpeak, langToUse);
            }
        });
    });
});
