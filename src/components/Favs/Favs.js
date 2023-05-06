import React, { useState } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faManatSign,
} from "@fortawesome/free-solid-svg-icons";

const Favs = () => {
  const [likedProductId, setLikedProductId] = useState(null);

  const [product, setProduct] = useState([
    {
      id: "1",
      productBrand: "Apple",
      productModel: "iPhone 7",
      memory: "32",
      productColor: "Black",
      img: [
        "/images/iphone-7-black.jpg",
        "/images/iphone-7-black.jpg",
        "/images/iphone-7-black.jpg",
      ],
      price: "340",
      count: 0,
    },
    // {
    //   id: "2",
    //   productBrand: "Apple",
    //   productModel: "iPhone 7",
    //   memory: "32",
    //   productColor: "Black",
    //   img: [
    //     "/images/iphone-7-black.jpg",
    //     "/images/iphone-7-black.jpg",
    //     "/images/iphone-7-black.jpg",
    //   ],
    //   price: "340",
    //   count: 0,
    // },
  ]);

  const handleLikeClick = (productId) => {
    if (likedProductId === productId) {
      setLikedProductId(null);
    } else {
      setLikedProductId(productId);
    }
  };

  return (
    <div className="favs_page">
      <div className="container">
        <h5>Bəyəndiklərim</h5>
        <div className="favs__container">
          {!product.length && (
            <div className="inside_basket for_empty">
              <div className="is__empty">
                <HeartOutlined style={{ fontSize: "50px", color: "#4F4F4F" }} />
                <h5 className="mt-4">Favoriləriniz halhazırda boşdur</h5>
              </div>
            </div>
          )}
          <div className="basket__products">
            {product.map((item) => (
              <div className="basket_product" key={item.id}>
                <div className="two_divs_container">
                  <div className="product__img">
                    <img src={item?.img[0]} />
                  </div>
                  <div className="second_row_wrapper">
                    <div className="product__title">
                      <h6>
                        {item.productBrand}, {item.productModel}, {item.memory}
                        GB, {item.productColor}
                      </h6>
                    </div>
                    <div className="product_color_and_cost for_destkop">
                      <div className="product__color">
                        <h6 style={{ color: "#828282" }}>Rəng:</h6>
                        <h6>{item.productColor}</h6>
                      </div>
                      <div className="product__price">
                        <h5>{item.price} $</h5>
                      </div>
                    </div>
                    <div className="product_color_and_cost_mobile only_mobile">
                      <div className="color__cost_mobile">
                        <div className="product__color">
                          <h6 style={{ color: "#828282" }}>Rəng:</h6>
                          <h6>{item.productColor}</h6>
                        </div>
                        <div className="product__price">
                          <h5>{item.price} $</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="remove__product">
                  {likedProductId === item.id ? (
                    <HeartFilled
                      onClick={() => handleLikeClick(item.id)}
                      style={{ color: "red", fontSize: "24px" }}
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => handleLikeClick(item.id)}
                      className="heart__outlined"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favs;
