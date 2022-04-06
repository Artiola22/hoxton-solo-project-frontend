import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConversationProps, User } from "../App";

type Props = {
  user: User | null;
};
// function logIn (user:User|null){
//     setCurrentUser(user)
//      navigate('/messages/:conversationId')
// }

function MyContacts({user}:Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [openMessages, setOpenMessages] = useState<User| null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((resp) => resp.json())
      .then((users) => setUsers(users));
  }, []);

  function fromContactToMessages({user}:Props) {
    setOpenMessages(user);
    navigate('/messages')
  }
  return (
    <div className="contact-wrapper">
      <h3 className="my-contact">My Contact</h3>
      <ul className="ul-contact">
        {users.map((user: User) => (
          <li className="list-contact" onClick={()=> {fromContactToMessages({user})}}>
            <img
              className="image-contact"
              src={user?.profilePhoto}
              alt={user.fullName}
            />
            <div className="extra-class-list">
              <h5 className="fullname-contact">{user?.fullName}</h5>
              <h6 className="email-contact">{user?.email}</h6>

              <span className="span-phonenumber">
                <em>{user?.phoneNumber}</em>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MyContacts;
