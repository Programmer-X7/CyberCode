import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <header>
      <nav>
        <ul className="navbar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/do-login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
