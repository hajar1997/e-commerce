import React from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { connect, useSelector } from "react-redux";
import MegaMenu from "../MegaMenu/MegaMenu";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchProduct from "../SearchProduct/SearchProduct";

const Header = ({ main }) => {
  // const count = useSelector((state) => state.main.productCount);
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
            <Link to="/">
              <img src="/images/logo.svg" alt="" />
            </Link>
          </div>
          <div className="search-bar">
            <SearchProduct />
          </div>
          <div className="header-icons">
            <Space size={"large"}>
              <Link className="text-dark" to={"/profile"}>
                <UserOutlined style={{ fontSize: "20px" }} />
              </Link>
              <Link className="text-dark" to={"/favorites"}>
                <HeartOutlined style={{ fontSize: "20px" }} />
              </Link>
              <div className="shopping-icon d-flex align-items-center">
                <Link className="text-dark" to={"/basket"}>
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

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps)(Header);
