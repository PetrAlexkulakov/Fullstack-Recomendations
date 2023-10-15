import { useTranslation } from 'react-i18next';
import { loadLanguageFromLocalStorage, saveLanguageToLocalStorage } from '../../../shared/localization/languageDetector';

const Translation = ({ className }: { className?: string }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    saveLanguageToLocalStorage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <select className={"form-select" + className} value={loadLanguageFromLocalStorage() || 'en'} onChange={(e) => changeLanguage(e.target.value)}>
      <option value='en'>EN</option>
      <option value='ru'>RU</option>
    </select>
  )
}

export default Translation
