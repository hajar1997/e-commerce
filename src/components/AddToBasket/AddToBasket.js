import React, { useState } from "react";
import { Button, Divider } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faManatSign,
} from "@fortawesome/free-solid-svg-icons";

const AddToBasket = () => {
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
  const [productCount, setProductCount] = useState(0);

  const navigate = useNavigate();

  return (
    <div className="add_to_basket__">
      <div className="container">
        <h5>Səbət ({product.length} məhsul)</h5>
        {!product.length && (
          <div className="inside_basket for_empty">
            <div className="is__empty">
              <img src="/images/shopping-cart.svg" />
              <h5 className="mt-4">Səbətiniz halhazırda boşdur</h5>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#2DD06E",
                  width: "100%",
                  height: "44px",
                }}
                onClick={() => navigate("/")}
              >
                Alış-verişə davam et
              </Button>
            </div>
          </div>
        )}
        <div className="inside_basket for__products">
          <div className="row">
            <div className="col-lg-8">
              <div className="basket__products">
                {product.map((item) => (
                  <div className="basket_product" key={item.id}>
                    <div className="product__img">
                      <img src={item?.img[0]} />
                    </div>
                    <div className="second_row_wrapper">
                      <div className="product__title">
                        <h6>
                          {item.productBrand}, {item.productModel},{" "}
                          {item.memory}GB, {item.productColor}
                        </h6>
                      </div>
                      <div className="product_color_and_cost for_destkop">
                        <div className="product__color">
                          <h6 style={{ color: "#828282" }}>Rəng:</h6>
                          <h6>{item.productColor}</h6>
                        </div>
                        <div className="product__price">
                          <h5>{item.price} $</h5>
                        </div>
                      </div>
                      <div className="product_color_and_cost_mobile only_mobile">
                        <div className="color__cost_mobile">
                          <div className="product__color">
                            <h6 style={{ color: "#828282" }}>Rəng:</h6>
                            <h6>{item.productColor}</h6>
                          </div>
                          <div className="product__price">
                            <h5>{item.price} $</h5>
                          </div>
                        </div>
                        <div className="counter_container for_destkop">
                          <div className="product_counter">
                            <button
                              onClick={() =>
                                item.count > 0 &&
                                setProduct((prevState) => {
                                  const index = prevState.findIndex(
                                    (p) => p.id === item.id
                                  );
                                  const newProduct = [...prevState];
                                  newProduct[index].count =
                                    newProduct[index].count - 1;
                                  return newProduct;
                                })
                              }
                            >
                              <FontAwesomeIcon
                                style={{ fontSize: "13px", paddingRight: "0" }}
                                icon={faMinus}
                              />
                            </button>
                            <span>{item.count}</span>
                            <button
                              onClick={() =>
                                setProduct((prevState) => {
                                  const index = prevState.findIndex(
                                    (p) => p.id === item.id
                                  );
                                  const newProduct = [...prevState];
                                  newProduct[index].count =
                                    newProduct[index].count + 1;
                                  return newProduct;
                                })
                              }
                            >
                              <FontAwesomeIcon
                                style={{ fontSize: "13px", paddingRight: "0" }}
                                icon={faPlus}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="counter_container">
                      <div className="product_counter">
                        <button
                          onClick={() =>
                            item.count > 0 &&
                            setProduct((prevState) => {
                              const index = prevState.findIndex(
                                (p) => p.id === item.id
                              );
                              const newProduct = [...prevState];
                              newProduct[index].count =
                                newProduct[index].count - 1;
                              return newProduct;
                            })
                          }
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "13px", paddingRight: "0" }}
                            icon={faMinus}
                          />
                        </button>
                        <span>{item.count}</span>
                        <button
                          onClick={() =>
                            setProduct((prevState) => {
                              const index = prevState.findIndex(
                                (p) => p.id === item.id
                              );
                              const newProduct = [...prevState];
                              newProduct[index].count =
                                newProduct[index].count + 1;
                              return newProduct;
                            })
                          }
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "13px", paddingRight: "0" }}
                            icon={faPlus}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="remove__product">
                      <DeleteOutlined />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="total_container">
                <h5>Ümumi</h5>
                <div className="cost mt-3">
                  <h6>Məbləğ</h6>
                  <h6>
                    66.50
                    <FontAwesomeIcon
                      style={{ marginLeft: "9px" }}
                      icon={faManatSign}
                    />
                  </h6>
                </div>
                <div className="cost mt-3">
                  <h6>Çatdırılma</h6>
                  <h6>
                    0.00
                    <FontAwesomeIcon
                      style={{ marginLeft: "9px" }}
                      icon={faManatSign}
                    />
                  </h6>
                </div>
                <div className="cost mt-3">
                  <h6>Hədiyyə paketi</h6>
                  <h6>
                    5.00
                    <FontAwesomeIcon
                      style={{ marginLeft: "9px" }}
                      icon={faManatSign}
                    />
                  </h6>
                </div>
                <div className="cost mt-3">
                  <h6>Promo kod</h6>
                  <h6>
                    -10.00
                    <FontAwesomeIcon
                      style={{ marginLeft: "9px" }}
                      icon={faManatSign}
                    />
                  </h6>
                </div>
                <Divider type="horizontal" />
                <div className="cost mt-3">
                  <h6 style={{ fontWeight: "700" }}>Cəmi</h6>
                  <h6 style={{ color: "#DB2C66" }}>
                    61.50
                    <FontAwesomeIcon
                      style={{ marginLeft: "9px" }}
                      icon={faManatSign}
                    />
                  </h6>
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    fontSize: "16px",
                    marginTop: "20px",
                    backgroundColor: "#2DD06E",
                    width: "100%",
                    height: "44px",
                  }}
                  onClick={() => navigate("/payment")}
                >
                  Sifarişi tamamla
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToBasket;
