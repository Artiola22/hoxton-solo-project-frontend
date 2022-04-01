import { Link } from "react-router-dom"

function Messages(){
    fetch('http://localhost:8000/conversations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           
        })
    })
    return(
        <div>
            <div>hello</div>
        </div>
    )
}
export default Messages