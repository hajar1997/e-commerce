import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchData } from "../../redux/actions/action";
import ImageGallery from "react-image-gallery";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ShoppingCartOutlined,
  FormOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { Tabs } from "antd";
import { Descriptions } from "antd";
import {
  faDollarSign,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import StarRating from "../StarRating/StarRating";

const ProductDetail = ({ main, fetchData }) => {
  const { category, productBrand, id } = useParams();
  const [ratingCount, setRatingCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const navigate = useNavigate();
  const product = main[category]?.find((product) => product.id === id);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const images =
    product?.img?.map((imgUrl) => ({
      original: imgUrl,
      thumbnail: imgUrl,
      originalWidth: 275,
      thumbnailWidth: 72,
      originalHeight: 388,
      thumbnailHeight: 86,
    })) || [];

  return product ? (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#" onClick={() => navigate("/")}>
              Ana səhifə
            </a>
          </li>
          <li className="breadcrumb-item" aria-current="page">
            <a href="#" onClick={() => navigate(`/products/${category}`)}>
              {category === "phones"
                ? "Telefonlar"
                : category === "smartWatches"
                ? "Smart saatlar"
                : category === "accessories"
                ? "Aksessuarlar"
                : ""}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>{productBrand}</span>
          </li>
        </ol>
      </nav>
      <div className="row">
        <div className="col-lg-6">
          <div className="detail_slider_wrapper">
            <ImageGallery items={images} showPlayButton={false} />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="product_details_container">
            <h3 className="product_brand_model">
              {product.productModel} {product.memory && product.memory + "GB "}
              {product.productColor}
            </h3>
            <div className="rating_and_comments">
              <StarRating />
              <div className="rating_count">
                <span>({ratingCount})</span>
              </div>
              <Divider type="vertical" />
              <div className="comment_count">
                <a href="#">{commentCount} rəy</a>
              </div>
            </div>
            <div className="product_price">
              <h5>{product.price}</h5>
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
            <Divider type="horizontal" />
            <div className="product_color">
              <h5>Rəng: </h5>
              <div className="range_of_colors">
                <span style={{ backgroundColor: product.productColor }}></span>
              </div>
            </div>
            {product.memory && (
              <div className="product_memory">
                <h5>Yaddaş: </h5>
                <div className="range_of_memories">
                  <span
                    style={{
                      backgroundColor: product.productColor,
                      color:
                        product.productColor == "Black" || "Gray"
                          ? "white"
                          : "black",
                    }}
                  >
                    {product.memory}GB
                  </span>
                </div>
              </div>
            )}
            <Divider type="horizontal" />
            <div className="product_counter">
              <button
                onClick={() =>
                  productCount > 0 && setProductCount(productCount - 1)
                }
              >
                <FontAwesomeIcon
                  style={{ fontSize: "13px", paddingRight: "0" }}
                  icon={faMinus}
                />
              </button>
              <span>{productCount}</span>
              <button onClick={() => setProductCount(productCount + 1)}>
                <FontAwesomeIcon
                  style={{ fontSize: "13px", paddingRight: "0" }}
                  icon={faPlus}
                />
              </button>
            </div>
            <div className="add_to_bucket_btn">
              <button>
                <ShoppingCartOutlined />
                <span>Səbətə at</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Specifications of products */}
      <div className="product_specifications_and_comments">
        <Tabs
          items={[InfoCircleOutlined, FormOutlined].map((Icon, i) => {
            const id = String(i + 1);
            const label = i === 1 ? "Rəylər" : `Texniki Xüsusiyyətləri`;
            return {
              label: (
                <span className="tabs_style">
                  <Icon />
                  {label}
                </span>
              ),
              key: id,
              children: (
                <div>
                  {id === "1" && (
                    <div className="product_specifications">
                      <Descriptions column={1}>
                        <Descriptions.Item label="Brend">
                          {productBrand}
                        </Descriptions.Item>
                        <Descriptions.Item label="Məhsul tipi">
                          {category == "phones"
                            ? "Smartfon"
                            : category == "accessories"
                            ? "Aksessuar"
                            : "Smart Saat"}
                        </Descriptions.Item>
                        {product.network && (
                          <Descriptions.Item label="Şəbəkə">
                            {product.network}
                          </Descriptions.Item>
                        )}
                        {product.simcard && (
                          <Descriptions.Item label="SIM-kart sayı">
                            {product.simcard}
                          </Descriptions.Item>
                        )}
                        {product.screenSize && (
                          <Descriptions.Item label="Ekranın ölçüsü">
                            {product.screenSize}
                          </Descriptions.Item>
                        )}
                        {product.resolution && (
                          <Descriptions.Item label="Ekran icazəsi">
                            {product.resolution}
                          </Descriptions.Item>
                        )}
                        {product.operativeMemory && (
                          <Descriptions.Item label="Operativ yaddaş">
                            {product.operativeMemory}
                          </Descriptions.Item>
                        )}
                        {product.operativeMemory && (
                          <Descriptions.Item label="Operativ yaddaş">
                            {product.operativeMemory}GB
                          </Descriptions.Item>
                        )}
                        {product.memory && (
                          <Descriptions.Item label="Quraşdırılmış yaddaş">
                            {product.memory}GB
                          </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Rəng">
                          {product.productColor}
                        </Descriptions.Item>
                        {product.memoryCard && (
                          <Descriptions.Item label="Yaddaş kartı dəstəyi">
                            {product.memoryCard}
                          </Descriptions.Item>
                        )}
                        {product.chipSet && (
                          <Descriptions.Item label="Prosessor tipi">
                            {product.chipSet}
                          </Descriptions.Item>
                        )}
                        {product.cpu && (
                          <Descriptions.Item label="Prosessor tezliyi">
                            {product.cpu}
                          </Descriptions.Item>
                        )}
                        {product.os && (
                          <Descriptions.Item label="Əməliyyat sistemi">
                            {product.os}
                          </Descriptions.Item>
                        )}
                        {product.mainCamera && (
                          <Descriptions.Item label="Əsas kamera">
                            {product.mainCamera}
                          </Descriptions.Item>
                        )}
                        {product.ledFlash && (
                          <Descriptions.Item label="Led fləş">
                            {product.ledFlash}
                          </Descriptions.Item>
                        )}
                        {product.videoCamera && (
                          <Descriptions.Item label="Video çəkiliş">
                            {product.videoCamera}
                          </Descriptions.Item>
                        )}
                        {product.frontCamera && (
                          <Descriptions.Item label="Frontal kamera">
                            {product.frontCamera}
                          </Descriptions.Item>
                        )}
                        {product.batteryType && (
                          <Descriptions.Item label="Akkumulyatorun həcmi">
                            {product.batteryType}
                          </Descriptions.Item>
                        )}
                        {product.wlan && (
                          <Descriptions.Item label="Wi-Fi">
                            {product.wlan}
                          </Descriptions.Item>
                        )}
                        {product.bluetooth && (
                          <Descriptions.Item label="Bluetooth">
                            {product.bluetooth}
                          </Descriptions.Item>
                        )}
                        {product.navigator && (
                          <Descriptions.Item label="Naviqasiya sistemi">
                            {product.navigator}
                          </Descriptions.Item>
                        )}
                        {product.fingerPrint && (
                          <Descriptions.Item label="Barmaq izi skaneri">
                            {product.fingerPrint}
                          </Descriptions.Item>
                        )}
                        {product.dimensions && (
                          <Descriptions.Item label="Ölçülər: Hündürlüyü / Eni / Dərinliyi">
                            {product.dimensions}
                          </Descriptions.Item>
                        )}
                        {product.weight && (
                          <Descriptions.Item label="Çəki">
                            {product.weight}
                          </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Zәmanәt">
                          1 il
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  )}
                  {id === "2" && (
                    <div>
                      <h2>Tab {id} Content</h2>
                      <p>This is the content for Tab {id}.</p>
                    </div>
                  )}
                </div>
              ),
            };
          })}
        />
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  main: state.main,
});

export default connect(mapStateToProps, { fetchData })(ProductDetail);
