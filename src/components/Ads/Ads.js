import React from "react";
import img1 from "../../assets/images/iphone-ad-1.png";
import img2 from "../../assets/images/iphone-ad-2.png";

const Ads = () => {
  return (
    <div className="container mt-5">
      <div className="reklam-wrapper">
        <div className="ad-img">
          <img src={img1} />
        </div>
        <div className="ad-img">
          <img src={img2} />
        </div>
      </div>
    </div>
  );
};

export default Ads;
