import React from "react";
import Ads from "../components/Ads/Ads";
import BestSellerProduct from "../components/BestSellerProduct/BestSellerProduct";
import Header from "../components/Header/Header";
import MainSection from "../components/MainSection/MainSection";
import NewAccessory from "../components/NewAccessory/NewAccessory.js";
import NewProducts from "../components/NewProducts/NewProducts";

const Home = () => {
  return (
    <div>
      <Header />
      <MainSection />
      <BestSellerProduct />
      <NewProducts />
      <Ads />
      <NewAccessory />
    </div>
  );
};

export default Home;
