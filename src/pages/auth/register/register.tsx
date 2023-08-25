import React, { useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { URL_API_BACKEND } from "../../../utils/constants";


const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${URL_API_BACKEND}/sing-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data) {
        navigate("/login");
      } else {
        Modal.error({
          title: "Error en el registro",
          content: "Hubo un error al registrar el usuario.",
        });
      }
    } catch (error) {
      Modal.error({
        title: "Error en el registro",
        content: "Error al registrar el usuario.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "300px", margin: "auto", marginTop: "100px" }}>
      <Form name="register" onFinish={onFinish}>
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Ingresa su nombre" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="email"
          name="email"
          rules={[{ required: true, message: "Por favor ingresa su correo nuevo" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="password"
          name="password"
          rules={[{ required: true, message: "Ingresa su contraseña" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
          <div style={{ marginTop: "10px" }}>
            ¿Ya tienes  una cuenta? <Link to="/">Ingresa</Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;