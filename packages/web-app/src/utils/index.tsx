// A custom hook that builds on useLocation to parse

import { useLocation } from "react-router-dom";

// the query string for you.
export function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}
