import React from "react";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./AuthContext";

const Home = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AuthProvider>
        <TopBar />

        <Dashboard />
      </AuthProvider>
    </>
  );
};

export default Home;
