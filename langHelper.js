// Detekce preferovaného jazyka uživatele
const userLanguage = navigator.language || navigator.languages[0] || 'en-US';

// Normalizace norských variant (no, nb, nn) na jednotné 'no'
const normalizeLanguage = (lang) => {
  if (['no', 'nb', 'nn'].includes(lang)) return 'no';
  return lang;
};

// Seznam podporovaných jazyků a jejich cesty
const supportedLanguages = ['cs', 'en', 'sv', 'fi', 'no', 'de', 'fr', 'it', 'es', 'ja'];
const languagePaths = {
  cs: '/cs',
  en: '/en',
  sv: '/sv',
  fi: '/fi',
  no: '/no',
  de: '/de',
  fr: '/fr',
  it: '/it',
  es: '/es',
  ja: '/ja'
};

// Zjištění hlavního jazyka s normalizací a přiřazení správné cesty
const primaryLanguage = normalizeLanguage(userLanguage.split('-')[0].toLowerCase());

/*
const redirectPath = supportedLanguages.includes(primaryLanguage)
  ? languagePaths[primaryLanguage]
  : languagePaths['en']; // Defaultně angličtina

// Získání aktuální cesty
const currentPath = window.location.pathname;

// Zabránění přesměrování, pokud aktuální cesta obsahuje již jazykovou variantu
const isExplicitLanguagePath = supportedLanguages.some((lang) =>
  currentPath.startsWith(`/${lang}`)
);

if (!isExplicitLanguagePath && currentPath !== redirectPath) {
  const newUrl = `${window.location.origin}${redirectPath}`;
  window.location.replace(newUrl); // Přesměrování na správnou URL
}
*/

// Mapování jazyka na Apple App Store country code
// (ne vždy odpovídá ISO jazykovému kódu – např. 'ja' → 'jp', 'no'/'nb'/'nn' → 'no')
const appStoreCountryMap = {
  cs: 'cz',
  en: 'us',
  sv: 'se',
  fi: 'fi',
  no: 'no',
  de: 'de',
  fr: 'fr',
  it: 'it',
  es: 'es',
  ja: 'jp'
};

// Získání region části z user language (část za pomlčkou), pokud existuje
// Pro nb-NO, nn-NO i no → výsledek bude vždy 'no'
const rawVariant = userLanguage.split('-')[1]?.toLowerCase() || null;
const languageVariant = rawVariant
  ? normalizeLanguage(rawVariant) === 'no' ? 'no' : rawVariant
  : (appStoreCountryMap[primaryLanguage] || primaryLanguage);

// Výsledný App Store country code: priorita 1) mapovací tabulka, 2) odvozený variant
const appStoreCountry = appStoreCountryMap[primaryLanguage] || languageVariant;

// Generování správné URL pro App Store
const appStoreUrl = `https://apps.apple.com/${appStoreCountry}/app/id6553980733?l=${primaryLanguage}`;

// Funkce pro aktualizaci href odkazu
const updateAppStoreLink = () => {
  const appStoreLink = document.querySelector('.app-store');
  if (appStoreLink) {
    appStoreLink.href = appStoreUrl;
  } else {
    setTimeout(updateAppStoreLink, 100);
  }
};

document.addEventListener('DOMContentLoaded', updateAppStoreLink);
