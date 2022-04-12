import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  Message, User } from '../App';
type Props = {
    user: User | null;
    conversation: ConversationProps
  };
  type ConversationProps = {
    id: number | undefined;
    userId: number | undefined;
    participantId: number;
    user: User | null;
    participant: User | null;
    messages: Message[];
  };
function Conversation({conversation, user }:Props) {

    const navigate = useNavigate()
    const otherPerson = conversation.user?.id === user?.id ? conversation.participant : conversation.user 
  return (
    <div>
          <li className="conversation-list" key={user?.id} >
          <div className="user-section" onClick={() => {  navigate(`/messages/${conversation.id}`)}}>
          <img
           className="profile-photo-messages"
           src={otherPerson?.profilePhoto}
           alt={otherPerson?.fullName}
          />
          <h3>{otherPerson?.fullName}</h3>
          </div>
          </li>
    </div>
  )
}

export default Conversation