import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="products/" element={<Products />} /> */}
        <Route path="products/:category" element={<Products />} />
        <Route path="search-results" element={<SearchResults />} />
      </Routes>
    </>
  );
}

export default App;
