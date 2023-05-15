import React from "react";
import ReactDOM from "react-dom";

const Loader = () => {
  return ReactDOM.createPortal(
    <div className="loaderFixed">
      <div className="loading">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>,
    document.querySelector("#loader")
  );
};

export default Loader;
