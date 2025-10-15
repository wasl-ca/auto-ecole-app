import Cards from "../components/Cards";
import Registrations from "../components/Registrations";
import Action from "../components/Action";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { t } = useTranslation();
  const { loading } = useAppContext();
  return (
    <div className="p-6">
      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <h1 className="text-2xl font-bold">{t("dashboard")}</h1>
          <Cards />
          <Registrations />
          <Action />
        </>
      )}
    </div>
  );
}
