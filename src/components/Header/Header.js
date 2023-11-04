import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import { fetchBasket, fetchFavorites, menuClicked } from "../../redux/actions/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import MegaMenu from "../MegaMenu/MegaMenu";
import { faBars, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchProduct from "../SearchProduct/SearchProduct";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isRegistered } = useSelector((state) => state.user);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const main = useSelector((state) => state.main);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    if (isOpen === false) {
      setIsOpen(true);
      dispatch(menuClicked(true));
    } else {
      setIsOpen(false);
      dispatch(menuClicked(false));
    }
  };

  useEffect(() => {
    dispatch(fetchBasket());
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname === "/search-results") {
      setIsOpen(false);
      dispatch(menuClicked(false));
    }
  }, [location.pathname, dispatch]);
  

  return (
    <header style={isOpen === true ? { overflowY: "scroll", height: "100vh" } : { overflowY: "unset", height: "unset" }}>
      <div className="container">
        <nav className="d-flex justify-content-between">
          <button onClick={handleMenuClick} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation">
            <FontAwesomeIcon icon={faBars} className="navbar-toggler-icon" />
          </button>
          <div className="header-logo">
            <Link to="/" onClick={() => dispatch(menuClicked(false))}>
              <img src="/images/logo.svg" alt="" />
            </Link>
          </div>
          <div className="search-bar">
            <SearchProduct />
          </div>
          <div className="header-icons">
            <Space size={"large"}>
              <Link onClick={() => dispatch(menuClicked(false))} className="text-dark" to={isLoggedIn || isRegistered ? "/profile" : "/login"}>
                <UserOutlined style={{ fontSize: "20px" }} />
              </Link>
              <div
                className="heart-icon-header"
                onClick={() => {
                  navigate("/favorites");
                  dispatch(menuClicked(false));
                }}
              >
                <Link className="text-dark" to={"/favorites"}>
                  <HeartOutlined style={{ fontSize: "20px" }} />
                  <div className="countOfFavorited ms-2">{main.favorites.length}</div>
                </Link>
              </div>
              <div
                className="shopping-icon d-flex align-items-center"
                onClick={() => {
                  navigate("/basket");
                  dispatch(menuClicked(false));
                }}
              >
                <Link className="text-dark" to={"/basket"}>
                  <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                </Link>
                <div className="countOfShopping ms-2">{main.basket.length}</div>
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
