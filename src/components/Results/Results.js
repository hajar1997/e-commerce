import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchSubmitted } from "../../redux/actions/action";
import ColorCheckboxForSearchResults from "../ColorCheckboxForSearchResults/ColorCheckboxForSearchResults";
import {
  fetchData,
  fetchFavorites,
  addProductToFavorites,
  removeProductFromFavorites,
} from "../../redux/actions/action";
import { Select, Divider } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faPlus,
  faMinus,
  faDollarSign,
  faManatSign,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const Results = () => {
  const main = useSelector((state) => state.main);
  const [leftSideMobileIsOpen, setLeftSideMobileIsOpen] = useState(false);
  const [rightSideMobileIsOpen, setRightSideMobileIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [toggle, setToggle] = useState(true);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    productColor: [],
  });

  const categories = main.accessories.concat(main.phones, main.smartWatches);
  const [sortedData, setSortedData] = useState(categories);
  const [sortClicked, setSortClicked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");
  const searchSubmitted = useSelector((state) => state.main.searchSubmitted);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.main.favorites);

  const isProductFavorite = (id) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  const handleHeartClick = (id) => {
    if (isProductFavorite(id)) {
      dispatch(removeProductFromFavorites(id));
    } else {
      dispatch(addProductToFavorites(id));
    }
  };

  const handlePlusClick = () => {
    setToggle(false);
  };

  const handeMinusClick = () => {
    setToggle(true);
  };

  const commonFilter = (product) =>
    product.productModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.productBrand.toLowerCase().includes(searchQuery.toLowerCase());

  const filteredProducts = (sortClicked ? sortedData : categories)
    .filter(commonFilter)
    .filter(
      (product) =>
        (selectedCheckboxes.productColor.length === 0 ||
          selectedCheckboxes.productColor.includes(product.productColor)) &&
        (maxPrice.length === 0 ||
          (!isNaN(maxPrice) && product.price <= parseInt(maxPrice))) &&
        (minPrice.length === 0 ||
          (!isNaN(minPrice) && product.price >= parseInt(minPrice)))
    )
    .map((product) => {
      const category = main.smartWatches.includes(product)
        ? "smartWatches"
        : main.phones.includes(product)
        ? "phones"
        : main.accessories.includes(product)
        ? "accessories"
        : "";
      return { ...product, category };
    });

  const colors = [
    ...new Set(categories.map((product) => product.productColor)),
  ];
  const handleSorting = (value) => {
    const newData = [...categories];
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
    if (searchSubmitted) {
      setMaxPrice("");
      setMinPrice("");
      dispatch(setSearchSubmitted(false));
    }
    const value = event.target.value;
    const name = event.target.name;
    if (name === "min") {
      setMinPrice(value);
    } else if (name === "max") {
      setMaxPrice(value);
    }
  };

  useEffect(() => {
    setSelectedCheckboxes({
      productColor: [],
    });
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchFavorites());
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
                <ColorCheckboxForSearchResults
                  categoryName="Rəng"
                  categoryItem={colors}
                  handleCheckboxChange={handleCheckboxChange}
                  selectedCheckboxes={selectedCheckboxes}
                  key={searchQuery}
                />
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
          <div className="container">
            <div className="filtered_products_wrapper">
              <div className="wrapper__headings">
                <span>
                  {filteredProducts.length > 0
                    ? filteredProducts.length + " məhsul tapıldı"
                    : "Məhsul tapılmadı"}
                </span>
              </div>
            </div>
            <div className="all-products">
              {filteredProducts.map((product) => (
                <div className="card-wrapper" key={product.id}>
                  <Link
                    to={`/product-details/${product.category}/${product.productBrand}/${product.productModel}/${product.id}`}
                  >
                    <img src={product.img[0]} />
                  </Link>
                  <div className="card__content">
                    <Link
                      to={`/product-details/${product.category}/${product.productBrand}/${product.productModel}/${product.id}`}
                    >
                      {product.productBrand} {product.productModel}{" "}
                      {product.memory} GB {product.productColor}
                    </Link>
                    <span>{product.price} $</span>
                  </div>
                  <div className="heart_icon_card">
                    <FontAwesomeIcon
                      style={{ color: "#c2c5ca", fontSize: "20px" }}
                      icon={faHeart}
                    />
                  </div>
                </div>
              ))}
            </div>
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
                <span>Axtarış nəticələri</span>
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-3">
              <ColorCheckboxForSearchResults
                categoryName="Rəng"
                categoryItem={colors}
                handleCheckboxChange={handleCheckboxChange}
                selectedCheckboxes={selectedCheckboxes}
                key={searchQuery}
              />
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
                  <span>
                    {filteredProducts.length > 0
                      ? filteredProducts.length + " məhsul tapıldı"
                      : "Məhsul tapılmadı"}
                  </span>
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
                {filteredProducts.map((product, index) => (
                  <div className="card-wrapper" key={index}>
                    <Link
                      to={`/product-details/${product.category}/${product.productBrand}/${product.productModel}/${product.id}`}
                    >
                      <img src={product.img[0]} />
                    </Link>
                    <div className="card__content">
                      <Link
                        to={`/product-details/${product.category}/${product.productBrand}/${product.productModel}/${product.id}`}
                      >
                        {product.productBrand} {product.productModel}{" "}
                        {product.memory} GB {product.productColor}
                      </Link>
                      <span>{product.price} $</span>
                    </div>
                    <div className="heart_icon_card">
                      <FontAwesomeIcon
                        onClick={() => handleHeartClick(product.id)}
                        style={{
                          color: isProductFavorite(product.id)
                            ? "#dc3545"
                            : "#c2c5ca",
                          fontSize: "20px",
                        }}
                        icon={faHeart}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
