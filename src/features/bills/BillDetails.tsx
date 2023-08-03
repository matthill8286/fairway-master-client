import { User } from "../../types/user/user";
import { BillRepository } from "../../repositories/BillRepository";
import { Bill } from "../../types/groups/groups";

interface IBillDetails {
  billsRepository?: BillRepository;
  bills?: Bill[];
  bill: Bill;
}

function BillDetails({ bill }: IBillDetails) {
  // const { bill, setBill } = useBillContext();

  const handlePayInFull = async (id: string, user: User) => {
    // await billsRepository.payBill(id)
    // setBill({ ...bill!, paidBy: user, amountPaid: bill!.amount });
  };

  const handleSplitEqually = () => {
    const amountPerUser = bill!.amount / bill!.users.length;
    const updatedUsers = bill!.users.map((user: User) => ({
      ...user,
      contribution: amountPerUser,
    }));
    // setBill({ ...bill!, users: updatedUsers });
  };

  const handleUserContribution = (user: User, contribution: number) => {
    const updatedUsers = bill!.users.map((u) =>
      u.id === user.id ? { ...u, contribution } : u,
    );
    // setBill({ ...bill!, users: updatedUsers });
  };

  if (!bill) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bill Details</h2>
      <p>Amount: ${bill.amount}</p>
      <p>Paid by: {bill.paidBy ? bill.paidBy.name : "Not paid yet"}</p>

      {!bill.paidBy && (
        <>
          <button onClick={() => handlePayInFull(bill.id, bill.users[0])}>
            Pay in Full
          </button>
          <button onClick={handleSplitEqually}>Split Equally</button>
        </>
      )}

      {bill.paidBy && bill.paidBy.id !== bill.users[0].id && (
        <p>Your Contribution: ${bill.users[0].contribution}</p>
      )}

      {bill.paidBy && bill.paidBy.id === bill.users[0].id && (
        <input
          type="number"
          value={bill.users[0].contribution}
          onChange={(e) =>
            handleUserContribution(bill.users[0], +e.target.value)
          }
        />
      )}
    </div>
  );
};

export default BillDetails;
