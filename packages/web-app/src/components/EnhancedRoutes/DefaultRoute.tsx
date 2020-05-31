import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { Route, RouteProps } from "react-router-dom";
import { LOGGED_IN_USER_QUERY } from "./query";
import { LoggedInUserData } from "./types";

interface IDefaultRouteProps extends RouteProps {
  component: FC<any>;
}

const DefaultRoute: FC<IDefaultRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { data, error, loading } = useQuery<LoggedInUserData>(
    LOGGED_IN_USER_QUERY
  );

  let authProps = {};

  if (loading) return null;

  if (!error && data && data.me) {
    authProps = {
      user: data.me,
    };
  }

  return (
    <Route {...rest}>
      {(props) => <Component {...props} {...authProps} />}
    </Route>
  );
};

export default DefaultRoute;
