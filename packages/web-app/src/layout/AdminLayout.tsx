import React from "react";
import { FaPlus } from "react-icons/fa";
import { LoggedInUserProps } from "../components/EnhancedRoutes/types";
import { Link, useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
// import { useMutation } from "@apollo/client";
// import { LogoutData } from "./types";
// import { LOGOUT_MUTATION } from "./query";
import { History } from "history";
import { AUTH_TOKEN } from "../constants";

const { REACT_APP_GITHUB_APP_NAME } = process.env;

interface IAdminLayoutProps {}

const AdminLayout: React.FC<IAdminLayoutProps & LoggedInUserProps> = (props) => {
  const { avatarUrl, installationId } = props.loggedInUser!;

  const history = useHistory();

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
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between flex-wrap bg-white p-3 shadow-md z-10">
        <div className="flex items-center flex-grow mr-6">
          <Link
            to="/"
            className="text-purple-700 font-semibold text-xl tracking-wide"
          >
            GITBACK
          </Link>
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
          <Avatar avatarUrl={avatarUrl!} history={history} />
        </div>
      </nav>
      <main className="p-6 bg-purple-100 flex-1 flex-grow">
        {props.children}
      </main>
    </div>
  );
};

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(this: Document, ev: MouseEvent) {
      if (
        ev.target instanceof HTMLElement &&
        !ReactDOM.findDOMNode(ref.current)!.contains(ev.target)
      )
        if (ref.current && !ref.current.contains(ev.target)) {
          callback();
        }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

interface IAvatarProps {
  avatarUrl: string;
  history: History<History.PoorMansUnknown>;
}

const Avatar: React.FC<IAvatarProps> = (props: IAvatarProps) => {
  const { avatarUrl, history } = props;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const menuOpenRef = React.useRef(menuOpen);

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, () => {
    if (menuOpenRef.current) {
      setMenuOpen(false);
      menuOpenRef.current = false;
    }
  });

  const toggleMenu = React.useCallback(() => {
    setMenuOpen((prev) => !prev);
    menuOpenRef.current = !menuOpenRef.current;
  }, []);

  // const [logout, { loading: logoutLoading }] = useMutation<LogoutData>(
  //   LOGOUT_MUTATION
  // );

  const handleLogout = React.useCallback(() => {
    // if (logoutLoading) return;

    try {
      // await logout();
      localStorage.removeItem(AUTH_TOKEN);
    } catch (err) {}

    toggleMenu();

    history.push("/");
  }, [toggleMenu, history]);

  return (
    <div className="ml-3 relative" ref={wrapperRef}>
      <img
        alt="Github user"
        role="button"
        className="w-6 h-6 shadow-xs rounded-full"
        src={avatarUrl}
        onClick={toggleMenu}
      />
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } absolute right-0 py-2 w-40 rounded shadow-md bg-white`}
      >
        <ul>
          <li
            role="button"
            onClick={handleLogout}
            className="text-red-500 py-1 px-2 text-center cursor-pointer bg-white hover:bg-red-100"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
