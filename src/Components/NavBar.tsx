import { Link } from "react-router-dom"


function NavBar(){
    return(
        <div className="navbar">
            <ul className="nav-list">
            <Link to='/messages'>Messages</Link>
            <Link to='/my-contacts'>My Contacts</Link>
            <Link to='/status'>Status</Link>
            </ul>
        </div>
    )
}
export default NavBar