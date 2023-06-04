import React, { useState, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { CheckCircleFilled, CheckCircleOutlined } from "@ant-design/icons";
import { Form, Button, Input, InputNumber, Select, notification, message } from "antd";
import UnregisteredInfoEdit from "../UnregisteredInfoEdit/UnregisteredInfoEdit";
const { Option } = Select;

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

const UnregisteredUserInfo = ({ setEditInfoClicked, editInfoClicked }) => {
  const [users, setUsers] = useState([]);
  const [userInfoForm] = useForm();
  const [isPersonalInfoClicked, setIsPersonalInfoClicked] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const formatNumberWithDashes = (number) => {
    const formattedNumber = number.toString();
    const part1 = formattedNumber.slice(0, 3);
    const part2 = formattedNumber.slice(3, 5);
    const part3 = formattedNumber.slice(5, 7);
    return `${part1}-${part2}-${part3}`;
  };
  const phoneNumber = users.map((user) => user.phone);
  const formattedPhoneNumber = formatNumberWithDashes(phoneNumber);

  const onFinish = async (values) => {
    const randomId = Math.floor(Math.random() * 100000000000000);
    await axios
      .post("http://localhost:8001/unregisteredOrderInfo", {
        id: randomId,
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        prefix: values.prefix,
      })
      .then((res) => {
        setSubmitted(true);
        localStorage.setItem("unregistered_user_id", res.data.id);
        notification.open({
          type: "success",
          message: "Məlumatlar uğurla göndərildi!",
        });
        setUsers([{ id: res.data.id, ...values }]);
      })
      .catch((err) => {
        message.error("Xəta baş verdi");
      });
  };
  useEffect(() => {
    const id = localStorage.getItem("unregistered_user_id");
    const getData = async () => {
      if (id) {
        await axios
          .get(`http://localhost:8001/unregisteredOrderInfo/${id}`)
          .then((res) => {
            const user = res.data;
            setUsers([user]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    getData();
  }, [submitted]);

  return (
    <div>
      {submitted ? (
        users.map((user) => (
          <div className="customer_personal_info__payment">
            {editInfoClicked ? (
              <UnregisteredInfoEdit
                editInfoClicked={editInfoClicked}
                setEditInfoClicked={setEditInfoClicked}
                users={users}
                setUsers={setUsers}
                setIsPersonalInfoClicked={setIsPersonalInfoClicked}
                isPersonalInfoClicked={isPersonalInfoClicked}
              />
            ) : (
              <>
                <div className="payment__header">
                  <h6 onClick={() => setIsPersonalInfoClicked(!isPersonalInfoClicked)}>1. Şəxsi məlumatlar</h6>
                  <div className="icon_and_edit">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditInfoClicked(!editInfoClicked);
                      }}
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
                {isPersonalInfoClicked && (
                  <div className="customer_infos__container">
                    <span>
                      {user?.name} {user?.surname}
                    </span>
                    <span>
                      ({user?.prefix}) {formattedPhoneNumber}
                    </span>
                    <span>{user?.email}</span>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      ) : (
        <div>
          <div className="payment__header">
            <h6 onClick={() => setIsPersonalInfoClicked(!isPersonalInfoClicked)}>1. Şəxsi məlumatlar</h6>
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
                onFinish={onFinish}
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
        </div>
      )}
    </div>
  );
};

export default UnregisteredUserInfo;
