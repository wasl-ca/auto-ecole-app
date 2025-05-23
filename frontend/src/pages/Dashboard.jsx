import Cards from "../components/Cards";
import Registrations from "../components/Registrations";
import Action from "../components/Action";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("dashboard")}</h1>
      <Cards />
      <Registrations />
      <Action />
    </div>
  );
}
