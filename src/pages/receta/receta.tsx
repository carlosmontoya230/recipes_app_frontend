import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Col, Row, Typography } from "antd";
import { ArrowLeftOutlined, YoutubeOutlined } from "@ant-design/icons";
import Loading from "../../components/Loading";
import { URL_API } from "../../utils/constants";

const { Title } = Typography;

export default function DetailReceta() {
  const { id } = useParams();
  const [recetaDetail, setRecetaDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecetaDetail = async () => {
      try {
        const response = await fetch(`${URL_API}/lookup.php?i=${id}`);
        const data = await response.json();
        setRecetaDetail(data.meals[0] || null);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
        setIsLoading(false);
      }
    };

    fetchRecetaDetail();
  }, [id]);

  const goBack = () => {
    
    window.history.back(); 
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!recetaDetail) {
    return <div>No se encontró la receta.</div>;
  }

  const {
    strMeal,
    strCategory,
    strArea,
    strInstructions,
    strMealThumb,
    strYoutube,
    strIngredient1,
    strIngredient2,
    strMeasure1,
    strMeasure2,
  } = recetaDetail;

  return (
    <div>
      <Row style={{marginTop:"1rem"}} gutter={16}>
        <Col xs={24} md={12}>
          <img
            alt={strMeal}
            src={strMealThumb}
            style={{ width: "100%", height: "auto" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <Card title={strMeal} extra={<span>{strCategory}</span>}>
            <Title level={4}>Área: {strArea}</Title>
            <Title level={5}>Ingredientes:</Title>
            <ul>
              <li>
                {strMeasure1} {strIngredient1}
              </li>
              <li>
                {strMeasure2} {strIngredient2}
              </li>
              {/* Repite para otros ingredientes */}
            </ul>
            <Title level={5}>Instrucciones:</Title>
            <p>{strInstructions}</p>
            <div style={{ marginTop: "16px" }}>
              <a
                href={strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeOutlined /> Ver video en YouTube
              </a>
            </div>
            <Button
              style={{ marginTop: "16px" }}
              icon={<ArrowLeftOutlined />}
              onClick={goBack} 
            >
              Volver
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
