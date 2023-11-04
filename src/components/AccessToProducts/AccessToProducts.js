import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchData } from "../../redux/actions/action";
import { connect } from "react-redux";

const AccessToProducts = ({ main, fetchData }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/products/${category}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="access-products-wrapper">
      <div className="container">
        <div className="row gap-style">
          <div className="col-lg-6 col-sm-12">
            <div className="telefon-product-container">
              <div className="product-info">
                <h5>Telefon</h5>
                <span>Məhsul sayı: {main.phones.length}</span>
                <a href="" onClick={() => handleClick("phones")}>
                  Məhsullara keçid
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                      width: "6px",
                      marginLeft: "17px",
                    }}
                  />
                </a>
              </div>
              <div className="img-container">
                <img src="/images/access-products-1.png" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12 right-side">
            <div className="watch-product-container">
              <div className="product-info">
                <h5>Smart saat</h5>
                <span>Məhsul sayı: {main.smartWatches.length}</span>
                <a href="" onClick={() => handleClick("smartWatches")}>
                  Məhsullara keçid
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                      width: "6px",
                      marginLeft: "17px",
                    }}
                  />
                </a>
              </div>
              <div className="img-container">
                <img src="/images/access-products-2.png" />
              </div>
            </div>
            <div className="accessory-product-container">
              <div className="product-info">
                <h5>Aksessuar</h5>
                <span>Məhsul sayı: {main.accessories.length}</span>
                <a href="" onClick={() => handleClick("accessories")}>
                  Məhsullara keçid
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{
                      width: "6px",
                      marginLeft: "17px",
                    }}
                  />
                </a>
              </div>
              <div className="img-container">
                <img src="/images/access-products-3.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { fetchData })(AccessToProducts);
