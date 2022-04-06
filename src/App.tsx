import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "./Components/Headers";
import Modals from "./Components/Modals/Modals";
import SignIn from "./Components/Modals/SignIn";
import NavBar from "./Components/NavBar";
import Conversations from "./Pages/Conversations";
import Intro from "./Pages/Intro";
import Messages from "./Pages/Messages";

import MyContacts from "./Pages/MyContact";
import PageNotFound from "./Pages/PageNotFound";
import Status from "./Pages/Status";

export type Props={
  setModal: (value: string)=> void
  user : User| null
  setUser: (value: null)=> void
}

export type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  profilePhoto?: string;
  userStatus?: string;
};

export type Message={
  id: number
  userId: number
  conversationId: number
  content: string
  sendAt: string
  Conversation: []
  user: User| null
}

export type ConversationProps ={
  id: number| undefined
  userId: number| undefined
  participantId: number
  user: User| null
  participant: User| null
  messages: Message[]

}

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
      <Header setUser={setUser} user={user} setModal={setModal}/>
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
        <Route path='/conversations' element={<Conversations user={user} />}/>
        <Route path="/messages/:conversationId" element={<Messages user={user} />} />
        <Route path="/my-contacts" element={<MyContacts user={user} />} />
        <Route path="/status" element={<Status />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
