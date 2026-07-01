import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/shared/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

export default function App() {
  return (
    <Routes>

  <Route element={<MainLayout />}>
    <Route path="/" element={<Home />} />
  </Route>

  <Route path="/login" element={<Login />} />

  <Route path="/register" element={<Register />} />

</Routes>
  );
}