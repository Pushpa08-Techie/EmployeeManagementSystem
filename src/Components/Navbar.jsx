
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
 
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [action, setAction] = useState("");
  const [navbarHeight, setNavbarHeight] = useState("100vh"); // Default height
 
  const options = [
    { label: "New", value: "new" },
    { label: "Update", value: "update" },
    { label: "Delete", value: "delete" },
  ];
 
  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setAction(selectedValue);
    if (selectedValue === "new") {
      navigate("/users/new");
    }
  };
 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
 
  const shouldShowDropdown = location.pathname === "/users";
 
  // Set Navbar height based on the current route
  useEffect(() => {
    const heights = {
      "/users": "270vh",
      "/org-details": "330vh",
      "/": "100vh", // Default height
    };
    setNavbarHeight(heights[location.pathname] || "100vh");
  }, [location.pathname]);
 
  return (
    <div className="Navbar-container">
      <div
        className="Navbar d-flex flex-column justify-content-between bg-dark text-white p-4"
        style={{ height: navbarHeight }}
      >
        <div>
          <span className="fs-2">Navbar</span>
          <hr className="text-secondary mt-2" />
          <ul className="nav nav-pills flex-column">
            <li className="nav-item">
              <Link className="nav-link border-0" to="/users">
                <span className="fs-5">Users</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link border-0" to="/org-details">
                <span className="fs-7">ORGDetails</span>
              </Link>
            </li>
          </ul>
        </div>
        {shouldShowDropdown && (
          <div className="dropdown-container mt-3">
            <select
              className="form-select"
              onChange={handleSelect}
              value={action}
            >
              <option>Actions</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="position-absolute top-0 end-0 p-3">
          <DropdownButton
            id="dropdown-basic-button"
            title={<i className="bi bi-person fs-7"></i>}
            align="end"
            variant="secondary"
          >
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}
 
export default Navbar;
 
 