import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const FilterDropdown = ({
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
          {categoryItem.map((category) => (
            <div className="form-check" key={category.id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={category.value}
                name={
                  categoryName === "Brend" ? "productBrand" : "productColor"
                }
                checked={
                  selectedCheckboxes.productBrand.includes(category.value) ||
                  selectedCheckboxes.productColor.includes(category.value) 
                }
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" key={category.value}>
                {category.value}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
