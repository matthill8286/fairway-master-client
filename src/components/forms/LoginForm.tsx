import { SetStateAction, useEffect, useState } from "react";
import { styled } from "styled-components";

import { GridItem } from "../../structural/Grid";
import { Input } from "../../structural/Input";
import { Button } from "../../structural/Button";

import AuthService from "../../services/AuthenticationService";
import { LoggerObserver } from "../../services/LoggerObserver";
import { useAuthContext } from "../../services/AuthManager";
import { useLocation, useNavigate } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

interface LoginFormProps {
  authService?: AuthService;
  setAccessToken?: any;
}

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  const handleLogin = async () => {
    try {
      const { accessToken } = await authService.login(email, password);

      // Do something after successful login
      if (accessToken) {
        navigate("/dashboard");
        console.log("Logged in successfully!");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <GridItem span={12} alignItems="center" justifyContent="center">
      <h2>Login</h2>
      <Form>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setEmail(e.target.value)
          }
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
        />
        {error && <div>Error: {error}</div>}
        <Button type="button" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </GridItem>
  );
}

export default Login;
