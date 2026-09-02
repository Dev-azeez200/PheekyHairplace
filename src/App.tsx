import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Mainlayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import Service from "./Pages/Service";
import Ourwork from "./Pages/Ourwork";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import Login from "./auth/Login";
import WigCollections from "./Pages/WigCollections";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<ProductDetails />} />
        <Route path="/services" element={<Service />} />
        <Route path="/our-work" element={<Ourwork />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/wigcollections" element={<WigCollections />} />
      </Route>
    </Routes>
  );
}

export default App;
