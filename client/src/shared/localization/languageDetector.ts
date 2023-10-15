export function saveLanguageToLocalStorage(language: string) {
  localStorage.setItem('selectedLanguage', language);
}

export function loadLanguageFromLocalStorage() {
  return localStorage.getItem('selectedLanguage');
}