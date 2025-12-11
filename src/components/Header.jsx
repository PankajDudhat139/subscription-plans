import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, toggleCart } from "../store/cartSlice";

const Header = ({ onSearch }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQty = items.reduce((s, i) => s + i.qty, 0);

  return (
    <nav className="navbar navbar-light px-4 site-header flex-nowrap">
      <span className="navbar-brand fw-bold header-left">
        <div className="site-title">
          <img src="/images/netflix.png" alt="" />
        </div>
      </span>
      <div className="d-flex gap-3 header-right">
        <input
          type="text"
          id="search-bar"
          className="form-control w-25"
          placeholder="Search plans..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <div className="cart-icon-container" onClick={() => dispatch(toggleCart())}>
            <svg viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z">
                </path>
                </svg>
            <span className="cart-item-count">
              {totalQty}
              </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
