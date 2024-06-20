import React, { useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";
import ProductDetails from "./pages/ProductDetails";
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
import { logPageView } from "./gtag";

function App() {
  const loading = useSelector((state) => state.loading);
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const titleMap = {
    "/": "Home",
    "/products/:category": "Products",
    "/search-results": "Search Results",
    "/frequently-asked-questions": "FAQ",
    "/payment": "Payment",
    "/basket": "Basket",
    "/favorites": "Favorites",
    "/about": "About Us",
    "/profile": "Profile",
    "/login": "Login",
    "/register": "Register",
    "/forget-password": "Forget Password",
    "/mail-check": "Mail Check",
    "/renew-password": "Renew Password",
    "/completed-order-detail": "Completed Order Detail",
    "/credit-card-form": "Credit Card Form",
    "/product-details/:category/:productBrand/:productModel/:id":
      "%productBrand% %productModel% - %category%",
  };

  const getTitle = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    let title = titleMap[location.pathname] || "X Project";

    if (!titleMap[location.pathname] && pathParts[0] === "product-details") {
      title =
        titleMap["/product-details/:category/:productBrand/:productModel/:id"];
      const [, category, productBrand, productModel] = pathParts;

      const decodedProductModel = decodeURIComponent(productModel);

      title = title
        .replace("%category%", category)
        .replace("%productBrand%", productBrand)
        .replace("%productModel%", decodedProductModel);
    }

    return title;
  };

  return (
    <>
      <Helmet>
        <title>{getTitle()}</title>
      </Helmet>
      {loading ? <Loader /> : null}
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
        <Route path="favorites" element={<Favorites />} />
        <Route path="about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget-password" element={<ForgetPassword />} />
        <Route path="mail-check" element={<MailCheck />} />
        <Route path="renew-password" element={<RenewPassword />} />
        <Route
          path="completed-order-detail"
          element={<CompletedOrderDetail />}
        />
        <Route path="credit-card-form" element={<CreditCardForm />} />
      </Routes>
    </>
  );
}

export default App;
