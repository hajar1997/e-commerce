import React from "react";

const Product = ({ brand,img, model, color, memory, price }) => {
  
  return (
    <div className="card-wrapper">
      <img src={img} />
      <div className="card__content">
        <a href="#">
        {brand} {model} {memory} GB {color}
        </a>
        <span>{price} $</span>
      </div>
    </div>
  );
};

export default Product;
