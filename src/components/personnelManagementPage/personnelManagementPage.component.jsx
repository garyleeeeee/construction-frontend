import './personnelManagementPage.styles.scss';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';
import { httpSignInUser, httpFetchAllUsers } from '../../hooks/requests';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modal/modal.component';



const PersonnelManagementPage = () => {
    
    const { currentUser, setCurrentUser} = useContext(UserContext);
    const [ allUsers, setAllUsers ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isModalVisible, setIsModalVisible ] = useState(false);


    useEffect( () => {
        let isMounted = true;

        async function getAllUsers () {
            const response = await httpFetchAllUsers();

            if (!isMounted) return;

            //Token Expired
            if (response.message === 'Invalid Token') {
                // Handle token expiration
                setErrorMessage('登录信息过期，请重新登录！');
                setIsModalVisible(true);
                // setCurrentUser(null);
                // localStorage.clear();
            } else 
            if (!response.success) {
                setErrorMessage(response.message); 
            } else {
                setAllUsers(response.data);
            }
        }
        getAllUsers();
        return () => {
            isMounted = false;  // Set to false when component unmounts
        };
        
     }, [currentUser, setCurrentUser]);

     const updateUser = async () => {
        console.log('Updating User');
     };

     const closeModal = () => {
        setIsModalVisible(false);
        setErrorMessage(''); // Clear the error message
    };
    

    return (
        currentUser ?
        <div className='personnel-management-page-container'>
            <h1>人事管理</h1>
            <div className="table-responsive">
                <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>姓名</th>
                        <th>职务</th>
                        <th>电话号码</th>
                        <th>薪资</th>
                        <th>访问等级</th>
                        <th>状态</th>
                        <th>修改</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user, index) => (
                        <tr key={user._id}> 
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.role}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.salary}</td>
                            <td>{user.accessLevel}</td>
                            <td>{user.status}</td>
                            <td><FontAwesomeIcon icon={faWrench} onClick={updateUser} className='update-icon' /></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {isModalVisible && 
            <Modal message={errorMessage} onClose={closeModal} signOut={true} />
        }
        </div> :
        <Navigate to='/' />
    );

}


export default PersonnelManagementPage;