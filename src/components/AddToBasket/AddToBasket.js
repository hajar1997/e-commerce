import React, { useState, useEffect } from "react";
import { Button, Divider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  fetchBasket,
  removeProductFromBasket,
  addProductToBasket,
  setBasket,
} from "../../redux/actions/action";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faManatSign,
} from "@fortawesome/free-solid-svg-icons";

const AddToBasket = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basket = useSelector((state) => state.main.basket);
  const [basketProducts, setBasketProducts] = useState([]);

  const isProductInBasket = (id) => {
    return basket.some((b) => b.id === id);
  };

  const handleBasketClick = (id) => {
    if (isProductInBasket(id)) {
      dispatch(removeProductFromBasket(id));
    }
  };

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchBasket());
  }, [dispatch]);

  const { phones, accessories, smartWatches } = useSelector(
    (state) => state.main
  );

  useEffect(() => {
    const filteredProducts = [
      ...phones.filter((product) => basket.some((b) => b.id === product.id)),
      ...accessories.filter((product) =>
        basket.some((b) => b.id === product.id)
      ),
      ...smartWatches.filter((product) =>
        basket.some((b) => b.id === product.id)
      ),
    ];

    const productsWithQuantity = filteredProducts.map((product) => ({
      ...product,
      quantity: 1,
    }));

    setBasketProducts(productsWithQuantity);
  }, [basket, phones, accessories, smartWatches]);

  const handleIncreaseQuantity = (id) => {
    const updatedBasketProducts = basketProducts.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setBasketProducts(updatedBasketProducts);

    const updatedBasket = basket.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setBasket(updatedBasket);
  };

  const handleDecreaseQuantity = (id) => {
    const updatedBasketProducts = basketProducts.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setBasketProducts(updatedBasketProducts);

    const updatedBasket = basket.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setBasket(updatedBasket);
  };

  return (
    <div className="add_to_basket__">
      <div className="container">
        <h5>Səbət ({basketProducts.length} məhsul)</h5>
        {!basketProducts.length && (
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
                {basketProducts.map((item) => (
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
                      </div>
                    </div>
                    <div className="counter_container">
                      <div className="product_counter">
                        <button onClick={() => handleDecreaseQuantity(item.id)}>
                          <FontAwesomeIcon
                            style={{ fontSize: "13px", paddingRight: "0" }}
                            icon={faMinus}
                          />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleIncreaseQuantity(item.id)}>
                          <FontAwesomeIcon
                            style={{ fontSize: "13px", paddingRight: "0" }}
                            icon={faPlus}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="remove__product">
                      <DeleteOutlined onClick={handleBasketClick} />
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
