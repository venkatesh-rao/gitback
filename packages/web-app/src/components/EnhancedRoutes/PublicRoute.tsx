import { useQuery } from "@apollo/client";
import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { IUser, LoggedInUserData } from "../EnhancedRoutes/types";
import { LOGGED_IN_USER_QUERY } from "./query";

interface LoggedInUserProps {
  loggedInUser?: IUser;
}

interface IPublicRouteProps extends RouteProps {
  component: FC<any>;
}

const PublicRoute: FC<IPublicRouteProps> = ({
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

        if (!error && data && data.me) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    </Route>
  );
};

export default PublicRoute;
