import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import FAQ from "./pages/FAQ";

function App() {
  return (
    <>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route
            path="product-details/:category/:productBrand/:productModel/:id"
            element={<ProductDetails />}
          />
          <Route path="frequently-asked-questions" element={<FAQ />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
