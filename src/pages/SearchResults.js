import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Results from "../components/Results/Results";

const SearchResults = () => {
  const brandsEndpoint = "http://localhost:8001/brands";
  const filterCategoriesEndpoint = "http://localhost:8001/filterCategories";
  const daxiliYaddasEndpoint = "http://localhost:8001/daxiliYaddas";
  const operativYaddasEndpoint = "http://localhost:8001/operativYaddas";
  const colorsEndpoint = "http://localhost:8001/colors";
  const phonesEndpoint = "http://localhost:8001/smartphones";

  return (
    <div>
      <Header />
      <Results
        brandsEndpoint={brandsEndpoint}
        filterCategoriesEndpoint={filterCategoriesEndpoint}
        daxiliYaddasEndpoint={daxiliYaddasEndpoint}
        operativYaddasEndpoint={operativYaddasEndpoint}
        colorsEndpoint={colorsEndpoint}
        phonesEndpoint={phonesEndpoint}
      />
      <Footer />
    </div>
  );
};

export default SearchResults;
