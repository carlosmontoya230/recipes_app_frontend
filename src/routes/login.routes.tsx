import React from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import HomeRecetas from "../pages/home";
import Receta from "../pages/receta/receta";
import Error404 from "../pages/error404/error404";
import Search from "../pages/search";
import Favorite from "../pages/favorite/favorite";
import Liked from "../pages/liked/liked";

export default function LoginRoutes() {
  return (
    <Layout style={{ padding: "10px" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/recetas" />} />
        <Route path="/recetas" element={<HomeRecetas />} />
        <Route path="/search" element={<Search />} />
        <Route path="/receta/:id" element={<Receta />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Layout>
  );
}
