import React, { useEffect } from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Product from "../Product/Product";
import { fetchData } from "../../redux/actions/action";
import { connect } from "react-redux";

const BestSellerProduct = ({ main, fetchData }) => {
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
              <Link key={product.id}>
                <Product
                  img={product.img}
                  brand={product.productBrand}
                  model={product.productModel}
                  memory={product.memory}
                  color={product.productColor}
                  price={product.price}
                />
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

export default connect(mapStateToProps, { fetchData })(BestSellerProduct);
