import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login"
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProtectedRoute from "./components/ProtectedRoute";

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

// import { useEffect, useState } from "react";

// import { useState, useEffect } from "react";
// import Loader from "./components/Loader";

import Test from "./pages/Test";

function App() {
  
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // simulate app boot / API check
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) return <Loader />;


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login/agbor-rd" element={<Login />} />
        <Route path="/login/ekiosa" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route
  path="/dashboard"
  element={
     <ProtectedRoute>
      <DashboardHome />
     </ProtectedRoute>
  }
/>
// User management routes
<Route element={<ProtectedRoute />}>
 <Route path="/dashboard/myprofile" element={<ProfilePage />} />
 <Route path="/dashboard/allusers" element={<UsersPage />} />
 <Route path="/dashboard/createuser" element={<CreateUserModal />} />
 <Route path="/dashboard/edituser" element={<EditUserModal />} />
</Route>

// Staff management routes
<Route element={<ProtectedRoute />}>
  <Route path="/dashboard/staff" element={<StaffList />} />
  <Route path="/dashboard/staff/new" element={<CreateStaff />} />
  <Route path="/dashboard/staff/:id/edit" element={<EditStaff />} />
  <Route path="/dashboard/staff/adjustments/:id" element={<StaffAdjustments />} />
  <Route path="/dashboard/staff/:id" element={<StaffProfile />} />
</Route>


<Route path="/test" element={<Test />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
