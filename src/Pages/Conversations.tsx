import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message, User } from "../App";

type Props = {
  user: User | null;
};
type ConversationProps = {
  id: number | undefined;
  userId: number | undefined;
  participantId: number;
  user: User | null;
  participant: User | null;
  messages: Message[];
};
function Conversations({ user }: Props) {
  const [conversations, setConversations] = useState<ConversationProps[]>([]);
  const [currentUser, setCurrentUser] = useState<User| null>(null)
 const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    fetch("http://localhost:8000/conversations")
      .then((resp) => resp.json())
      .then((conversations) => setConversations(conversations));
  }, []);

  function logIn (user:User|null, conversationId: number| undefined){
    //set user in state as the current user
    setCurrentUser(user)
    //navigate to the main page
    navigate(`/messages/${conversationId}`)
  }
  return (
    <div className="conversation-wrapper">
      <h1 className="my-conversations">My Conversations</h1>

      <ul className="ul-conversation">
        {conversations.map((conversation) => (
          <li className="conversation-list" >
            <div className="user-section" onClick={() => {logIn(user, conversation.id)}}>
              <img
              className="profile-photo-messages"
                src={conversation.user?.profilePhoto}
                alt={conversation.user?.fullName}
              />
              <h3>{conversation.user?.fullName}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Conversations;
