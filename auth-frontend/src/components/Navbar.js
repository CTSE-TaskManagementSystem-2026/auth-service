import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav style={{padding:"10px", background:"#eee"}}>
      <Link to="/">Login</Link> |{" "}
      <Link to="/register">Register</Link> |{" "}
      <Link to="/profile">User Profile</Link> |{" "}
      <Link to="/admin">Admin Profile</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;