import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

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
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/forgot-password">Forgot Password</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

export default Layout;
