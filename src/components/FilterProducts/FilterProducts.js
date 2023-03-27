import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import PriceRange from "../PriceRange/PriceRange";

const FilterProducts = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [daxiliYaddas, setDaxiliYaddas] = useState([]);
  const [operativYaddas, setOperativYaddas] = useState([]);
  const [colors, setColors] = useState([]);

  const brandsEndpoint = "http://localhost:8001/brands";
  const filterCategoriesEndpoint = "http://localhost:8001/filterCategories";
  const daxiliYaddasEndpoint = "http://localhost:8001/daxiliYaddas";
  const operativYaddasEndpoint = "http://localhost:8001/operativYaddas";
  const colorsEndpoint = "http://localhost:8001/colors";

  useEffect(() => {
    axios
      .all([
        axios.get(brandsEndpoint),
        axios.get(filterCategoriesEndpoint),
        axios.get(daxiliYaddasEndpoint),
        axios.get(operativYaddasEndpoint),
        axios.get(colorsEndpoint),
      ])
      .then(
        axios.spread(
          (
            brandsEndpoint,
            filterCategoriesEndpoint,
            daxiliYaddasEndpoint,
            operativYaddasEndpoint,
            colorsEndpoint
          ) => {
            setBrands(brandsEndpoint.data);
            setCategories(filterCategoriesEndpoint.data);
            setDaxiliYaddas(daxiliYaddasEndpoint.data);
            setOperativYaddas(operativYaddasEndpoint.data);
            setColors(colorsEndpoint.data);
          }
        )
      );
  }, []);

  return (
    <div className="filter-area-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Ana səhifə</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#">Telefonlar</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <span>Apple</span>
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-3">
            {categories.map((category, index) => (
              <FilterDropdown
                key={index}
                categoryName={category.category}
                categoryItem={
                  category.category === "Brend"
                    ? brands
                    : category.category === "Rəng"
                    ? colors
                    : category.category === "Daxili Yaddaş"
                    ? daxiliYaddas
                    : operativYaddas
                }
              />
            ))}
            <PriceRange />
          </div>
          <div className="col-lg-9"></div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
