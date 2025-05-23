import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Navbar() {
  const { menu, user, logout } = useAppContext();
  const { t } = useTranslation();
  return (
    <nav className="bg-white shadow flex justify-between px-6 py-4 items-center">
      <div className="flex items-center gap-2 font-bold text-xl">
        <span className="text-blue-600">🚗 </span> Auto Ecole
      </div>
      {user && (
        <>
          <div className="flex gap-6 text-gray-600">
            {menu.map((item) => (
              <Link key={item.path} to={item.path}>
                {t(item.name)}
              </Link>
            ))}
           
          </div>
          <span className="text-sm">
            {t("welcome", { username: user.fullName || user.username })}
          </span>
          <button
            onClick={logout}
            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
          >
            {t("logout")}
          </button>
        </>
      )}
    </nav>
  );
}
