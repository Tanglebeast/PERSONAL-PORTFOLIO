document.addEventListener("DOMContentLoaded", function () {
    const banner = document.getElementById("cookie-banner");
    const settingsPanel = document.getElementById("cookie-settings");

    const acceptAllBtn = document.getElementById("accept-all");
    const rejectAllBtn = document.getElementById("reject-all");
    const openSettingsBtn = document.getElementById("open-settings");
    const saveSettingsBtn = document.getElementById("save-settings");
    const reopenSettingsBtn = document.getElementById("open-cookie-settings");

    const statCookies = document.getElementById("statistic-cookies");
    const markCookies = document.getElementById("marketing-cookies");
    const persCookies = document.getElementById("personalization-cookies");

    function getCookiePreferences() {
        return JSON.parse(localStorage.getItem("cookiePreferences")) || {};
    }

    function savePreferences(preferences) {
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        applyPreferences(preferences);
    }

    function applyPreferences(preferences) {
        // Marketing-Cookies prüfen
        if (preferences.marketing) {
            loadElfsightWidget();
        } else {
            removeElfsightWidget();
        }

        // Statistik-Cookies deaktivieren (z. B. Clarity)
        if (preferences.statistic === false) {
            window.clarity = function () {};  
        }
    }

    function loadElfsightWidget() {
        if (!document.querySelector("script[data-elfsight]")) {
            const script = document.createElement("script");
            script.src = "https://static.elfsight.com/platform/platform.js";
            script.async = true;
            script.setAttribute("data-elfsight", "true");
            document.body.appendChild(script);
        }

        if (!document.querySelector(".elfsight-app-508b7260-b7a6-4565-9c0b-7a6784021560")) {
            const div = document.createElement("div");
            div.className = "elfsight-app-508b7260-b7a6-4565-9c0b-7a6784021560";
            div.setAttribute("data-elfsight-app-lazy", "");
            document.body.appendChild(div);
        }
    }

    function removeElfsightWidget() {
        document.querySelectorAll(".elfsight-app-508b7260-b7a6-4565-9c0b-7a6784021560").forEach(el => el.remove());
        document.querySelectorAll("script[data-elfsight]").forEach(el => el.remove());
    }

    acceptAllBtn.addEventListener("click", () => {
        savePreferences({ statistic: true, marketing: true, personalization: true });
        banner.style.display = "none";
    });

    rejectAllBtn.addEventListener("click", () => {
        savePreferences({ statistic: false, marketing: false, personalization: false });
        banner.style.display = "none";
    });

    openSettingsBtn.addEventListener("click", () => {
        settingsPanel.style.display = "block";
    });

    saveSettingsBtn.addEventListener("click", () => {
        const preferences = {
            statistic: statCookies.checked,
            marketing: markCookies.checked,
            personalization: persCookies.checked
        };
        savePreferences(preferences);
        settingsPanel.style.display = "none";
        banner.style.display = "none";
    });

    // Falls bereits eine Auswahl gespeichert ist, übernehme sie
    const savedPreferences = getCookiePreferences();
    if (Object.keys(savedPreferences).length > 0) {
        applyPreferences(savedPreferences);
        banner.style.display = "none";
    }

    // Button zum erneuten Öffnen der Einstellungen
    reopenSettingsBtn.addEventListener("click", () => {
        banner.style.display = "flex";
        settingsPanel.style.display = "block";
    });

    // Falls bereits gespeicherte Präferenzen existieren, Checkboxen aktualisieren
    window.onload = function() {
        if (savedPreferences.statistic) {
            statCookies.checked = true;
        }
        if (savedPreferences.marketing) {
            markCookies.checked = true;
        }
        if (savedPreferences.personalization) {
            persCookies.checked = true;
        }
    };
    
});
