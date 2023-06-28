import React, { useState } from "react";
import { register } from "../../api/authApi";
import { useUser } from "../user/UserContext";
import advancedLocalStorage from "../../utils/local.storage";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await register(username, password);

      advancedLocalStorage.setItem("access_token", user.access_token);

      // handle user registration here (e.g., redirect to login)
      setUser(user);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Register</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default RegisterForm;
