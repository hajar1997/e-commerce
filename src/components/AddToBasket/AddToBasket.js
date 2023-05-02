import React, { useState } from "react";
import { Button } from "antd";

const AddToBasket = () => {
  const [product, setProduct] = useState([]);
  return (
    <div className="add_to_basket__">
      <div className="container">
        <h5>Səbət ({product.length} məhsul)</h5>
        {!product.length && (
          <div className="inside_basket for_empty">
            <div className="is__empty">
              <img src="/images/shopping-cart.svg" />
              <h5 className="mt-4">Səbətiniz halhazırda boşdur</h5>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "#2DD06E",
                  width: "100%",
                  height: "44px",
                }}
              >
                Alış-verişə davam et
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToBasket;
