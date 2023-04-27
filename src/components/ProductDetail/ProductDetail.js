import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../redux/actions/action";
import Slider from "react-slick";
import { connect } from "react-redux";

const ProductDetail = ({ main, fetchData }) => {
  const { category, productBrand, id } = useParams();
  const navigate = useNavigate();
  const product = main[category]?.find((product) => product.id === id);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img key={i} src={product.img[i][i]} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(product);
  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#" onClick={() => navigate("/")}>
              Ana səhifə
            </a>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <a href="#" onClick={() => navigate(`/products/${category}`)}>
              {category === "phones"
                ? "Telefonlar"
                : category === "smartWatches"
                ? "Smart saatlar"
                : category === "accessories"
                ? "Aksessuarlar"
                : ""}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>{productBrand}</span>
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-lg-6">
          <div className="detail_slider_wrapper">
            <Slider {...settings}>
              {product &&
                product.img.map((imgUrl) => (
                  <div>
                    <img key={imgUrl} src={imgUrl} />
                  </div>
                ))}
            </Slider>
          </div>
        </div>
        <div className="col-lg-6">description</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { fetchData })(ProductDetail);
