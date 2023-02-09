import React from "react";
import { ordersPropsTypes } from "../CustomerOrders/customerOrders";
interface allOrdersPropTypes {
  allOrders: ordersPropsTypes[];
}

const PastOrderDetails = (props: allOrdersPropTypes) => {
  return (
    <div>
      {props.allOrders.map((data, index) => (
        <div key={data.orderID}>
          {
            <div className="individual-records-container">
              <div className="serial-record-display-area">{index + 1}</div>
              <div className="record-display-area">{data.orderID}</div>
              <div className="record-display-area">{data.totalAmmount}</div>
              <div className="record-display-area">{data.comments}</div>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default PastOrderDetails;
