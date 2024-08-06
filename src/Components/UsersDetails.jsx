import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = () => {
    fetch(`http://localhost:8080/api/users/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })

      .then((data) => {
        setUser(data);

        setLoading(false);
      })

      .catch((error) => {
        setError(error);

        setLoading(false);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="user-details-container">
      <table className="table user-details-table table table-hover">
        <thead className="table-active">
          <tr>
            <th scope="col">
              {user.lastName} {user.firstName} Details:{" "}
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="detail-label">ID:</td>
            <td className="detail-value">{user.id}</td>
          </tr>
          <tr>
            <td className="detail-label">First Name:</td>
            <td className="detail-value">{user.firstName}</td>
          </tr>
          <tr>
            <td className="detail-label">Last Name:</td>
            <td className="detail-value">{user.lastName}</td>
          </tr>
          <tr>
            <td className="detail-label">Email:</td>
            <td className="detail-value">{user.email}</td>
          </tr>
          <tr>
            <td className="detail-label">Phone Number:</td>
            <td className="detail-value">{user.phoneNumber}</td>
          </tr>
          <tr>
            <td className="detail-label">ID Card Issue Date:</td>
            <td className="detail-value">{user.idCardIssueDate}</td>
          </tr>
          <tr>
            <td className="detail-label">ID Card Expiry Date:</td>
            <td className="detail-value">{user.idCardExpiryDate}</td>
          </tr>
          <tr>
            <td className="detail-label">Role:</td>
            <td className="detail-value">{user.roles}</td>
          </tr>
          <tr>
            <td className="detail-label">Department:</td>
            <td className="detail-value">{user.department}</td>
          </tr>
          <tr>
            <td className="detail-label">Designation:</td>
            <td className="detail-value">{user.designation}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/users")}
      >
        Back to Users List
      </button>
    </div>
  );
};

export default UserDetails;
