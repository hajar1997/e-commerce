import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const FilterDropdown = ({ categoryName, categoryItem }) => {
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
                type="checkbox"
                defaultValue
                id={index}
              />
              <label className="form-check-label" htmlFor={index}>
                {category.brand ||
                  category.color ||
                  category.memory ||
                  category.memory}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
