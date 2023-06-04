import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShoppingCartOutlined, UserOutlined, HeartOutlined, EnvironmentOutlined, LogoutOutlined } from "@ant-design/icons";
import { LogOut } from "../redux/actions/action";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import MyFavs from "../components/MyFavs/MyFavs";
import MyAddress from "../components/MyAddress/MyAddress";
import MyInfo from "../components/MyInfo/MyInfo";
import MyOrders from "../components/MyOrders/MyOrders";
import { Content } from "antd/es/layout/layout";
import OrderDetails from "../components/OrderDetails/OrderDetails";

const MyProfile = () => {
  const dispatch = useDispatch();
  const [selectedPath, setSelectedPath] = useState(localStorage.getItem("selectedPath") || "/my-orders");

  const logOut = () => {
    dispatch(LogOut());
    localStorage.removeItem("selectedPath");
    setSelectedPath("/my-orders");
  };

  const handleMenuClick = (e) => {
    setSelectedPath(e.key);
  };

  useEffect(() => {
    localStorage.setItem("selectedPath", selectedPath);
  }, [selectedPath]);

  return (
    <div className="profile_">
      <div className="my__profile">
        <div className="container">
          <div className="row mt-4">
            <div className="col-lg-3">
              <div className="profile__menus">
                <h5
                  style={{
                    color: "#4F4F4F",
                    fontWeight: "600",
                    marginBottom: "30px",
                  }}
                >
                  Profilim
                </h5>
                <Menu selectedKeys={[selectedPath]} onClick={handleMenuClick} theme="light" defaultSelectedKeys={["1"]}>
                  <Menu.Item key="/my-orders">
                    <Link>
                      <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                      <span>Sifarişlərim</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/my-favs">
                    <Link>
                      <HeartOutlined style={{ fontSize: "20px" }} />
                      <span>Favorilərim</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/my-info">
                    <Link>
                      <UserOutlined style={{ fontSize: "20px" }} />
                      <span>Şəxsi məlumatlar</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/my-address">
                    <Link>
                      <EnvironmentOutlined style={{ fontSize: "20px" }} />
                      <span>Çatdırılma ünvanı</span>
                    </Link>
                  </Menu.Item>
                </Menu>
                <div className="log-out">
                  <Link to={"/login"} onClick={() => logOut()}>
                    <LogoutOutlined style={{ fontSize: "20px" }} />
                    <span>Çıxış</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  background: "white",
                }}
              >
                {selectedPath === "/my-orders" && <MyOrders handleMenuClick={handleMenuClick} />}
                {selectedPath === "/my-favs" && <MyFavs />}
                {selectedPath === "/my-info" && <MyInfo />}
                {selectedPath === "/my-address" && <MyAddress />}
                {selectedPath === "/order-details" && <OrderDetails handleMenuClick={handleMenuClick} />}
              </Content>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
