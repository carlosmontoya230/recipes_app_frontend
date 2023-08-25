import React from "react";
import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register/register";

interface LoginProps {
  setLogin: (status: boolean) => void;
}

export default function LogoutRoutes({ setLogin }: LoginProps) {
  return (
    <Layout style={{ padding: "10px" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setLogin={setLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout>
  );
}
