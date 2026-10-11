import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/admin/SideNavebar";
import AdminTopbar from "../../components/admin/TopnavBar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isSidebarOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#24231f]">
      <AdminTopbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={() => setIsSidebarOpen((open) => !open)}
      />
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="min-h-screen px-5 pb-12 pt-24 sm:px-8 lg:ml-64 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
