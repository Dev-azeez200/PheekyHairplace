import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/Mainlayout";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import Service from "./Pages/Service";
import Ourwork from "./Pages/Ourwork";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/services" element={<Service />} />
        <Route path="/our-work" element={<Ourwork />} />
      </Route>
    </Routes>
  );
}

export default App;
