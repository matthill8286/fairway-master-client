import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Context API
import { UserProvider, useUser } from "./components/user/UserContext";
import { ApiProvider } from "./contexts/UsersApiContext";

// Components
import RegisterForm from "./components/forms/RegisterForm";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import Login from "./components/forms/Login";
import ScorecardList from "./components/scorecards/ScorecardList";
import ScorecardForm from "./components/scorecards/ScorecardForm";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/structural/Layout";
import BillDetails from "./features/bills/BillDetails";
import GroupMembers from "./features/groups/GroupMembers";

// Repositories
import { UserRepository } from "./repositories/UserRepository";
import { ScorecardRepository } from "./repositories/ScorecardRepository";
import { BillRepository } from "./repositories/BillRepository";

// Services
import { AuthenticationService } from "./services/AuthenticationService";

// Utils
import advancedLocalStorage from "./utils/local.storage";


// Configure your Apollo Client with the appropriate endpoint
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

export const userRepository = new UserRepository(client);
export const scorecardRepository = new ScorecardRepository(client);
export const billsRepository = new BillRepository(client);
export const authenticationService = new AuthenticationService(userRepository, advancedLocalStorage);

function App() {
  return (
    <ApolloProvider client={client}>
      <ApiProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/login"
                element={
                  <Login authenticationService={authenticationService} />
                }
              />
              <Route path="/register" element={<RegisterForm authenticationService={authenticationService} />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm authenticationService={authenticationService} />} />
            </Route>
            <Route
              path="/bills"
              element={
                <RequireAuth>
                  <BillDetails billsRepository={billsRepository} />
                </RequireAuth>
              }
            />
            <Route
              path="/groups"
              element={
                <RequireAuth>
                  <GroupMembers />
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
                  <ScorecardList scorecardRepository={scorecardRepository} />
                </RequireAuth>
              }
            />
            <Route
              path="/add-scorecard"
              element={
                <RequireAuth>
                  <ScorecardForm scorecardRepository={scorecardRepository} />
                </RequireAuth>
              }
            />
          </Routes>
        </UserProvider>
      </ApiProvider>
    </ApolloProvider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useUser();
  let location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
