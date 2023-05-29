import React, { useState, useEffect } from "react";
import UnregisteredUserInfo from "../UnregisteredUserInfo/UnregisteredUserInfo";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Divider,
  Form,
  Button,
  Input,
  Select,
  InputNumber,
  Radio,
  message,
  notification,
} from "antd";
import { useForm } from "antd/es/form/Form";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CreditCardOutlined,
  DollarCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faManatSign } from "@fortawesome/free-solid-svg-icons";
import ClickedInfoEdit from "../ClickedInfoEdit/ClickedInfoEdit";
import NotClickedPaymentUserInfo from "../NotClickedPaymentUserInfo/NotClickedPaymentUserInfo";
const { Option } = Select;

const UserPayment = () => {
  const [userInfoForm] = useForm();
  const [deliveryForm] = useForm();
  const [users, setUsers] = useState([]);
  const [unregisteredUsers, setUnregisteredUsers] = useState([]);
  const [editInfoClicked, setEditInfoClicked] = useState(false);
  const [editAddressClicked, setEditAddressClicked] = useState(false);
  const [isPersonalInfoClicked, setIsPersonalInfoClicked] = useState(true);
  const [isDeliveryClicked, setIsDeliveryClicked] = useState(true);
  const [isPaymentChoiceClicked, setIsPaymentChoiceClicked] = useState(true);
  const dispatch = useDispatch();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const id = localStorage.getItem("current_id");
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

  const getData = async () => {
    await axios.get(`http://localhost:8001/users/${id}`).then((res) => {
      const user = res.data;
      setUsers([user]);
    });
  };

  const onFinishAddress = async (values) => {
    const user = users[0];
    await axios
      .put(`http://localhost:8001/users/${id}`, {
        ...user,
        addresses: [
          {
            address: values.address,
            apartment: values.apartment,
            comment: values.comment,
          },
        ],
      })
      .then((res) => {
        notification.open({
          type: "success",
          message: "Məlumatlar uğurla dəyişdirildi!",
        });
        setEditAddressClicked(false);
      })
      .catch((err) => {
        message.error("Xəta baş verdi");
      });
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
                          <Form
                            onFinish={onFinishAddress}
                            style={{
                              maxWidth: 800,
                              width: "100%",
                            }}
                            form={deliveryForm}
                            layout="vertical"
                          >
                            <div className="form_flex">
                              <div style={{ flex: "1 1 50%" }}>
                                <Form.Item name="address" label="Ünvan">
                                  <Input
                                    placeholder="Ünvanınızı daxil edin"
                                    disabled={!editAddressClicked}
                                    style={{
                                      border: "none",
                                      padding: "14px",
                                    }}
                                    size="large"
                                  />
                                </Form.Item>
                              </div>
                              <div style={{ flex: "1 1 50%" }}>
                                <Form.Item name="apartment" label="Bina/Mənzil">
                                  <Input
                                    placeholder="Yaşadığınız bina və mənzili daxil edin"
                                    disabled={!editAddressClicked}
                                    style={{
                                      border: "none",
                                      padding: "14px",
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
                                placeholder="Kuryer üçün əlavə qeydlərinizi daxil edin"
                                style={{
                                  resize: "none",
                                  border: "none",
                                }}
                                disabled={!editAddressClicked}
                                cols={5}
                                rows={5}
                                size="large"
                              />
                            </Form.Item>
                            <div className="myInfo_btn">
                              <Form.Item>
                                <Button type="primary" htmlType="submit">
                                  <SaveOutlined style={{ fontSize: "17px" }} />
                                  Yadda saxla
                                </Button>
                              </Form.Item>
                            </div>
                          </Form>
                        ) : (
                          <div className="payment__header">
                            <h6> 2. Çatdırılma</h6>
                            <div className="icon_and_edit">
                              <a
                                href="#"
                                onClick={() =>
                                  setEditAddressClicked(!editAddressClicked)
                                }
                              >
                                Düzəliş et
                              </a>
                              <CheckCircleFilled
                                style={{
                                  fontSize: "22px",
                                  color: "#2DD06E",
                                }}
                              />
                            </div>
                          </div>
                        )}
                        <div className="customer_infos__container">
                          {user.addresses.map((a) => (
                            <div className="d-flex flex-column">
                              <span>{a.address}</span>
                              <span className="mt-2">{a.apartment}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <div className="payment__header">
                        <h6
                          onClick={() =>
                            setIsDeliveryClicked(!isDeliveryClicked)
                          }
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
                <h6 style={{ fontWeight: "700" }}>Cəmi</h6>
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
