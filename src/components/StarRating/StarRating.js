import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={`star ${index < rating ? "filled" : ""}`}
      onClick={() => handleClick(index + 1)}
    >
      &#9733;
    </span>
  ));

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
