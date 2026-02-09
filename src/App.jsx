import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login"
import DashboardHome from "./pages/dashboard/DashboardHome";
import ProtectedRoute from "./components/ProtectedRoute";
// import { useEffect, useState } from "react";

// import { useState, useEffect } from "react";
// import Loader from "./components/Loader";

import ProfilePage from "./pages/dashboard/ProfilePage";
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
    // <ProtectedRoute>
      <DashboardHome />
    // {/* </ProtectedRoute> */}
  }
/>
<Route
  path="/dashboard/profile"
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  }
/>

<Route path="/test" element={<Test />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
