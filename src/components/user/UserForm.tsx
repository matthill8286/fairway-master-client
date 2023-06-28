import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../../api/usersApi";
import { User } from "./User";

interface UserFormProps {
  user: {
    _id: string;
    username: string;
    password: string;
  } | null;
  onUserChange: () => void;
}

export function UserForm({ user, onUserChange }: UserFormProps) {
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");

  // Update form when selected user changes
  useEffect(() => {
    setUsername(user?.username || "");
    setPassword("");
  }, [user]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (user) {
      await updateUser(user._id, { username, password } as User);
    } else {
      await createUser({ username, password } as User);
    }
    onUserChange();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">{user ? "Update User" : "Create User"}</button>
    </form>
  );
}

export default UserForm;
