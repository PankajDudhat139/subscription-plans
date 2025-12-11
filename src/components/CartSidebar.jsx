import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  toggleCart,
  increaseQty,
  decreaseQty,
  removeItem,
  openModal,
} from "../store/cartSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);

  return (
    <div
      className={`cart-sidebar ${isOpen ? "open" : ""}`}
      tabIndex="-1"
    >
      <div className="cart-header">
        <h2>Cart</h2>
        <button className="close-btn" onClick={() => dispatch(toggleCart())}>x</button>
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>Your cart is empty.</p>
        ) : (
          items.map((i) => (
            <div key={i.id} className="cart-item">
              <img src={i.image} alt="" width="60" className="cart-item-img" />
              <div className="cart-item-details">
                <div className="cart-item-title">{i.productName}</div>
                <small className="text-white">{i.optionLabel}</small>
                <div className="cart-item-price">₹{i.price}</div>
                <div className="cart-item-actions">
                  <button className="quantity-btn decrease-qty" onClick={() => dispatch(decreaseQty(i.id))}>−</button>
                  <div className="item-quantity">{i.qty}</div>
                  <button className="quantity-btn increase-qty" onClick={() => dispatch(increaseQty(i.id))}>+</button>
                </div>
              </div>
              <button className="remove-item-btn" onClick={() => dispatch(removeItem(i.id))}>Remove</button>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total:</span> <span id="cart-total-price">₹{total}</span>
        </div>
        <button
          className="checkout-btn"
          disabled={!items.length}
          onClick={() => dispatch(openModal())}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
