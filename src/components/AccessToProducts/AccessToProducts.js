import React, { useEffect, useState } from "react";
import axios from "axios";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AccessToProducts = () => {
  const [phones, setPhones] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [smartWatches, setSmartWatches] = useState([]);

  const phonesEndpoint = "http://localhost:8001/smartphones";
  const accessoryEndpoint = "http://localhost:8001/accessories";
  const smartWatchEndpoint = "http://localhost:8001/smartWatches";

  useEffect(() => {
    axios
      .all([
        axios.get(phonesEndpoint),
        axios.get(accessoryEndpoint),
        axios.get(smartWatchEndpoint),
      ])
      .then(
        axios.spread(
          (phonesEndpoint, accessoryEndpoint, smartWatchEndpoint) => {
            setPhones(phonesEndpoint.data);
            setAccessories(accessoryEndpoint.data);
            setSmartWatches(smartWatchEndpoint.data);
          }
        )
      );
  }, []);

  return (
    <section className="access-products-wrapper">
      <div className="container">
        <div className="row gap-style">
          <div className="col-lg-6 col-sm-12">
            <div className="telefon-product-container">
              <div className="product-info">
                <h5>Telefon</h5>
                <span>Məhsul sayı: {phones.length}</span>
                <a href="/products">
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
                <img src="images/access-products-1.png" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 right-side">
            <div className="watch-product-container">
              <div className="product-info">
                <h5>Smart saat</h5>
                <span>Məhsul sayı: {smartWatches.length}</span>
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
                <img src="images/access-products-2.png" />
              </div>
            </div>
            <div className="accessory-product-container">
              <div className="product-info">
                <h5>Aksesuar</h5>
                <span>Məhsul sayı: {accessories.length}</span>
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
                <img src="images/access-products-3.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessToProducts;
