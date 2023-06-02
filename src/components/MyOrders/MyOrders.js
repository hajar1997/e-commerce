import React, { useEffect, useState } from "react";
import { fetchData } from "../../redux/actions/action";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyOrders = ({ handleMenuClick }) => {
  const [users, setUsers] = useState([]);
  const id = localStorage.getItem("current_id");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const dispatch = useDispatch();

  const { phones, accessories, smartWatches } = useSelector(
    (state) => state.main
  );

  const productIds = users?.flatMap((user) =>
    user?.orders?.flatMap((order) =>
      order?.products?.map((product) => product.productId)
    )
  );

  const filteredProducts = [
    ...phones.filter((product) => product),
    ...accessories.filter((product) => product),
    ...smartWatches.filter((product) => product),
  ];

  const sameId = filteredProducts.filter((product) =>
    productIds.some((id) => id === product.id)
  );

  const getData = async () => {
    if (isLoggedIn) {
      await axios.get(`http://localhost:8001/users/${id}`).then((res) => {
        const user = res.data;
        setUsers([user]);
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleClick = (id) => {
    localStorage.setItem("ordered-productId", id);
    handleMenuClick({ key: `/order-details` });
  };

  return (
    <div className="my_orders">
      <h5
        style={{
          color: "#4F4F4F",
          fontWeight: "600",
          marginBottom: "30px",
        }}
      >
        {!users.length
          ? "Sifarişlərim"
          : `Sifarişlərim (${users.length} məhsul)`}
      </h5>
      {!users.length && (
        <div className="inside_basket for_empty">
          <div className="is__empty">
            <img src="/images/shopping-cart.svg" />
            <h5 className="mt-4">Səbətiniz halhazırda boşdur</h5>
          </div>
        </div>
      )}
      <div className="inside__basket">
        {sameId?.map((product) => (
          <div className="basket__product" key={product.id}>
            <div className="basket_product__container">
              <div className="basket_product__img">
                <img src={product.img[0]} />
              </div>
              <div className="basket_product__info">
                <div className="order__date">
                  <span>Sifariş tarixi:</span>
                  <h6>{new Date().toLocaleDateString().replace(/\//g, ".")}</h6>
                </div>
                <div className="basket__product_total_cost">
                  <span>Ümumi məbləğ:</span>
                  <h6>{product.price} $</h6>
                </div>
                <Button
                  onClick={() => handleClick(product.id)}
                  className="basket_pr_destkop_btn"
                  type="ghost"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#F2F2F2",
                    float: "right",
                    width: "174px",
                    height: "44px",
                    fontWeight: "600",
                    marginTop: "40px",
                  }}
                >
                  Sifarişin detalları
                </Button>
              </div>
            </div>
            <Button
              onClick={() => handleClick(product.id)}
              className="basket_pr_mobile_btn"
              type="ghost"
              htmlType="submit"
              style={{
                backgroundColor: "#F2F2F2",
                float: "right",
                width: "174px",
                height: "44px",
                fontWeight: "600",
              }}
            >
              Sifarişin detalları
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
