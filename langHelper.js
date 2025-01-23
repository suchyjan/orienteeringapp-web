// Detekce preferovaného jazyka uživatele
const userLanguage = navigator.language || navigator.languages[0] || 'en-US';

// Seznam podporovaných jazyků a jejich cesty
const supportedLanguages = ['cs', 'en', 'sv', 'fi'];
const languagePaths = {
  cs: '/',
  en: '/en',
  sv: '/sv',
  fi: '/fi'
};

// Zjištění hlavního jazyka a přiřazení správné cesty
const primaryLanguage = userLanguage.split('-')[0].toLowerCase();
const redirectPath = supportedLanguages.includes(primaryLanguage)
  ? languagePaths[primaryLanguage]
  : languagePaths['en']; // Defaultně angličtina

// Získání aktuální cesty
const currentPath = window.location.pathname;

// Zabránění přesměrování, pokud aktuální cesta obsahuje již jazykovou variantu
const isExplicitLanguagePath = supportedLanguages.some(lang => currentPath.startsWith(`/${lang}`));

// Pokud aktuální cesta není explicitní a neodpovídá detekovanému jazyku, přesměruj
if (!isExplicitLanguagePath && currentPath !== redirectPath) {
  const newUrl = `${window.location.origin}${redirectPath}`;
  window.location.replace(newUrl); // Přesměrování na správnou URL
}

// Získání doplňkového jazyka (část za pomlčkou), pokud existuje
const languageVariant = userLanguage.split('-')[1]?.toLowerCase() || primaryLanguage;

// Generování správné URL pro App Store s parametrem 'l' podle detekovaného jazyka
const appStoreUrl = `https://apps.apple.com/${languageVariant}/app/id6553980733?l=${primaryLanguage}`;

// Funkce pro aktualizaci href odkazu
const updateAppStoreLink = () => {
  const appStoreLink = document.querySelector('.app-store');
  if (appStoreLink) {
    appStoreLink.href = appStoreUrl; // Aktualizuj href odkazu
  } else {
    // Pokud odkaz ještě neexistuje, opakuj pokus po krátké pauze
    setTimeout(updateAppStoreLink, 100); // Zkusíme to znovu po 100ms
  }
};

// Zavoláme funkci pro aktualizaci odkazu, jakmile je DOM připraven
document.addEventListener('DOMContentLoaded', updateAppStoreLink);
