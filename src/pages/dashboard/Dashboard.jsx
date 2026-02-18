import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Overview from "./DashboardOverview";
import { dashboardAPI } from "../../services/dashboardService";
import {Outlet} from "react-router-dom";

import DashboardLayout from "../../components/layout/DashboardLayout";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
  loadDashboard();
  const interval = setInterval(loadDashboard, 60000);
  return () => clearInterval(interval);
}, []);


  const loadDashboard = async () => {
    try {
      const data = await dashboardAPI.getOverview();
      setDashboardData(data);
    } catch (error) {
      console.error("Dashboard load failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
          Executive Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Real-time financial & operational overview
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      )}

      {/* Dashboard Content */}
      {!loading && dashboardData && (
        <Overview data={dashboardData} />
      )}

        {/* Nested Routes */}
        <Outlet />
    </DashboardLayout>
  );
}
