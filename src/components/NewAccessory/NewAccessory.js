import React,{useState,useEffect} from "react";
import axios from "axios";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Product from "../Product/Product";

const NewAccessory = () => {
  const [data, setData] = useState([]);

  const phonesEndpoint = "http://localhost:8001/smartphones";

  useEffect(() => {
    axios.get(phonesEndpoint).then((res) => {
      setData(res.data);
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
          <h6>Yeni gələn aksessuarlar</h6>
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
              <Link>
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

export default NewAccessory;
