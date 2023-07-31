import { User } from "../components/user/User";

export type UserContribution = {
    id: string;
    name: string;
    contribution: number;
};

export type Bill = {
    id: string;
    amount: number;
    amountPaid: number
    paidBy: User | null;
    users: User[];
};

// Group type representing a group of users and a bill associated with it
export type Group = {
    id: string;
    name: string;
    users: User[];
    bill: Bill;
};