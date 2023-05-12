import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "antd/es/form/Form";
import { Button, Checkbox, Form, Input, Select, InputNumber } from "antd";
import { RegisterUser } from "../../redux/actions/action";

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
const RegisterPage = () => {
  const dispatch = useDispatch();

  const [userInfoForm] = useForm();

  const onFinish = (values) => {
    const phone = values.prefix + "-" + values.phone;
    dispatch(
      RegisterUser(values.name_surname, values.email, phone, values.password)
    );
    userInfoForm.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login_">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="login__form">
              <h5>Qeydiyyat</h5>
              <div className="form__ form_register mt-4">
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  initialValues={{
                    prefix: "070",
                  }}
                  style={{
                    maxWidth: 350,
                    width: "100%",
                  }}
                  form={userInfoForm}
                  layout="vertical"
                >
                  <Form.Item
                    name="name_surname"
                    label="Ad, Soyad"
                    rules={[
                      {
                        required: true,
                        message: "Ad, Soyadınızı daxil edin!",
                      },
                    ]}
                  >
                    <Input
                      style={{
                        border: "none",
                      }}
                      size="large"
                      placeholder="Ad və soyadınızı daxil edin"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Emailinizi daxil edin!",
                      },
                      {
                        type: "email",
                        message: "Emaili düzgün daxil edin!",
                      },
                    ]}
                  >
                    <Input placeholder="nümunə@gmail.com" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Mobil nömrə"
                    rules={[
                      {
                        required: true,
                        message: "Mobil nömrənizi daxil edin!",
                      },
                      {
                        type: "number",
                        message: "Nömrənizi düzgün daxil edin!",
                      },
                    ]}
                  >
                    <InputNumber
                      addonBefore={prefixSelector}
                      style={{
                        width: "100%",
                        border: "none",
                      }}
                      size="large"
                      bordered={false}
                      controls={false}
                      placeholder={"000-00-00"}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Şifrə"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Şifrənizi daxil edin!",
                      },
                      {
                        min: 5,
                        max: 1000,
                        message: "Şifrənin uzunluğu 5-90 aralığında olmalıdır!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Şifrənizi daxil edin"
                      size="large"
                    />
                  </Form.Item>
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Should accept agreement")
                              ),
                      },
                    ]}
                  >
                    <Checkbox>
                      <a href="">İstifadəçi şərtləri</a>{" "}
                      <span>ilə razıyam</span>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        marginTop: "40px",
                        backgroundColor: "#2DD06E",
                        width: "100%",
                        height: "44px",
                      }}
                    >
                      Qeydiyyat
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login__right_side">
              <img src="/images/login_right_side_img.svg" />
              <img className="dot_img" src="/images/Dot-Grid.svg" />
              <div className="direct_to_register">
                <h5>
                  Artıq hesabınız var? <a href="/login">Daxil olun </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
