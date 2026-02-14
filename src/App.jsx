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
   {/* Public routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login/agbor-rd" element={<Login />} />
        <Route path="/login/ekiosa" element={<Login />} />
        <Route path="/login" element={<Login />} />

 {/* Protected dashboard routes */}
        <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardHome />}>

    {/* User management routes */}
    <Route path="myprofile" element={<ProfilePage />} />
    <Route path="allusers" element={<UsersPage />} />
    <Route path="createuser" element={<CreateUserModal />} />
    <Route path="edituser" element={<EditUserModal />} />

    {/* Staff management routes */}
    <Route path="staff" element={<StaffList />} />
    <Route path="staff/new" element={<CreateStaff />} />
    <Route path="staff/:id/edit" element={<EditStaff />} />
    <Route path="staff/adjustments/:id" element={<StaffAdjustments />} />
    <Route path="staff/:id" element={<StaffProfile />} />

  </Route>
</Route>



<Route path="/test" element={<Test />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
