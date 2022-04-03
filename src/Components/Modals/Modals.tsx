import { User } from "../../App";
import Register from "./Register";
import SignIn from "./SignIn";
import WelcomeUser from "./WelcomeUser";


type Props = {
  setModal: (value: string) => void;
  setUser: (value: User| null) => void;
  user: User | null;
  modal: string;

};
function Modals({setModal, modal, user, setUser}: Props) {
        switch (modal) {
            case 'sign-in':
                return <SignIn setUser={setUser} setModal={setModal}/>
             case 'welcome':
                return <WelcomeUser user={user} setModal={setModal} />
            case 'register':
                return <Register setUser={setUser} setModal={setModal} />
            
            default : 
                return null
  } 
    
 
}
export default Modals;
