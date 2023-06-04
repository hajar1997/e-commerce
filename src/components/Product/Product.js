import React from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Product = ({ brand, img, model, color, memory, price, id, handleHeartClick, isProductFavorite }) => {
  const { category } = useParams();

  return (
    <div className="card-wrapper" key={id}>
      <Link to={`/product-details/${category}/${brand}/${model}/${id}`}>
        <img src={img[0]} />
      </Link>
      <div className="card__content">
        <Link to={`/product-details/${category}/${brand}/${model}/${id}`}>
          {brand} {model} {memory ? ` ${memory} GB ` : " "}
          {color}
        </Link>
        <span>{price} $</span>
      </div>
      <div className="heart_icon_card">
        <FontAwesomeIcon
          onClick={() => handleHeartClick(id)}
          style={{
            color: isProductFavorite(id) ? "#dc3545" : "#c2c5ca",
            fontSize: "20px",
          }}
          icon={faHeart}
        />
      </div>
    </div>
  );
};

export default Product;
