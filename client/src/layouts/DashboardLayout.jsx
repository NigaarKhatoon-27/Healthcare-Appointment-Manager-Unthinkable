import { Outlet } from "react-router-dom";

import DashboardNavbar from "../components/layout/DashboardNavbar";
import DashboardSidebar from "../components/layout/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <DashboardSidebar />

      {/* Main Content */}

      <div className="flex flex-1 flex-col">

        {/* Top Navbar */}

        <DashboardNavbar />

        {/* Page Content */}

        <main className="flex-1 p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}