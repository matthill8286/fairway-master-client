import { render, screen } from '@testing-library/react';
import GroupMembers from './GroupMembers';
import { BillProvider } from '../../contexts/BillContext';

test('GroupMembers should display group members', () => {
    const bill = {
        amount: 300,
        paidBy: null,
        users: [
            { id: 1, name: 'Alice', contribution: 0 },
            { id: 2, name: 'Bob', contribution: 0 },
            { id: 3, name: 'Carol', contribution: 0 },
        ],
    };

    render(
        <BillProvider>
            <GroupMembers />
        </BillProvider>
    );

    // Initially, GroupMembers should display "Loading..."
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Update the bill with users
    screen.getByRole('button').click();

    // After updating, GroupMembers should display the group members' names
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Carol')).toBeInTheDocument();
});