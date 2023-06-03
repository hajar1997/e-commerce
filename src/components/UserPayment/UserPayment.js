import React, { useState, useEffect } from "react";
import UnregisteredUserInfo from "../UnregisteredUserInfo/UnregisteredUserInfo";
import axios from "axios";
import { Divider, Form, Button, Radio } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faManatSign } from "@fortawesome/free-solid-svg-icons";
import ClickedInfoEdit from "../ClickedInfoEdit/ClickedInfoEdit";
import NotClickedPaymentUserInfo from "../NotClickedPaymentUserInfo/NotClickedPaymentUserInfo";
import ClickedAddressEdit from "../ClickedAddressEdit/ClickedAddressEdit";
import NotClickedAddressEdit from "../NotClickedAddressEdit/NotClickedAddressEdit";
import UnregisteredUserAddress from "../UnregisteredUserAddress/UnregisteredUserAddress";

const UserPayment = () => {
  const [users, setUsers] = useState([]);
  const [editInfoClicked, setEditInfoClicked] = useState(false);
  const [editAddressClicked, setEditAddressClicked] = useState(false);
  const [isPaymentChoiceClicked, setIsPaymentChoiceClicked] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const id = localStorage.getItem("current_id");
  const unregistered_user_id = localStorage.getItem("unregistered_user_id");
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state && location.state.orderData;
  const productId = orderData?.products?.map((i) => i.id);
  const productQuantity = orderData?.products?.map((q) => q.quantity);
  const totalPrice = orderData?.totalPrice;
  const giftPackagePrice = orderData?.giftPackagePrice;
  const totalPriceWithGiftPackage = orderData?.totalPriceWithGiftPackage;

  const getData = async () => {
    if (isLoggedIn && id) {
      await axios.get(`http://localhost:8001/users/${id}`).then((res) => {
        const user = res.data;
        setUsers([user]);
      });
    } else if (!isLoggedIn && unregistered_user_id) {
      await axios
        .get(
          `http://localhost:8001/unregisteredOrderInfo/${unregistered_user_id}`
        )
        .then((res) => {
          const user = res.data;
          setUsers([user]);
        });
    }
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };
// console.log(productId?.map((id, index) => id));
  const handlePaymentSubmit = async () => {
    const updatedUser = { ...users[0] };

    const newOrder = {
      paymentMethod: selectedPayment,
      products: productId?.map((id, index) => ({
        productId: id,
        quantity: productQuantity[index],
      })),
      totalPrice: totalPriceWithGiftPackage,
    };

    if (isLoggedIn) {
      if (updatedUser.orders) {
        updatedUser.orders = [...updatedUser.orders, newOrder];
      } else {
        updatedUser.orders = [newOrder];
      }
    } else {
      updatedUser.orders = [newOrder];
    }

    if (selectedPayment === "Qapıda nağd ödəmə") {
      navigate("/completed-order-detail", {
        state: {
          products: productId.map((id, index) => ({
            productId: id,
            quantity: productQuantity[index],
          })),
        },
      });
    } else if (selectedPayment === "Onlayn kart ilə ödəmə") {
      navigate("/credit-card-form", {
        state: {
          paymentMethod: selectedPayment,
          products: productId.map((id, index) => ({
            productId: id,
            quantity: productQuantity[index],
          })),
          totalPrice: totalPriceWithGiftPackage,
        },
      });
      return;
    }

    if (isLoggedIn) {
      await axios
        .put(`http://localhost:8001/users/${id}`, updatedUser)
        .then((res) => {
          console.log("User updated successfully:", res.data);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    } else {
      await axios
        .patch(
          `http://localhost:8001/unregisteredOrderInfo/${unregistered_user_id}`,
          updatedUser
        )
        .then((res) => {
          navigate("/completed-order-detail", {
            state: {
              products: productId?.map((id, index) => ({
                productId: id,
                quantity: productQuantity[index],
              })),
            },
          });
          console.log("User updated successfully:", res.data);
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="payment_wrapper">
      <div className="payment_header">
        <img src="images/logo.svg" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="payment__container">
              <h5>Ödəmə</h5>
              <Divider type="horizontal" />
              <div className="payment_user-info">
                {isLoggedIn ? (
                  users.map((user) => (
                    <div>
                      {editInfoClicked ? (
                        <ClickedInfoEdit
                          getData={getData}
                          user={user}
                          editInfoClicked={editInfoClicked}
                          setEditInfoClicked={setEditInfoClicked}
                          users={users}
                          setUsers={setUsers}
                        />
                      ) : (
                        <NotClickedPaymentUserInfo
                          users={users}
                          user={user}
                          setEditInfoClicked={setEditInfoClicked}
                          editInfoClicked={editInfoClicked}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <>
                    <UnregisteredUserInfo
                      editInfoClicked={editInfoClicked}
                      setEditInfoClicked={setEditInfoClicked}
                    />
                  </>
                )}
                <Divider type="horizontal" />
                <div className="product__delivery">
                  {isLoggedIn ? (
                    users?.map((user) => (
                      <div className="customer_personal_info__payment">
                        {editAddressClicked ? (
                          <ClickedAddressEdit
                            users={users}
                            setUsers={setUsers}
                            editAddressClicked={editAddressClicked}
                            setEditAddressClicked={setEditAddressClicked}
                          />
                        ) : (
                          <NotClickedAddressEdit
                            user={user}
                            setUsers={setUsers}
                            editAddressClicked={editAddressClicked}
                            setEditAddressClicked={setEditAddressClicked}
                          />
                        )}
                      </div>
                    ))
                  ) : (
                    <UnregisteredUserAddress />
                  )}
                </div>
                <Divider type="horizontal" />
                <div className="payment_choice">
                  <div className="payment__header">
                    <h6
                      onClick={() =>
                        setIsPaymentChoiceClicked(!isPaymentChoiceClicked)
                      }
                    >
                      3. Ödəmə üsulu
                    </h6>
                    <CheckCircleOutlined
                      style={{
                        fontSize: "22px",
                        color: isPaymentChoiceClicked ? "#2DD06E" : "#828282",
                      }}
                    />
                  </div>
                  {isPaymentChoiceClicked && (
                    <div>
                      <div className="payment_btns">
                        <Radio.Group
                          buttonStyle="solid"
                          onChange={handlePaymentChange}
                          value={selectedPayment}
                        >
                          <Radio.Button
                            value="Onlayn kart ilə ödəmə"
                            className="payment_choice_btn"
                          >
                            <CreditCardOutlined
                              style={{ marginRight: "10px" }}
                            />
                            Onlayn kart ilə ödəmə
                          </Radio.Button>
                          <Radio.Button
                            value="Qapıda nağd ödəmə"
                            className="payment_choice_btn"
                          >
                            <DollarCircleOutlined
                              style={{ marginRight: "10px" }}
                            />
                            Qapıda nağd ödəmə
                          </Radio.Button>
                        </Radio.Group>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "50px",
                        }}
                      >
                        <Button
                          onClick={handlePaymentSubmit}
                          type="primary"
                          htmlType="submit"
                          style={{
                            backgroundColor: "#2DD06E",
                            width: "174px",
                            height: "44px",
                          }}
                        >
                          Təsdiq et
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="total_container">
              <h5>Ümumi</h5>
              <div className="cost mt-3">
                <h6>Məbləğ</h6>
                <h6>
                  {totalPrice}
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
                  {giftPackagePrice}
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
                  {totalPriceWithGiftPackage}
                  <FontAwesomeIcon
                    style={{ marginLeft: "9px" }}
                    icon={faManatSign}
                  />
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
