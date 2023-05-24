import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  fetchFavorites,
  removeProductFromFavorites,
  addProductToFavorites,
} from "../../redux/actions/action";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeartOutlined } from "@ant-design/icons";

const Favs = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.main.favorites);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const isProductFavorite = (id) => {
    return favorites.some((favorite) => favorite.id === id);
  };

  const handleHeartClick = (id) => {
    if (isProductFavorite(id)) {
      dispatch(removeProductFromFavorites(id));
    } else {
      dispatch(addProductToFavorites(id));
    }
  };

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchFavorites());
  }, [dispatch]);

  const { phones, accessories, smartWatches } = useSelector(
    (state) => state.main
  );

  useEffect(() => {
    const filteredProducts = [
      ...phones.filter((product) =>
        favorites.some((fav) => fav.id === product.id)
      ),
      ...accessories.filter((product) =>
        favorites.some((fav) => fav.id === product.id)
      ),
      ...smartWatches.filter((product) =>
        favorites.some((fav) => fav.id === product.id)
      ),
    ];

    setFavoriteProducts(filteredProducts);
  }, [favorites, phones, accessories, smartWatches]);
  console.log(favorites);

  return (
    <div className="favs_page">
      <div className="container">
        <h5>Bəyəndiklərim</h5>
        <div className="favs__container">
          {!favoriteProducts.length && (
            <div className="inside_basket for_empty">
              <div className="is__empty">
                <HeartOutlined style={{ fontSize: "50px", color: "#4F4F4F" }} />
                <h5 className="mt-4">Favoriləriniz halhazırda boşdur</h5>
              </div>
            </div>
          )}
          <div className="basket__products">
            {favoriteProducts.map((item) => (
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
                  <FontAwesomeIcon
                    onClick={() => handleHeartClick(item.id)}
                    style={{
                      color: isProductFavorite(item.id) ? "#dc3545" : "#c2c5ca",
                      fontSize: "20px",
                    }}
                    icon={faHeart}
                  />
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
