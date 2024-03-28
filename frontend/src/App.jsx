import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import FoodItems from "./pages/FoodItems";
import Restos from "./pages/Restaurant";
import Tracking from "./pages/Tracking";
import Profile from "./pages/Profile";
import Restaurant from "./pages/Restaurant";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/fooditems" element={<FoodItems />} />
      <Route path="/restos" element={<Restos />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/restaurant/*" element={<Restaurant />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
