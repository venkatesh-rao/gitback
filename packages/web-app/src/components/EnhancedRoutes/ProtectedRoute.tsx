import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Layout from "../../layout";
import { LOGGED_IN_USER_QUERY } from "./query";
import { LoggedInUserData } from "./types";

interface IProtectedRouteProps extends RouteProps {
  component: FC<any>;
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { data, error, loading } = useQuery<LoggedInUserData>(
    LOGGED_IN_USER_QUERY
  );

  return (
    <Route {...rest}>
      {(props) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error || !data || !data.me) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        }

        return (
          <Layout.AdminLayout user={data.me}>
            <Component {...props} user={data.me} />
          </Layout.AdminLayout>
        );
      }}
    </Route>
  );
};

export default ProtectedRoute;
