import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
      setShowAddedFlush(false)
    }, 3000);

    return () => clearTimeout(timerId)
  }, [showAddedFlush]);

  useEffect(function() {
    const timerId = setTimeout(function() {
      setShowRemovedFlush("")
    }, 3000);

    return () => clearTimeout(timerId)
  }, [showRemovedFlush]);

  function addToCart(product) {
    if (cart[product.shop.id] && cart[product.shop.id].items[product.id]) {
      setCart({...cart, total: cart.total + 1, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...cart[product.shop.id].items[product.id], count: cart[product.shop.id].items[product.id].count += 1}}}});
    } else if (cart[product.shop.id]) {
      setCart({...cart, total: cart.total + 1, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...product, note: "", like: false, count: 1, selected: false}}}});
    } else {
      setCart({...cart, total: cart.total + 1, [product.shop.id]: {name: product.shop.name, items: {[product.id]: {...product, note: "", like: false, count: 1, selected: false}}}});
    }
    setShowAddedFlush(true);
  }

  function minusCount(product) {
    setCart({...cart, total: cart[product.shop.id].items[product.id].count > 1 ? cart.total - 1 : cart.total, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...product, count: cart[product.shop.id].items[product.id].count > 1 ? cart[product.shop.id].items[product.id].count - 1 : 1}}}});
  }

  function addCount(product) {
    setCart({...cart, total: cart.total + 1, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...product, count: cart[product.shop.id].items[product.id].count += 1}}}});
  }

  function changeCount(e, product) {
    const itemCount = cart[product.shop.id].items[product.id].count;
    const newItemCount = parseInt(e.target.value) > 0 ? parseInt(e.target.value) : 1;
    setCart({...cart, total: cart.total - itemCount + newItemCount, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...product, count: newItemCount}}}});
  }

  function saveNote(note, product) {
    setCart({...cart, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...product, note: note}}}});
  }

  function toggleLike(product) {
    setCart({...cart, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...product, like: !product.like}}}});
  }

  function toggleSelected(product) {
    setCart({...cart, [product.shop.id]: {...cart[product.shop.id], items: {...cart[product.shop.id].items, [product.id]: {...product, selected: !product.selected}}}});
  }

  function shopSelectAll(shopId) {
    let object = {}
    Object.keys(cart[shopId].items).map(itemId => {
      object[itemId] = {...cart[shopId].items[itemId], selected: true};
    });
    setCart({...cart, [shopId]: {...cart[shopId], items: {...object}}});
  }

  function shopDeselectAll(shopId) {
    let object = {}
    Object.keys(cart[shopId].items).map(itemId => {
      object[itemId] = {...cart[shopId].items[itemId], selected: false};
    });
    setCart({...cart, [shopId]: {...cart[shopId], items: {...object}}});
  }

  function selectAll(e) {
    let object = {...cart};
    Object.keys(cart).forEach(shopId => {
      if (shopId != "total") {
        Object.keys(cart[shopId].items).forEach(itemId => {
          object[shopId].items[itemId] = {...object[shopId].items[itemId], selected: e.target.checked};
        });
      }
    });
    setCart({...object});
  }

  function removeItem(product) {
    if (Object.keys(cart[product.shop.id].items).length == 1) {
      const newCart = Object.keys(cart).filter(cartId => cartId != product.shop.id).reduce((object, key) => {
        if (key == "total") {
          object[key] = cart[key] - product.count;
        } else {
          object[key] = cart[key];
        }
        return object;
      }, {});
      setCart({...newCart});
    } else {
      const newCart = Object.keys(cart[product.shop.id].items).filter(itemId => itemId != product.id).reduce((object, key) => {
        object[key] = cart[product.shop.id].items[key];
        return object;
      }, {});
      setCart({...cart, total: cart.total - product.count, [product.shop.id]: {...cart[product.shop.id], items: {...newCart}}});
    }
    setShowRemovedFlush("Items removed from cart!");
  }

  function deleteShopItems(id) {
    const newObject = Object.keys(cart).filter(shopId => shopId != id).reduce((object, key) => {
      object[key] = cart[key];
      return object;
    }, {});
    setCart({...newObject, total: recount(newObject)});
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
    Object.keys(cart).forEach(shopId => {
      if (shopId != "total") {
        Object.keys(cart[shopId].items).forEach(itemId => {
          total += cart[shopId].items[itemId].count;
        });
      }
    });
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
  }

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
