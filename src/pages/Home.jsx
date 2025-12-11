import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { addOrIncreaseItem } from "../store/cartSlice";

const Home = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  const handleAddToCart = (product, option) => {
    dispatch(
      addOrIncreaseItem({
        productId: product.id,
        productName: `${product.title} (${option.category.toUpperCase()})`,
        category: option.category,
        optionLabel: option.label,
        price: option.price,
        image: product.image,
      })
    );
  };

  // Filtered products
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid my-4">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5 text-muted">No plans found.</div>
      ) : (
        <div className="row g-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex align-items-center justify-content-center">
              <ProductCard
                product={p}
                onAddToCart={(opt) => handleAddToCart(p, opt)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
