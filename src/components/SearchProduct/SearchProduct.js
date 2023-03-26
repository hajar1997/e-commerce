import React, { useState, useEffect, useRef } from "react";
import api from "../../api/api";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
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
  const [searchedData, setSearchedData] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [latestSearchs, setLatestSearchs] = useState([]);
  const [mostSearched, setMostSearched] = useState([]);
  const searchRef = useRef(null);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleSearch = (e) => {
    setSearchedData(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const newLatestSearchs = [...latestSearchs, searchedData];
      setLatestSearchs(newLatestSearchs);
      localStorage.setItem("latestSearches", JSON.stringify(newLatestSearchs));
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
    const latestSearchesFromStorage = JSON.parse(
      localStorage.getItem("latestSearches")
    );
    if (latestSearchesFromStorage) {
      setLatestSearchs(latestSearchesFromStorage);
    }
  }, []);

  useEffect(() => {
    const mostSearchedFromStorage = JSON.parse(
      localStorage.getItem("latestSearchs")
    );
    if (mostSearchedFromStorage && latestSearchs.length > 0) {
      const filteredMostSearched = mostSearchedFromStorage.filter((item) =>
        latestSearchs.includes(item)
      );
      setMostSearched(filteredMostSearched);
    }
  }, [latestSearchs]);

  return (
    <div className="position-relative w-100" ref={searchRef}>
      <Search
        placeholder="Axtarış..."
        size="large"
        prefix={prefix}
        onChange={handleSearch}
        onFocus={handleFocus}
        onKeyPress={handleKeyPress}
      />
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
                <a href="#" className="latest-search" key={index}>
                  {search}
                </a>
              ))}
            </div>
          </div>
          <div className="most-searched">
            <div className="most-searched-heading">
              <h6>Çox axtarılanlar</h6>
            </div>
            <div className="searchs__wrapper">
              {mostSearched.map((search, index) => (
                <a href="#" className="latest-search" key={index}>
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
