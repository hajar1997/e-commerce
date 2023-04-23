import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { fetchData } from "../../redux/actions/action";
import Slider from "react-slick";

const NewAccessory = ({ main, fetchData }) => {

  useEffect(() => {
    fetchData();
  }, []);
  
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
          <a href="/products">
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
              <Link>
                <div className="card-wrapper">
                  <img src={product.img} />
                  <div className="card__content">
                    <a href="#">
                      {product.productBrand} {product.productModel} {product.memory}{" "}
                      {product.productColor}
                    </a>
                    <span>{product.price} $</span>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <div className="bottom-heading">
          <a href="#">
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
