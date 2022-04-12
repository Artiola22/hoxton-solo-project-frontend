import { Link, useNavigate } from "react-router-dom";
import { Props, User } from "../App";

function NavBar({ setUser, setModal, user }: Props) {
  const navigate = useNavigate();

  function checkForValue(value: string) {
    if (value === "sign-out") {
      setUser(null);
      localStorage.clear();
      navigate("/");
    } else if (value === "sign-in") navigate("messages");
    else if (value === "register") navigate("messages");
    else {
      navigate("/");
    }
  }
  return (
    <div className="navbar">
      <ul className="navbar-ul" >
        {
          user === null?  <h3 className="sig-in-message">Sign in please!</h3> : (
          <div className="nav-list">
        <li className="navbar-link">
          <Link to="/conversations">Conversations</Link>
        </li>
        {/* <li>
          <Link to="/messages">Messages</Link>
        </li> */}
        <li className="navbar-link">
          <Link to="/my-contacts">My Contacts</Link>
        </li>
        </div>
        )
        }
       
        {user === null ? (
          <li onClick={() => setModal("sign-in")} className="signin-btn">Sign In</li>
        ) : null}
        {user === null ? (
          <li onClick={() => setModal("register")} className="register-btn">Register</li>
        ) : (
          <select
            onChange={(e) => {
              checkForValue(e.target.value);
            }}
          >
            <option value="">{user?.fullName}</option>
            <option value="sign-out">Sign out</option>
          </select>
        )}
      </ul>
    </div>
  );
}
export default NavBar;
