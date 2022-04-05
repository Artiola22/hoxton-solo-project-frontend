import { User } from "../../App";
import Register from "./Register";
import SignIn from "./SignIn";
import Welcome from "./Welcome";



type Props = {
  setModal: (value: string) => void;
  setUser: (value: User| null) => void;
  user: User | null;
  modal: string;

};
function Modals({setModal, modal, user, setUser}: Props) {
        switch (modal) {
            case 'sign-in':
                return <SignIn user={user} setUser={setUser} setModal={setModal}/>
             case 'welcome':
                return <Welcome user={user} setModal={setModal} />
            case 'register':
                return <Register user={user} setUser={setUser} setModal={setModal} />
            
            default : 
                return null
  } 
    
 
}
export default Modals;
