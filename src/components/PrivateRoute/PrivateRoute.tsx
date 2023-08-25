import React from "react";
import { Route } from "react-router-dom";

const PrivateRoute = ( element:any ) => {

  return <Route element={element} />;
};

export default PrivateRoute;
