import React from "react";
import { AuthProvider } from "./AuthContext";

import Menu from "./Menu";

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-poƒints">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>
    <AuthProvider>
      <Menu />

    </AuthProvider>
      
    </div>
  );
};

export default TopBar;
