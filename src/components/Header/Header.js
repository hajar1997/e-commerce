import React from "react";
import { Link } from "react-router-dom";
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
              <Link className="text-dark">
                <UserOutlined style={{ fontSize: "20px" }} />
              </Link>
              <Link className="text-dark">
                <HeartOutlined style={{ fontSize: "20px" }} />
              </Link>
              <div className="shopping-icon d-flex align-items-center">
                <Link className="text-dark">
                  <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                </Link>
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
