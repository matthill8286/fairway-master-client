import { SetStateAction, useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";

import { GridItem } from "../../structural/Grid";
import { Input } from "../../structural/Input";
import { Button } from "../../structural/Button";

import { LoggerObserver } from "../../services/LoggerObserver";
import AuthSubject from "../../services/AuthSubject";
import { useAuthContext } from "../../contexts/AuthContext";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuthContext();

  // Create the AuthManager instance
  const authSubject = useMemo(() => new AuthSubject(), []);

  useEffect(() => {
    const loggerObserver = new LoggerObserver();

    // Register the observer
    authSubject.addObserver(loggerObserver);

    // Clean up: Unregister the observer when the component is unmounted
    return () => {
      authSubject.removeObserver(loggerObserver);
    };
  }, [authSubject]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <GridItem span={12} alignItems="center" justifyContent="center">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
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
        <Button type="submit">Login</Button>
      </Form>
    </GridItem>
  );
}

export default Login;
