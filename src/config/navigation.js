import {
  LayoutDashboard,
  DollarSign,
  Users,
  Landmark,
  Fuel,
  Truck,
  Package,
  TrendingUp,
  ClipboardCheck
} from "lucide-react";

export const navItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
  { name: "Users", path: "dashboard/allusers", icon: Users },
  { name: "Daily Sales", path: "dashboard/daily-sales", icon: DollarSign },
  { name: "Staff", path: "dashboard/staff", icon: Users },
  { name: "Bank", path: "dashboard/bank", icon: Landmark },
  { name: "PMS", path: "dashboard/inventory", icon: Fuel },
  { name: "Products", path: "dashboard/inventory", icon: Package },
  { name: "P & L", path: "dashboard/pmspl", icon: TrendingUp },
  { name: "Audit", path: "dashboard/profit-audit", icon: ClipboardCheck },
  {name: "Retained Earnings", path: "dashboard/retained-earnings", icon: TrendingUp} 
];
