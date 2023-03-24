import React from "react";
import icon1 from "../../assets/images/footer-icon-1.svg";
import icon2 from "../../assets/images/footer-icon-2.svg";
import icon3 from "../../assets/images/footer-icon-3.svg";
import social1 from "../../assets/images/footer-social-1.svg";
import social2 from "../../assets/images/footer-social-2.svg";
import social3 from "../../assets/images/footer-social-3.svg";
import social4 from "../../assets/images/footer-social-4.svg";
import logo from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="container mt-5">
        <div className="footer-card">
          <div className="row mb-4">
            <div className="col-lg-3">
              <div className="footer-logo d-flex">
                <Link>
                  <img src={logo} />
                </Link>
              </div>
              <div className="footer-social mt-2 mb-3">
                <Link>
                  <img src={social1} />
                </Link>
                <Link>
                  <img src={social2} />
                </Link>
                <Link>
                  <img src={social3} />
                </Link>
                <Link>
                  <img src={social4} />
                </Link>
              </div>
            </div>
            <div className="col-lg-3">
              <h5 className="heading">Menu</h5>
              <ul>
                <li>
                  <a href="#">Yeni</a>
                </li>
                <li>
                  <a href="#">Endirimlər</a>
                </li>
                <li>
                  <a href="#">Aksessuarlar</a>
                </li>
                <li>
                  <a href="#">Bütün brendlər</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h5 className="heading">Kömək</h5>
              <ul className="card-text">
                <li>
                  <a href="#">Tez-tez soruşulan suallar</a>
                </li>
                <li>
                  <a href="#">Çatdırılma xidməti</a>
                </li>
                <li>
                  <a href="#">Geri qaytarılma şərtləri</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h5 className="heading">Əlaqə</h5>
              <ul className="card-text contact">
                <li>
                  <img src={icon1} />
                  <span className="address1">
                    M. K. Ataturk avenue 89, Baku, Azerbaijan
                  </span>
                </li>
                <li>
                  <img src={icon2} />
                  <a href="mailto:example@gmail.com">example@gmail.com</a>
                </li>
                <li>
                  <img src={icon3} />
                  <a href="tel:*2108">*2108</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-destkop mb-4"> </div>
      {/* footer bottom mobile version */}
      <div className="container">
        <div className="policy-mobile">
          <a href="#" className="me-5">
            Qaydalar və şərtlər
          </a>
          <a href="#">Məxfilik siyasəti</a>
        </div>
      </div>
      <div className="divider-mobile mb-4"> </div>
      <div className="footer-mobile-bottom">
        <div className="container">
          © PeojectX {new Date().getFullYear()}. Bütün hüquqlar qorunur.
        </div>
      </div>
      {/* footer bottom destkop version  */}
      <div className="container pb-3">
        <div className="footer-destkop-bottom">
          <div>
            © PeojectX {new Date().getFullYear()}. Bütün hüquqlar qorunur.
          </div>
          <div className="d-flex policy">
            <a href="#" className="me-5">
              Qaydalar və şərtlər
            </a>
            <a href="#">Məxfilik siyasəti</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
