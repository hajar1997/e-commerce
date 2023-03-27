import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faDollarSign,
  faManatSign,
} from "@fortawesome/free-solid-svg-icons";

const PriceRange = () => {
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
        <h5>Qiymət</h5>
        {toggle ? (
          <FontAwesomeIcon icon={faPlus} onClick={handlePlusClick} />
        ) : (
          <FontAwesomeIcon icon={faMinus} onClick={handeMinusClick} />
        )}
      </div>
      <hr />
      {toggle ? (
        <div className="price-range-container">
          <div className="input-wrapper">
            <input
              className="form-control"
              type="text"
              placeholder="Ən az"
              aria-label="default input example"
            />
            {/* <FontAwesomeIcon icon={faManatSign} /> */}
            <FontAwesomeIcon icon={faDollarSign} />
          </div>
          <span></span>
          <div className="input-wrapper">
            <input
              className="form-control"
              type="text"
              placeholder="Ən çox"
              aria-label="default input example"
            />
            <FontAwesomeIcon icon={faDollarSign} />
            {/* <FontAwesomeIcon icon={faManatSign} /> */}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PriceRange;
