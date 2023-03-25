import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Product from "../Product/Product";

const NewProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/smartphones?populate=*").then((response) => {
      const filteredData = response.data.data.filter(
        (phone) =>
          phone.images &&
          phone.images.length > 0 &&
          phone.prices &&
          phone.prices.length > 0 &&
          phone.prices[0].price !== null
      );
      setData(filteredData);
    });
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
            {data.map((product) => (
              <Link key={product.id}>
                <Product
                  img={product.images[0].url}
                  brand={product.name}
                  memory={product.main.storage_capacity__gb}
                  color={product.main.design_color_name}
                  price={product.prices[0].price}
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
