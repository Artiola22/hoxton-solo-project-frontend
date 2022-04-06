import React, { useState } from "react";

import { User } from "../App";
import Modals from "../Components/Modals/Modals";

type Props = {
  setModal: (value: string) => void;
  user: User | null;
  setUser: (value: User | null) => void;
  modal: string;
};
export default function Intro({ user, setModal, setUser, modal }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <div className="main">
        <div className="welcome-msg">Welcome to our App</div>
      </div>

      <div className="last-wrapper">
        <img src="/src/assets/Communication.jpg" alt="Communication" className="background-image" />
        <h3 className="intro-h3">Do you have an account?</h3>
        <button onClick={() => setOpenModal(true)} className="signin-btn">
          {user === null ? (
            <li
              onClick={() => {
                setModal("sign-in");
              }}
            >
              Sign In
            </li>
          ) : null}
        </button>
        |
        
        <button
          className="register-btn"
          onClick={() => {
            setModal("register");
          }}
        >
          Register
        </button>
      </div>
      {/* {openModal ? (
        <Modals
          setModal={setModal}
          setUser={setUser}
          user={user}
          modal={modal}
        />
      ) : null} */}
    </div>
  );
}
