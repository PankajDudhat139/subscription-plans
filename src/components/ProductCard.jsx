import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart }) => {
  // Default to the first category in the product data
  const categoryKeys = Object.keys(product.categories);
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const currentCategory = product.categories[activeCategory];

  return (
    <div
      className={`card shadow-sm h-100 ${product.class}`}
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
      }}
    >
      <div className="header-info align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.title}
          />
          <h5 className="card-title text-center ms-2 text-white">
            {product.title}
          </h5>
        </div>
        <div
          className="plan-toggle-container"
          data-options={categoryKeys.length}
        >
          {/* Animated slider */}
          <div
            className={`plan-toggle-slider ${
              activeCategory === "tv" || activeCategory === "private"
                ? " move-right"
                : ""
            }`}
            style={{
              width: `${100 / categoryKeys.length}%`,
            }}
          ></div>

          {/* Dynamic buttons */}
          {categoryKeys.map((key) => (
            <div
              key={key}
              className={`toggle-option ${
                activeCategory === key ? "active" : ""
              }`}
              onClick={() => {
                setActiveCategory(key);
                setSelectedOption(null);
              }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column mt-2">
        {/* ===== Dynamic Category Toggle ===== */}

        {/* ===== Plan Options ===== */}
        <div className="mb-3">
          {currentCategory.options.map((opt) => (
            <div key={opt.label} className="form-check ps-0">
              <input
                className="form-check-input"
                type="radio"
                name={`option-${product.id}-${activeCategory}`}
                id={`${product.id}-${activeCategory}-${opt.label}`}
                checked={selectedOption?.label === opt.label}
                onChange={() => setSelectedOption(opt)}
              />
              <label
                className="form-check-label"
                htmlFor={`${product.id}-${activeCategory}-${opt.label}`}
              >
                {opt.label} – ₹{opt.price}
              </label>
            </div>
          ))}
        </div>

        {/* ===== Description List ===== */}
        <ul className="mb-3 text-white">
          {currentCategory.description.map((line, idx) => (
            <li key={idx}>
              {line}
            </li>
          ))}
        </ul>

      </div>
        {/* ===== Add to Cart Button ===== */}
        <button
          className="buy-button"
          disabled={!selectedOption}
          onClick={() =>
            onAddToCart({
              productId: product.id,
              title: product.title,
              category: activeCategory,
              ...selectedOption,
            })
          }
        >
          Add to Cart
        </button>
    </div>
  );
};

export default ProductCard;
