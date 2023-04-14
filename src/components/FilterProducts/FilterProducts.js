import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import Product from "../Product/Product";
import { Select, Divider } from "antd";
import { setSearchSubmitted } from "../../redux/actions/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchData } from "../../redux/actions/action";
import {
  faTimes,
  faPlus,
  faMinus,
  faDollarSign,
  faManatSign,
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
  const [mobileFilteredProducts, setMobileFilteredProducts] = useState([]);
  const searchSubmitted = useSelector((state) => state.main.searchSubmitted);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("query");

  const handlePlusClick = () => {
    setToggle(false);
  };

  const handeMinusClick = () => {
    setToggle(true);
  };

  const handleSorting = (value) => {
    const newData = [...filteredProducts];
    if (value === "Ən yenilər") {
      newData.sort((a, b) => b.id - a.id);
    } else if (value === "Əvvəlcə ucuz") {
      newData.sort((a, b) => a.price - b.price);
    } else if (value === "Əvvəlcə baha") {
      newData.sort((a, b) => b.price - a.price);
    }
    dispatch(fetchData(newData));
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

  const handlePriceChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (searchSubmitted) {
      setMaxPrice("");
      setMinPrice("");
      dispatch(setSearchSubmitted(false));
    }
    if (name === "min") {
      setMinPrice(value);
    } else if (name === "max") {
      setMaxPrice(value);
    }
  };

  const filteredProducts = searchQuery
    ? main.phones
        .filter(
          (product) =>
            product.productModel
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            product.productBrand
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
        .filter(
          (product) =>
            (selectedCheckboxes.productBrand.length === 0 ||
              selectedCheckboxes.productBrand.includes(product.productBrand)) &&
            (selectedCheckboxes.productColor.length === 0 ||
              selectedCheckboxes.productColor.includes(product.productColor)) &&
            (maxPrice.length === 0 ||
              (!isNaN(maxPrice) && product.price <= parseInt(maxPrice))) &&
            (minPrice.length === 0 ||
              (!isNaN(minPrice) && product.price >= parseInt(minPrice)))
        )
    : main.phones.filter(
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

  const handleFilterProducts = () => {
    setMobileFilteredProducts(filteredProducts);
    setRightSideMobileIsOpen(false);
  };

  useEffect(() => {
    setSelectedCheckboxes({
      productBrand: [],
      productColor: [],
    });
  }, [searchQuery]);

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
              <img src="images/siralama-icon.svg" />
              <h5>Sıralama</h5>
            </div>
            <Divider type="vertical" />
            <div
              className="rightSide__mobile"
              onClick={() => setRightSideMobileIsOpen(true)}
            >
              <img src="images/filter-icon.svg" />
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
                    key={searchQuery}
                    categoryName={category.category}
                    categoryItem={
                      category.category === "Brend" ? main.brands : main.colors
                    }
                    handleCheckboxChange={handleCheckboxChange}
                    selectedCheckboxes={selectedCheckboxes}
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
                        onClick={handeMinusClick}
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
                          value={searchSubmitted ? "" : minPrice}
                          onChange={handlePriceChange}
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
                          name="max"
                          placeholder="Ən çox"
                          value={searchSubmitted ? "" : maxPrice}
                          onChange={handlePriceChange}
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
              </div>
            </div>
          )}
          <div className="all-products container">
            {filteredProducts.map((product) => (
              <Link key={product.id}>
                <Product
                  img={product.img}
                  brand={product.productBrand}
                  model={product.productModel}
                  memory={product.memory}
                  color={product.productColor}
                  price={product.price}
                />
              </Link>
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
                <span>Telefonlar</span>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-3">
              {searchQuery &&
                main.categories.map((category) => (
                  <FilterDropdown
                    key={searchQuery}
                    categoryName={category.category}
                    categoryItem={category.colors}
                    handleCheckboxChange={handleCheckboxChange}
                    selectedCheckboxes={selectedCheckboxes}
                  />
                ))}
              {main.categories.map((category) => (
                <FilterDropdown
                  key={searchQuery}
                  categoryName={category.category}
                  categoryItem={
                    category.category === "Brend" ? main.brands : main.colors
                  }
                  handleCheckboxChange={handleCheckboxChange}
                  selectedCheckboxes={selectedCheckboxes}
                />
              ))}
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
                        value={searchSubmitted ? "" : minPrice}
                        name="min"
                        onChange={handlePriceChange}
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
                        name="max"
                        placeholder="Ən çox"
                        value={searchSubmitted ? "" : maxPrice}
                        onChange={handlePriceChange}
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
                  <Link key={product.id}>
                    <Product
                      img={product.img}
                      brand={product.productBrand}
                      model={product.productModel}
                      memory={product.memory}
                      color={product.productColor}
                      price={product.price}
                    />
                  </Link>
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
