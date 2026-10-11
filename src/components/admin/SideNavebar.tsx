import { NavLink } from "react-router-dom";
import type { IconType } from "react-icons";

import {
  FiActivity,
  FiBarChart2,
  FiBell,
  FiBox,
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiScissors,
  FiSettings,
  FiShoppingBag,
  FiStar,
  FiTag,
  FiUsers,
} from "react-icons/fi";

type SidebarLink = {
  to: string;
  label: string;
  icon: IconType;
  badge?: string;
  badgeTone?: "count" | "warning";
};

const groups: { title: string | null; links: SidebarLink[] }[] = [
  {
    title: null,
    links: [
      { to: "/admin/overview", label: "Overview", icon: FiGrid },
      { to: "/admin/appointments", label: "Appointments", icon: FiCalendar },
      { to: "/admin/customers", label: "Customers", icon: FiUsers },
      { to: "/admin/stylists", label: "Stylists", icon: FiScissors },
    ],
  },
  {
    title: "Products & Services",
    links: [
      { to: "/admin/wigs", label: "Wigs", icon: FiBox },
      { to: "/admin/services", label: "Services", icon: FiActivity },
      { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
      { to: "/admin/reviews", label: "Reviews", icon: FiStar },
    ],
  },
  {
    title: "Business",
    links: [
      { to: "/admin/payments", label: "Payments", icon: FiCreditCard },
      { to: "/admin/promotions", label: "Promotions", icon: FiTag },
      { to: "/admin/analytics", label: "Analytics", icon: FiBarChart2 },
    ],
  },
  {
    title: "System",
    links: [
      { to: "/admin/notifications", label: "Notifications", icon: FiBell },
      { to: "/admin/settings", label: "Settings", icon: FiSettings },
    ],
  },
];

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss navigation backdrop"
          className="fixed inset-0 z-40 cursor-default bg-[#211912]/35 lg:hidden"
        />
      )}

      <aside
        aria-label="Admin sidebar"
        className={`fixed left-0 top-16 z-50 h-[calc(100dvh-4rem)] w-64 overflow-y-auto border-r border-[#e8e2d8] bg-white px-4 py-5 shadow-xl transition-transform duration-200 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav aria-label="Admin navigation" className="flex flex-col gap-4">
          {groups.map((group) => (
            <div key={group.title ?? "main"}>
              {group.title && (
                <p className="mb-2 px-3 text-[10px] font-medium uppercase text-[#8b8176]">
                  {group.title}
                </p>
              )}
              <div className="flex flex-col gap-1">
                {group.links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9a7947] ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-black hover:bg-gray-100 hover:text-primary"
                      }`
                    }
                  >
                    <link.icon
                      aria-hidden="true"
                      className="shrink-0 text-base"
                    />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        className={`ml-auto whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          link.badgeTone === "warning"
                            ? "bg-[#ffe1e1] text-[#a72222]"
                            : "bg-[#ffe1a8] text-[#805b14]"
                        }`}
                      >
                        {link.badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
