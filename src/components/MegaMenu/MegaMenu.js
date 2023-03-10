import React from "react";
import img from "../../assets/images/mega-menu-pic.png";

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
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main_nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav">
              <li className="nav-item dropdown has-megamenu">
                <a className="nav-link active" href="#" data-bs-toggle="dropdown">
                  Yeni
                </a>
                <div className="dropdown-menu megamenu" role="menu">
                  <div className="container">
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
                          <img src={img} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {categories.map((category) => (
                <li className="nav-item dropdown has-megamenu">
                  <a className="nav-link " href="#" data-bs-toggle="dropdown">
                    {category}
                  </a>
                  <div className="dropdown-menu megamenu" role="menu">
                    <div className="container">
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <hr className="hr-line" />
    </div>
  );
};

export default MegaMenu;
