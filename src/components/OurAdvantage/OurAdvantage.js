import React from "react";
import img1 from "../../assets/images/icon-1.svg";
import img2 from "../../assets/images/icon-2.svg";
import img3 from "../../assets/images/icon-3.svg";

const OurAdvantage = () => {
  return (
    <section className="our-advantage-wrapper">
      <div className="container">
        <div className="advantage-container">
          <div>
            <img src={img1} />
            <div className="advantage-context">
              <h6>Çatdırılma</h6>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit{" "}
              </span>
            </div>
          </div>
          <div>
            <img src={img2} />
            <div className="advantage-context">
              <h6>Kredit</h6>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit{" "}
              </span>
            </div>
          </div>
          <div>
            <img src={img3} />
            <div className="advantage-context">
              <h6>Zəmanət</h6>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurAdvantage;
