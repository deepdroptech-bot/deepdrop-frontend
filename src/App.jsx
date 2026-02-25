import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login"
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardSummary from "./pages/dashboard/DashboardSummary";


// Dashboard sub-pages
import Overview from "./pages/dashboard/DashboardOverview";
import Dashboard from "./pages/dashboard/Dashboard";

//User management pages
import ProfilePage from "./pages/dashboard/ProfilePage";
import CreateUserModal from "./pages/dashboard/users/CreateUserModal";
import UsersPage from "./pages/dashboard/users/UsersPage";
import EditUserModal from "./pages/dashboard/users/EditUserModal";

// Staff Management pages
import StaffProfile from "./pages/dashboard/staff/StaffProfile";
import StaffList from "./pages/dashboard/staff/StaffList";
import CreateStaff from "./pages/dashboard/staff/CreateStaff";
import EditStaff from "./pages/dashboard/staff/EditStaff";
import StaffAdjustments from "./pages/dashboard/staff/StaffAdjustments";

// Daily Sales Management pages
import DailySalesSummary from "./pages/dashboard/dailysales/DailySalesSummary";
import DailySalesManagement from "./pages/dashboard/dailysales/DailySalesManagement";
import EditDailySales from "./pages/dashboard/dailysales/EditDailySales";
import CCreateDailySales from "./pages/dashboard/dailysales/CreateDailySales";
import ViewDailySales from "./pages/dashboard/dailysales/ViewDailySales";

// Inventory Management pages
import InventoryManagement from "./pages/dashboard/inventory/InventoryManagement";

// Bank Management pages
import BankManagement from "./pages/dashboard/bank/BankManagement";

// Retained Earnings Management page
import RetainedEarningsPage from "./pages/dashboard/retainedearnings/RetainedEarningsManagemen";

// PMSPL Management page
import PMSPLManagement from "./pages/dashboard/pmspl/PMSPLManagement";

// expense management page
import ExpenseManagement from "./pages/dashboard/expense/ExpenseManagement";

// profit and audit management page
import ProfitAuditManagement from "./pages/dashboard/profit&audit/Profit&AuditManagement";

// Unauthorized page
import Unauthorized from "./pages/dashboard/Unauthorized";

import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
   {/* Public routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login/agbor-rd" element={<Login />} />
        <Route path="/login/ekiosa" element={<Login />} />
        <Route path="/login" element={<Login />} />

 {/* Protected dashboard routes (admin) */}
  <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
  <Route path="/dashboard/allusers" element={<UsersPage />} />
  <Route path="/dashboard/allusers/create" element={<CreateUserModal />} />
  <Route path="/dashboard/allusers/edit/:id" element={<EditUserModal />} />
  </Route>

  {/* Protected dashboard routes (admin + manager + accountant) */}
  <Route element={<ProtectedRoute allowedRoles={["admin", "manager", "accountant"]} />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/dashboard/overview" element={<Overview />} />
  <Route path="/dashboard/profile" element={<ProfilePage />} />
  <Route path="/dashboard/daily-sales" element={<DailySalesManagement />} />
  <Route path="/dashboard/daily-sales/create" element={<CCreateDailySales />} />
  <Route path="/dashboard/daily-sales/edit/:id" element={<EditDailySales />} />
  <Route path="/dashboard/daily-sales/view/:id" element={<ViewDailySales />} />
  <Route path="/dashboard/inventory" element={<InventoryManagement />} />
  </Route>

  {/* Protected dashboard routes (admin + manager) */}
  <Route element={<ProtectedRoute allowedRoles={["admin", "manager"]} />}>
  <Route path="/dashboard/staff" element={<StaffList />} />
  <Route path="/dashboard/staff/create" element={<CreateStaff />} />
  <Route path="/dashboard/staff/edit/:id" element={<EditStaff />} />
  <Route path="/dashboard/staff/adjustments/:id" element={<StaffAdjustments />} />
  <Route path="/dashboard/staff/:id" element={<StaffProfile />} />
  </Route>

  {/* Protected dashboard routes (admin + accountant) */}
  <Route element={<ProtectedRoute allowedRoles={["admin", "accountant"]} />}>
  <Route path="/dashboard/bank" element={<BankManagement />} />
  <Route path="/dashboard/pmspl" element={<PMSPLManagement />} />
  <Route path="/dashboard/expenses" element={<ExpenseManagement />} />
  <Route path="/dashboard/profit-audit" element={<ProfitAuditManagement />} />
  <Route path="/dashboard/retained-earnings" element={<RetainedEarningsPage />} />
  </Route>

  {/* Unauthorized route */}
  <Route path="/unauthorized" element={<Unauthorized />} />

  {/* Catch-all for testing */}
<Route path="/test" element={<Test />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
