import React from "react";
import { useSelector } from "react-redux";
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
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import MailCheck from "./pages/MailCheck";
import RenewPassword from "./pages/RenewPassword";
import Loader from "./components/Loader/Loader";
import CompletedOrderDetail from "./components/CompletedOrderDetail/CompletedOrderDetail";
import CreditCardForm from "./pages/CreditCardForm";

function App() {
  const loading = useSelector((state) => state.loading);
  return (
    <>
      {loading ? <Loader /> : null}
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/:category" element={<Products />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route path="product-details/:category/:productBrand/:productModel/:id" element={<ProductDetails />} />
          <Route path="frequently-asked-questions" element={<FAQ />} />
          <Route path="payment" element={<Payment />} />
          <Route path="basket" element={<Basket />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="mail-check" element={<MailCheck />} />
          <Route path="renew-password" element={<RenewPassword />} />
          <Route path="completed-order-detail" element={<CompletedOrderDetail />} />
          <Route path="credit-card-form" element={<CreditCardForm />} />
        </Routes>
      </ScrollToTop>
    </>
  );
}

export default App;
