import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">BOOK<span>HUB</span></Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/catalogue">Catalogue</Link>
        <Link to="/login">Login</Link>
        <Link to="/register" className="nav-register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
