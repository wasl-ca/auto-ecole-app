import { useTranslation } from "react-i18next";

const flagMap = {
  fr: "🇫🇷",
  en: "🇬🇧",
  ar: "🇹🇳", // Tunisia flag for Arabic
};
export default LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
    >
      <option value="fr">{flagMap.fr}Français</option>
      <option value="en">{flagMap.fr}English</option>
      <option value="ar">العربية{flagMap.ar}</option>
    </select>
  );
};

