import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Apps = () => {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://localhost:3001/getUserdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.data.success) {
        console.log(response.data.data);
        setUserData(response.data.data);
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("error fetching user details: ", err);
      console.log(err.response?.data?.message || "An error occured");
    }
  };
  return (
    <>
      <h1>{userData.username}</h1>
      <h3>{userData.email}</h3>
    </>
  );
};

export default Apps;
