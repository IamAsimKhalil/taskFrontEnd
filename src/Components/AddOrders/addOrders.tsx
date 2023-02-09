import React, { useEffect, useState, useMemo, useRef } from "react";
// import "../../Styles/addOrders.css";
import "./../../addOrders.css";
import Button from "./Button";
import DisplayOrderHeaders from "./DisplayOrderHeaders";
import Input from "./Input";
import PreviousOrderRow from "./PreviousOrderRow";

interface ordersPropsTypes {
  productID: string;
  customerID: string;
  orderID: string;
  totalAmmount: number;
  orderDate: string;
  comments: string;
}

export interface productPropTypes {
  _id: string;
  productName: string;
  productPrice: number;
  quantity: number;
  totalPrice: number;
}

function AddOrders() {
  const [sendData, setSendData] = useState<ordersPropsTypes>({
    productID: "",
    orderID: "",
    orderDate: "",
    totalAmmount: 0,
    customerID: "",
    comments: "",
  });

  const productsInitialState = {
    _id: "",
    productName: "Select Product",
    productPrice: 0,
    quantity: 0,
    totalPrice: 0,
  };

  const [products, setProducts] = useState<productPropTypes[]>([
    productsInitialState,
  ]);
  const [selectedProduct, setSelectedProduct] = useState<productPropTypes>(
    productsInitialState
  );
  const [status, setStatus] = useState(false);
  const [totalAmmount, setTotalAmmount] = useState(0);
  const [allProducts, setAllProducts] = useState<productPropTypes[]>([]);
  const [userName, setUserName] = useState<any>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts([productsInitialState, ...data]);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("userName") && localStorage.getItem("userID")) {
      setUserName(localStorage.getItem("userName"));
      const userId = localStorage.getItem("userID");
      setSendData((prev) => ({ ...prev, customerID: userId || "" }));
    }
  }, []);

  const handleSelectProduct = (event: any) => {
    setSelectedProduct({
      _id: products[event.target.value]._id,
      productName: products[event.target.value].productName,
      productPrice: products[event.target.value].productPrice,
      quantity: products[event.target.value].quantity,
      totalPrice: products[event.target.value].totalPrice,
    });
    setSendData((prev) => ({
      ...prev,
      productID: products[event.target.value]._id,
    }));
  };

  const setQuantity = (event: any) => {
    const temp = { ...selectedProduct };
    temp.quantity = event.target.value;
    temp.totalPrice = event.target.value * temp.productPrice;
    setTotalAmmount(totalAmmount + temp.totalPrice);
    setSelectedProduct(temp);
    setSendData((prev) => ({
      ...prev,
      totalAmmount: totalAmmount + temp.totalPrice,
    }));
  };

  const createNewOrderField = () => {
    setStatus(true);
    const temp = [...allProducts];
    temp.push(selectedProduct);
    setSelectedProduct(productsInitialState);
    setAllProducts(temp);
  };

  const goToPreviousPage = () => {
    window.location.replace("/");
  };

  const onSaveHandler = async () => {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    });
    response && window.location.replace("/");
  };

  return (
    <div className="second-page-container">
      <section className="container">
        <div>
          <div>
            <Input
              className="firstInput"
              value={userName}
              placeholder="Name"
              readOnly={true}
            />
            <Input
              placeholder="Order Date"
              onChange={(e: any) =>
                setSendData((prev) => ({ ...prev, orderDate: e.target.value }))
              }
            />
          </div>
          <div>
            <Input
              className="firstInput"
              placeholder={"order Id"}
              onChange={(e: any) =>
                setSendData((prev) => ({ ...prev, orderID: e.target.value }))
              }
            />
            <Input
              placeholder={"comments"}
              onChange={(e: any) =>
                setSendData((prev) => ({ ...prev, comments: e.target.value }))
              }
            />
          </div>
        </div>
      </section>
      <div className="new-orders-area">
        <section>
          <div className="add-orders-area">
            <DisplayOrderHeaders />
            <div className="record-container">
              {status && <PreviousOrderRow allProducts={allProducts} />}
            </div>
            <div className="record-container">
              <>
                <div className="individual-records-container">
                  <div>
                    <input type="text" className="serial-record-display-area" />
                  </div>
                  <div>
                    <select
                      className="product-name-placeholder"
                      onChange={handleSelectProduct}
                    >
                      {products &&
                        products.map((data, index: any) => (
                          <option
                            className="dropdown-button"
                            value={index}
                            key={data._id}
                          >
                            {data.productName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="product-price-placeholder">
                    {selectedProduct.productPrice}
                    {/* <Input
                      className={"product-price-placeholder"}
                      placeholder={"unit Price"}
                      value={selectedProduct.productPrice}
                    /> */}
                  </div>

                  <div>
                    <Input
                      className={"product-quantity-placeholder"}
                      placeholder={"quantity"}
                      value={selectedProduct.quantity}
                      onChange={setQuantity}
                    />
                  </div>

                  <div className="total-ammount-placeholder">
                    {selectedProduct.totalPrice}

                    {/* <Input
                      className={"total-ammount-placeholder"}
                      placeholder={"total ammount"}
                      value={selectedProduct.totalPrice}
                    /> */}
                  </div>
                  <div>
                    <Button
                      className="add-record-button"
                      onclick={createNewOrderField}
                      title={"+"}
                    />
                  </div>
                </div>
              </>
            </div>
            <div>
              <span className="sum-text">Sum=</span>
              <input
                type="text"
                className="sum-placeholder"
                placeholder="Sum"
                value={totalAmmount}
                disabled
              />
            </div>
          </div>
        </section>
        <span>
          <Button
            title={"cancel"}
            className={"cancel-button"}
            onclick={goToPreviousPage}
          />
          <Button
            title={"Save"}
            className="save-button"
            onclick={onSaveHandler}
          />
        </span>
      </div>
    </div>
  );
}

export default AddOrders;
