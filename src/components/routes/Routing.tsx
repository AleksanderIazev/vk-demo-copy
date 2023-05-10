import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./list";
import Layout from "../layout/Layout";
import { useAuth } from "../providers/useAuth";
import Auth from "../pages/auth/Auth";

const Routing: FC = () => {
  const{user} = useAuth()
  return (
    <Router>
      <Routes>
        {routes.map((route) => {
          // if (route.auth && !user) {
          //   return false;
          // }
          
          return (
            <Route
              path={route.path}
              element={
                <Layout>
                 {route.auth && !user ? (<Auth/>) : (<route.element/>)}
                </Layout>
              }
              key={`route ${route.path}`}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default Routing;




