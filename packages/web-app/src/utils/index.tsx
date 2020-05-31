import React from "react";
import ReactDOM from "react-dom";
// A custom hook that builds on useLocation to parse

import { useLocation } from "react-router-dom";

// the query string for you.
export function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(
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
