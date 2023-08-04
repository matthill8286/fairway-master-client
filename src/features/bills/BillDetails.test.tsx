import { render, screen } from '@testing-library/react';
import BillDetails from "./BillDetails";
import { Bill } from "../../types/groups/groups";

test("BillDetails should display bill amount and buttons to pay bill", () => {
  const bill: Bill = {
    id: "44",
    amount: 300,
    paidBy: { id: "1", name: "Alice", contribution: 0 },
    amountPaid: 24.66,
    users: [
      { id: "1", name: "Alice", contribution: 0 },
      { id: "2", name: "Bob", contribution: 0 },
      { id: "3", name: "Carol", contribution: 0 },
    ],
  };

  render(<BillDetails bill={bill} />);

  // Initially, bill amount should be displayed
  expect(screen.getByText("Amount: $300")).toBeInTheDocument();

  // Check if Pay in Full and Split Equally buttons are displayed
  expect(screen.getByText("Pay in Full")).toBeInTheDocument();
  expect(screen.getByText("Split Equally")).toBeInTheDocument();
});