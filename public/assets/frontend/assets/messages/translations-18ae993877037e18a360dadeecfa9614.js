var TranslationMessages = function () {
};

TranslationMessages.resolveLang = function () {
    let locale = $("#locale").val();
    return typeof locale !== 'undefined' ? locale.substring(0, 2) : "en";
};

TranslationMessages.messages = {
    loans: {
        "en": "Loans",
        "ee": "Laenud",
        "de": "Projekte",
        "lv": "Projekti",
        "lt": "Projektai",
        "ru": "Займы"
    },

    users: {
        "en": "Users",
        "ee": "Kasutaja",
        "de": "Users de",
        "lv": "Lietotāji",
        "lt": "Vartotojai",
        "ru": "Пользователей"
    },

    deliveredAmount: {
        "en": "Funded amount",
        "ee": "Rahastatud summa",
        "lv": "Finansētais apjoms",
        "lt": "Finansuota suma",
        "de": "Finanzierter Betrag",
        "ru": "Финансируемая сумма"
    }
};

TranslationMessages.get = function (code, lang) {
    var self = this;
    lang = ((typeof lang !== 'undefined') ? lang : self.resolveLang());
    return this.messages[code][lang];
};
