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
  { name: "Users", path: "/allusers", icon: Users },
  { name: "Daily Sales", path: "/daily-sales", icon: DollarSign },
  { name: "Staff", path: "/staff", icon: Users },
  { name: "Bank", path: "/bank", icon: Landmark },
  { name: "PMS", path: "/inventory", icon: Fuel },
  { name: "Products", path: "/inventory", icon: Package },
  { name: "P & L", path: "/pmspl", icon: TrendingUp },
  { name: "Audit", path: "/profit-audit", icon: ClipboardCheck },
  {name: "Retained Earnings", path: "/retained-earnings", icon: TrendingUp} 
];
