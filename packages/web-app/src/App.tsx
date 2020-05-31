import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import client from "./apollo/apollo-config";
import Home from "./views/Home";
import Login from "./views/Login";
import ProtectedRoute from "./components/EnhancedRoutes/ProtectedRoute";
import PublicRoute from "./components/EnhancedRoutes/PublicRoute";
import Install from "./views/Install";
import ListRepositories from "./views/ListRepositories";
import CreateProduct from "./views/CreateProduct";
import Product from "./views/Product";
import Comments from "./views/Comments";
import DefaultRoute from "./components/EnhancedRoutes/DefaultRoute";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <PublicRoute exact path="/login" component={Login} />
          <ProtectedRoute exact path="/install" component={Install} />
          <ProtectedRoute exact path="/repos" component={ListRepositories} />
          <ProtectedRoute
            exact
            path="/create-product"
            component={CreateProduct}
          />
          <DefaultRoute exact path="/:productUrl" component={Product} />
          <DefaultRoute
            exact
            path="/:productUrl/:issueNumber"
            component={Comments}
          />
          <ProtectedRoute exact path="/" component={Home} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
