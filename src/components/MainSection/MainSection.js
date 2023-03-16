import React from "react";
import img from "../../assets/images/main-section-phone.png";

const MainSection = () => {
  return (
    <section className="main-section">
      <div
        id="myCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#myCarousel"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="main-text">
                    <h1>Buy & Sell</h1>
                    <h1>What's Now & Next</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Felis malesuada et leo faucibus
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src={img} />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="main-text">
                    <h1>Buy & Sell</h1>
                    <h1>What's Now & Next</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Felis malesuada et leo faucibus
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src={img} />
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="main-text">
                    <h1>Buy & Sell</h1>
                    <h1>What's Now & Next</h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Felis malesuada et leo faucibus
                    </p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src={img} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
