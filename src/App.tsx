import React from "react";
import CustomerOrders from "./Components/CustomerOrders/customerOrders";
import AddOrders from "./Components/AddOrders/addOrders";

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
