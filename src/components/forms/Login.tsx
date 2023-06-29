import { FC, useState } from "react";
import GridContainer from "../grid/GridContainer";
import GridItem from "../grid/GridItem";

interface LoginFormProps {
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
    <GridItem span={12} alignItems="center" justifyContent="center">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </GridItem>
  );
};

export default Login;
