import React, { useEffect, useState, useMemo } from "react";
import "./addOrders.css";

interface ordersPropsTypes {
  productName: string;
  customerID: string;
  orderID: string;
  totalAmmount: number;
  orderDate: string;
  productPrice: number;
  comments: string;
}

interface productPropTypes {
  productName: string;
  productPrice: number;
  _id: string;
}
interface quantityPropsTypes {
  quantity: number;
}
function AddOrders() {
  const productsInitialState = {
    productName: "Select Product",
    productPrice: 0,
    _id: "",
  };
  const [status, setStatus] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>({ quantity: 0 });
  const [allProducts, setAllProducts] = useState<any>([]);
  const [userName, setUserName] = useState<any>("");

  const setData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      setUserName(localStorage.getItem("userName"));
    }
  });

  const setOrderValue = (event: any) => {
    setSelectedProduct({
      _id: products[event.target.value]._id,
      productName: products[event.target.value].productName,
      productPrice: products[event.target.value].productPrice,
    });
    products[event.target.value];
    console.log(products.productName);
  };

  const setQuantity = (event: any) => {
    const temp = { ...selectedProduct };
    temp.quantity = event.target.value;
    temp.totalPrice = event.target.value * temp.productPrice;
    setSelectedProduct(temp);
  };

  const createNewOrderField = () => {
    const temp = [...allProducts];
    temp.push(selectedProduct);
    setSelectedProduct({
      quantity: 0,
      productName: "",
      productPrice: 0,
      totalPrice: 0,
    });
    setAllProducts(temp);
  };

  useEffect(() => {
    setData();
  }, []);
  return (
    <div>
      <section className="container">
        <div>
          <div>
            <input
              type="text"
              className="firstInput"
              value={userName}
              disabled
              placeholder="Name"
            />
            <input type="text" placeholder="Order Date" />
          </div>
          <div>
            <input type="text" className="firstInput" placeholder="Order Id" />
            <input type="text" placeholder="Comments" />
          </div>
        </div>
      </section>
      <div className="new-orders-area">
        <section>
          <div className="add-orders-area">
            <div className="individual-records-container">
              <span className="serial-number">SR#</span>
              <span className="product-name">PRODUCT NAME</span>
              <span className="unit-price">UNIT PRICE</span>
              <span className="quantity">QUANTITY</span>
              <span className="total-amount">TOTAL AMOUNT</span>
            </div>

            <div className="record-container">
              <>
                {allProducts.map((item: any, index: any) => (
                  <div className="individual-records-container">
                    <div className="serial-record-display-area">
                      {index + 1}
                    </div>
                    <div className="product-name-placeholder">
                      {item.productName}
                    </div>
                    <div className="product-price-placeholder">
                      {item.productPrice}
                    </div>
                    <div className="product-price-placeholder">
                      {item.quantity}
                    </div>
                    <div className="total-ammount-placeholder">
                      {item.totalPrice}
                    </div>
                    <div className=""></div>
                  </div>
                ))}
              </>
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
                      onChange={(event) => setOrderValue(event)}
                      value={selectedProduct.productName}
                    >
                      {products &&
                        products.map((data: any, index: any) => (
                          <option className="dropdown-button" value={index}>
                            {data.productName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <input
                      type="text"
                      className="product-price-placeholder"
                      placeholder="unit price"
                      value={selectedProduct.productPrice}
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="product-quantity-placeholder"
                      placeholder="quantity"
                      onChange={setQuantity}
                      value={selectedProduct.quantity}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className="total-ammount-placeholder"
                      placeholder="total amount"
                      value={selectedProduct.totalPrice}
                      disabled
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => createNewOrderField()}
                      className="add-record-button"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    className="sum-placeholder"
                    placeholder="Sum"
                    value={selectedProduct.Sum}
                    disabled
                  />
                </div>
              </>
            </div>
          </div>
        </section>
        <span>
          <button
            className="cancel-button"
            onClick={() => window.location.replace("/")}
          >
            cancel
          </button>
          <button
            className="save-button"
            onClick={() => window.location.replace("/")}
          >
            Save
          </button>
        </span>
      </div>
    </div>
  );
}

export default AddOrders;
