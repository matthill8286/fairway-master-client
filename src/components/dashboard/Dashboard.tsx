import { useEffect, useState } from "react";
import { UserList } from "../user/UserList";
import { UserForm } from "../user/UserForm";
import { getAllUsers } from "../../api/usersApi";

export function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers as any);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <UserList
            users={users}
            onUserSelect={setSelectedUser}
            onUserChange={fetchUsers}
          />
          <UserForm user={selectedUser} onUserChange={fetchUsers} />
        </>
      )}
    </div>
  );
}

export default Dashboard;
