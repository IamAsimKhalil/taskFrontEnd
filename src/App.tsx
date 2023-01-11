import { wrap } from "module";
import React, { useEffect, useState } from "react";
import "./App.css";

interface allCustomersPropTypes {
  customerID: number;
  customerName: string;
}
interface selectedCustomerpropTypes {
  customerID: number;
}
interface ordersPropsTypes {
  orderID: number;
  productID: number;
  customerID: number;
  totalAmmount: number;
  orderDate: string;
  comments: string;
}

function App() {
  const allCustInitialState = {
    customerID: 0,
    customerName: "Select customer",
  };
  const selectCustInitstate = {
    customerID: 1000,
  };
  const ordersInitialState = {
    orderID: 100,
    productID: 100,
    customerID: 100,
    totalAmmount: 0,
    orderDate: "not assigned",
    comments: "test",
  };
  const [allCustomers, setAllCustomers] = useState<allCustomersPropTypes[]>([
    allCustInitialState,
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    selectedCustomerpropTypes
  >(selectCustInitstate);

  const [orders, setOrders] = useState<ordersPropsTypes[]>([
    ordersInitialState,
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllCustomers([allCustInitialState, ...data]);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((response) => {
        return response.json();
      })
      .then((orderData) => {
        setOrders([...orderData]);
      });
  }, []);

  const handleSelectCustumer = (event: any) => {
    setSelectedCustomer({ customerID: event.target.value });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="record-controllers">
          <h5 className="h5-text">Customers</h5>
          <div className="row-orderDivs">
            <div className="customer-placeholder">
              <div className="placeholder-arrangements">
                <>
                  <select
                    className="customer-placeholder"
                    onChange={handleSelectCustumer}
                    value={selectedCustomer.customerID}
                  >
                    {allCustomers.map((data) => (
                      <option
                        className="dropdown-button"
                        value={data.customerID}
                      >
                        {data.customerName}
                      </option>
                    ))}
                  </select>
                </>
              </div>
            </div>
            <button className="button">New Record</button>
          </div>
        </div>
        {selectedCustomer.customerID !== 1000 && (
          <div className="order-history">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span style={{ marginLeft: "20px" }}>SR#</span>
              <span style={{ marginLeft: "70px" }}>ORDERID</span>
              <span style={{ marginLeft: "40px" }}>AMMOUNT</span>
              <span style={{ marginLeft: "20px" }}>COMMENTS</span>
            </div>
            <div className="record_container">
              {/* (selectedCustomer.customerID===orders.customerID) && */}
              {orders.map((data) => (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="record-display-area">1</div>
                  <div className="record-display-area">{data.orderID}</div>
                  <div className="record-display-area">{data.totalAmmount}</div>
                  <div className="record-display-area">{data.comments}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
