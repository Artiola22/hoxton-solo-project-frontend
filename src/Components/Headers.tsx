import { useState } from "react";
import { Props } from "./Modals/SignIn";

import NavBar from "./NavBar";



function Header({setUser, setModal, user}:Props) {
  const [showNavigation, setShowNavigation] = useState(false);
 
  return (
    <div className="header-container">
      <h1 onClick={() => {
          setShowNavigation(true);
        }}
        className="app-title"
      >
        Let's Talk
      </h1>
      <hr />
      {showNavigation ? <NavBar setModal={setModal} setUser={setUser} user={user}/> : null}
    </div>
  );
}
export default Header;
