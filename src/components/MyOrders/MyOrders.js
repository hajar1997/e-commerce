import React, { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const MyOrders = ({ handleMenuClick }) => {
  const [products, setProducts] = useState([
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
    {
      id: "3",
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
  const handleClick = (key) => {
    handleMenuClick({ key: `/order-details` });
  };

  return (
    <div className="my_orders">
      <h5
        style={{
          color: "#4F4F4F",
          fontWeight: "600",
          marginBottom: "30px",
        }}
      >
        {!products.length
          ? "Sifarişlərim"
          : `Sifarişlərim (${products.length} məhsul)`}
      </h5>
      {!products.length && (
        <div className="inside_basket for_empty">
          <div className="is__empty">
            <img src="/images/shopping-cart.svg" />
            <h5 className="mt-4">Səbətiniz halhazırda boşdur</h5>
          </div>
        </div>
      )}
      <div className="inside__basket">
        {products?.map((product) => (
          <div className="basket__product" key={product.id}>
            <div className="basket_product__container">
              <div className="basket_product__img">
                <img src={product.img[0]} />
              </div>
              <div className="basket_product__info">
                <div className="order__date">
                  <span>Sifariş tarixi:</span>
                  <h6>{new Date().toLocaleDateString().replace(/\//g, ".")}</h6>
                </div>
                <div className="basket__product_total_cost">
                  <span>Ümumi məbləğ:</span>
                  <h6>240 $</h6>
                </div>
                <Button
                  onClick={() => handleClick(product.id)}
                  className="basket_pr_destkop_btn"
                  type="ghost"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#F2F2F2",
                    float: "right",
                    width: "174px",
                    height: "44px",
                    fontWeight: "600",
                    marginTop: "40px",
                  }}
                >
                  Sifarişin detalları
                </Button>
              </div>
            </div>
            <Button
              onClick={() => handleClick(product.id)}
              className="basket_pr_mobile_btn"
              type="ghost"
              htmlType="submit"
              style={{
                backgroundColor: "#F2F2F2",
                float: "right",
                width: "174px",
                height: "44px",
                fontWeight: "600",
              }}
            >
              Sifarişin detalları
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
