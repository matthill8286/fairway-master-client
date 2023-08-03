import { Bill } from "../../types/groups/groups";
import { User } from "../../types/user/user";

interface IGroupMembers {
  bill: Bill;
}

function GroupMembers({ bill }: IGroupMembers) {
  if (!bill) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Group Members</h2>
      {bill.users.map((user: User) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default GroupMembers;
