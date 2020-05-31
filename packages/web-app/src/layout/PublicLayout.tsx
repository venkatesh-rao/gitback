import React from "react";
import { IoIosAdd } from "react-icons/io";
import "react-morphing-modal/dist/ReactMorphingModal.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./menu.css";
import { IUser } from "../components/EnhancedRoutes/types";
import { Avatar } from "../components/User/Avatar";

export const MenuContext = React.createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
});

interface IPublicLayoutProps {
  user?: IUser;
  title?: string;
  titleLink?: string;
}

const PublicLayout: React.FC<IPublicLayoutProps> = ({
  children,
  user,
  title = "Gitback",
  titleLink = "/",
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const view = user?.userType === "ProductOwner" ? "admin" : "public";

  const isAdmin = view === "admin";

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const location = useLocation();
  const history = useHistory();

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      <div className="overflow-x-hidden">
        <nav className="sticky top-0 w-screen px-4 h-12 z-20 flex flex-row items-center bg-purple-800 shadow">
          <div className="flex-1 flex items-center">
            {/* <div
              className="p-1 mr-4 rounded-sm hover:bg-white hover:bg-opacity-25 cursor-pointer"
              onClick={toggleMenu}
            >
              <IoIosMenu className="text-white text-2xl" />
            </div> */}
            <Link
              to={titleLink}
              className="text-white cursor-pointer font-normal uppercase tracking-wider"
            >
              {title}
            </Link>
          </div>
          {isAdmin ? (
            <Link
              to="/create-product"
              className="block rounded-sm hover:bg-white hover:bg-opacity-25 cursor-pointer"
            >
              <IoIosAdd className="text-white text-3xl" />
            </Link>
          ) : null}
          {user ? (
            <Avatar
              avatarUrl={user.avatarUrl!}
              history={history}
              onLogout={() => {
                return;
              }}
            />
          ) : (
            <Link
              to={{
                pathname: "/login",
                state: { from: location },
              }}
              className="ml-3 block w-6 h-6 shadow-xs rounded-full leading-6 text-center bg-white text-purple-800"
            >
              A
            </Link>
          )}
        </nav>
        <aside
          className={`fixed top-0 left-0 bottom-0 pt-4 bg-white transition-all ease duration-300 menubar ${
            !isMenuOpen && "menu-close"
          }`}
        ></aside>
        <main
          className={`main-container ${
            !isMenuOpen && "menu-close"
          } transition-all ease duration-300 ml-auto p-4 bg-gray-100`}
        >
          {children}
        </main>
      </div>
    </MenuContext.Provider>
  );
};

export default PublicLayout;
