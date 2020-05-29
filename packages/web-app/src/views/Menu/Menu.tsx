import React from "react";
import { IoIosAdd, IoIosMenu } from "react-icons/io";
import "react-morphing-modal/dist/ReactMorphingModal.css";
import { Link } from "react-router-dom";
import "./menu.css";

export const MenuContext = React.createContext({
  isMenuOpen: false,
  toggleMenu: () => {},
});

interface IMenuLayoutProps {
  view?: "admin" | "public";
  title?: string;
  titleLink?: string;
}

const MenuLayout: React.FC<IMenuLayoutProps> = ({
  children,
  view = "public",
  title = "Gitback",
  titleLink = "/",
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const isAdmin = view === "admin";

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      <div>
        <nav className="sticky top-0 w-screen px-4 h-12 z-20 flex flex-row items-center bg-purple-800 shadow">
          <div className="flex-1 flex items-center">
            <div
              className="p-1 rounded-sm hover:bg-white hover:bg-opacity-25 cursor-pointer"
              onClick={toggleMenu}
            >
              <IoIosMenu className="text-white text-2xl" />
            </div>
            <Link
              to={titleLink}
              className="text-white ml-4 cursor-pointer font-hairline uppercase tracking-wider"
            >
              {title}
            </Link>
          </div>
          {isAdmin ? (
            <div className="rounded-sm hover:bg-white hover:bg-opacity-25 cursor-pointer">
              <IoIosAdd className="text-white text-3xl" />
            </div>
          ) : null}
        </nav>
        <aside
          className={`fixed top-0 left-0 bottom-0 pt-4 bg-white transition-all ease duration-300 menubar ${
            !isMenuOpen && "menu-close"
          }`}
        ></aside>
        <main
          className={`main-container ${
            !isMenuOpen && "menu-close"
          } transition-all ease duration-300 ml-auto p-4 bg-purple-100`}
        >
          {children}
        </main>
      </div>
    </MenuContext.Provider>
  );
};

export default MenuLayout;
