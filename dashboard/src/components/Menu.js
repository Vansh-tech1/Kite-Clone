import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { isLoggedIn, logout } = useAuth();
  const [, forceUpdate] = useState({});

  const navigate = useNavigate();
  console.log(`isloggedin is ${isLoggedIn}`);

  const loginStatus = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    // console.log(isLoggedIn);
    forceUpdate();
    fetchUserDetails();
    // console.log("useeffect called");

    // Force re-render
  }, [loginStatus]);



  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    logout();
    navigate("/"); // Or use navigate("/") if using React Router
  };

  // const handleProfileClick = (index) => {
  //   setIsProfileDropdownOpen(!isProfileDropdownOpen);
  // };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const [userData, setUserData] = useState("");
  const [userName, setUsername] = useState("");
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3001/getUserdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUserData(response.data.data);
        setUsername(response.data.data.username);
      } else {
        console.log(response.data.message || "Failed to fetch user details");
        console.log("issue");
      }
    } catch (err) {
      console.error("error fetching user details: ", err);
      console.log(err.response?.data?.message || "An error occured");
    }
  };

  // console.log(loginStatus);
  // console.log(isLoggedIn);

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        {!loginStatus ? (
          <>
            <Link
              to="/login"
              style={{ textDecoration: "none", marginTop: "7px" }}
            >
              <p>Login</p>
            </Link>
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                marginTop: "7px",
                marginLeft: "1.5rem",
              }}
            >
              <p>Signup</p>
            </Link>
          </>
        ) : (
          <p
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              marginTop: "7px",
              border: "2px solid ",
              borderRadius: "1rem",
              padding: "0.31rem",
              width: "8rem",
            }}
          >
            {userName} &nbsp;
            <i class="fa-solid fa-right-from-bracket"></i>
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
