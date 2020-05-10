import React from "react";
import { FaPlus } from "react-icons/fa";
import { LoggedInUserProps } from "../components/EnhancedRoutes/ProtectedRoute";
import { Link } from "react-router-dom";

const { REACT_APP_GITHUB_APP_NAME } = process.env;

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps & LoggedInUserProps> = (props) => {
  const { avatarUrl, installationId } = props.loggedInUser!;

  const buttonProps = {
    className:
      "inline-flex hover:bg-purple-100 bg-purple-700 hover:text-purple-700 text-purple-100 text-sm duration-200 ease-in-out py-1 px-4 rounded items-center",
  };

  const buttonChildren = (
    <>
      <FaPlus className="mr-2 text-xs" />
      Create a product
    </>
  );

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-white p-3 shadow-md">
        <div className="flex items-center flex-grow mr-6">
          <span className="text-purple-700 font-semibold text-xl tracking-wide">
            GITBACK
          </span>
        </div>
        <div className="flex items-center">
          {installationId ? (
            <Link {...buttonProps} to="/create-product">
              {buttonChildren}
            </Link>
          ) : (
            <a
              {...buttonProps}
              href={`https://github.com/apps/${REACT_APP_GITHUB_APP_NAME}/installations/new`}
            >
              {buttonChildren}
            </a>
          )}
          <div className="ml-3">
            <img className="w-6 h-6 shadow-xs rounded-full" src={avatarUrl} />
          </div>
        </div>
      </nav>
      <main className="p-6">{props.children}</main>
    </div>
  );
};

export default Layout;
