import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom"; // Importa Link desde react-router-dom
import { URL_API_BACKEND } from "../../../utils/constants";

interface LoginProps {
  setLogin: (status: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setLogin }) => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const response = await fetch(`${URL_API_BACKEND}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.statusCode !== 200) {
        throw new Error(data.message[0]);
      }
      localStorage.setItem("userData", JSON.stringify(data));
      setLogin(true);
      navigate("/recetas");
    } catch (error: any) {
      Modal.error({
        title: "Error en el inicio de sesión",
        content: error.message,
      });
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "100px" }}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Ingrese su correo" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Ingrese su contraseña" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          <div style={{ marginTop: "10px" }}>
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
