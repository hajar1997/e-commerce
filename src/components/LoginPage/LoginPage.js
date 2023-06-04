import React, { useEffect } from "react";
import { LoginUser } from "../../redux/actions/action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(LoginUser(values.email, values.password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);
  return (
    <div className="login_">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="login__form">
              <h5>Daxil ol</h5>
              <div className="form__ mt-4">
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
                        type: "email",
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
                    <Input.Password placeholder="Şifrənizi daxil edin" size="large" />
                  </Form.Item>
                  <a className="login-form-forgot" href="/forget-password">
                    Şifrəni unutmusunuz?
                  </a>
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
