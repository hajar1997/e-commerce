import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CreditCardForm = () => {
  const [users, setUsers] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [isCardNumberValid, setCardNumberValid] = useState(true);
  const [isCardNameValid, setCardNameValid] = useState(true);
  const [isExpiryDateValid, setExpiryDateValid] = useState(true);
  const [isCVVValid, setCVVValid] = useState(true);
  const [isCardFlipped, setCardFlipped] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state && location.state.orderData;
  const productId = orderData?.products?.map((i) => i.productId);
  const productQuantity = orderData?.products?.map((q) => q.quantity);
  const totalPrice = orderData?.totalPrice;
  const id = localStorage.getItem("current_id");
  const unregistered_user_id = localStorage.getItem("unregistered_user_id");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  console.log(totalPrice);
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
  console.log(orderData);
  const handlePaymentSubmit = async () => {
    const updatedUser = { ...users[0] };
    navigate("/completed-order-detail", {
      state: {
        products: productId.map((id, index) => ({
          productId: id,
          quantity: productQuantity[index],
        })),
      },
    });
    updatedUser.orders = [
      {
        paymentMethod: "Kart ilə ödəmə",
        products: productId.map((id, index) => ({
          productId: id,
          quantity: productQuantity[index],
        })),
        totalPrice: totalPrice,
        cardNumber: cardNumber,
        cardName: cardName,
        expiryDate: expiryDate,
        cvv: cvv,
      },
    ];
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

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/\s/g, "").substring(0, 16);
    const formattedValue = sanitizedValue.replace(/(\d{4})/g, "$1 ").trim();

    setCardNumber(formattedValue);
    setCardNumberValid(/^\d{0,16}$/.test(sanitizedValue));
  };

  const handleCardNameChange = (e) => {
    const { value } = e.target;
    if (value.length <= 20) {
      setCardName(value);
      setCardNameValid(/^[A-Z\s]+$/i.test(value));
    }
  };

  const handleCardClick = () => {
    setCardFlipped(!isCardFlipped);
  };

  const handleExpiryDateChange = (e) => {
    const { value } = e.target;
    const sanitizedValue = value.replace(/\D/g, "");
    const formattedValue = sanitizedValue.replace(/^(\d{2})(\d{2})$/, "$1/$2");

    if (formattedValue.length <= 5) {
      setExpiryDate(formattedValue);
      setExpiryDateValid(
        /^(0[1-9]|1[0-2])\/([2-9][0-9])$/.test(formattedValue)
      );
    }
  };

  const handleCVVFocus = () => {
    setCardFlipped(true);
  };

  const handleCVVBlur = () => {
    setCardFlipped(false);
  };

  const handleCVVChange = (e) => {
    const { value } = e.target;
    if (value.length <= 4) {
      setCVV(value);
      setCVVValid(/^[0-9]{3,4}$/.test(value));
    }
  };

  const cardNumberRules = [
    {
      required: true,
      pattern: /^\d{0,19}$/,
      message: "Please enter a valid card number",
    },
  ];

  const cardNameRules = [
    {
      required: true,
      pattern: /^[A-Z\s]+$/i,
      message: "Please enter a valid cardholder name",
    },
  ];

  const expiryDateRules = [
    {
      required: true,
      pattern: /^(0[1-9]|1[0-2])\/\d{0,2}$/,
      message: "Please enter a valid expiry date (MM/YY)",
    },
  ];

  const cvvRules = [
    {
      required: true,
      pattern: /^\d{0,4}$/,
      message: "Please enter a valid CVV",
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="credit-card-form">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div id="credit-card">
              <div
                id="credit-card-body"
                className={isCardFlipped ? "flip" : ""}
                onClick={handleCardClick}
              >
                <div id="card-front">
                  <img
                    src="images/mastercard-2.svg"
                    alt="visa card"
                    className="card-logo"
                  />
                  <div className="card-chip">
                    <div className="component-1"></div>
                    <div className="component-2"></div>
                    <div className="component-3"></div>
                    <div className="component-4"></div>
                    <div className="component-5"></div>
                  </div>
                  <div id="card_no">{cardNumber.trim()}</div>
                  <div className="card-labels card-holder-label">
                    Card Holder
                  </div>
                  <div className="card-labels">Expires</div>
                  <div id="card_name">{cardName.trim()}</div>
                  <div id="card_expiry_date">{expiryDate.trim()}</div>
                </div>
                <div id="card-back">
                  <div id="magnetic_stripe"></div>
                  <div id="signature"></div>
                  <div id="card_cvv">{cvv}</div>
                  <div id="disclaimer">
                    Sed augue lacus viverra vitae congue eu consequat ac felis.
                    Quam quisque id diam vel. Quis risus sed vulputate odio ut
                    enim blandit. Viverra justo nec ultrices dui sapien eget mi
                    proin sed. Amet justo donec enim diam vulputate. Vestibulum
                    morbi blandit cursus risus at ultrices mi. Condimentum vitae
                    sapien pellentesque habitant. Leo duis ut diam quam. Cras
                    sed felis eget velit aliquet sagittis. Viverra vitae congue
                    eu consequat ac felis donec et. Hendrerit gravida rutrum
                    quisque non tellus orci ac.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <Form id="credit-card-form" layout="vertical">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="cardNumber"
                    label="Card No."
                    rules={cardNumberRules}
                    validateStatus={!isCardNumberValid ? "error" : ""}
                    help={
                      !isCardNumberValid
                        ? "Please enter a valid card number"
                        : ""
                    }
                  >
                    <Input
                      type="text"
                      maxLength={19}
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="cardName"
                    label="Card Holder"
                    rules={cardNameRules}
                    validateStatus={!isCardNameValid ? "error" : ""}
                    help={
                      !isCardNameValid
                        ? "Please enter a valid cardholder name"
                        : ""
                    }
                  >
                    <Input
                      type="text"
                      maxLength={20}
                      value={cardName}
                      onChange={handleCardNameChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="expiryDate"
                    label="Expiry Date"
                    rules={expiryDateRules}
                    validateStatus={!isExpiryDateValid ? "error" : ""}
                    help={
                      !isExpiryDateValid
                        ? "Please enter a valid expiry date (MM/YY)"
                        : ""
                    }
                  >
                    <Input
                      type="text"
                      maxLength={4}
                      value={expiryDate}
                      onChange={handleExpiryDateChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={cvvRules}
                    validateStatus={!isCVVValid ? "error" : ""}
                    help={!isCVVValid ? "Please enter a valid CVV" : ""}
                  >
                    <Input
                      type="text"
                      maxLength={4}
                      value={cvv}
                      onChange={handleCVVChange}
                      onFocus={handleCVVFocus}
                      onBlur={handleCVVBlur}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
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
        </div>
      </div>
    </div>
  );
};

export default CreditCardForm;
