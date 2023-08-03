import React, { useState, SetStateAction, useEffect, useMemo } from "react";
import { GridItem } from "../../structural/Grid";
import { Input } from "../../structural/Input";
import { Button } from "../../structural/Button";
import { Form } from "../../structural/Form";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthenticationService";
import { useAuthContext } from "../../services/AuthManager";
import { LoggerObserver } from "../../services/LoggerObserver";

// New approach

interface RegisterFormProps {
  authService?: AuthService;
  setAccessToken?: any;
}

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { authSubject } = useAuthContext();

  const authService = new AuthService(authSubject);

  const navigate = useNavigate();

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
      const { accessToken } = await authService.register(email, password);

       // handle user registration here (e.g., redirect to login)
      if (accessToken) {
        navigate("/login");
      }
     
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <GridItem span={12} alignItems="center" justifyContent="center">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <label>
          Email:
          <Input
            type="text"
            value={email}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label>
          Password:
          <Input
            type="password"
            value={password}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setPassword(e.target.value)
            }
          />
        </label>
        <Button type="submit">Register</Button>
        {error && <p>{error}</p>}
      </Form>
    </GridItem>
  );
}

export default RegisterForm;
