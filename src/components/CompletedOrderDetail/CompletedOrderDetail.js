import React, { useState, useEffect } from "react";
import { fetchData } from "../../redux/actions/action";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "antd";
import { faCreditCard, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";

const CompletedOrderDetail = () => {
  const [users, setUsers] = useState([]);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const unregistered_user_id = localStorage.getItem("unregistered_user_id");
  const id = localStorage.getItem("current_id");

  const dispatch = useDispatch();
  const location = useLocation();

  const product = location.state && location.state;
  const productIds = product.products.map((product) => product.productId);
  const productQuantity = product.products.map((product) => product.quantity);
  console.log(users);
  const { phones, accessories, smartWatches } = useSelector((state) => state.main);

  const filteredProducts = [...phones.filter((product) => product), ...accessories.filter((product) => product), ...smartWatches.filter((product) => product)];

  const sameId = filteredProducts.filter((product) => productIds.some((id) => id === product.id));

  const newlyOrderedProducts = sameId.filter((product) => productIds.includes(product.id));

  const formatNumberWithDashes = (number) => {
    const formattedNumber = number.toString();
    const part1 = formattedNumber.slice(0, 3);
    const part2 = formattedNumber.slice(3, 5);
    const part3 = formattedNumber.slice(5, 7);
    return `${part1}-${part2}-${part3}`;
  };

  const phoneNumber = users.map((user) => user.phone);
  const formattedPhoneNumber = formatNumberWithDashes(phoneNumber);

  useEffect(() => {
    const getData = async () => {
      try {
        if (isLoggedIn) {
          const response = await axios.get(`${process.env.REACT_APP_DATABASE_URL}users/${id}.json`);
          const user = response.data;
          setUsers([user]);
        } else {
          const response = await axios.get(`${process.env.REACT_APP_DATABASE_URL}unregisteredOrderInfo/${unregistered_user_id}.json`);
          const user = response.data;
          setUsers([user]);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    getData();
  }, [isLoggedIn, unregistered_user_id]);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container cod">
        <div className="order_details_header mt-5">
          <h5>Sifarişin detalları</h5>
        </div>
        <div className="order__detail mt-4">
          <div className="ordered-products">
            {newlyOrderedProducts.map((item, index) => (
              <div className="ordered_product_info" key={index}>
                <div className="op__img">
                  <img src={item.img[0]} />
                </div>
                <div className="op_second_row">
                  <div className="op_name">
                    <h5>
                      {item.productBrand},{item.productModel}, {item.memory ? item.memory + " GB" : ""}, {item.productColor}
                    </h5>
                  </div>
                  <div className="op_color_memory_count">
                    <div className="op_color">
                      <span>Rəng:</span>
                      <h6>{item.productColor}</h6>
                    </div>
                    {item.memory ? (
                      <div className="op_memory">
                        <span>Yaddaş:</span>
                        <h6>{item.memory} GB</h6>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="op_count">
                      <span>Say:</span>
                      <h6>{productQuantity[index]}</h6>
                    </div>
                  </div>
                  <div className="op_third_row mt-3">
                    <span>Sifariş tarixi:</span>
                    <h6>{new Date().toLocaleDateString().replace(/\//g, ".")}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Divider className="divider-destkop for__order_details" type="horizontal" />
          <div className="customer_info mt-4">
            {users?.map((user, index) => (
              <React.Fragment key={index}>
                <div className="customer_personal_info">
                  <h6>Şəxsi məlumatlar</h6>
                  <div className="customer_infos__container">
                    <span>{user?.name}</span>
                    <span>{user?.surname}</span>
                    <span>
                      ({user?.prefix}) {formattedPhoneNumber}
                    </span>
                    <span>{user?.email}</span>
                  </div>
                </div>
                <div className="customer_delivery_address">
                  <h6>Çatdırılma ünvanı</h6>
                  {user?.addresses?.map((u, index) => (
                    <div className="customer_address_container" key={index}>
                      <span>{u.address}</span>
                      <span>{u.apartment}</span>
                      <span>{u.comment}</span>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
          <Divider className="divider-destkop for__order_details" type="horizontal" />
          <div className="payment__details">
            <h6 style={{ fontSize: "16px", color: " #1D2123", fontWeight: "600" }}>Ödəmə detalları</h6>
            <div className="total_container">
              {users?.map((user) =>
                user?.orders
                  ?.filter((order) => order.products.some((product) => productIds.includes(product.productId)))
                  .map((order, index) => (
                    <React.Fragment key={index}>
                      <div className="cost mt-3">
                        <h6>Ödəmə metodu</h6>
                        {order.paymentMethod === "Qapıda nağd ödəmə" ? (
                          <span>
                            <FontAwesomeIcon style={{ marginLeft: "9px", color: "#2DD06E" }} icon={faMoneyBill} />
                            Nəğd
                          </span>
                        ) : (
                          <span>
                            <FontAwesomeIcon style={{ marginLeft: "9px", color: "#2DD06E" }} icon={faCreditCard} />
                            Kart ilə
                          </span>
                        )}
                      </div>
                      <div className="cost mt-3">
                        <h6>Toplam məbləğ</h6>
                        <span>{order.totalPrice} $</span>
                      </div>
                      <Divider className="divider-destkop for__order_details" type="horizontal" />
                      <div className="cost mt-3">
                        <h6
                          style={{
                            fontSize: "16px",
                            color: " #1D2123",
                            fontWeight: "600",
                          }}
                        >
                          Cəmi
                        </h6>
                        <span style={{ color: "#DB2C66" }}>{order.totalPrice} $</span>
                      </div>
                    </React.Fragment>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompletedOrderDetail;
