import { render, screen } from '@testing-library/react';
import GroupMembers from "./GroupMembers";
import { Bill } from "../../types/groups/groups";

test("GroupMembers should display group members", () => {
  const bill: Bill = {
    id: "1",
    amount: 300,
    amountPaid: 26.89,
    paidBy: { id: "1", name: "Alice" },
    users: [
      { id: "1", name: "Alice", contribution: 0 },
      { id: "2", name: "Bob", contribution: 0 },
      { id: "3", name: "Carol", contribution: 0 },
    ],
  };

  render(<GroupMembers bill={bill} />);

  // Initially, GroupMembers should display "Loading..."
  expect(screen.getByText("Loading...")).toBeInTheDocument();

  // Update the bill with users
  screen.getByRole("button").click();

  // After updating, GroupMembers should display the group members' names
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
  expect(screen.getByText("Carol")).toBeInTheDocument();
});