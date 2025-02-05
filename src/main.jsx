import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Screens/Superadmin/Login.jsx";
import SuperAdmin from "./Layout/SuperAdmin";
import Business from "./Screens/Superadmin/Business";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<SuperAdmin />}>
          <Route path="/business" element={<Business />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
