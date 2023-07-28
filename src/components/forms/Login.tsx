import { FC, SetStateAction, useState } from "react";
import { styled } from "styled-components";

import { StyledGrid } from "../structural/Grid";
import { Input } from "../structural/Input";
import { Button } from "../structural/Button";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export interface LoginFormProps {
  authenticationService: any;
}

const Login: FC<LoginFormProps> = ({ authenticationService }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await authenticationService.login(username, password);
      // Redirect or perform necessary actions upon successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <StyledGrid>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </Form>
    </StyledGrid>
  );
};

export default Login;
