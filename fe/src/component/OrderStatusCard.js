import React from "react";
import { Row, Col, Badge } from "react-bootstrap";
import { badgeBg } from "../constants/order.constants";
import { currencyFormat } from "../utils/number";

const OrderStatusCard = ({ orderItem }) => {
  if (!orderItem) {
    return <div>Error: Order item is undefined</div>;
  }
  return (
    <div>
    <Row className="status-card">
      <Col xs={3}>
        <img
          src={orderItem.items[0]?.productId?.image}
          alt={orderItem.items[0]?.productId?.image}
          height={96}
        />
      </Col>
      <Col xs={7} className="order-info">
        <div>
          <strong>Order Number: {orderItem.orderNum}</strong>
        </div>

        <div className="text-12">{orderItem.updatedAt ? orderItem.updatedAt.slice(0, 10) : "N/A"}</div>

        <div>
          {orderItem.items[0].productId.name}
          {orderItem.items.length > 1 && `and ${orderItem.items.length - 1} more items`}
        </div>
        <div>₩ {currencyFormat(orderItem.totalPrice)}</div>
      </Col>
      <Col md={2} className="vertical-middle">
        <div className="text-align-center text-12">Order Status</div>
        <Badge bg={badgeBg[orderItem.status]}>{orderItem.status}</Badge>
      </Col>
    </Row>
  </div>
  );
};

export default OrderStatusCard;
