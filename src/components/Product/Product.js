import React from "react";

const Product = ({ img, brand, color, memory, price }) => {
  return (
    <div className="card-wrapper">
      <img src={img} />
      <div className="card__content">
        <a href="#">
          {brand} {memory} GB {color}
        </a>
        <span>{price} $</span>
      </div>
    </div>
  );
};

export default Product;
