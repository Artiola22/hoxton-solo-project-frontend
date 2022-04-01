import React, { useState } from "react";

import { User } from "../App";

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
      <div className="welcome-msg">Welcome to our App</div>
      <h3>Do you have an account?</h3>
      <p>
        If you have 
        <button onClick={() => setOpenModal(true)} className="signin-btn">
          {user !== null ? (
            <li
              onClick={() => {
                setModal("sign-in");
              }}
            >
              Sign In 
            </li>
          ) : null}
         
        </button>
      </p>
      <p>
        Else
        <button
          className="register-btn"
          onClick={() => {
            setModal("register");
          }}
        >
          Register
        </button>
      </p>
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
