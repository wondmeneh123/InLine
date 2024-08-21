import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./App.jsx";
import Orders from "./Screens/Orders.jsx";
import OrdersPage from "./Screens/OrdersPage.jsx";

import SingleActiveOrderPage from "./Screens/SIngle.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/order" element={<OrdersPage />} />

        <Route
          path="/orders/active/:orderId"
          element={<SingleActiveOrderPage />}
        />

        <Route />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
