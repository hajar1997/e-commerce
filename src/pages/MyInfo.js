import React from "react";
import { DatePicker, Form, Button, Input, Select, InputNumber } from "antd";
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
  const [userInfoForm] = useForm();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="my__info_">
      <h5>Şəxsi məlumatlar</h5>
      <div className="user__info">
        <Form
          //   onFinish={onFinish}
          initialValues={{
            prefix: "070",
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
                  defaultValue={"Hajar"}
                />
              </Form.Item>
            </div>
            <div style={{ flex: "1 1 50%" }}>
              <Form.Item name="surname" label="Soyad">
                <Input
                  defaultValue={"Ibrahimova"}
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
                  defaultValue={"hajar@gmail.com"}
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
                  defaultValue={"000-00-00"}
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
                defaultValue={moment("1997-07-13", "YYYY-MM-DD")}
              />
            </Form.Item>
            <Form.Item
              label="Şifrə"
              name="password"
              style={{ flex: "1 1 50%" }}
            >
              <Input.Password style={{ width: "100%",padding:"14px",border:"none"}} defaultValue={"hajar"} />
            </Form.Item>
          </div>
          <div className="myInfo_btn">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                <EditOutlined style={{ fontSize: "17px" }} />
                Məlumatları yenilə
              </Button>
            </Form.Item>
            {/* <Form.Item>
              <Button type="primary" htmlType="submit">
                <SaveOutlined style={{ fontSize: "17px" }} />
                Yadda saxla
              </Button>
            </Form.Item> */}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default MyInfo;
