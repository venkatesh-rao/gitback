import { ApolloProvider } from "@apollo/client";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import client from "./apollo/apollo-config";
import Home from "./views/Home";
import Login from "./views/Login";
import ProtectedRoute from "./components/EnhancedRoutes/ProtectedRoute";
import PublicRoute from "./components/EnhancedRoutes/PublicRoute";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
