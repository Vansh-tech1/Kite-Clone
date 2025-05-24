import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";


const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { isLoggedIn, logout } = useAuth();
  const [ ,forceUpdate] = useState({});

  const navigate = useNavigate();

  const loginStatus = localStorage.getItem("isLoggedIn");

  useEffect(() => {
    
    forceUpdate();

    // Force re-render 
  }, [loginStatus]);
  useEffect(()=>{
    getUserInfo();
  },[]);

  const getUserInfo=async ()=>{
    try{

      const token=sessionStorage.getItem("authToken")
      const response=await axios.get("http://localhost:3001/getUser",
        {
          headers:{
            Authorization:`bearer ${token}`,
          },
        },
      )
    }catch(err){
      console.log(err);
    }
  }

  // const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

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

        {!isLoggedIn ? (
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
            style={{ cursor: "pointer", marginTop: "7px", color: "red" }}
          >
            logout
          </p>
        )}
      </div>
    </div>
  );
};

export default Menu;
