import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { setSearchedData, setSearchSubmitted } from "../../redux/actions/action";
const { Search } = Input;

const prefix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#828282",
      marginRight: 10,
    }}
  />
);

const SearchProduct = () => {
  const searchedData = useSelector((state) => state.main.searchedData);
  const [isFocus, setIsFocus] = useState(false);
  const [latestSearchs, setLatestSearchs] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocus(true);
  };

  const dispatch = useDispatch();

  const handleSearch = (value) => {
    dispatch(setSearchedData(value));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const trimmedSearchValue = searchedData.trim();
      if (trimmedSearchValue.length >= 3) {
        const newLatestSearchs = [...latestSearchs, trimmedSearchValue];
        setLatestSearchs(newLatestSearchs);
        localStorage.setItem("latestSearches", JSON.stringify(newLatestSearchs));
        navigate(`/search-results?query=${trimmedSearchValue}`);
        setIsFocus(false);
        dispatch(setSearchSubmitted(true));
      }
    }
  };
  
  const deleteLatestSearchs = () => {
    localStorage.removeItem("latestSearches");
    setLatestSearchs([]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocus(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const latestSearchesFromStorage = JSON.parse(localStorage.getItem("latestSearches"));
    if (latestSearchesFromStorage) {
      const latestSearches = latestSearchesFromStorage.slice(-7);
      setLatestSearchs(latestSearches);
    }
  }, []);

  return (
    <div className="position-relative w-100" ref={searchRef}>
      <Search placeholder="Axtarış..." size="large" prefix={prefix} onSearch={handleSearch} onFocus={handleFocus} onKeyPress={handleKeyPress} />
      {isFocus && (
        <div className="search-dropdown">
          <div className="latest-searchs">
            <div className="latest-headings">
              <h6>Son axtarışlar</h6>
              <a onClick={deleteLatestSearchs} href="#">
                Təmizlə
              </a>
            </div>
            <div className="searchs__wrapper">
              {latestSearchs.map((search, index) => (
                <a href="#" className="latest-search" key={index} onClick={() => navigate(`/search-results?query=${search}`)}>
                  {search}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
