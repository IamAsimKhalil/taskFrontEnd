import { wrap } from "module";
import React, { useEffect, useState } from "react";
import "./App.css";

interface allCustomersPropTypes {
  customerId: string | number;
  customerName: string;
}
interface selectedCustomerpropTypes {
  customerId: number;
}
interface ordersPropsTypes {
  orderId: number;
  productId: number;
  customerId: number;
  totalAmmount: number;
  orderDate: string;
  comments: string;
}

function App() {
  const allCustumersInitialState = {
    customerId: "",
    customerName: "Select customer",
  };
  const selectedCustumerInitalState = {
    customerId: 0,
  };
  const ordersInitialState = {
    orderId: 100,
    productId: 100,
    customerId: 100,
    totalAmmount: 0,
    orderDate: "not assigned",
    comments: "test",
  };
  const [allCustomers, setAllCustomers] = useState<allCustomersPropTypes[]>([
    allCustumersInitialState,
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState<
    selectedCustomerpropTypes
  >(selectedCustumerInitalState);

  const [orders, setOrders] = useState<ordersPropsTypes[]>([
    ordersInitialState,
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllCustomers([allCustumersInitialState, ...data]);
      });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/orders")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((orderData) => {
  //       setOrders([...orderData]);
  //     });
  // }, []);

  const handleSelectCustumer = (event: any) => {
    setSelectedCustomer({ customerId: event.target.value });
  };

  return (
    <>
      <div className="first-page-container">
        <div className="record-controllers">
          <h5 className="h5-text">Customers</h5>
          <div className="row-order-divs">
            <div className="customer-placeholder">
              <div className="placeholder-arrangements">
                <>
                  <select
                    className="customer-placeholder"
                    onChange={handleSelectCustumer}
                    value={selectedCustomer.customerId}
                  >
                    {allCustomers.map((data) => (
                      <option
                        className="dropdown-button"
                        value={data.customerId}
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
        {selectedCustomer.customerId !== 0 && (
          <div className="order-history">
            <div className="individual-records-container">
              <span className="serial-number">SR#</span>
              <span className="order-id">ORDERID</span>
              <span className="ammount">AMMOUNT</span>
              <span className="comments">COMMENTS</span>
            </div>
            <div className="record_container">
              {orders.map((data) => (
                <div className="individual-records-container">
                  <div className="record-display-area">1</div>
                  <div className="record-display-area">{data.orderId}</div>
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
