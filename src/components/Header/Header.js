import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchBasket, fetchFavorites } from "../../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";
import MegaMenu from "../MegaMenu/MegaMenu";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchProduct from "../SearchProduct/SearchProduct";

const Header = () => {
  const { isRegistered } = useSelector((state) => state.user);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const favorites = useSelector((state) => state.main.favorites.length);
  const basket = useSelector((state) => state.main.basket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBasket());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const basketCount = basket.reduce(
    (total, product) => total + product.quantity,
    0
  );
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
              <Link
                className="text-dark"
                to={isLoggedIn || isRegistered ? "/profile" : "/login"}
              >
                <UserOutlined style={{ fontSize: "20px" }} />
              </Link>
              <div className="heart-icon-header" onClick={() => navigate('/favorites')}>
                <Link className="text-dark" to={"/favorites"}>
                  <HeartOutlined style={{ fontSize: "20px" }} />
                  <div className="countOfFavorited ms-2">{favorites}</div>
                </Link>
              </div>
              <div className="shopping-icon d-flex align-items-center" onClick={() => navigate('/basket')}>
                <Link className="text-dark" to={"/basket"}>
                  <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                </Link>
                <div className="countOfShopping ms-2">{basketCount}</div>
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
