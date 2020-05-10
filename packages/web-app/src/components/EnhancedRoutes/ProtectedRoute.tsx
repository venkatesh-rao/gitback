import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOGGED_IN_USER_QUERY } from "./query";
import Layout from "../../layout";

interface IUser {
  name?: string;
  username: string;
  avatarUrl?: string;
  publicEmail?: string;
  userType: string;
  installationId?: number;
}

export interface LoggedInUserProps {
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

  if (error || (!data && !data.me)) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest}>
      <Layout loggedInUser={data.me}>
        {React.cloneElement(children as any, { loggedInUser: data.me })}
      </Layout>
    </Route>
  );
};

export default ProtectedRoute;
