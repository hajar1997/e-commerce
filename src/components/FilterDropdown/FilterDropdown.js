import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const FilterDropdown = ({
  categoryName,
  handleCheckboxChange,
  selectedCheckboxes,
  allBrands,
  allColors,
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
          {categoryName === "Brend"
            ? allBrands.map((brand) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="productBrand"
                    id={brand}
                    checked={selectedCheckboxes.productBrand?.includes(brand)}
                    onChange={handleCheckboxChange}
                    value={brand}
                  />
                  <label className="form-check-label">{brand}</label>
                </div>
              ))
            : allColors.map((color) => (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="productColor"
                    id={color}
                    checked={selectedCheckboxes.productColor?.includes(color)}
                    onChange={handleCheckboxChange}
                    value={color}
                  />
                  <label className="form-check-label">{color}</label>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
