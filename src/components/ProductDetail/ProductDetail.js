import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { notification } from "antd";
import { fetchData, addProductToBasket } from "../../redux/actions/action";
import ImageGallery from "react-image-gallery";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShoppingCartOutlined, FormOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Descriptions, Tabs, Divider, Button, Form, Input } from "antd";
import { faDollarSign, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const ProductDetail = () => {
  const { category, productBrand, id } = useParams();
  const [productCount, setProductCount] = useState(0);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);

  const product = main[category]?.find((product) => product.id === id);
  const navigate = useNavigate();
  const [form] = useForm();

  const handleClick = (newRating) => {
    if (rating === newRating) {
      setRating(0);
    } else {
      setRating(newRating);
    }
  };

  const handleIncrease = () => {
    setProductCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setProductCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  const handleAddToBasket = () => {
    const quantity = productCount;
    if (quantity > 0) {
      dispatch(addProductToBasket(product.id, quantity));
      setProductCount(0);
    }
  };

  const comments = product?.comments?.map((comment) => comment);

  const stars = Array.from({ length: 5 }, (_, index) => {
    const newRating = index + 1;
    return (
      <span key={index} className={`star ${newRating <= rating ? "filled" : ""}`} onClick={() => handleClick(newRating)}>
        &#9733;
      </span>
    );
  });

  const onFinish = (values) => {
    const data = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      comment: values.comment,
      rating: rating,
    };

    const updatedProduct = main[category]?.map((product) => {
      if (product.id === id) {
        if (!product.comments) {
          product.comments = [];
        }
        product.comments.push(data);
      }
      return product;
    });

    axios
      .put(`${process.env.REACT_APP_DATABASE_URL}/${category}.json`, updatedProduct)
      .then((res) => {
        form.resetFields();
        notification.open({
          type: "success",
          message: "Rəyiniz göndərildi!",
        });
        setRating(0);
      })
      .catch((err) => {
        console.log(err);
        notification("error");
      });
  };

  useEffect(() => {
    dispatch(fetchData());
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
              {category === "phones" ? "Telefonlar" : category === "smartWatches" ? "Smart saatlar" : category === "accessories" ? "Aksessuarlar" : ""}
            </a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <span>{productBrand}</span>
          </li>
        </ol>
      </nav>
      <div className="row mt-2">
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
              <div className="star-rating">{stars}</div>
              <div className="rating_count">
                <span>({comments?.length})</span>
              </div>
              <Divider type="vertical" />
              <div className="comment_count">
                <a href="#comment">{comments?.length} rəy</a>
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
                      color: product.productColor == "Black" || "Gray" ? "white" : "black",
                    }}
                  >
                    {product.memory}GB
                  </span>
                </div>
              </div>
            )}
            <Divider type="horizontal" />
            <div className="product_counter">
              <button onClick={handleDecrease}>
                <FontAwesomeIcon style={{ fontSize: "13px", paddingRight: "0" }} icon={faMinus} />
              </button>
              <span>{productCount}</span>
              <button onClick={handleIncrease}>
                <FontAwesomeIcon style={{ fontSize: "13px", paddingRight: "0" }} icon={faPlus} />
              </button>
            </div>
            <div className="add_to_bucket_btn">
              <button onClick={handleAddToBasket}>
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
                        <Descriptions.Item label="Brend">{productBrand}</Descriptions.Item>
                        <Descriptions.Item label="Məhsul tipi">{category == "phones" ? "Smartfon" : category == "accessories" ? "Aksessuar" : "Smart Saat"}</Descriptions.Item>
                        {product.network && <Descriptions.Item label="Şəbəkə">{product.network}</Descriptions.Item>}
                        {product.simcard && <Descriptions.Item label="SIM-kart sayı">{product.simcard}</Descriptions.Item>}
                        {product.screenSize && <Descriptions.Item label="Ekranın ölçüsü">{product.screenSize}</Descriptions.Item>}
                        {product.resolution && <Descriptions.Item label="Ekran icazəsi">{product.resolution}</Descriptions.Item>}
                        {product.operativeMemory && <Descriptions.Item label="Operativ yaddaş">{product.operativeMemory}</Descriptions.Item>}
                        {product.operativeMemory && <Descriptions.Item label="Operativ yaddaş">{product.operativeMemory}GB</Descriptions.Item>}
                        {product.memory && <Descriptions.Item label="Quraşdırılmış yaddaş">{product.memory}GB</Descriptions.Item>}
                        <Descriptions.Item label="Rəng">{product.productColor}</Descriptions.Item>
                        {product.memoryCard && <Descriptions.Item label="Yaddaş kartı dəstəyi">{product.memoryCard}</Descriptions.Item>}
                        {product.chipSet && <Descriptions.Item label="Prosessor tipi">{product.chipSet}</Descriptions.Item>}
                        {product.cpu && <Descriptions.Item label="Prosessor tezliyi">{product.cpu}</Descriptions.Item>}
                        {product.os && <Descriptions.Item label="Əməliyyat sistemi">{product.os}</Descriptions.Item>}
                        {product.mainCamera && <Descriptions.Item label="Əsas kamera">{product.mainCamera}</Descriptions.Item>}
                        {product.ledFlash && <Descriptions.Item label="Led fləş">{product.ledFlash}</Descriptions.Item>}
                        {product.videoCamera && <Descriptions.Item label="Video çəkiliş">{product.videoCamera}</Descriptions.Item>}
                        {product.frontCamera && <Descriptions.Item label="Frontal kamera">{product.frontCamera}</Descriptions.Item>}
                        {product.batteryType && <Descriptions.Item label="Akkumulyatorun həcmi">{product.batteryType}</Descriptions.Item>}
                        {product.wlan && <Descriptions.Item label="Wi-Fi">{product.wlan}</Descriptions.Item>}
                        {product.bluetooth && <Descriptions.Item label="Bluetooth">{product.bluetooth}</Descriptions.Item>}
                        {product.navigator && <Descriptions.Item label="Naviqasiya sistemi">{product.navigator}</Descriptions.Item>}
                        {product.fingerPrint && <Descriptions.Item label="Barmaq izi skaneri">{product.fingerPrint}</Descriptions.Item>}
                        {product.dimensions && <Descriptions.Item label="Ölçülər: Hündürlüyü / Eni / Dərinliyi">{product.dimensions}</Descriptions.Item>}
                        {product.weight && <Descriptions.Item label="Çəki">{product.weight}</Descriptions.Item>}
                        <Descriptions.Item label="Zәmanәt">1 il</Descriptions.Item>
                      </Descriptions>
                    </div>
                  )}
                  {id === "2" && (
                    <div className="comments_wrapper">
                      {comments &&
                        comments.map((comment) => (
                          <div className="comment" key={comment.id}>
                            <div className="row mt-5">
                              <div className="col-lg-3">
                                <div className="star_count">
                                  <span>{comment.rating}</span>
                                  <div className="star-rating">
                                    <span className={`star cursor_unset ${comment.rating >= 1 ? "filled" : ""}`}>&#9733;</span>
                                    <span className={`star cursor_unset ${comment.rating >= 2 ? "filled" : ""}`}>&#9733;</span>
                                    <span className={`star  cursor_unset ${comment.rating >= 3 ? "filled" : ""}`}>&#9733;</span>
                                    <span className={`star cursor_unset ${comment.rating >= 4 ? "filled" : ""}`}>&#9733;</span>
                                    <span className={`star cursor_unset ${comment.rating >= 5 ? "filled" : ""}`}>&#9733;</span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <div className="user_comment_info_date">
                                  <div className="user_name_surname">
                                    <h5>
                                      {comment.name} {comment.surname}
                                    </h5>
                                  </div>
                                  <div className="comment_date">
                                    <span>{new Date().toDateString()}</span>
                                  </div>
                                </div>
                                <div className="user__comment">
                                  <p>{comment.comment}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      <div className="form_wrapper" id="comment">
                        <h4>Rəy Bildir</h4>
                        <Form
                          onFinish={onFinish}
                          style={{
                            maxWidth: 800,
                            width: "100%",
                            marginTop: 48,
                          }}
                          form={form}
                          layout="vertical"
                        >
                          <div className="form_flex">
                            <div style={{ flex: "1 1 50%" }}>
                              <Form.Item
                                name="name"
                                label="Ad"
                                rules={[
                                  {
                                    required: true,
                                    message: "Adınızı daxil edin",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Adınızı daxil edin"
                                  style={{
                                    border: "none",
                                  }}
                                  size="large"
                                />
                              </Form.Item>
                            </div>
                            <div style={{ flex: "1 1 50%" }}>
                              <Form.Item
                                name="surname"
                                label="Soyad"
                                rules={[
                                  {
                                    required: true,
                                    message: "Soyadınızı daxil edin",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Soyadınızı daxil edin"
                                  style={{
                                    border: "none",
                                  }}
                                  size="large"
                                />
                              </Form.Item>
                            </div>
                          </div>
                          <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                              {
                                required: true,
                                type: "email",
                                message: "Emailinizi daxil edin",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Emailinizi daxil edin"
                              style={{
                                border: "none",
                              }}
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item name="comment" label="Rəyinizi yazın">
                            <Input.TextArea
                              style={{
                                resize: "none",
                                border: "none",
                              }}
                              placeholder="Rəyinizi buraya yazın"
                              cols={5}
                              rows={5}
                              size="large"
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{
                                backgroundColor: "#2DD06E",
                                float: "right",
                                width: "174px",
                                height: "44px",
                              }}
                            >
                              Rəyini bildir
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
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

export default ProductDetail;
