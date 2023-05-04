import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider } from "antd";
import { faManatSign, faCreditCard } from "@fortawesome/free-solid-svg-icons";

const OrderDetails = ({ handleMenuClick }) => {
  const handleClick = (key) => {
    handleMenuClick({ key: `/my-orders` });
  };
  return (
    <div className="order_detail_container">
      <div className="order_details_header" onClick={() => handleClick()}>
        <ArrowLeftOutlined />
        <h5>Sifarişin detalları</h5>
      </div>
      <div className="order__detail mt-4">
        <div className="ordered_product_info">
          <div className="op__img">
            <img src="/images/iphone-7-black.jpg" />
          </div>
          <div className="op_second_row">
            <div className="op_name">
              <h5>Apple,iPhone 7, 64 GB, Black</h5>
            </div>
            <div className="op_color_memory_count">
              <div className="op_color">
                <span>Rəng:</span>
                <h6>Black</h6>
              </div>
              <div className="op_memory">
                <span>Yaddaş:</span>
                <h6>64 GB</h6>
              </div>
              <div className="op_count">
                <span>Say:</span>
                <h6>1</h6>
              </div>
            </div>
            <div className="op_third_row mt-3">
              <span>Sifariş tarixi:</span>
              <h6>{new Date().toLocaleDateString().replace(/\//g, ".")}</h6>
            </div>
          </div>
        </div>
        <Divider
          className="divider-destkop for__order_details"
          type="horizontal"
        />
        <div className="customer_info mt-4">
          <div className="customer_personal_info">
            <h6>Şəxsi məlumatlar</h6>
            <div className="customer_infos__container">
              <span>Hajar</span>
              <span>Ibrahimova</span>
              <span>+994 77 000 00 00</span>
              <span>hajaribra@gmail.com</span>
            </div>
          </div>
          <div className="customer_delivery_address">
            <h6>Çatdırılma ünvanı</h6>
            <div className="customer_address_container">
              <span>Bakı şəhəri</span>
              <span>Nərimanov rayonu</span>
              <span>Təbriz küçəsi</span>
              <span>Bina 10 mənzil 40</span>
            </div>
          </div>
          <a href="#">Düzəliş et</a>
        </div>
        <Divider
          className="divider-destkop for__order_details"
          type="horizontal"
        />
        <div className="payment__details">
          <h6
            style={{ fontSize: "16px", color: " #1D2123", fontWeight: "600" }}
          >
            Ödəmə detalları
          </h6>
          <div className="total_container">
            <div className="cost mt-3">
              <h6>Ödəmə metodu</h6>
              <span>
                <FontAwesomeIcon
                  style={{ marginLeft: "9px", color: "#2DD06E" }}
                  icon={faCreditCard}
                />
                Kart ilə
              </span>
            </div>
            <div className="cost mt-3">
              <h6>Toplam məbləğ</h6>
              <span>
                1640
                <FontAwesomeIcon
                  style={{ marginLeft: "9px" }}
                  icon={faManatSign}
                />
              </span>
            </div>
            <div className="cost mt-3">
              <h6>Təcili çatdırılma</h6>
              <span>
                5
                <FontAwesomeIcon
                  style={{ marginLeft: "9px" }}
                  icon={faManatSign}
                />
              </span>
            </div>
            <div className="cost mt-3">
              <h6>Promo kod</h6>
              <span>
                -60
                <FontAwesomeIcon
                  style={{ marginLeft: "9px" }}
                  icon={faManatSign}
                />
              </span>
            </div>
            <Divider
              className="divider-destkop for__order_details"
              type="horizontal"
            />
            <div className="cost mt-3">
              <h6
                style={{
                  fontSize: "16px",
                  color: " #1D2123",
                  fontWeight: "600",
                }}
              >
                Cəmi
              </h6>
              <span style={{ color: "#DB2C66" }}>
                1580
                <FontAwesomeIcon
                  style={{ marginLeft: "9px" }}
                  icon={faManatSign}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
