import React, { useState } from "react";

const MyOrders = (props) => {
  const [product, setProduct] = useState([
    {
      id: "1",
      productBrand: "Apple",
      productModel: "iPhone 7",
      memory: "32",
      productColor: "Black",
      img: [
        "/images/iphone-7-black.jpg",
        "/images/iphone-7-black.jpg",
        "/images/iphone-7-black.jpg",
      ],
      price: "340",
      count: 0,
    },
    {
      id: "2",
      productBrand: "Apple",
      productModel: "iPhone 7",
      memory: "32",
      productColor: "Black",
      img: [
        "/images/iphone-7-black.jpg",
        "/images/iphone-7-black.jpg",
        "/images/iphone-7-black.jpg",
      ],
      price: "340",
      count: 0,
    },
  ]);
  return (
    <div className="my_orders">
      <h5
        style={{
          color: "#4F4F4F",
          fontWeight: "600",
          marginBottom: "30px",
        }}
      >
        Sifarişlərim
      </h5>
      {!product.length && (
        <div className="inside_basket for_empty">
          <div className="is__empty">
            <img src="/images/shopping-cart.svg" />
            <h5 className="mt-4">Səbətiniz halhazırda boşdur</h5>
          </div>
        </div>
      )}
      <div className="inside_basket for__products"></div>
    </div>
  );
};

export default MyOrders;
