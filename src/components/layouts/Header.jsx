import React from "react";
import logo from "../../assets/images/logo.svg";
import {
  UserOutlined,
  SearchOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import { Space } from "antd";

const { Search } = Input;
const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#828282",
      marginRight: 10,
    }}
  />
);

const onSearch = (value) => console.log(value);

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <div className="header-logo">
            <img src={logo} alt="" />
          </div>
          <div className="search-bar">
            <Search placeholder="Axtarış..." size="large" prefix={prefix} />
          </div>
          <div className="header-icons">
            <Space size={"large"}>
              <UserOutlined style={{ fontSize: "20px" }} />
              <HeartOutlined style={{ fontSize: "20px" }} />
              <div className="shopping-icon d-flex align-items-center">
                <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                <div className="countOfShopping ms-2">0</div>
              </div>
            </Space>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
