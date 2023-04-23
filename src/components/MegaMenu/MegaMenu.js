import React from "react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MegaMenu = () => {
  const categories = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "Redmi",
    "Bütün Brendlər",
    "Aksessuarlar",
    "Endirimlər",
  ];

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="collapse navbar-collapse" id="main_nav">
          <ul className="navbar-nav container">
            <li className="nav-item dropdown has-megamenu">
              <a className="nav-link active" href="#" data-bs-toggle="dropdown">
                Yeni
                <FontAwesomeIcon
                  className="mobile-dropdown"
                  icon={faChevronRight}
                />
              </a>
              <div className="dropdown-menu megamenu" role="menu">
                <div className="row">
                  <div className="col-lg-2 col-sm-12">
                    <div className="col-megamenu">
                      <h6 className="title">Başlıq</h6>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-12">
                    <div className="col-megamenu">
                      <h6 className="title">Başlıq</h6>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-2 col-sm-12">
                    <div className="col-megamenu">
                      <h6 className="title">Başlıq</h6>
                      <ul className="list-unstyled">
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                        <li>
                          <a href="#">Alt başlıq</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="col-megamenu">
                      <img src="/images/mega-menu-pic.png" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {categories.map((category,index) => (
              <li className="nav-item dropdown has-megamenu" key={index}>
                <a className="nav-link" href="#" data-bs-toggle="dropdown">
                  {category}
                  <FontAwesomeIcon
                    className="mobile-dropdown"
                    icon={faChevronRight}
                  />
                </a>
                <div className="dropdown-menu megamenu" role="menu">
                  <div className="row">
                    <div className="col-lg-2 col-sm-12">
                      <div className="col-megamenu">
                        <h6 className="title">Başlıq</h6>
                        <ul className="list-unstyled">
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <div className="col-megamenu">
                        <h6 className="title">Başlıq</h6>
                        <ul className="list-unstyled">
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-2 col-sm-12">
                      <div className="col-megamenu">
                        <h6 className="title">Başlıq</h6>
                        <ul className="list-unstyled">
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                          <li>
                            <a href="#">Alt başlıq</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="login-and-register-wrapper container">
            <button className="btn login-btn">Daxil ol</button>
            <button className="btn register-btn">Qeydiyyat</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MegaMenu;
