import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOGGED_IN_USER_QUERY } from "./query";

interface IUser {
  name?: string;
  username: string;
  avatarUrl?: string;
  publicEmail?: string;
  userType: string;
}

interface LoggedInUserProps {
  loggedInUser?: IUser;
}

interface EnhancedRouterProps extends RouteProps {
  component?:
    | React.ComponentType<RouteComponentProps<any> & LoggedInUserProps>
    | React.ComponentType<any & LoggedInUserProps>;
}

const PublicRoute = ({ children, ...rest }: EnhancedRouterProps) => {
  const { data, error, loading } = useQuery(LOGGED_IN_USER_QUERY);

  if (!children) {
    return <Redirect to="/" />;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (!error && data && data.me) {
    return <Redirect to="/" />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default PublicRoute;
