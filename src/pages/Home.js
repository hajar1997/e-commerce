import React from "react";
import AccessToProducts from "../components/AccessToProducts/AccessToProducts";
import Ads from "../components/Ads/Ads";
import BestSellerProduct from "../components/BestSellerProduct/BestSellerProduct";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MainSection from "../components/MainSection/MainSection";
import NewAccessory from "../components/NewAccessory/NewAccessory.js";
import NewProducts from "../components/NewProducts/NewProducts";
import OurAdvantage from "../components/OurAdvantage/OurAdvantage";
import OurPartners from "../components/OurPartners/OurPartners";

const Home = () => {
  return (
    <div>
      <Header />
      <MainSection />
      <BestSellerProduct />
      <NewProducts />
      <Ads />
      <NewAccessory />
      <AccessToProducts />
      <OurAdvantage />
      <OurPartners />
      <Footer />
    </div>
  );
};

export default Home;
