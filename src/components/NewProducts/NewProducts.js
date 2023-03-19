import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img1 from "../../assets/images/new-products-1.png";
import img2 from "../../assets/images/new-products-2.png";
import img3 from "../../assets/images/new-products-3.png";
import img4 from "../../assets/images/new-products-4.png";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Product from "../Product/Product";

const NewProducts = () => {
  const products = [
    {
      id: "1",
      brand: "iPhone",
      model: "13 Pro Max",
      memory: "1 TB",
      color: "Sierra Blue",
      img: img1,
      price: "4669",
    },
    {
      id: "2",
      brand: "iPhone",
      model: "13",
      memory: "256 GB",
      color: "Midnight",
      img: img2,
      price: "2629",
    },
    {
      id: "3",
      brand: "Honor",
      model: "10",
      memory: "128 GB",
      color: "Midnight Black",
      img: img3,
      price: "799.9",
    },
    {
      id: "4",
      brand: "Samsung",
      model: "Galaxy Z Fold3",
      memory: "(SM-F926)",
      color: "Green",
      img: img4,
      price: "4199",
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
          <h6>Yeni gələn məhsullar</h6>
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

export default NewProducts;
