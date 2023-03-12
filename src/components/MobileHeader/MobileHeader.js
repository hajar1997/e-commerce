import React, { useState } from "react";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import img from "../../assets/images/mega-menu-pic.png";
import { Space } from "antd";
import { Input } from "antd";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const MobileHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.target.name);
  };

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };
  
  const categories = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Redmi",
    "Bütün Brendlər",
    "Aksessuarlar",
    "Endirimlər",
  ];

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-md navbar-light bg-white mobile-navbar">
        <div className="logo-toggle-wrapper">
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleMenuClick}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <a href="#" className="navbar-brand logo">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className="header-icons">
          <Space size={"small"}>
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
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarCollapse"
        >
          <div className="container-fluid">
            <ul className="navbar-nav">
              <li className="nav-item dropdown has-megamenu">
                <a
                  className="nav-link active"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Yeni
                  <FontAwesomeIcon
                    className="mobile-dropdown"
                    icon={faChevronRight}
                  />
                </a>
                <div className="dropdown-menu megamenu" role="menu">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-2 col-sm-12">
                        <div className="col-megamenu">
                          <h6 className="title">Başlıq</h6>
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <div className="col-megamenu">
                          <h6 className="title">Başlıq</h6>
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-12">
                        <div className="col-megamenu">
                          <h6 className="title">Başlıq</h6>
                          <ul className="list-unstyled">
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                            <li>
                              <a href="#">Alt başlıq</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="col-megamenu">
                          <img src={img} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {categories.map((category) => (
                <li className="nav-item dropdown has-megamenu">
                  <a className="nav-link" href="#" data-bs-toggle="dropdown">
                    {category}
                    <FontAwesomeIcon
                      className="mobile-dropdown"
                      icon={faChevronRight}
                    />
                  </a>
                  <div className="dropdown-menu megamenu" role="menu">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-2 col-sm-12">
                          <div className="col-megamenu">
                            <h6 className="title">Başlıq</h6>
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <div className="col-megamenu">
                            <h6 className="title">Başlıq</h6>
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-12">
                          <div className="col-megamenu">
                            <h6 className="title">Başlıq</h6>
                            <ul className="list-unstyled">
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                              <li>
                                <a href="#">Alt başlıq</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
              <li className="nav-item mt-2">
                <button className="btn btn-outline-secondary me-2">
                  Login
                </button>
                <button className="btn btn-primary">Register</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="search-bar">
        <Search placeholder="Axtarış..." size="large" prefix={prefix} />
      </div>
    </div>
  );
};

export default MobileHeader;
