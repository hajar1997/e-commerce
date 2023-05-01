import React, { useState } from "react";
import { Divider, Form, Button, Input, Select, InputNumber, Radio } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  CheckCircleOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faManatSign } from "@fortawesome/free-solid-svg-icons";
const { Option } = Select;

const UserPayment = () => {
  const [userInfoForm] = useForm();
  const [deliveryForm] = useForm();
  const [isPersonalInfoClicked, setIsPersonalInfoClicked] = useState(true);
  const [isDeliveryClicked, setIsDeliveryClicked] = useState(true);
  const [isPaymentChoiceClicked, setIsPaymentChoiceClicked] = useState(true);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle bordered={false}>
      <Select
        bordered={false}
        style={{
          width: 70,
          border: "none",
        }}
      >
        <Option value="070">070</Option>
        <Option value="050">050</Option>
        <Option value="055">055</Option>
        <Option value="077">077</Option>
      </Select>
    </Form.Item>
  );

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
                <div className="payment__header">
                  <h6
                    onClick={() =>
                      setIsPersonalInfoClicked(!isPersonalInfoClicked)
                    }
                  >
                    1. Şəxsi məlumatlar
                  </h6>
                  <CheckCircleOutlined
                    style={{
                      fontSize: "22px",
                      color: isPersonalInfoClicked ? "#2DD06E" : "#828282",
                    }}
                  />
                </div>
                {isPersonalInfoClicked && (
                  <div className="user__info">
                    <Form
                      //   onFinish={onFinish}
                      initialValues={{
                        prefix: "070",
                      }}
                      style={{
                        maxWidth: 800,
                        width: "100%",
                        marginTop: 48,
                      }}
                      form={userInfoForm}
                      layout="vertical"
                    >
                      <div className="form_flex">
                        <div style={{ flex: "1 1 50%" }}>
                          <Form.Item
                            name="name"
                            label="Ad"
                            rules={[
                              {
                                required: true,
                                message: "Adınızı daxil edin",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Adınızı daxil edin"
                              style={{
                                border: "none",
                              }}
                              size="large"
                            />
                          </Form.Item>
                        </div>
                        <div style={{ flex: "1 1 50%" }}>
                          <Form.Item
                            name="surname"
                            label="Soyad"
                            rules={[
                              {
                                required: true,
                                message: "Soyadınızı daxil edin",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Soyadınızı daxil edin"
                              style={{
                                border: "none",
                              }}
                              size="large"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <div className="form_flex">
                        <div style={{ flex: "1 1 50%" }}>
                          <Form.Item
                            name="phone"
                            label="Mobil nömrə"
                            rules={[
                              {
                                required: true,
                                message: "Mobil nömrənizi daxil edin",
                              },
                            ]}
                          >
                            <InputNumber
                              addonBefore={prefixSelector}
                              style={{
                                width: "100%",
                                border: "none",
                              }}
                              bordered={false}
                              controls={false}
                              placeholder="000-00-00"
                            />
                          </Form.Item>
                        </div>
                        <div style={{ flex: "1 1 50%" }}>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              {
                                required: true,
                                type: "email",
                                message: "Emailinizi daxil edin",
                              },
                            ]}
                          >
                            <Input
                              placeholder="nümunə@gmail.com"
                              style={{
                                border: "none",
                              }}
                              size="large"
                            />
                          </Form.Item>
                        </div>
                      </div>
                      <Form.Item>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            marginTop: "20px",
                            backgroundColor: "#2DD06E",
                            width: "174px",
                            height: "44px",
                          }}
                        >
                          Yadda saxla
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                )}
                <Divider type="horizontal" />
                <div className="product__delivery">
                  <div className="payment__header">
                    <h6
                      onClick={() => setIsDeliveryClicked(!isDeliveryClicked)}
                    >
                      2. Çatdırılma
                    </h6>
                    <CheckCircleOutlined
                      style={{
                        fontSize: "22px",
                        color: isDeliveryClicked ? "#2DD06E" : "#828282",
                      }}
                    />
                  </div>
                  {isDeliveryClicked && (
                    <div className="delivery_info">
                      <Form
                        // onFinish={onFinish}
                        style={{
                          maxWidth: 800,
                          width: "100%",
                          marginTop: 48,
                        }}
                        form={deliveryForm}
                        layout="vertical"
                      >
                        <div className="form_flex">
                          <div style={{ flex: "1 1 50%" }}>
                            <Form.Item
                              name="address"
                              label="Ünvan"
                              rules={[
                                {
                                  required: true,
                                  message: "Ünvanı daxil edin",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Ünvanı daxil edin"
                                style={{
                                  border: "none",
                                }}
                                size="large"
                              />
                            </Form.Item>
                          </div>
                          <div style={{ flex: "1 1 50%" }}>
                            <Form.Item
                              name="apartment"
                              label="Bina/Mənzil"
                              rules={[
                                {
                                  required: true,
                                  message: "Daxil edin",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Daxil edin"
                                style={{
                                  border: "none",
                                }}
                                size="large"
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <Form.Item
                          name="comment"
                          label="Kuryer üçün əlavə qeydlər"
                        >
                          <Input.TextArea
                            style={{
                              resize: "none",
                              border: "none",
                            }}
                            placeholder="Mətni daxil edin..."
                            cols={5}
                            rows={5}
                            size="large"
                          />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginTop: "20px",
                              backgroundColor: "#2DD06E",
                              width: "174px",
                              height: "44px",
                            }}
                          >
                            Yadda saxla
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
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
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button
                            value="online"
                            className="payment_choice_btn"
                          >
                            <CreditCardOutlined
                              style={{ marginRight: "10px" }}
                            />
                            Onlayn kart ilə ödəmə
                          </Radio.Button>
                          <Radio.Button
                            value="cash"
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
                  10.00
                  <FontAwesomeIcon
                    style={{ marginLeft: "9px" }}
                    icon={faManatSign}
                  />
                </h6>
              </div>
              <Divider type="horizontal" />
              <div className="cost mt-3">
                <h6 style={{fontWeight:"700"}}>Cəmi</h6>
                <h6 style={{ color: "#DB2C66" }}>
                  61.50
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
