import React from "react";

const Product = ({ img, brand, color, model, memory, price }) => {
  return (
    <div className="card-wrapper">
      <img src={img} />
      <div className="card__content">
        <a href="#">
          {brand} {model} {memory}
          <br/> {color}
        </a>
        <span>{price} ₼</span>
      </div>
    </div>
  );
};

export default Product;
