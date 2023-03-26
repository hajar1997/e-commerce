import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import MegaMenu from "../MegaMenu/MegaMenu";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchProduct from "../SearchProduct/SearchProduct";

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav className="d-flex justify-content-between">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" />
          </button>
          <div className="header-logo">
            <img src={logo} alt="" />
          </div>
          <div className="search-bar">
            <SearchProduct />
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
      <div className="mobile-navbar">
        <MegaMenu />
      </div>
      <hr className="hr-line" />
    </header>
  );
};

export default Header;
