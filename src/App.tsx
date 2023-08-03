import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Components
import RegisterForm from "./components/forms/RegisterForm";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import Login from "./components/forms/LoginForm";
import ScorecardList from "./components/scorecards/ScorecardList";
import ScorecardForm from "./components/scorecards/ScorecardForm";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./structural/Layout";
// import BillDetails from "./features/bills/BillDetails";
// import GroupMembers from "./features/groups/GroupMembers";

import { AuthProvider } from "./services/AuthManager";
import AuthSubject from "./services/AuthSubject";
import { DataManagerProvider } from "./services/DatamanagerProvider";

// Utils
function App() {
  // Create the AuthManager instance
  // const authSubject = new AuthSubject();

  return (
    <AuthProvider>
      {/* <DataManagerProvider authSubject={new AuthSubject()}> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        </Route>
        <Route
          path="/bills"
          element={
            <RequireAuth>
              {/* <BillDetails /> */}
              <p>Hello</p>
            </RequireAuth>
          }
        />
        <Route
          path="/groups"
          element={
            <RequireAuth>
              {/* <GroupMembers /> */}
              <p>Hello</p>
            </RequireAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/scorecards"
          element={
            <RequireAuth>
              <ScorecardList />
            </RequireAuth>
          }
        />
        <Route
          path="/add-scorecard"
          element={
            <RequireAuth>
              <ScorecardForm />
            </RequireAuth>
          }
        />
      </Routes>
      {/* </DataManagerProvider> */}
    </AuthProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  // if (!authManager.getAccessToken) {
  //   // Redirect them to the /login page, but save the current location they were
  //   // trying to go to when they were redirected. This allows us to send them
  //   // along to that page after they login, which is a nicer user experience
  //   // than dropping them off on the home page.
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return children;
}

export default App;
