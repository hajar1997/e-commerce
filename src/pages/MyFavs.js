import React from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product/Product";

const MyFavs = (props) => {
  const products = [
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
    },
    {
      id: "2",
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
    },
    {
      id: "3",
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
    },
  ];

  return (
    <div className="my_favs">
      <h5
        style={{
          color: "#4F4F4F",
          fontWeight: "600",
          marginBottom: "30px",
        }}
      >
        Favorilərim
      </h5>
      <div className="all-products">
        {products.map((product) => (
          <Link key={product.id}>
            <Product
              img={product.img}
              brand={product.productBrand}
              model={product.productModel}
              memory={product.memory}
              color={product.productColor}
              price={product.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyFavs;
