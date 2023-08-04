import { Navigate, Route, Routes, useLocation } from "react-router-dom";

// Components
import RegisterForm from "./components/forms/RegisterForm";
import ForgotPasswordForm from "./components/forms/ForgotPasswordForm";
import Login from "./components/forms/LoginForm";
import ScorecardList from "./components/scorecards/ScorecardList";
import ScorecardForm from "./components/scorecards/ScorecardForm";
import Dashboard from "./features/dashboard/Dashboard";
import Layout from "./structural/Layout";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { User } from "./models/User";
import AuthSubject from "./services/AuthSubject";

// Utils
function App() {
  // Create the AuthManager instance
  const authSubject = new AuthSubject();

  console.log(authSubject);

  return (
    <AuthProvider<User>
      credentialMapper={(user) => ({
        email: user.email,
        password: user.password,
      })}
      userDataMapper={(user) => ({
        email: user.email,
        password: user.password,
      })}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />

          {/* Features */}
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <p>Hello</p>
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups"
            element={
              <ProtectedRoute>
                <p>Hello</p>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scorecards"
            element={
              <ProtectedRoute>
                <ScorecardList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-scorecard"
            element={
              <ProtectedRoute>
                <ScorecardForm />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};

const NoMatch = () => {
  return <p>There's nothing here: 404!</p>;
};

export default App;
