import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GridItem } from "../../structural/Grid";
import AuthService from "../../services/AuthenticationService";

interface IForgotPasswordForm {
  authService: AuthService;
  setAccessToken?: any;
}

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: add forgot password to the AuthRepository
      // handle password reset here (e.g., show a success message)
      navigate("/login");
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
