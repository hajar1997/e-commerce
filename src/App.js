import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import FAQ from "./pages/FAQ";
import Payment from "./pages/Payment";
import Basket from "./pages/Basket";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import About from "./pages/About";

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
          <Route path="payment" element={<Payment />} />
          <Route path="basket" element={<Basket />} />
          <Route path="profile" element={<Profile />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="about" element={<About />}/>
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
