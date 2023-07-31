import React, { createContext, useContext, useState } from 'react';
import { Bill } from '../types/groups';

type BillContextValue = {
    bill: Bill | null;
    setBill: React.Dispatch<React.SetStateAction<Bill | null>>;
};

const BillContext = createContext<BillContextValue>({
    bill: null,
    setBill: () => { },
});

export function useBillContext() {
    return useContext(BillContext);
}

export function BillProvider({ children }: { children: React.ReactNode }) {
    const [bill, setBill] = useState<Bill | null>(null);

    return (
        <BillContext.Provider value={{ bill, setBill }}>
            {children}
        </BillContext.Provider>
    );
}