import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout({ children }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-blue-50">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="bg-white shadow-sm border-b border-blue-100 p-4 flex justify-between items-center">

          {/* Left */}
          <h2 className="text-blue-800 font-semibold text-lg">
            Welcome back{user?.role ? `, ${user.role}` : ""}
          </h2>

          {/* Right - Profile Icon */}
          <Link
            to="/myprofile"
            className="flex items-center gap-2 text-blue-700 hover:text-blue-900 transition"
          >
            <UserCircleIcon className="w-8 h-8" />
          </Link>

        </header>

        {/* Content */}
        <main className="flex-1 p-6 pb-24 md:pb-6">
          {children}
        </main>

      </div>

      <MobileNav />
    </div>
  );
}

