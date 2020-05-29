import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { LOGGED_IN_USER_QUERY } from "./query";
import { LoggedInUserProps, LoggedInUserData } from "./types";
import MenuLayout from "../../views/Menu/Menu";

interface EnhancedRouterProps extends RouteProps {
  component?:
    | React.ComponentType<RouteComponentProps<any> & LoggedInUserProps>
    | React.ComponentType<any & LoggedInUserProps>;
}

export interface IHeaderData {
  title?: string;
  link?: string;
}

const DefaultRoute = ({ children, ...rest }: EnhancedRouterProps) => {
  const [header, setHeader] = React.useState<IHeaderData>({
    title: "Gitback",
    link: "/",
  });

  const { data, error, loading } = useQuery<LoggedInUserData>(
    LOGGED_IN_USER_QUERY
  );

  if (!children) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest}>
      <MenuLayout
        title={header.title}
        titleLink={header.link}
        view={
          !loading && !error && data?.me.installationId ? "admin" : "public"
        }
      >
        {React.cloneElement(children as any, {
          setHeader,
          loggedInUser: data?.me,
        })}
      </MenuLayout>
    </Route>
  );
};

export default DefaultRoute;
