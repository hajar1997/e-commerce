import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Input,
  Select,
  InputNumber,
  notification,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { CheckCircleFilled, SaveOutlined } from "@ant-design/icons";
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

const UnregisteredInfoEdit = ({
  editInfoClicked,
  setEditInfoClicked,
  setUsers,
  users,
}) => {
  const id = localStorage.getItem("unregistered_user_id");
  const [userInfoForm] = useForm();
  const [initialValues, setInitialValues] = useState({});

  const getData = async () => {
    await axios
      .get(`http://localhost:8001/unregisteredOrderInfo/${id}`)
      .then((res) => {
        const user = res?.data;
        setUsers([user]);
        const initialValues = {
          name: user.name,
          surname: user.surname,
          email: user.email,
          phone: user.phone,
          prefix: user.prefix,
        };
        setInitialValues(initialValues);
        userInfoForm.setFieldsValue(initialValues);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinishInfo = async (values) => {
    const user = users[0];
    await axios
      .put(`http://localhost:8001/unregisteredOrderInfo/${id}`, {
        ...user,
        id,
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        prefix: values.prefix,
      })
      .then((res) => {
        notification.open({
          type: "success",
          message: "Məlumatlar uğurla yeniləndi!",
        });
        setEditInfoClicked(!editInfoClicked);
        if (editInfoClicked) {
          setUsers([
            {
              ...user,
              name: values.name,
              surname: values.surname,
              email: values.email,
              phone: values.phone,
              prefix: values.prefix,
            },
          ]);
        }
      })
      .catch((err) => {
        message.open("Something is wrong");
      });
  };
  return (
    <div>
      <div className="payment__header mb-3">
        <h6>1. Şəxsi məlumatlar</h6>
      </div>
      <Form
        style={{
          maxWidth: 800,
          width: "100%",
        }}
        onFinish={onFinishInfo}
        form={userInfoForm}
        layout="vertical"
        initialValues={initialValues}
      >
        <div className="form_flex">
          <div style={{ flex: "1 1 50%" }}>
            <Form.Item name="name" label="Ad">
              <Input
                style={{
                  border: "none",
                }}
                size="large"
              />
            </Form.Item>
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <Form.Item name="surname" label="Soyad">
              <Input
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
            <Form.Item name="email" label="Email">
              <Input
                style={{
                  border: "none",
                }}
                size="large"
              />
            </Form.Item>
          </div>
          <div style={{ flex: "1 1 50%" }}>
            <Form.Item name="phone" label="Mobil nömrə">
              <InputNumber
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                  border: "none",
                }}
                size="large"
                bordered={false}
                controls={false}
              />
            </Form.Item>
          </div>
        </div>
        <div className="myInfo_btn">
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <SaveOutlined style={{ fontSize: "17px" }} />
              Yadda saxla
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default UnregisteredInfoEdit;
