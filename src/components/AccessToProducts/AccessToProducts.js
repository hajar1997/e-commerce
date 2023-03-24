import React from "react";
import img1 from "../../assets/images/access-products-1.png";
import img2 from "../../assets/images/access-products-2.png";
import img3 from "../../assets/images/access-products-3.png";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccessToProducts = () => {
  return (
    <section className="access-products-wrapper">
      <div className="container">
        <div className="row gap-style">
          <div className="col-lg-6 col-sm-12">
            <div className="telefon-product-container">
              <div className="product-info">
                <h5>Telefon</h5>
                <span>Məhsul sayı: 322</span>
                <a href="#">
                  Məhsullara keçid
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                      width: "6px",
                      background: "#333333;",
                      marginLeft: "17px",
                    }}
                  />
                </a>
              </div>
              <div className="img-container">
                <img src={img1} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 right-side">
            <div className="watch-product-container">
              <div className="product-info">
                <h5>Smart saat</h5>
                <span>Məhsul sayı: 46</span>
                <a href="#">
                  Məhsullara keçid
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                      width: "6px",
                      background: "#333333;",
                      marginLeft: "17px",
                    }}
                  />
                </a>
              </div>
              <div className="img-container">
                <img src={img2} />
              </div>
            </div>
            <div className="accessory-product-container">
              <div className="product-info">
                <h5>Aksesuar</h5>
                <span>Məhsul sayı: 891</span>
                <a href="#">
                  Məhsullara keçid
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                      width: "6px",
                      background: "#333333;",
                      marginLeft: "17px",
                    }}
                  />
                </a>
              </div>
              <div className="img-container">
                <img src={img3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessToProducts;
