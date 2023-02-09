import { wrap } from "module";
import React, { useEffect, useState, useMemo } from "react";
import "../../cutomerOrders.css";

import OrderHearders from "./OrderHeaders";
import PastOrderDetails from "../AddOrders/PastOrderDetails";
import Button from "../AddOrders/Button";

interface allCustomersPropTypes {
  _id: string | undefined;
  customerName: string;
}
interface selectedCustomerpropTypes {
  _id: string;
}
export interface ordersPropsTypes {
  productID: string;
  customerID: string;
  orderID: string;
  totalAmmount: number;
  orderDate: string;
  comments: string;
}

function CustomerOrders() {
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
    fetch(`http://localhost:5000/api/orders?customerID=${selectedCustomer._id}`)
      .then((response) => {
        return response.json();
      })
      .then((orderData) => {
        setOrders([...orderData]);
      });
  }, []);

  const customerOrders = useMemo(() => {
    const data = orders.filter(
      (item) => selectedCustomer._id === item.customerID
    );
    return data;
  }, [selectedCustomer]);
  const fetchCustomers = () => {
    fetch("http://localhost:5000/api/customers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAllCustomers([allCustumersInitialState, ...data]);
      });
  };

  const handleAddOrder = () => {
    window.location.replace("/addOrders");
  };

  const handleSelectCustumer = (event: any) => {
    setSelectedCustomer({ _id: event.target.value });
    const data = allCustomers.filter((item) => item._id === event.target.value);
    localStorage.setItem("userName", data[0].customerName);

    localStorage.setItem("userID", data[0]._id || "");
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
                    onClick={fetchCustomers}
                    onChange={handleSelectCustumer}
                    value={selectedCustomer._id}
                  >
                    {allCustomers.map((data, index) => (
                      <option
                        className="dropdown-button"
                        value={data._id}
                        key={index}
                      >
                        {data.customerName}
                      </option>
                    ))}
                  </select>
                </>
              </div>
            </div>
            <Button
              className={"button"}
              onclick={handleAddOrder}
              title={"New Record"}
            />
          </div>
        </div>
        {selectedCustomer._id !== "" && (
          <div className="order-history">
            <OrderHearders />

            <div className="record-container">
              <PastOrderDetails allOrders={customerOrders} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerOrders;
