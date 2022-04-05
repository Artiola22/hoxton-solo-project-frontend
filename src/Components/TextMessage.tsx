import { MessageProps } from "../Pages/Message"

function TextMessage({message, outgoing}: MessageProps){
    return (
        <li className={outgoing? 'outgoing' : 'incoming'}>
            <p>{message.content}</p>
        </li>
    )
}
export default TextMessage