import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import Product from "../Product/Product";
import { Select, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchData } from "../../redux/actions/action";
import {
  faTimes,
  faPlus,
  faMinus,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const FilterProducts = ({ main, fetchData }) => {
  const [leftSideMobileIsOpen, setLeftSideMobileIsOpen] = useState(false);
  const [rightSideMobileIsOpen, setRightSideMobileIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [toggle, setToggle] = useState(true);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    productBrand: [],
    productColor: [],
  });
  const { category } = useParams();
  const [sortedData, setSortedData] = useState(main[category]);
  const [sortClicked, setSortClicked] = useState(false);

  const navigate = useNavigate();

  const handlePlusClick = () => {
    setToggle(false);
  };

  const handleMinusClick = () => {
    setToggle(true);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "min") {
      setMinPrice(value);
    } else if (name === "max") {
      setMaxPrice(value);
    }
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setSelectedCheckboxes((prevState) => ({
      ...prevState,
      [name]: prevState[name].includes(value)
        ? prevState[name].filter((checkbox) => checkbox !== value)
        : [...prevState[name], value],
    }));
  };

  const allBrands = [
    ...new Set(main[category].map((product) => product.productBrand)),
  ];
  const allColors = [
    ...new Set(main[category].map((product) => product.productColor)),
  ];

  const handleSorting = (value) => {
    const newData = [...main[category]];
    if (value === "Ən yenilər") {
      newData.sort((a, b) => b.id - a.id);
    } else if (value === "Əvvəlcə ucuz") {
      newData.sort((a, b) => a.price - b.price);
    } else if (value === "Əvvəlcə baha") {
      newData.sort((a, b) => b.price - a.price);
    }
    setSortedData(newData);
    setSortClicked(true);
  };

  const filterProducts = (products) =>
    products.filter(
      (product) =>
        (selectedCheckboxes.productBrand.length === 0 ||
          selectedCheckboxes.productBrand.includes(product.productBrand)) &&
        (selectedCheckboxes.productColor.length === 0 ||
          selectedCheckboxes.productColor.includes(product.productColor)) &&
        (maxPrice.length === 0 ||
          (!isNaN(maxPrice) && product.price <= parseInt(maxPrice))) &&
        (minPrice.length === 0 ||
          (!isNaN(minPrice) && product.price >= parseInt(minPrice)))
    );

  const filteredProducts = sortClicked
    ? filterProducts(sortedData)
    : filterProducts(main[category]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="filter-area-wrapper">
      {isMobile ? (
        <div>
          <div className="mversion-container">
            <div
              className="leftSide__mobile"
              onClick={() =>
                setLeftSideMobileIsOpen(
                  (prevLeftSideMobileIsOpen) => !prevLeftSideMobileIsOpen
                )
              }
            >
              <img src="/images/siralama-icon.svg" />
              <h5>Sıralama</h5>
            </div>
            <Divider type="vertical" />
            <div
              className="rightSide__mobile"
              onClick={() => setRightSideMobileIsOpen(true)}
            >
              <img src="/images/filter-icon.svg" />
              <h5>Filterləmələr</h5>
            </div>
          </div>
          <Divider type="horizontal" />
          {leftSideMobileIsOpen && (
            <div className="left-side-mobile__opened">
              <div className="container">
                <Select
                  defaultValue="Sıralamanı seç"
                  style={{
                    width: 176,
                  }}
                  onChange={handleSorting}
                  options={[
                    {
                      value: "Ən yenilər",
                      label: "Ən yenilər",
                    },
                    {
                      value: "Əvvəlcə ucuz",
                      label: "Əvvəlcə ucuz",
                    },
                    {
                      value: "Əvvəlcə baha",
                      label: "Əvvəlcə baha",
                    },
                  ]}
                />
              </div>
            </div>
          )}
          {rightSideMobileIsOpen && (
            <div className="right-side-mobile__opened">
              <div className="container">
                <div className="mversion_opened_header">
                  <FontAwesomeIcon
                    icon={faTimes}
                    onClick={() => setRightSideMobileIsOpen(false)}
                  />
                  <h6>Filterləmələr</h6>
                </div>
                <Divider className="hr-divider" type="horizontal" />
                {main.categories.map((category) => (
                  <FilterDropdown
                    key={category.id}
                    categoryName={category.category}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedCheckboxes={selectedCheckboxes}
                    allBrands={allBrands}
                    allColors={allColors}
                  />
                ))}
                <div className="filter-dropdown-container">
                  <div className="filter-heading-wrapper">
                    <h5>Qiymət</h5>
                    {toggle ? (
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={handlePlusClick}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faMinus}
                        onClick={handleMinusClick}
                      />
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
                          name="min"
                          value={minPrice}
                          onChange={handlePriceChange}
                          aria-label="default input example"
                        />
                        <FontAwesomeIcon icon={faDollarSign} />
                      </div>
                      <span></span>
                      <div className="input-wrapper">
                        <input
                          className="form-control"
                          type="text"
                          name="max"
                          placeholder="Ən çox"
                          value={maxPrice}
                          onChange={handlePriceChange}
                          aria-label="default input example"
                        />
                        <FontAwesomeIcon icon={faDollarSign} />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="all-products container">
            {filteredProducts.map((product) => (
              <Product
                id={product.id}
                img={product.img}
                brand={product.productBrand}
                model={product.productModel}
                memory={product.memory}
                color={product.productColor}
                price={product.price}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#" onClick={() => navigate("/")}>
                  Ana səhifə
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <span>
                  {category === "phones"
                    ? "Telefonlar"
                    : category === "smartWatches"
                    ? "Smart saatlar"
                    : category === "accessories"
                    ? "Aksessuarlar"
                    : ""}
                </span>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-3">
              {main.categories.map((category) => (
                <FilterDropdown
                  key={category.id}
                  categoryName={category.category}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedCheckboxes={selectedCheckboxes}
                  allBrands={allBrands}
                  allColors={allColors}
                />
              ))}
              <div className="filter-dropdown-container">
                <div className="filter-heading-wrapper">
                  <h5>Qiymət</h5>
                  {toggle ? (
                    <FontAwesomeIcon icon={faPlus} onClick={handlePlusClick} />
                  ) : (
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={handleMinusClick}
                    />
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
                        value={minPrice}
                        name="min"
                        onChange={handlePriceChange}
                        aria-label="default input example"
                      />
                      <FontAwesomeIcon icon={faDollarSign} />
                    </div>
                    <span></span>
                    <div className="input-wrapper">
                      <input
                        className="form-control"
                        type="text"
                        name="max"
                        placeholder="Ən çox"
                        value={maxPrice}
                        onChange={handlePriceChange}
                        aria-label="default input example"
                      />
                      <FontAwesomeIcon icon={faDollarSign} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="col-lg-9">
              <div className="filtered_products_wrapper">
                <div className="wrapper__headings">
                  <span>{filteredProducts.length} məhsul tapıldı</span>
                  <Select
                    defaultValue="Sıralamanı seç"
                    style={{
                      width: 176,
                    }}
                    onChange={handleSorting}
                    options={[
                      {
                        value: "Ən yenilər",
                        label: "Ən yenilər",
                      },
                      {
                        value: "Əvvəlcə ucuz",
                        label: "Əvvəlcə ucuz",
                      },
                      {
                        value: "Əvvəlcə baha",
                        label: "Əvvəlcə baha",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="all-products">
                {filteredProducts.map((product) => (
                  <Product
                    id={product.id}
                    img={product.img}
                    brand={product.productBrand}
                    model={product.productModel}
                    memory={product.memory}
                    color={product.productColor}
                    price={product.price}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { fetchData })(FilterProducts);
