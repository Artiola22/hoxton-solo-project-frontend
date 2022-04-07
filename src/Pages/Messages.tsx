import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ConversationProps, Message, User } from "../App";
import TextMessage from "../Components/TextMessage";
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

type AddMessageForm = HTMLFormElement & {
  messageContent: HTMLInputElement;
  reset: () => void;
};

export type Props = {
  user: User | null;
};

export type MessageProps = {
  message: Message;
  outgoing: boolean;
};

function Messages({ user }: Props) {
  const [conversation, setConversation] = useState<ConversationProps | null>(
    null
  );
  const [getMessages, setGetMessages] = useState<Message[]>([]);
  //Params represent conversation id
  const params = useParams();

  function createMessage(text: string) {
    return fetch(`http://localhost:8000/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify({
        userId: user?.id,
        content: text,
        conversationId: conversation?.id,
      }),
    })
      .then((resp) => resp.json())
      .then((newMessage) => {
        const currentCopyMessage = JSON.parse(JSON.stringify(getMessages));
        currentCopyMessage.push(newMessage);
        setGetMessages(currentCopyMessage);
      });
  }

  useEffect(() => {
    fetch(`http://localhost:8000/conversation-with/${params.userId}`,{
      headers: {
        
        authorization: localStorage.token
      }
    })
      .then((resp) => resp.json())
      .then((data) => {
        setConversation(data);
      });
  }, []);
  

  if (conversation === null) return <h1>Loading...</h1>;

  return (
    <div className="conversation">
      <header className="panel"></header>

      <ul className="conversation-messages">
        <h4>{user?.fullName}</h4>
        {conversation.messages.map((message) => (
          <TextMessage
            key={message.userId}
            message={message}
            outgoing={message.userId === user?.id}
          />
        ))}
      </ul>
      <form
      className="message-form"
        onSubmit={(e) => {
          e.preventDefault();
          const formElement = e.target as AddMessageForm;
          const content = formElement.messageContent.value;
          createMessage(content);
          formElement.reset();
        }}
      >
        <input type="text" className="message-place" name="messageContent"  placeholder="Write here..."/><SendOutlinedIcon/>
      </form>
    </div>
  );
}
export default Messages;
