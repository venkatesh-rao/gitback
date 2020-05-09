import React from "react";
import { FaPlus } from "react-icons/fa";
import { LoggedInUserProps } from "../components/EnhancedRoutes/ProtectedRoute";
import { Link } from "react-router-dom";

const { REACT_APP_GITHUB_APP_NAME } = process.env;

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps & LoggedInUserProps> = (props) => {
  const { avatarUrl, installationId } = props.loggedInUser!;
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-white p-3 shadow-md">
        <div className="flex items-center flex-grow text-gray-800 mr-6">
          <span className="font-semibold text-xl tracking-normal">GITBACK</span>
        </div>
        <div className="flex items-center">
          {installationId ? (
            <Link
              className="inline-flex bg-gray-100 text-gray-800 text-sm duration-300 ease-in-out py-1 px-4 rounded items-center transform hover:-translate-y-px hover:shadow-md"
              to="/repos"
            >
              <FaPlus className="mr-2 text-xs" />
              Create a product
            </Link>
          ) : (
            <a
              className="inline-flex bg-gray-100 text-gray-800 text-sm duration-300 ease-in-out py-1 px-4 rounded items-center transform hover:-translate-y-px hover:shadow-md"
              href={`https://github.com/apps/${REACT_APP_GITHUB_APP_NAME}/installations/new`}
            >
              <FaPlus className="mr-2 text-xs" />
              Create a product
            </a>
          )}
          <div className="ml-4">
            <img className="w-6 h-6 rounded-full" src={avatarUrl} />
          </div>
        </div>
      </nav>
      <main className="p-6">{props.children}</main>
    </div>
  );
};

export default Layout;
