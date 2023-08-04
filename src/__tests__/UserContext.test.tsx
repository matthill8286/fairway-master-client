/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// src/__tests__/UserContext.test.tsx
import React from "react";
import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { UserProvider, useUserContext } from "../contexts/UserContext";
import { User } from "../models/User";

const mockUsers: User[] = [
  { id: 1, name: "John Doe", email: "john.doe", password: "password1" },
  { id: 2, name: "Jane Smith", email: "jane.smith", password: "password2" },
];

const MockConsumerComponent: React.FC = () => {
  const { data, create, update, remove } = useUserContext();

  return (
    <>
      <div data-testid="users-list">
        {data.map((user) => (
          <div key={user.id}>
            {user.name} - {user.email}
          </div>
        ))}
      </div>
      <button
        data-testid="create-user-btn"
        onClick={() =>
          create({
            name: "New User",
            email: "new.user",
            password: "password",
          })
        }
      >
        Create User
      </button>
      <button
        data-testid="update-user-btn"
        onClick={() => update(1, { name: "Updated User" })}
      >
        Update User
      </button>
      <button data-testid="remove-user-btn" onClick={() => remove(1)}>
        Remove User
      </button>
    </>
  );
};

test("UserContext CRUD functionality", async () => {
  render(
    <UserProvider>
      <MockConsumerComponent />
    </UserProvider>,
  );

  // Check initial user data
  await waitFor(() => {
    expect(screen.getByTestId("users-list").children).toHaveLength(2);
    expect(screen.getByText("John Doe - john.doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith - jane.smith")).toBeInTheDocument();
  });

  // Create a new user
  fireEvent.click(screen.getByTestId("create-user-btn"));
  await waitFor(() => {
    expect(screen.getByTestId("users-list").children).toHaveLength(3);
    expect(screen.getByText("New User - new.user")).toBeInTheDocument();
  });

  // Update user
  fireEvent.click(screen.getByTestId("update-user-btn"));
  await waitFor(() => {
    expect(screen.getByText("Updated User - john.doe")).toBeInTheDocument();
  });

  // Remove user
  fireEvent.click(screen.getByTestId("remove-user-btn"));
  await waitFor(() => {
    expect(screen.getByTestId("users-list").children).toHaveLength(2);
    expect(
      screen.queryByText("Updated User - john.doe"),
    ).not.toBeInTheDocument();
  });
});
