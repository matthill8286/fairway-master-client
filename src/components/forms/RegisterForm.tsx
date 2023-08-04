import React, { useState, SetStateAction, useEffect, useMemo } from "react";
import { GridItem } from "../../structural/Grid";
import { Input } from "../../structural/Input";
import { Button } from "../../structural/Button";
import { Form } from "../../structural/Form";
import { LoggerObserver } from "../../services/LoggerObserver";
import { useAuthContext } from "../../contexts/AuthContext";
import AuthSubject from "../../services/AuthSubject";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { register } = useAuthContext();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password });
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
