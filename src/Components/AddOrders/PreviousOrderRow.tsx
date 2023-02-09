import React from "react";
import { productPropTypes } from "./addOrders";

interface allProductsPropTypes {
  allProducts: productPropTypes[];
}
const PreviousOrderRow = (props: allProductsPropTypes) => {
  return (
    <div>
      <div className="record-container">
        <div>
          {props.allProducts.map((item, index) => (
            <div key={item.productPrice}>
              <div className="individual-records-container">
                <div className="serial-record-display-area-output">
                  {index + 1}
                </div>
                <div className="product-name-placeholder">
                  {item.productName}
                </div>
                <div className="product-price-placeholder">
                  {item.productPrice}
                </div>
                <div className="product-price-placeholder">{item.quantity}</div>
                <div className="total-ammount-placeholder">
                  {item.totalPrice}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousOrderRow;
