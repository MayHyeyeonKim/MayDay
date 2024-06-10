import React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "../utils/number";
import "../../src/App.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="card" onClick={() => showProduct(product._id)}>
      <img src={product.image} alt={product.name} className="product-image" />
      <div>{product.name}</div>
      <div>{currencyFormat(product.price)}</div>
    </div>
  );
};

export default ProductCard;

