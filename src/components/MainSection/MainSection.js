import React from "react";
import img from "../../assets/images/main-section-phone.png";
import { Carousel } from "antd";



const MainSection = () => {
  return (
    <section className="main-section">
      <Carousel autoplay>
        <div className="container">
          <div className="carousel-wrapper">
            <div className="main-text">
              <h1>Buy & Sell</h1>
              <h1>What's Now & Next</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
                malesuada et leo faucibus
              </p>
            </div>
            <div className="content-img">
              <img src={img} />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="carousel-wrapper">
            <div className="main-text">
              <h1>Buy & Sell</h1>
              <h1>What's Now & Next</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
                malesuada et leo faucibus
              </p>
            </div>
            <div className="content-img">
              <img src={img} />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="carousel-wrapper">
            <div className="main-text">
              <h1>Buy & Sell</h1>
              <h1>What's Now & Next</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Felis
                malesuada et leo faucibus
              </p>
            </div>
            <div className="content-img">
              <img src={img} />
            </div>
          </div>
        </div>
      </Carousel>
    </section>
  );
};

export default MainSection;
