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

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = async (values) => {
    const existingUser = await axios.get(
      `http://localhost:8001/users?id=${values.key}`
    );
    console.log(existingUser);
    // if (values.id) {
    //   let editedData = data.find((s) => s.id === values.id);
    //   const arr = users.filter((user) => user.email === values.email);
    //   if (arr.length > 0 && arr[0].email !== editedData.email) {
    //     notification["error"]({
    //       message: "Operation was unsuccessfull!",
    //       description: "Email is already registered",
    //     });
    //   } else {
    //     await axios
    //       .put(`http://localhost:8001/users${values.id}`, {
    //         id: values.id,
    //         name: values.name,
    //         surname: values.surname,
    //         email: values.email,
    //         prefix: values.prefix,
    //         phone: values.phone,
    //         password: values.password,
    //       })
    //       .then((res) => {
    //         notification.open({
    //           type: "success",
    //           message: "Successfully edited",
    //         });
    //       });
    //   }
    // }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://localhost:8001/users").then((res) => {
      setUsers(res.data);
      let mydata = [];
      res.data.map((item, i) => {
        if (item.id == users.id) {
          mydata.push(item);
          setData(mydata);
        }
      });
    });
  };
  return (
    <div className="my__info_">
      <h5>Şəxsi məlumatlar</h5>
      <div className="user__info">
        {users.map((user) => (
          <Form
            key={user.id}
            initialValues={{
              prefix: user.prefix,
            }}
            style={{
              maxWidth: 800,
              width: "100%",
            }}
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
                    defaultValue={user.name}
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
                    defaultValue={user.email}
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
                    defaultValue={user.phone}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="form_flex">
              <Form.Item label="Doğum tarixi" style={{ flex: "1 1 50%" }}>
                <DatePicker
                  style={{
                    width: "100%",
                    border: "none",
                  }}
                  size="large"
                  onChange={onChange}
                  disabled={!editMode}
                />
              </Form.Item>
              <Form.Item
                label="Şifrə"
                name="password"
                style={{ flex: "1 1 50%" }}
              >
                <Input.Password
                  style={{ width: "100%", padding: "14px", border: "none" }}
                  defaultValue={user.password}
                  disabled={!editMode}
                />
              </Form.Item>
            </div>
            <div className="myInfo_btn">
              <Form.Item>
                {editMode ? (
                  <Button type="primary" htmlType="submit" onClick={()=> onFinish()}>
                    <SaveOutlined style={{ fontSize: "17px" }} />
                    Yadda saxla
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => setEditMode(!editMode)}
                  >
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
