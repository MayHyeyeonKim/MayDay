import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { currencyFormat } from "../utils/number";

const OrderReceipt = ({cartList, totalPrice}) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="receipt-container">
      <h3 className="receipt-title">Order List</h3>
      <ul className="receipt-list">
        {cartList.map(item=>
        <li key={item._id}>
          <div className="display-flex space-between">
            <div>{item.productId.name}</div>
            <div>$ {currencyFormat(item.productId.price * item.qty)}</div>
          </div>
        </li>
      )}  
      </ul>
      <div className="display-flex space-between receipt-title">
        <div>
          <strong>Total:</strong>
        </div>
        <div>
          <strong>$ {currencyFormat(totalPrice)}</strong>
        </div>
      </div>
      {location.pathname.includes("/cart") && cartList.length > 0 && (
        <Button
          variant="dark"
          className="payment-button"
          onClick={() => navigate("/payment")}
        >
          Proceed to Checkout
        </Button>
      )}

      <div>
      Possible payment methods will not be confirmed until you reach the payment stage.
        <div>
        Read about the 30-day return period, return fees, and additional shipping charges for undelivered items. 
        Returns and Refunds
        </div>
      </div>
    </div>
  );
};

export default OrderReceipt;
