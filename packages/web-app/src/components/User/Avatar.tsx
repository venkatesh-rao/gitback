// import { useMutation } from "@apollo/client";
// import { LogoutData } from "./types";
// import { LOGOUT_MUTATION } from "./query";
import { History } from "history";
import React from "react";
import { useOutsideAlerter } from "../../utils";
import { AUTH_TOKEN } from "../../constants";
import { useApolloClient } from "@apollo/client";
import { LOGGED_IN_USER_QUERY } from "../EnhancedRoutes/query";

interface IAvatarProps {
  avatarUrl: string;
  history: History<History.PoorMansUnknown>;
  onLogout?: () => void;
}

export const Avatar: React.FC<IAvatarProps> = (props: IAvatarProps) => {
  const { avatarUrl, history, onLogout } = props;
  const [menuOpen, setMenuOpen] = React.useState(false);

  const client = useApolloClient();

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
      client.writeQuery({
        query: LOGGED_IN_USER_QUERY,
        data: {
          me: null,
        },
      });
    } catch (err) {}

    toggleMenu();

    if (!onLogout) {
      history.push("/");
      return;
    }

    onLogout();
  }, [toggleMenu, history, onLogout, client]);

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
