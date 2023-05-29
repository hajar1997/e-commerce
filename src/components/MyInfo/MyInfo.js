import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DatePicker,
  Form,
  Button,
  Input,
  Select,
  InputNumber,
  notification,
  message,
} from "antd";
import moment from "moment/moment";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";

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

const MyInfo = () => {
  const [editMode, setEditMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [userInfoForm] = useForm();

  const id = localStorage.getItem("current_id");

  const onFinish = async (values) => {
    const { email } = values;
    const user = users[0];
    if (email !== user.email) {
      const existingUser = await axios.get(
        `http://localhost:8001/users?email=${values.email}`
      );
      if (existingUser.data.length > 0) {
        notification.open({
          type: "error",
          message: "This email is already registered",
        });
        return;
      }
    }
    await axios
      .put(`http://localhost:8001/users/${id}`, {
        id,
        name: values.name,
        surname: values.surname,
        email: values.email,
        phone: values.phone,
        prefix: values.prefix,
        password: values.password,
      })
      .then((res) => {
        notification.open({
          type: "success",
          message: "Məlumatlar uğurla yeniləndi!",
        });
        console.log("mission is completed");
        setEditMode(!editMode);
      })
      .catch((err) => {
        message.open("Something is wrong");
      });
  };

  const handleEditButtonClick = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  };

  useEffect(() => {
    getData();
    getAllUsers();
  }, []);

  const getData = async () => {
    await axios.get(`http://localhost:8001/users/${id}`).then((res) => {
      const user = res.data;
      setUsers([user]);
    });
  };
  
  const getAllUsers = async () => {
    await axios.get(`http://localhost:8001/users/`).then((res) => {
      const users = res.data;
      setData(users);
    });
  };

  return (
    <div className="my__info_">
      <h5>Şəxsi məlumatlar</h5>
      <div className="user__info">
        {users.map((user) => (
          <Form
            initialValues={{
              ...user,
              prefix: user.prefix,
            }}
            style={{
              maxWidth: 800,
              width: "100%",
            }}
            onFinish={onFinish}
            form={userInfoForm}
            layout="vertical"
          >
            <div className="form_flex">
              <div style={{ flex: "1 1 50%" }}>
                <Form.Item name="name" label="Ad">
                  <Input
                    style={{
                      border: "none",
                    }}
                    size="large"
                    disabled={!editMode}
                  />
                </Form.Item>
              </div>
              <div style={{ flex: "1 1 50%" }}>
                <Form.Item name="surname" label="Soyad">
                  <Input
                    defaultValue={user.surname}
                    style={{
                      border: "none",
                    }}
                    size="large"
                    disabled={!editMode}
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
                    disabled={!editMode}
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
                    disabled={!editMode}
                    bordered={false}
                    controls={false}
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item label="Şifrə" name="password">
              <Input.Password
                className="pass-form"
                style={{ width: "50%", padding: "14px", border: "none" }}
                disabled={!editMode}
              />
            </Form.Item>
            <div className="myInfo_btn">
              <Form.Item>
                {editMode ? (
                  <Button type="primary" htmlType="submit">
                    <SaveOutlined style={{ fontSize: "17px" }} />
                    Yadda saxla
                  </Button>
                ) : (
                  <Button type="primary" onClick={handleEditButtonClick}>
                    <EditOutlined style={{ fontSize: "17px" }} />
                    Məlumatları yenilə
                  </Button>
                )}
              </Form.Item>
            </div>
          </Form>
        ))}
      </div>
    </div>
  );
};

export default MyInfo;
