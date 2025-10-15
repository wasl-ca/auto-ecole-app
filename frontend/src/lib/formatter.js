import { t } from "i18next";
function formatTunisianPhone(number) {
  // Remove non-digits
  const cleaned = number.replace(/\D/g, "");

  if (cleaned.length !== 8) return "Numéro invalide";

  return cleaned.replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
}

// format type code conduite from list with translation
function formatLessonType(type) {
  switch (type) {
    case "code":
      return t("type_theorique");
    case "conduite":
      return t("type_pratique");
    case "manoeuvre":
      return t("type_manoeuvre");
    default:
      return type;
  }
}

function parseTimeToDate(dateStr, timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(dateStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
}


export { formatTunisianPhone, formatLessonType, parseTimeToDate };