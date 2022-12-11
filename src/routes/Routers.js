import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Mint from "../pages/Mint";
import Wallet from "../pages/Wallet";
import Market from "../pages/Market";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mint" element={<Mint />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/market" element={<Market />} />
    </Routes>
  );
};

export default Routers;
