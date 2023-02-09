import React from "react";

const DisplayOrderHeaders = () => {
  return (
    <div className="individual-records-container">
      <span className="serial-number">SR#</span>
      <span className="product-name">PRODUCT NAME</span>
      <span className="unit-price">UNIT PRICE</span>
      <span className="quantity">QUANTITY</span>
      <span className="total-amount">TOTAL AMOUNT</span>
    </div>
  );
};

export default DisplayOrderHeaders;
