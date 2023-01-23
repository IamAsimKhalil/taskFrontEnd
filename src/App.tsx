import React from "react";
import "./App.css";
import CustomerOrders from "./customerOrders";
import AddOrders from "./addOrders";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<CustomerOrders />} />
          <Route path="/addOrders" element={<AddOrders />} />
        </Routes>
      </Router>
    </div>
  );
}
