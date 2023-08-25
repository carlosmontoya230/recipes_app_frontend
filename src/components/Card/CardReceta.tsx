import React, { useState } from "react";
import { Col, Row, Button, Rate, Modal } from "antd";
import { Link } from "react-router-dom";
import { LikeOutlined, EyeOutlined } from "@ant-design/icons";
import { Recipe } from "../../interfaces/RecipeInterface";
import { URL_API_BACKEND_BASE } from "../../utils/constants";

export default function CardReceta(props: { recetasList: Recipe[] }) {
  const { recetasList } = props;
  const [ , setHovered] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(0);
  };

  const likedReceta = async (id: string) => {
    const dataLocal = JSON.parse(localStorage.getItem("userData") as string);
    const bodySend = {
      id_receta: id,
      id_user: dataLocal.user.id,
    };
    try {
      const response = await fetch(
        `${URL_API_BACKEND_BASE}/likeds/postLikeds`,
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
        Modal.success({
          title: "Exitoso!",
          content: "Se agrego esta receta en tus me gustas",
        });
      }
    } catch (error: any) {
      Modal.error({
        title: "Error al seleccionar favorito",
        content: error.message,
      });
    }
  };

  const ratioStars = async (value: number, id: string) => {
    const dataLocal = JSON.parse(localStorage.getItem("userData") as string);
    const bodySend = {
      id_user:  dataLocal.user.id,
      id_receta:id,
      value: value
    };
    try {
      const response = await fetch(
        `${URL_API_BACKEND_BASE}/favorites/postFavorites`,
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
        throw new Error(data.message[0]);
      }
      if (data) {
        Modal.success({
          title: "Exitoso!",
          content: "Se agrego esta receta en tus favoritos",
        });
      }
    } catch (error: any) {
      Modal.error({
        title: "Error al seleccionar favorito",
        content: error.message,
      });
    }
  };

  return (
    <Row gutter={[24, 24]}>
      {recetasList.map((receta: Recipe, index) => (
        <Col key={receta.idMeal} xs={24} sm={12} md={8} lg={6}>
          <div
            className="card"
            style={{
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <Link to={`/receta/${receta.idMeal}`}>
              <div
                className="image-container"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={receta.strMealThumb}
                  alt={receta.strMeal}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />

                <div className="hover-overlay">
                  <Button
                    block
                    className="ver-receta-button"
                    icon={<EyeOutlined />}
                  ></Button>
                </div>
              </div>
            </Link>
            <h3 style={{ marginTop: "8px" }}>{receta.strMeal}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "8px",
              }}
            >
              <Button
                onClick={() => likedReceta(receta.idMeal)}
                icon={<LikeOutlined style={{ width: "15px" }} />}
                size="small"
              ></Button>
              <Rate
                onChange={(value) => {
                  ratioStars(value, receta.idMeal);
                }}
                allowHalf
                defaultValue={4.5}
                count={5}
              />
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}
