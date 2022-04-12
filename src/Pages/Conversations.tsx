import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Message, User } from "../App";
import Conversation from "../Components/Conversation";

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


  
  useEffect(() => {
    fetch("http://localhost:8000/my-conversations",{
      headers: {
        authorization: localStorage.token
      }
    })
      .then((resp) => resp.json())
      .then((conversations) => setConversations(conversations));
  }, []);

 
  
  return (
    <div className="conversation-wrapper">
      <h1 className="my-conversations">My Conversations</h1>

      <ul className="ul-conversation">
        {conversations.map((conversation) => (
          <Conversation user={user} conversation={conversation}/>
        
        ))}
      </ul>
    </div>
  );
}

export default Conversations;
