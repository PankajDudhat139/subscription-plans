import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  toggleCart,
  increaseQty,
  decreaseQty,
  removeItem,
} from "../store/cartSlice";

const CartSidebar = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = Number(useSelector(selectCartTotal)) || 0;
  const isOpen = useSelector(selectIsCartOpen);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [message, setMessage] = useState("");
  const [coupons, setCoupons] = useState([]);

  // ✅ Add/remove class on body when cart opens/closes
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  // ✅ Fetch coupons from local JSON
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setCoupons(data.coupons || []))
      .catch((err) => console.error("Failed to load coupons", err));
  }, []);

  // ✅ Recalculate discount whenever subtotal or coupon changes
  useEffect(() => {
    if (!activeCoupon) {
      setDiscount(0);
      return;
    }

    const found = coupons.find((c) => c.code === activeCoupon);
    if (!found) return;

    if (found.type === "percent") {
      setDiscount((subtotal * found.value) / 100);
    } else if (found.type === "flat") {
      setDiscount(subtotal >= (found.minSubtotal || 0) ? found.value : 0);
    }
  }, [subtotal, activeCoupon, coupons]);

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setMessage("Please enter a coupon code.");
      setDiscount(0);
      setActiveCoupon(null);
      setCoupon("");
      return;
    }

    const found = coupons.find((c) => c.code === code);

    if (!found) {
      setMessage("Invalid coupon code.");
      setDiscount(0);
      setActiveCoupon(null);
      setCoupon("");
      return;
    }

    // Valid coupon
    setActiveCoupon(found.code);
    if (found.type === "percent") {
      setDiscount((subtotal * found.value) / 100);
    } else if (found.type === "flat") {
      if (subtotal >= (found.minSubtotal || 0)) {
        setDiscount(found.value);
      } else {
        setDiscount(0);
        setMessage(`Subtotal must be ₹${found.minSubtotal} or more.`);
      }
    }

    setMessage(found.description);
    setCoupon("");
  };

  const total = Math.max(subtotal - discount, 0);

  const handleSendWhatsApp = () => {
    const phoneNumber = "919664906256"; // ✅ 9664906256
    const wMessage = `I have completed the payment for the following plans:%0A${items
      .map(
        (i, idx) =>
          `${idx + 1}. ${i.productName} (${i.optionLabel}) x${i.qty} = ₹${
            i.price * i.qty
          }`
      )
      .join("%0A")}%0A%0ASubtotal: ₹${subtotal.toFixed(2)}%0ADiscount: − ₹${discount.toFixed(2)}%0ATotal: ₹${total.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${wMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`} tabIndex="-1">
      <div className="cart-header">
        <h2>Cart</h2>
        <button className="close-btn" onClick={() => dispatch(toggleCart())}>
          ×
        </button>
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            Your cart is empty.
          </p>
        ) : (
          items.map((i) => (
            <div key={i.id} className="cart-item">
              <img src={i.image} alt="" width="60" className="cart-item-img" />
              <div className="cart-item-details">
                <div className="cart-item-title">{i.productName}</div>
                <small className="text-white">{i.optionLabel}</small>
                <div className="cart-item-price">₹{i.price}</div>
                <div className="cart-item-actions">
                  <button
                    className="quantity-btn decrease-qty"
                    onClick={() => dispatch(decreaseQty(i.id))}
                  >
                    −
                  </button>
                  <div className="item-quantity">{i.qty}</div>
                  <button
                    className="quantity-btn increase-qty"
                    onClick={() => dispatch(increaseQty(i.id))}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="remove-item-btn"
                onClick={() => dispatch(removeItem(i.id))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* ✅ Coupon Input */}
      {items.length > 0 && (
        <div className="coupon-section px-3 py-2 border-top">
          <label htmlFor="coupon" className="form-label fw-bold">
            Have a coupon?
          </label>
          <div className="input-group mb-2">
            <input
              id="coupon"
              type="text"
              className="form-control form-control-sm"
              placeholder="Enter coupon (e.g. SAVE10)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={handleApplyCoupon}
            >
              Apply
            </button>
          </div>
          {message && (
            <p
              className={`small mb-0 ${
                message.includes("off") ? "text-success" : "text-danger"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      )}

      <div className="cart-footer">
        {items.length > 0 && (
          <>
            <div className="cart-total d-flex justify-content-between mb-1">
              <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-total d-flex justify-content-between mb-1">
              <span>Discount:</span>{" "}
              <span className="text-success">− ₹{discount.toFixed(2)}</span>
            </div>
            <div className="cart-total d-flex justify-content-between fw-bold border-top pt-2 mb-2">
              <span>Total:</span> <span>₹{total.toFixed(2)}</span>
            </div>
          </>
        )}
        <button
          className="checkout-btn"
          disabled={!items.length}
          onClick={handleSendWhatsApp}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
