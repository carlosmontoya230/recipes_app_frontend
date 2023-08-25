import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import CardReceta from "../../components/Card/CardReceta";
import Loading from "../../components/Loading";
import { URL_API } from "../../utils/constants";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;
    setIsLoading(true);
    try {
      const response = await fetch(`${URL_API}/search.php?s=${searchTerm}`);
      const data = await response.json();

      setSearchResults(data.meals || []);
    } catch (error) {
      console.error("Error searching for recipes:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Row justify="center" style={{ marginBottom: "24px" }}>
        <Col span={20} style={{ marginTop: "1rem" }}>
          <Input
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onPressEnter={handleSearch}
            suffix={
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              />
            }
          />
        </Col>
      </Row>
      <Row justify="center">
        <Col span={20} style={{ marginBottom: "1rem" }}>
          {isLoading ? (
            <Loading />
          ) : (
            <CardReceta recetasList={searchResults} />
          )}
        </Col>
      </Row>
    </div>
  );
}
