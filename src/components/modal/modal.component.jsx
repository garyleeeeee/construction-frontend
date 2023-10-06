import './modal.styles.scss'
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';


const Modal = ({ message, onClose, signOut }) => {
    const {setCurrentUser} = useContext(UserContext);

    const handleSignOut = () => {
        setCurrentUser(null);
        localStorage.clear()
    };
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className='option-buttons'>
                {
                    message === '是否要退出登录？' ? <button onClick={onClose}>返回</button> : null
                }
                {
                    signOut? 
                    <button onClick={handleSignOut} className='exit-button'>退出</button>
                    :
                    <button onClick={onClose}>关闭</button>

                }
                </div>
                
            </div>
        </div>
    );
};


export default Modal;