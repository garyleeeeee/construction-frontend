import './gridModules.styles.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Link } from 'react-router-dom';
import ModuleCover from '../moduleCover/moduleCover.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/modal.component';


const GridModules = ({toggleMenu}) => {
    const {currentUser } = useContext(UserContext);
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ modalMessage, setModalMessage ] = useState('');

    const signOut = () => {
        setIsModalVisible(true);
        setModalMessage('是否要退出登录？');
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setModalMessage(''); // Clear the error message
    };
    
    return (
        <div className='grid-modules-container'>
            <div className='top-header'>
                <h1>{currentUser.name}，欢迎回来！</h1>
                <button onClick={signOut}>
                <FontAwesomeIcon icon={faRightFromBracket} className='module-icon' />
                </button>
            </div>
            <div className='scrollable-content'>
                <div className='module-links'>
                    <Link to='/' onClick={toggleMenu} className='module-link' >
                        <ModuleCover moduleName='主页'/>
                    </Link>
                </div>
                <div className='module-links'>
                    <Link to='/personal-info' onClick={toggleMenu} className='module-link' >
                        <ModuleCover moduleName='个人信息'/>
                    </Link>
                    <Link to='/personnel-management' onClick={toggleMenu} className='module-link' >
                            <ModuleCover moduleName='人事管理'/>
                    </Link>
                </div>
                <div className='module-links'>
                    <Link to='/warehouse/search' onClick={toggleMenu} className='module-link' >
                        <ModuleCover moduleName='仓库搜索'/>
                    </Link>
                    <Link to='/warehouse/management' onClick={toggleMenu} className='module-link' >
                        <ModuleCover moduleName='仓库管理'/>
                    </Link>
                </div>
                <div className='module-links'>
                    <Link to='/cars' onClick={toggleMenu} className='module-link' >
                        <ModuleCover moduleName='车辆管理'/>
                    </Link>
                </div>
            </div>
            {isModalVisible && 
            <Modal message={modalMessage} onClose={closeModal} signOut={true}  />
        }
        </div>
        
    )
}


export default GridModules;