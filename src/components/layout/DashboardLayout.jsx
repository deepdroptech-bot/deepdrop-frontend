import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Outlet } from 'react-router-dom'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-blue-50">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-blue-100 p-4">
          <h2 className="text-blue-800 font-semibold">
            Executive Dashboard
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 pb-24 md:pb-6">
          {children}
        </main>

      </div>

      <MobileNav />

      <Outlet />
    </div>
  );
}
