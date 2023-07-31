import { useBillContext } from '../../contexts/BillContext';

function GroupMembers() {
    const { bill } = useBillContext();

    if (!bill) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Group Members</h2>
            {bill.users.map((user) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}

export default GroupMembers;
