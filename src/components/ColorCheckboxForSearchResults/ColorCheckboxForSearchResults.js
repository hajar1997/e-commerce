import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const ColorCheckboxForSearchResults = ({
  categoryName,
  categoryItem,
  handleCheckboxChange,
  selectedCheckboxes,
}) => {
  const [toggle, setToggle] = useState(true);

  const handlePlusClick = () => {
    setToggle(false);
  };

  const handeMinusClick = () => {
    setToggle(true);
  };
  return (
    <div className="filter-dropdown-container">
      <div className="filter-heading-wrapper">
        <h5>{categoryName}</h5>
        {toggle ? (
          <FontAwesomeIcon icon={faPlus} onClick={handlePlusClick} />
        ) : (
          <FontAwesomeIcon icon={faMinus} onClick={handeMinusClick} />
        )}
      </div>
      <hr />
      {toggle && (
        <div className="checkboxes-container">
          {categoryItem.map((category, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                id={category}
                type="checkbox"
                value={category}
                name="productColor"
                checked={selectedCheckboxes.productColor.includes(category)}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={category}>
                {category}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorCheckboxForSearchResults;
