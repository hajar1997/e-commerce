import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { fetchData } from "../../redux/actions/action";
import Slider from "react-slick";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const NewAccessory = ({ main, fetchData }) => {
  const [clicked, setClicked] = useState([]);

  const handleHeartClick = (productId) => {
    if (clicked.includes(productId)) {
      setClicked(clicked.filter((id) => id !== productId));
    } else {
      setClicked([...clicked, productId]);
    }
  };

  useEffect(() => {
    fetchData();
    const clickedProducts = JSON.parse(localStorage.getItem("clickedProducts"));
    if (clickedProducts) {
      setClicked(clickedProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("clickedProducts", JSON.stringify(clicked));
  }, [clicked]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
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
          <h6>Yeni gələn aksessuarlar</h6>
          <a href="/products/accessories">
            Hamısına bax
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ width: "6px", background: "#333333;" }}
            />
          </a>
        </div>
        <div className="cards__wrapper">
          <Slider {...settings}>
            {main.accessories.map((product) => (
              <div className="card-wrapper" key={product.id}>
                <Link
                  to={`/product-details/accessories/${product.productBrand}/${product.productModel}/${product.id}`}
                >
                  <img src={product.img[0]} />
                </Link>
                <div className="card__content">
                  <Link
                    to={`/product-details/accessories/${product.productBrand}/${product.productModel}/${product.id}`}
                  >
                    {product.productBrand} {product.productModel}{" "}
                    {product.memory} GB {product.productColor}
                  </Link>
                  <span>{product.price} $</span>
                </div>
                <div className="heart_icon_card">
                  <FontAwesomeIcon
                    onClick={() => handleHeartClick(product.id)}
                    style={{
                      color: clicked.includes(product.id)
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
          <a href="/products/accessories">
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

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { fetchData })(NewAccessory);
