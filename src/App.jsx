import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import './App.css'
import AddedFlush from './components/AddedFlush'
import Navbar from './components/Navbar'
import Shop from './components/Shop'
import Cart from './components/Cart'

function App() {
  const cart = useSelector((state) => state.shop.cart);

  const [showAddedFlush, setShowAddedFlush] = useState(false);
  const [cartLength, setCartLength] = useState(cart.total);

  useEffect(function() {
    const timerId = setTimeout(function() {
      setShowAddedFlush(false)
    }, 3000);

    return () => clearTimeout(timerId)
  }, [showAddedFlush]);

  useEffect(function() {
    setCartLength(cart.total);
  }, [cart]);

  function addedFlushHandler() {
    setShowAddedFlush(true);
  }

  return (
    <BrowserRouter>
      <AddedFlush enable={showAddedFlush ? "opacity-100 top-20 z-[2]" : "opacity-0 z-0 top-0"} />
      <Navbar cartLength={cartLength} />
      <div className="mt-20">
        <Routes>
          <Route path="/" element={<Shop addToCart={addedFlushHandler} />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
