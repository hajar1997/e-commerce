import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "../../assets/images/best-seller-product-1.png";
import img2 from "../../assets/images/best-seller-product-2.png";
import img3 from "../../assets/images/best-seller-product-3.png";
import img4 from "../../assets/images/best-seller-product-4.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Product from "../Product/Product";

const BestSellerProduct = () => {
  const products = [
    {
      id: "1",
      brand: "Apple",
      model: "iPhone 12",
      memory: "64 GB",
      color: "Purple",
      img: img1,
      price: "2089",
    },
    {
      id: "2",
      brand: "Nokia",
      model: "X10",
      memory: "64 GB",
      color: "Deep Green",
      img: img2,
      price: "1360",
    },
    {
      id: "3",
      brand: "Xiaomi",
      model: "Poco M3",
      memory: "4/128 GB",
      color: "Yellow (Global)",
      img: img3,
      price: "389.0",
    },
    {
      id: "4",
      brand: "Realme",
      model: "8 Pro",
      memory: "6/128 GB",
      color: "Black",
      img: img4,
      price: "649.0",
    },
  ];

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
          <a href="#">
            Hamısına bax
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ width: "6px", background: "#333333;" }}
            />
          </a>
        </div>
        <div className="cards__wrapper">
          <Slider {...settings}>
            {products.map((product) => (
              <Link>
                <Product
                  img={product.img}
                  brand={product.brand}
                  model={product.model}
                  memory={product.memory}
                  color={product.color}
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

export default BestSellerProduct;
