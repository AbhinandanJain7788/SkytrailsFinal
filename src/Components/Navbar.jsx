
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar1">
      {/* Logo */}
      <Link to="/" className="logo">
        SkyTrails
      </Link>

      {/* Menu Icon for Mobile */}
      <div className="menu-icon1" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/country">Countries</Link>
        <Link to="/blog">Blog</Link>
        {user && <button className="logout-btn" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
