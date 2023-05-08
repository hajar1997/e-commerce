import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";

const LoginPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
              <h5>Daxil ol</h5>
              <div className="login_with">
                <div className="with_fb">
                  <div className="fb_icon">
                    <FontAwesomeIcon icon={faFacebook} />
                  </div>
                  <span>Facebook ilə</span>
                </div>
                <div className="with_gm">
                  <div className="gm_icon">
                    <FontAwesomeIcon
                      icon={faGoogle}
                      style={{ color: "#ffffff" }}
                    />
                  </div>
                  <span>Google ilə</span>
                </div>
              </div>
              <span className="or_with">və ya</span>
              <div className="form__">
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  layout="vertical"
                  style={{
                    maxWidth: 350,
                    width: "100%",
                  }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Emailinizi daxil edin!",
                      },
                    ]}
                  >
                    <Input placeholder="nümunə@gmail.com" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Şifrə"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Şifrənizi daxil edin!",
                      },
                    ]}
                  >
                    <Input.Password
                      placeholder="Şifrənizi daxil edin"
                      size="large"
                    />
                  </Form.Item>
                  <a className="login-form-forgot" href="">
                    Şifrəni unutmusunuz?
                  </a>

                  {/* <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item> */}
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
                      Daxil ol
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
                  Hesabınız yoxdur? <a href="/register">Qeydiyyatdan keçin</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
