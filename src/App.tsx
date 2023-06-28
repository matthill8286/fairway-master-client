import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Context API
import { UserProvider, useUser } from "./components/user/UserContext";
import { ApiProvider } from "./api/UsersApiContext";

// Components
// import LoginForm from "./components/forms/LoginForm";
import RegisterForm from "./components/forms/RegisterForm";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/structural/Layout";

// import Login from "./components/forms/Login";
// import ScorecardForm from "./components/ScorecardForm";
// import ScorecardList from "./components/ScorecardList";

// Repositories
import { UserRepository } from "./repositories/UserRepository";
import { ScorecardRepository } from "./repositories/ScorecardRepository";

// Services
import { AuthenticationService } from "./services/AuthenticationService";
import Login from "./components/forms/Login";
import ScorecardList from "./components/scorecards/ScorecardList";
import ScorecardForm from "./components/scorecards/ScorecardForm";

// Configure your Apollo Client with the appropriate endpoint
const client = new ApolloClient({
  uri: "http://your-graphql-server.com/graphql",
  cache: new InMemoryCache(),
});

const userRepository = new UserRepository(client);
const scorecardRepository = new ScorecardRepository(client);
const authenticationService = new AuthenticationService(userRepository);

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
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            </Route>
            <Route
              path="/protected"
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
