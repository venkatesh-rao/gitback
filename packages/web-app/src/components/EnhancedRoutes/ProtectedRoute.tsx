import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const LOGGED_IN_USER_QUERY = gql`
  query {
    me {
      name
      username
      email
      avatarUrl
    }
  }
`;

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

const ProtectedRoute = ({ children, ...rest }: EnhancedRouterProps) => {
  const { data, error, loading } = useQuery(LOGGED_IN_USER_QUERY);

  if (!children) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return <p>Loading</p>;
  }

  if (error || !data) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest}>
      {React.cloneElement(children as any, { loggedInUser: data.me })}
    </Route>
  );
};

export default ProtectedRoute;
