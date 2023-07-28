import React, { useState } from "react";
import { register } from "../../api/authApi";
import { useUser } from "../user/UserContext";
import advancedLocalStorage from "../../utils/local.storage";
import { GridItem } from "../grid";
import React, { useState, SetStateAction } from "react";

import { StyledGrid } from "../structural/Grid";
import { Input } from "../structural/Input";
import { Button } from "../structural/Button";
import { Form } from "../structural/Form";

// import { register } from "../../api/authApi";
import { useUser } from "../user/UserContext";
// import advancedLocalStorage from "../../utils/local.storage";
import { LoginFormProps } from "./Login";

function RegisterForm({ authenticationService }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setUser } = useUser();

  console.log("service", { authenticationService });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await authenticationService.registerAndCreateUser(username, password);

      // handle user registration here (e.g., redirect to login)
      setUser(user);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <GridItem span={12} alignItems="center" justifyContent="center">
      <StyledGrid>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <label>
            Username:
            <Input
              type="text"
              value={username}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <Input
              type="password"
              value={password}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
            />
          </label>
          <Button type="submit">Register</Button>
          {error && <p>{error}</p>}
        </Form>
      </StyledGrid>
    </GridItem>
  );
}

export default RegisterForm;
