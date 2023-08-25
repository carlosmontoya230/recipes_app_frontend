import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { URL_API } from "../utils/constants";
import CardReceta from "../components/Card/CardReceta";
import PaginationComponent from "../components/Pagination";
import Loading from "../components/Loading";

export default function HomeRecetas() {
  const [recetasList, setRecetasList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const allRecetas:any = [];

        for (let i = 0; i < alphabet.length; i++) {
          const letter = alphabet[i];
          const response = await fetch(`${URL_API}/search.php?f=${letter}`);
          const data = await response.json();
          
          if (data.meals !== null) {
            allRecetas.push(...data.meals);
          }
        }

        setRecetasList(allRecetas);
      } catch (error) {
        console.error("Error fetching recetas:", error);
      }
    })();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recetasList.slice(indexOfFirstItem, indexOfLastItem);

  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Row justify="center" align="middle">
      
      <Col span={20}>
        <h1 style={{ fontSize: 35, fontWeight: "bold", textAlign: "center" }}>
          Lista de recetas
        </h1>
        {recetasList.length > 0 ? (
          <>
            <CardReceta recetasList={currentItems} />
            <PaginationComponent
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={recetasList.length}
              onChangePage={onChangePage}
            />
          </>
        ) : (
          <Loading />
        )}
      </Col>
    </Row>
  );
}