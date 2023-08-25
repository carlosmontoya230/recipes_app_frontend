import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Modal } from "antd";

import "./favorite.scss";
import { URL_API_BACKEND_BASE } from "../../utils/constants";
import CardReceta from "../../components/Card";
import Loading from "../../components/Loading";

export default function Favorite() {
  const [recetasList, setRecetasList] = useState([]);
  const dataLocal = JSON.parse(localStorage.getItem("userData") as string);
  const bodySend = {
    id_user: dataLocal.user.id,
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = async () => {
    try {
      const response = await fetch(
        `${URL_API_BACKEND_BASE}/favorite/getFavorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodySend),
        }
      );
      const data = await response.json();
      if (data.statusCode !== 200) {
        throw new Error(data.message);
      }
      if (data) {
        setRecetasList(data);
      }
    } catch (error: any) {
      Modal.error({
        title: "Error al seleccionar favorito",
        content: error.message,
      });
    }
  };
  return (
    <Row justify="center" align="middle">
      <Col span={20}>
        <h1 style={{ fontSize: 35, fontWeight: "bold", textAlign: "center" }}>
          Lista de recetas favoritas
        </h1>
        {recetasList.length > 0 ? (
          <>
            <CardReceta recetasList={recetasList} />
          </>
        ) : (
          <Loading />
        )}
      </Col>
    </Row>
  );
}
