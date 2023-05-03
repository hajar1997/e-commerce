import React, { useState, useEffect } from "react";
import {
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  EnvironmentOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { Menu, Drawer } from "antd";
import MyFavs from "./MyFavs";
import MyAddress from "./MyAddress";
import MyInfo from "./MyInfo";
import MyOrders from "./MyOrders";
import { Content } from "antd/es/layout/layout";

const MyProfile = () => {
  const [selectedPath, setSelectedPath] = useState(
    localStorage.getItem("selectedPath") || "/my-orders"
  );

  const handleMenuClick = (e) => {
    setSelectedPath(e.key);
  };
  useEffect(() => {
    localStorage.setItem("selectedPath", selectedPath);
  }, [selectedPath]);

  return (
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
              <Menu
                selectedKeys={[selectedPath]}
                onClick={handleMenuClick}
                theme="light"
                defaultSelectedKeys={["1"]}
              >
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
                <Menu.Item key="5">
                  <Link>
                    <LogoutOutlined style={{ fontSize: "20px" }} />
                    <span>Çıxış</span>
                  </Link>
                </Menu.Item>
              </Menu>
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
              {selectedPath === "/my-orders" && <MyOrders />}
              {selectedPath === "/my-favs" && <MyFavs />}
              {selectedPath === "/my-info" && <MyInfo />}
              {selectedPath === "/my-address" && <MyAddress />}
            </Content>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

// import React, { useState, useEffect } from "react";
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   ShoppingCartOutlined,
//   UserOutlined,
//   HeartOutlined,
//   EnvironmentOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import { Link, useLocation } from "react-router-dom";
// import { Button, Layout, Menu, theme } from "antd";
// import MyFavs from "./MyFavs";
// import MyAddress from "./MyAddress";
// import MyInfo from "./MyInfo";
// import MyOrders from "./MyOrders";

// const { Header, Sider, Content } = Layout;

// const MyProfile = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedPath, setSelectedPath] = useState(
//     localStorage.getItem("selectedPath") || "/my-orders"
//   );
//   const location = useLocation();
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const handleMenuClick = (e) => {
//     // update the selected path when a menu item is clicked
//     setSelectedPath(e.key);
//   };
//   useEffect(() => {
//     localStorage.setItem("selectedPath", selectedPath);
//   }, [selectedPath]);
//   return (
//     <div className="my__profile">
//       <div className="container">
//         <Layout>
//           <Sider
//             trigger={null}
//             collapsible
//             collapsed={collapsed}
//             className="profile__menus"
//           >
//             <h5
//               style={{
//                 color: "#4F4F4F",
//                 fontWeight: "600",
//                 marginBottom: "30px",
//               }}
//             >
//               Profilim
//             </h5>
//             <Menu
//               selectedKeys={[selectedPath]}
//               onClick={handleMenuClick}
//               theme="dark"
//               mode="inline"
//               defaultSelectedKeys={["1"]}
//             >
//               <Menu.Item key="/my-orders">
//                 <Link>
//                   <ShoppingCartOutlined style={{ fontSize: "20px" }} />
//                   <span>Sifarişlərim</span>
//                 </Link>
//               </Menu.Item>
//               <Menu.Item key="/my-favs">
//                 <Link>
//                   <HeartOutlined style={{ fontSize: "20px" }} />
//                   <span>Favorilərim</span>
//                 </Link>
//               </Menu.Item>
//               <Menu.Item key="/my-info">
//                 <Link>
//                   <UserOutlined style={{ fontSize: "20px" }} />
//                   <span>Şəxsi məlumatlar</span>
//                 </Link>
//               </Menu.Item>
//               <Menu.Item key="/my-address">
//                 <Link>
//                   <EnvironmentOutlined style={{ fontSize: "20px" }} />
//                   <span>Çatdırılma ünvanı</span>
//                 </Link>
//               </Menu.Item>
//               <Menu.Item key="5">
//                 <Link>
//                   <LogoutOutlined style={{ fontSize: "20px" }} />
//                   <span>Çıxış</span>
//                 </Link>
//               </Menu.Item>
//             </Menu>
//           </Sider>
//           <Layout>
//             <Header
//               style={{
//                 padding: 0,
//                 background: colorBgContainer,
//               }}
//             >
//               <Button
//                 type="text"
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//                 onClick={() => setCollapsed(!collapsed)}
//                 style={{
//                   fontSize: "16px",
//                   width: 64,
//                   height: 64,
//                 }}
//               />
//             </Header>
//             <Content
//               style={{
//                 margin: "24px 16px",
//                 padding: 24,
//                 minHeight: 280,
//                 background: colorBgContainer,
//               }}
//             >
//               {selectedPath === "/my-orders" && <MyOrders />}
//               {selectedPath === "/my-favs" && <MyFavs />}
//               {selectedPath === "/my-info" && <MyInfo />}
//               {selectedPath === "/my-address" && <MyAddress />}
//             </Content>
//           </Layout>
//         </Layout>
//       </div>
//     </div>
//   );
// };
// export default MyProfile;
