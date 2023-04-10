import React from "react";
import FilterProducts from "../components/FilterProducts/FilterProducts";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const Products = () => {
  const brandsEndpoint = "http://localhost:8001/brands";
  const filterCategoriesEndpoint = "http://localhost:8001/filterCategories";
  const colorsEndpoint = "http://localhost:8001/colors";
  const phonesEndpoint = "http://localhost:8001/smartphones";

  return (
    <div>
      <Header />
      <FilterProducts
        brandsEndpoint={brandsEndpoint}
        filterCategoriesEndpoint={filterCategoriesEndpoint}
        colorsEndpoint={colorsEndpoint}
        phonesEndpoint={phonesEndpoint}
      />
      <Footer />
    </div>
  );
};

export default Products;
