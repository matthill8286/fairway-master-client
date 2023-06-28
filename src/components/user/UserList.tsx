import { deleteUser } from "../../api/usersApi";
import { User } from "./User";

interface UserListProps {
  users: {
    _id: string;
    username: string;
    password?: string;
  }[];
  onUserSelect: (user: Partial<User> | any) => void;
  onUserChange: () => void;
}

export function UserList({ users, onUserSelect, onUserChange }: UserListProps) {
  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId);
      onUserChange();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <span onClick={() => onUserSelect(user)}>{user.username}</span>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
