import { useEffect, useState } from "react"
import { ConversationProps, User } from "../App"
import { MessageProps } from "../Pages/Messages"



type Message={
    id: number
    userId: number
    conversationId: number
    content: string
    sendAt: string
    conversation: ConversationProps[]
    user: User
}
function TextMessage({message, outgoing}: MessageProps){
    // const [users, setUsers] = useState<User[]| null>([])
    // useEffect(() => {
    //     fetch('http://localhost:8000/users').then(resp=> resp.json())
    //     .then(users=> setUsers(users))
    // }, [])
    
    
    
    return (
        <div className="text-message">
          <span>{message.sendAt}</span>
            <div className={outgoing? 'outgoing' : 'incoming'}>
                <div className="outgoing-class"></div>
                <div className="incoming-class"></div>
          <img className="user-image-message" src={message.user?.profilePhoto} alt="" />
          <div>{message.content} </div>
 
          </div>
          {/* {
              users?.map(user => 
              <li className={outgoing? 'outgoing' : 'incoming'}>
            <img src={user.profilePhoto} alt={user.fullName} className="user-image-message" />

            <p className="message-content">{message.content}</p>
            <span>{message.sendAt}</span>
        </li>
            )
        } */}
              
        </div>
    )
}
export default TextMessage