import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components"
import { GridContainer, GridItem } from "../grid";

const StyledOutlet = styled('main')`
  margin: 0 auto;
  padding: 0;
  display: flex;
  max-width: 80%;
`;

function Layout() {
  let [historyIndex, setHistoryIndex] = React.useState(
    window.history.state?.idx,
  );
  let location = useLocation();

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
        <ul>
          <li>
            <Link to="/protected">Home</Link>
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
        </ul>
      </GridItem>

      <StyledOutlet>
        <Outlet />
      </StyledOutlet>

    </GridContainer>
  );
}

export default Layout;
