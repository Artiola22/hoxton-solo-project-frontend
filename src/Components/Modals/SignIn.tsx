import React, { useState } from "react";
import { User } from "../../App";

export type Props = {
  setModal: (value: string) => void;
  setUser: (value: User | null) => void;
  user: User | null;
};
type Data = {
  email: string;
  password: string;
};
type Error = {
  error: string;
};

type loginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
  reset: () => void;
};
export default function SignIn({ setUser, setModal }: Props) {
  const [error, setError] = useState<Error | null>(null);

  function LogIn(data: Data) {
    fetch(`http://localhost:8000/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.user) {
          // console.log("data:", data.user)
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setModal("Welcome");
          setTimeout(() => {
            setModal("");
          }, 2000);
        } else {
          setError(data);
        }
      });
  }

  return (
    <div>
      <div
        // onClick={() => {
        //   setModal("");
        // }}
        className="modal-wrapper"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="modal-container"
        >
          <div className="modal-close">
            <button
              className="close-btn"
              onClick={() => {
                setModal("");
              }}
            >
              X
            </button>
            <div className="sign-in-form">Sign in</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const loginFormEl = e.target as loginForm;
                //@ts-ignore
                const email = e.target.email.value;
                //@ts-ignore
                const password = e.target.password.value;
                const data = {
                  email: email,
                  password: password,
                };
                LogIn(data);
              }}
            >
              <input type="email" placeholder="Email" name="email" required />

              <input
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              {}
              {error !== null ? (
                <p className="modals-error">{error?.error}</p>
              ) : null}
              <button type="submit" className="submit-btn">
                Sign in
              </button>
            </form>
            <p>
              You dont have an account?
              <span
                onClick={() => {
                  setModal("register");
                }}
             className="register">
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
