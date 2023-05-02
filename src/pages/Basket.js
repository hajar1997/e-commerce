import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AddToBasket from "../components/AddToBasket/AddToBasket";

const Basket = () => {
  return (
    <div className="basket__page">
      <Header />
      <AddToBasket />
      <Footer />
    </div>
  );
};

export default Basket;
