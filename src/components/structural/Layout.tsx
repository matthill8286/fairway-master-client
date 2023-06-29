import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { GridContainer, GridItem } from "../grid";

function Layout() {
  let [historyIndex, setHistoryIndex] = React.useState(
    window.history.state?.idx
  );
  let location = useLocation();

  console.log("Layout", { historyIndex, location });

  // Expose the underlying history index in the UI for debugging
  React.useEffect(() => {
    setHistoryIndex(window.history.state?.idx);
  }, [location]);

  // Give us meaningful document titles for popping back/forward more than 1 entry
  React.useEffect(() => {
    document.title = location.pathname;
  }, [location]);

  return (
    <GridContainer
      columnSizes="repeat(12, 1fr)"
      gap="1em"
      alignItems="center"
      justifyContent="center"
    >
      <GridItem span={12} alignItems="center" justifyContent="center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/forgot-password">Forgot Password</Link>
        </li>
      </GridItem>

      <Outlet />
    </GridContainer>
  );
}

export default Layout;
