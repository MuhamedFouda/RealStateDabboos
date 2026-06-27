import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  RiDashboardLine,
  RiBuildingLine,
  RiUserLine,
  RiCloseLine,
  RiBuilding2Line,
  RiSettings3Line,
  RiShieldLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const navItems = [
  { key: "dashboard", to: "/", icon: RiDashboardLine },
  { key: "properties", to: "/properties", icon: RiBuildingLine },
  { key: "clients", to: "/clients", icon: RiUserLine },
];

const utilityItems = [
  { labelEn: "Settings", labelAr: "الإعدادات", icon: RiSettings3Line },
  { labelEn: "Security", labelAr: "الأمان", icon: RiShieldLine },
];

export default function Sidebar({ isOpen, onClose }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const lang = i18n.language;
  const navigate = useNavigate();

  const handleLogout = () => navigate("/login");

  const hiddenTranslate = isRTL ? "translate-x-full" : "-translate-x-full";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/55"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ─── Sidebar Panel ─── */}
      <aside
        className={`
          fixed inset-y-0 start-0 z-50 w-64 flex flex-col
          sidebar-transition overflow-hidden
          bg-[#0d1117] border-e border-white/[0.06]
          ${isOpen ? "translate-x-0" : hiddenTranslate}
          lg:translate-x-0
        `}
        aria-label="Sidebar navigation"
      >
        {/* ─── Brand ─── */}
        <div className="relative flex items-center justify-between px-5 h-[70px] shrink-0 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Logo mark — Emerald border square */}
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-emerald-500 text-emerald-500 text-[18px]">
              <RiBuilding2Line />
            </div>

            <div>
              <span className="block text-[15px] font-bold tracking-wide leading-none text-slate-100">
                {t("nav.brand")}
              </span>
              <span className="block text-[9px] uppercase mt-0.5 font-medium text-slate-500 tracking-[0.18em]">
                {lang === "ar" ? "لوحة إدارية" : "Real Estate"}
              </span>
            </div>
          </div>

          {/* Mobile close */}
          <button
            onClick={onClose}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-slate-400 hover:bg-white/[0.04]"
            aria-label="Close sidebar"
          >
            <RiCloseLine className="text-lg" />
          </button>
        </div>

        {/* ─── Nav links ─── */}
        <nav className="flex-1 px-3 pt-5 pb-3 space-y-0.5 overflow-y-auto">
          {/* Section label */}
          <p className="px-3 mb-3 uppercase font-medium text-[10px] tracking-[0.14em] text-slate-500">
            {lang === "ar" ? "التنقل" : "Workspace"}
          </p>

          {navItems.map(({ key, to, icon: Icon }) => (
            <NavLink
              key={key}
              to={to}
              end={to === "/"}
              onClick={onClose}
              className="block"
            >
              {({ isActive }) => (
                <div
                  className={`
                    relative flex items-center gap-3 px-3 py-[10px] rounded-xl
                    transition-colors duration-150 cursor-pointer group
                    ${isActive ? "bg-emerald-500/[0.08]" : "hover:bg-white/[0.04]"}
                  `}
                >
                  {/* Leading Emerald rail (active only) */}
                  {isActive && (
                    <div className="absolute inset-y-2.5 start-0 w-[2px] rounded-full bg-emerald-500" />
                  )}

                  {/* Icon */}
                  <div
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-lg shrink-0 text-base transition-colors duration-150
                      ${isActive ? "text-emerald-400" : "text-slate-400"}
                    `}
                  >
                    <Icon />
                  </div>

                  {/* Label */}
                  <span
                    className={`
                      text-sm font-medium tracking-wide transition-colors duration-150
                      ${isActive ? "text-slate-100" : "text-slate-300"}
                    `}
                  >
                    {t(`nav.${key}`)}
                  </span>

                  {/* Trailing dot (active only) */}
                  {isActive && (
                    <div className="ms-auto w-[5px] h-[5px] rounded-full shrink-0 bg-emerald-400" />
                  )}
                </div>
              )}
            </NavLink>
          ))}

          {/* Divider */}
          <div className="my-4 mx-2 h-px bg-white/[0.06]" />

          {/* Section label */}
          <p className="px-3 mb-3 uppercase font-medium text-[10px] tracking-[0.14em] text-slate-500">
            {lang === "ar" ? "عام" : "General"}
          </p>

          {/* Utility items */}
          {utilityItems.map(({ labelEn, labelAr, icon: Icon }) => (
            <div
              key={labelEn}
              className="flex items-center gap-3 px-3 py-[10px] rounded-xl cursor-pointer transition-colors duration-150 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 text-base text-slate-400">
                <Icon />
              </div>
              <span className="text-sm font-medium text-slate-300">
                {lang === "ar" ? labelAr : labelEn}
              </span>
            </div>
          ))}
        </nav>

        {/* ─── User footer ─── */}
        <div className="shrink-0 px-3 py-4 space-y-1 border-t border-white/[0.06]">
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-[10px] rounded-xl cursor-pointer transition-colors duration-150 text-red-400/70 hover:bg-red-500/[0.07] hover:text-red-400"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 text-base">
              <RiLogoutBoxRLine />
            </div>
            <span className="text-sm font-medium">
              {lang === "ar" ? "تسجيل الخروج" : "Log out"}
            </span>
          </button>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mx-2 my-1" />

          {/* User card */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors duration-150 hover:bg-white/[0.04]"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face&q=80"
                alt="User avatar"
                className="w-9 h-9 rounded-lg object-cover border border-white/[0.06]"
              />
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-[#5cb87a] border-2 border-[#0d1117]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-none truncate text-slate-100">
                Muhamed Fouda
              </p>
              <p className="text-[11px] mt-1 truncate text-slate-400">
                {lang === "ar" ? "مدير النظام" : "Super Admin"}
              </p>
            </div>

            <span className="text-sm text-slate-500">{isRTL ? "‹" : "›"}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
