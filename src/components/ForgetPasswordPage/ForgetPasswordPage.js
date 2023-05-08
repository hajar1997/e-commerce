import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="forget_password_page">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="forget_password">
              <h6>Şifrəmi unutdum</h6>
              <span className="forget_info_title">
                Doğrulama kodunu almaq üçün e - poçt ünvanınızı daxil edin
              </span>
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
                  <Form.Item>
                    <Button
                    onClick={() => navigate("/mail-check")}
                      type="primary"
                      htmlType="submit"
                      style={{
                        marginTop: "40px",
                        backgroundColor: "#2DD06E",
                        width: "100%",
                        height: "44px",
                        color: "white",
                      }}
                    >
                      Göndər
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login__right_side">
              <img src="/images/Group5548.svg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
