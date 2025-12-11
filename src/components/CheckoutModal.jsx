import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectIsModalOpen,
  closeModal,
} from "../store/cartSlice";

const CheckoutModal = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const open = useSelector(selectIsModalOpen);

  const message = `I have completed the payment for the following plans:%0A${items
    .map(
      (i, idx) =>
        `${idx + 1}. ${i.productName} (${i.optionLabel}) x${i.qty} = ₹${i.price * i.qty}`
    )
    .join("%0A")}`;
  const whatsappUrl = `https://wa.me/?text=${message}%0ATotal:%20₹${total}`;

  if (!open) return null;

  return (
    <div  className="modal d-block" tabIndex="-1" onClick={() => dispatch(closeModal())}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="mb-0">Confirm Order</h5>
            <button className="btn-close text-white" onClick={() => dispatch(closeModal())}></button>
          </div>
          <div className="modal-body text-center">
            <img src="https://i.postimg.cc/rFW70Gg1/QR-CODE.jpg" alt="QR Code" />
            <p className="fs-5 fw-bold" id="payment-amount">Total Amount: ₹{total}</p>
            <button className="upi-button" id="copy-upi-btn">
              <span id="upiId">digi-don@ibl</span>
              <img src="https://i.postimg.cc/s1FvwFBD/copy-document.png" alt="Copy" />
            </button>
          </div>
          <div className="modal-footer justify-content-center border-0 pt-0">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success">
              Send on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
