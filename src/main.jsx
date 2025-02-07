import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Screens/Superadmin/Login.jsx";
import SuperAdmin from "./Layout/SuperAdmin";
import Business from "./Screens/Superadmin/Business";
import RestaurantLayout from "./Layout/RestaurantLayout";
import RestaurantDashboard from "./Screens/Business/Restaurant/Dashboard";
import Foods from "./Screens/Business/Restaurant/Foods";
import Menu from "./Screens/User/Restaurant/Menu";
import Booking from "./Screens/User/Barber/Booking";
import Cheif from "./Screens/Business/Restaurant/Cheif/Cheif";
import CheifTable from "./Screens/Cheifs/CheifTable";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SuperAdmin />}>
          <Route path="/business" element={<Business />} />
        </Route>
        <Route element={<RestaurantLayout />}>
          <Route path="/resdash" element={<RestaurantDashboard />} />
          <Route path="/foods" element={<Foods />} />
        </Route>
        <Route path="/res/menu" element={<Menu />} />
        <Route path="/orders" element={<CheifTable />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
