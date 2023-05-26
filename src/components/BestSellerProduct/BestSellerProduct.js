import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  fetchData,
  fetchFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
} from "../../redux/actions/action";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const BestSellerProduct = () => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);
  const favorites = useSelector((state) => state.main.favorites);

  const isProductFavorite = (id) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  const handleHeartClick = (id) => {
    if (isProductFavorite(id)) {
      dispatch(removeProductFromFavorites(id));
    } else {
      dispatch(addProductToFavorites(id));
    }
  };

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchFavorites());
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    swipeToSlide: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 766,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="best-seller-products">
      <div className="container">
        <div className="headings">
          <h6>Ən çox satılan məhsullar</h6>
          <a href="/products/phones">
            Hamısına bax
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ width: "6px", background: "#333333;" }}
            />
          </a>
        </div>
        <div className="cards__wrapper">
          <Slider {...settings}>
            {main.phones.map((product) => (
              <div className="card-wrapper" key={product.id}>
                <Link
                  to={`/product-details/phones/${product.productBrand}/${product.productModel}/${product.id}`}
                >
                  <img src={product.img[0]} />
                </Link>
                <div className="card__content">
                  <Link
                    to={`/product-details/phones/${product.productBrand}/${product.productModel}/${product.id}`}
                  >
                    {product.productBrand} {product.productModel}{" "}
                    {product.memory ? `${product.memory} GB ` : ""}{" "}
                    {product.productColor}
                  </Link>
                  <span>{product.price} $</span>
                </div>
                <div className="heart_icon_card">
                  <FontAwesomeIcon
                    onClick={() => handleHeartClick(product.id)}
                    style={{
                      color: isProductFavorite(product.id)
                        ? "#dc3545"
                        : "#c2c5ca",
                      fontSize: "20px",
                    }}
                    icon={faHeart}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className="bottom-heading">
          <a href="/products/phones">
            Hamısına bax
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ width: "6px", background: "#333333;" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestSellerProduct;
