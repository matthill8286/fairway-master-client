import React, { useState } from "react";
import { forgotPassword } from "../../api/authApi";
import { useLocation } from "react-router-dom";
import { GridItem } from "../grid";
import { LoginFormProps } from "./Login";

function ForgotPasswordForm({ authenticationService }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();

  console.log("service", { authenticationService });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
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
