import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import client from "./apollo/apollo-config";
import Home from "./views/Home";
import Login from "./views/Login";
import ProtectedRoute from "./components/EnhancedRoutes/ProtectedRoute";
import PublicRoute from "./components/EnhancedRoutes/PublicRoute";
import Install from "./views/Install";
import ListRepositories from "./views/ListRepositories";
import CreateProduct from "./views/CreateProduct";
import Product from "./views/Product";
import Menu from "./views/Menu";
import Comments from "./views/Comments";
import DefaultRoute from "./components/EnhancedRoutes/DefaultRoute";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <ProtectedRoute exact path="/install">
            <Install />
          </ProtectedRoute>
          <ProtectedRoute exact path="/repos">
            <ListRepositories />
          </ProtectedRoute>
          <ProtectedRoute exact path="/create-product">
            <CreateProduct />
          </ProtectedRoute>
          <Route exact path="/layout">
            <Menu />
          </Route>
          <DefaultRoute exact path="/:productUrl">
            <Product />
          </DefaultRoute>
          <DefaultRoute exact path="/:productUrl/:issueNumber">
            <Comments />
          </DefaultRoute>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
