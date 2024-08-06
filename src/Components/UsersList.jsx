import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleIdClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!Array.isArray(users) || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div className="container-fluid userlist-container" style={{ marginLeft: '40px' }}>
      <h3>Users List</h3>
      <table className="table table-hover">
        <thead className="table-active">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">IdCardIssueDate</th>
            <th scope="col">IdCardExpiryDate</th>
            <th scope="col">Role</th>
            <th scope="col">Department</th>
            <th scope="col">Designation</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <a href={`#${user.id}`} onClick={() => handleIdClick(user.id)}>
                  {user.id}
                </a>
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.idCardIssueDate}</td>
              <td>{user.idCardExpiryDate}</td>
              <td>{user.roles}</td>
              <td>{user.department}</td>
              <td>{user.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
