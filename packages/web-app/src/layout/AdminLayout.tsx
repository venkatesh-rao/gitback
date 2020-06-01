import React from "react";
import { IoIosAdd } from "react-icons/io";
import { Link, useHistory } from "react-router-dom";
import { IUser } from "../components/EnhancedRoutes/types";
import { MenuContext } from "./PublicLayout";
import { Avatar } from "../components/User/Avatar";

const { REACT_APP_GITHUB_APP_NAME } = process.env;

interface IAdminLayoutProps {
  user: IUser;
}

const AdminLayout: React.FC<IAdminLayoutProps> = (props) => {
  const { avatarUrl, userType } = props.user;

  const history = useHistory();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const buttonProps = {
    className:
      "block rounded-sm hover:bg-white hover:bg-opacity-25 cursor-pointer",
  };

  const buttonChildren = <IoIosAdd className="text-white text-3xl" />;

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      <div className="overflow-x-hidden">
        <nav className="fixed top-0 w-screen px-4 h-12 z-20 flex flex-row items-center bg-purple-800 shadow">
          <div className="flex-1 flex items-center">
            <Link
              to="/"
              className="text-white cursor-pointer font-normal uppercase tracking-wider"
            >
              Gitback
            </Link>
          </div>
          {userType === "ProductOwner" ? (
            <Link to="/create-product" {...buttonProps}>
              <IoIosAdd className="text-white text-3xl" />
            </Link>
          ) : (
            <a
              {...buttonProps}
              href={`https://github.com/apps/${REACT_APP_GITHUB_APP_NAME}/installations/new`}
            >
              {buttonChildren}
            </a>
          )}
          <Avatar avatarUrl={avatarUrl!} history={history} />
        </nav>
        <aside
          className={`fixed top-0 left-0 bottom-0 pt-4 bg-white transition-all ease duration-300 menubar ${
            !isMenuOpen && "menu-close"
          }`}
        ></aside>
        <main
          className={`main-container ${
            !isMenuOpen && "menu-close"
          } transition-all ease duration-300 ml-auto p-4 bg-gray-100 mt-12`}
        >
          {props.children}
        </main>
      </div>
    </MenuContext.Provider>
  );
};

export default AdminLayout;
