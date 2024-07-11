import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import AddedFlush from './components/AddedFlush'
import RemovedFlush from './components/RemovedFlush'
import Navbar from './components/Navbar'
import Shop from './components/Shop'
import Cart from './components/Cart'

function App() {
  const [showAddedFlush, setShowAddedFlush] = useState(false);
  const [showRemovedFlush, setShowRemovedFlush] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || {total: 0});

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if(cart) {
      setCart(cart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(function() {
    const timerId = setTimeout(function() {
      setShowAddedFlush(false);
    }, 3000);

    return () => clearTimeout(timerId);
  }, [showAddedFlush]);

  useEffect(function() {
    const timerId = setTimeout(function() {
      setShowRemovedFlush("");
    }, 3000);

    return () => clearTimeout(timerId);
  }, [showRemovedFlush]);

  function addToCart(product) {
    const newCart = {...cart};
    newCart.total += 1;
    if (cart[product.shop.id] && cart[product.shop.id].items[product.id]) {
      newCart[product.shop.id].items[product.id].count += 1;
      setCart(newCart);
    } else if (cart[product.shop.id]) {
      newCart[product.shop.id].items[product.id] = {...product, note: "", like: false, count: 1, selected: false};
      setCart(newCart);
    } else {
      newCart[product.shop.id] = {
        name: product.shop.name,
        items: {[product.id]: {...product, note: "", like: false, count: 1, selected: false}}
      };
      setCart(newCart);
    }
    setShowAddedFlush(true);
  }

  function minusCount(product) {
    if (cart[product.shop.id].items[product.id].count > 1) {
      const newCart = {...cart};
      cart[product.shop.id].items[product.id].count -= 1;
      newCart.total -= 1;
      setCart(newCart);
    }
  }

  function addCount(product) {
    const newCart = {...cart};
    newCart[product.shop.id].items[product.id].count += 1;
    newCart.total += 1;
    setCart(newCart);
  }

  function changeCount(e, product) {
    if (parseInt(e.target.value) > 0) {
      const newCart = {...cart};
      newCart[product.shop.id].items[product.id].count = parseInt(e.target.value);
      newCart.total = recount(newCart);
      setCart(newCart);
    }
  }

  function saveNote(note, product) {
    const newCart = {...cart};
    newCart[product.shop.id].items[product.id].note = note;
    setCart(newCart);
  }

  function toggleLike(product) {
    const newCart = {...cart};
    newCart[product.shop.id].items[product.id].like = !product.like;
    setCart(newCart);
  }

  function toggleSelected(product) {
    const newCart = {...cart};
    newCart[product.shop.id].items[product.id].selected = !product.selected;
    setCart(newCart);
  }

  function shopSelectAll(shopId) {
    const newCart = {...cart};
    for (let productId in newCart[shopId].items) {
      newCart[shopId].items[productId].selected = true;
    }
    setCart(newCart);
  }

  function shopDeselectAll(shopId) {
    const newCart = {...cart};
    for (let productId in newCart[shopId].items) {
      newCart[shopId].items[productId].selected = false;
    }
    setCart(newCart);
  }

  function selectAll(e) {
    const newCart = {...cart};
    for (let shopId in newCart) {
      if (shopId != "total") {
        for (let productId in newCart[shopId].items) {
          newCart[shopId].items[productId].selected = e.target.checked;
        }
      }
    }
    setCart(newCart);
  }

  function removeItem(product) {
    if (Object.keys(cart[product.shop.id].items).length <= 1) {
      const newCart = Object.keys(cart).filter(shopId => shopId != product.shop.id).reduce((object, shopId) => {
        object[shopId] = cart[shopId];
        return object;
      }, {});
      newCart.total = recount(newCart);
      setCart(newCart);
    } else {
      const newItems = Object.keys(cart[product.shop.id].items).filter(productId => productId != product.id).reduce((object, productId) => {
        object[productId] = cart[product.shop.id].items[productId];
        return object;
      }, {});
      const newCart = {...cart};
      newCart[product.shop.id].items = newItems;
      newCart.total = recount(newCart);
      setCart(newCart);
    }
    setShowRemovedFlush("Items removed from cart!");
  }

  function deleteShopItems(id) {
    const newCart = Object.keys(cart).filter(shopId => shopId != id).reduce((object, shopId) => {
      object[shopId] = cart[shopId];
      return object;
    }, {});
    newCart.total = recount(newCart);
    setCart(newCart);
    setShowRemovedFlush("Shop removed from cart!");
  }

  function deleteAll() {
    if (Object.keys(cart).length != 1) {
      setCart({total: 0});
      setShowRemovedFlush("All items removed from cart!");
    }
  }

  function recount(cart) {
    let total = 0;
    for (let shopId in cart) {
      if (shopId != "total") {
        for (let productId in cart[shopId].items) {
          total += cart[shopId].items[productId].count;
        }
      }
    }
    return total;
  }

  const methods = {
    addCount,
    minusCount,
    changeCount,
    saveNote,
    toggleLike,
    removeItem,
    toggleSelected,
    shopSelectAll,
    shopDeselectAll,
    selectAll,
    deleteAll,
    deleteShopItems,
  };

  return (
    <BrowserRouter>
      <AddedFlush enable={showAddedFlush ? "opacity-100 top-20 z-[2]" : "opacity-0 z-0 top-0"} />
      <RemovedFlush enable={showRemovedFlush ? "opacity-100 top-20 z-[2]" : "opacity-0 z-0 top-0"} message={showRemovedFlush} />
      <Navbar cartLength={cart.total} />
      <div className="mt-20">
        <Routes>
          <Route path="/" element={<Shop addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} methods={methods} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
