import React from "react";
import { Button, Form, Input } from "antd";

const RenewPasswordPage = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="forget_password_page">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="forget_password">
                <h6>Şifrəni yenilə</h6>
                <span className="forget_info_title mb-3">
                  Hesabınıza yeni şifrə təyin edin
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
                      label="Yeni Şifrə"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Şifrənizi daxil edin!",
                        },
                      ]}
                    >
                      <Input.Password
                        placeholder="Yeni şifrənizi daxil edin"
                        size="large"
                      />
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
                          color: "white",
                        }}
                      >
                        Təsdiqlə
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login__right_side">
                <img src="/images/renew__.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewPasswordPage;
