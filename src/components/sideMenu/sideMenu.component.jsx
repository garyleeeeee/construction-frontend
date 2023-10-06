import './sideMenu.styles.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import SignInForm from '../signInForm/signInForm.component';
import GridModules from '../gridModules/gridModules.component';

const SideMenu = (props) => {

    const { currentUser } = useContext(UserContext);

    const { active, toggleMenu } = props;

    return (
        <div className={`side-menu ${active ? 'active': ''}`} >
            {
                currentUser ? <GridModules toggleMenu={toggleMenu} /> : <SignInForm />
            }
            
        </div>
    )

}

export default SideMenu;
