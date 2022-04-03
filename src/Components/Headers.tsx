import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

function Header() {
  const [showNavigation, setShowNavigation] = useState(false);
  return (
    <div>
      <h1
        onClick={() => {
          setShowNavigation(true);
        }}
        className="app-title"
      >
        Let's Talk
      </h1>
      <hr />
      {showNavigation ? <NavBar /> : null}
    </div>
  );
}
export default Header;
