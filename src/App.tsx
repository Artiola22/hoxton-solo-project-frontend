import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./Components/Headers";
import Modals from "./Components/Modals/Modals";
import SignIn from "./Components/Modals/SignIn";
import NavBar from "./Components/NavBar";
import Intro from "./Pages/Intro";
import Messages from "./Pages/Messages";
import MyContacts from "./Pages/MyContact";
import PageNotFound from "./Pages/PageNotFound";
import Status from "./Pages/Status";

export type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePhoto?: string;
  userStatus?: string;
};
export type setModal = (value: string) => void;

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [modal, setModal] = useState("");

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:8000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) console.log(data);
          else {
            setUser(data);
          }
        });
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Modals modal={modal} setUser={setUser} setModal={setModal} user={user} />
      {/* <NavBar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Intro
              modal={modal}
              setModal={setModal}
              setUser={setUser}
              user={user}
            />
          }
        />
        {/* <Route path='/sign-in' element={<SignIn setModal={setModal} setUser={setUser}/>}/> */}
        <Route path="/messages" element={<Messages />} />
        <Route path="/my-contacts" element={<MyContacts />} />
        <Route path="/status" element={<Status />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
