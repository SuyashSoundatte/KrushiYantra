import React from "react";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code : '', name : 'Language' },
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mr', name : 'मराठी' },
  { code: 'kn', name : 'ಕನ್ನಡ' }
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className="flex items-center gap-1">
      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="text-sm font-bold rounded-md border-none bg-transparent outline-none  text-gray-700 "
      >
        {LANGUAGES.map(({ code, name }) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;