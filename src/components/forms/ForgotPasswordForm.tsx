import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GridItem } from "../../structural/Grid";
import AuthService from "../../services/AuthenticationService";
import { useAuthContext } from "../../services/AuthManager";
import { LoggerObserver } from "../../services/LoggerObserver";

interface IForgotPasswordForm {
  authService: AuthService;
  setAccessToken?: any;
}

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const { authSubject } = useAuthContext();

  const authService = new AuthService(authSubject);

  const location = useLocation();

  useEffect(() => {
    const loggerObserver = new LoggerObserver();

    // Register the observer
    authSubject.addObserver(loggerObserver);

    // Clean up: Unregister the observer when the component is unmounted
    return () => {
      authSubject.removeObserver(loggerObserver);
    };
  }, [authSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authService.forgotPassword(email);
      // handle password reset here (e.g., show a success message)
      location.pathname = "/login";
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <GridItem span={12} alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Send reset link</button>
        {error && <p>{error}</p>}
      </form>
    </GridItem>
  );
}

export default ForgotPasswordForm;
