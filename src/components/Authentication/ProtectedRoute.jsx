import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
// resource: https://www.sitepoint.com/react-router-complete-guide/

const ProtectedRoute = ({ Component, ...rest }) => {
  const location = useLocation();

  return (
    <Route {...rest}>
      {sessionStorage.getItem("token") ? (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default ProtectedRoute;
