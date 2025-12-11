import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <Routes>
        <Route path="/" element={<Home searchQuery={searchQuery} />} />
      </Routes>
      <CartSidebar />
      <CheckoutModal />
    </div>
  );
}

export default App;
