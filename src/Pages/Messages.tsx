import { FormEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ConversationProps, Message, User } from "../App";
import TextMessage from "../Components/TextMessage";

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
        conversationId: Number(params.conversationId),
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
    fetch(`http://localhost:8000/messages/${Number(params.conversationId)}`)
      .then((resp) => resp.json())
      .then((data) => {
        setGetMessages(data);
      });
  }, []);
  useEffect(() => {
    if (params.conversationId) {
      fetch(`http://localhost:8000/conversations`)
        .then((resp) => resp.json())
        .then((conversation) => setConversation(conversation));
    }
  }, [params.conversationId]);

  if (conversation === null) return <h1>Loading...</h1>;

  return (
    <div className="conversation">
      <header className="panel"></header>

      <ul className="conversation-messages">
        {getMessages.map((message) => (
          <TextMessage
            message={message}
            outgoing={message.userId === user?.id}
          />
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formElement = e.target as AddMessageForm;
          const content = formElement.messageContent.value;
          createMessage(content);
          formElement.reset();
        }}
      >
        <input type="text" name="messageContent" />
      </form>
    </div>
  );
}
export default Messages;
