import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";

const RouterLogOut = lazy(() => import("./routes/logout.routes"));
const RouterLogin = lazy(() => import("./routes/login.routes"));

export default function App() {
  const { Content } = Layout;
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    userData && setIsAuthenticated(true);
  }, [])

  const setLogin = useCallback((status: boolean) => {
    setIsAuthenticated(status);
  }, []);

  return (
    <Layout style={{ padding: "10px" }}>
      <Router>
        {isAuthenticated && <Header setLogin={setLogin} />}
        <Content>
          {isAuthenticated ? (
            <Suspense fallback={<div>Loading...</div>}>
              <RouterLogin />
            </Suspense>
          ) : (
            <Suspense fallback={<></>}>
              <RouterLogOut setLogin={setLogin} />
            </Suspense>
          )}
        </Content>
      </Router>
    </Layout>
  );
}
