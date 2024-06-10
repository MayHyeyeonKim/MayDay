import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderActions } from "../action/orderAction";
import OrderStatusCard from "../component/OrderStatusCard";
import "../style/orderStatus.style.css";

const MyPage = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(orderActions.getOrder());
  }, []);
  return (
    <Container className="status-card-container">
    {orderList.map((item) => (
      <OrderStatusCard
        orderItem={item}
        className="status-card-container"
        key={item._id}
      />
    ))}
  </Container>
);
};

export default MyPage;
