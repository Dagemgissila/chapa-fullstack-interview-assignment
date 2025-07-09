import UserList from "../UserList";
import axiosClient from "../../axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoadingUsers(true);
    axiosClient
      .get("/users")
      .then((response) => setUsers(response.data))
      .catch(() => toast.error("Failed to fetch users"))
      .finally(() => setLoadingUsers(false));
  };
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4 p-6 border-b-1">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </div>

      {/* list of users  */}

      <UserList
        users={users}
        loading={loadingUsers}
        onStatusChange={fetchUsers}
      />
    </div>
  );
};

export default AdminDashboard;
