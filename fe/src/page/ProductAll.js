import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../action/productAction";
import ClipLoader from "react-spinners/ClipLoader";

const ProductAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.product.error);
  const searchKeyword = useSelector((state) => state.product.searchKeyword);
  const { productList, totalPageNum } = useSelector((state) => state.product);
  const [query, setQuery] = useSearchParams();
  const name = query.get("name");
  const page = query.get("page");

  useEffect(() => {
    dispatch(productActions.getProductList({ name }));
  }, [query])

  useEffect(() => {
    const searchQuery = {
      page: query.get("page") || 1,
      name: query.get("name") || "",
    };
    const params = new URLSearchParams(searchQuery);
    const navigateQuery = params.toString();
    navigate("?" + navigateQuery);

  }, [name]);

  return (
    <>
      {
        loading ?
          (<div className='loading' > <ClipLoader color="#FB6D33" loading={loading} size={100} /></div>)
          :
          (
            <Container>
            <Row>
              {productList.length > 0 ? (
                productList.map((product, index) => (
                  <Col md={3} sm={12} key={product._id}>
                    <ProductCard product={product} />
                  </Col>
                ))
              ) : (
                <div className="text-align-center empty-bag">
                  {name === "" ? (
                    <h2>No products registered.</h2>
                  ) : (
                    <h2>No products match {name}.</h2>
                  )}
                </div>
              )}
            </Row>
          </Container>
          )
      }
    </>

  );
};

export default ProductAll;