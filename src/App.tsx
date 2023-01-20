import { wrap } from "module";
import React, { useEffect, useState } from "react";
import "./App.css";

interface allCustomersPropTypes {
  _id: string | undefined;
  customerName: string;
}
interface selectedCustomerpropTypes {
  _id: string;
}
interface ordersPropsTypes {
  productID: string;
  customerID: string;
  orderID: string;
  totalAmmount: number;
  orderDate: string;
  comments: string;
}

function App() {
  const allCustumersInitialState = {
    _id: "",
    customerName: "Select customer",
  };
  const selectedCustumerInitalState = {
    _id: "",
  };
  const ordersInitialState = {
    productID: "",
    customerID: "",
    orderID: "",
    totalAmmount: 0,
    orderDate: "",
    comments: "",
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
    fetch("http://localhost:5000/api/orders")
      .then((response) => {
        return response.json();
      })
      .then((orderData) => {
        setOrders([...orderData]);
      });
  }, []);

  const handleSelectCustumer = (event: any) => {
    setSelectedCustomer({ _id: event.target.value });

    console.log(selectedCustomer);
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
                    value={selectedCustomer._id}
                  >
                    {allCustomers.map((data) => (
                      <option className="dropdown-button" value={data._id}>
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
        {selectedCustomer._id !== "" && (
          <div className="order-history">
            <div className="individual-records-container">
              <span className="serial-number">SR#</span>
              <span className="order-id">ORDERID</span>
              <span className="ammount">AMMOUNT</span>
              <span className="comments">COMMENTS</span>
            </div>

            <div className="record_container">
              {orders.map((data, index) => (
                <>
                  {selectedCustomer._id === data.customerID && (
                    <div className="individual-records-container">
                      <div className="serial-record-display-area">
                        {index + 1}
                      </div>
                      <div className="record-display-area">{data.orderID}</div>
                      <div className="record-display-area">
                        {data.totalAmmount}
                      </div>
                      <div className="record-display-area">{data.comments}</div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
