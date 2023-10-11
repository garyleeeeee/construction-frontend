import './personnelManagementPage.styles.scss';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';
import { httpFetchAllUsers } from '../../hooks/requests';
import AddUserModal from '../AddUserModal/AddUserModal.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faLink, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Loading } from '../../icons/loading.svg';
import Modal from '../modal/modal.component';
import UpdateUserModal from '../UpdateUserModal/updateUserModal.component';



const PersonnelManagementPage = () => {

    const [ copiedUserId, setCopiedUserId ] = useState("");
    const { currentUser } = useContext(UserContext);
    const [ allUsers, setAllUsers ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ isAddingUser, setIsAddingUser ] = useState(false);
    const [ isUpdatingUser, setIsUpdatingUser ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ selectedUser, setSelectedUser] = useState(null);


    useEffect(() => {
        let isMounted = true;

        async function getAllUsers () {
            setIsLoading(true);
            const response = await httpFetchAllUsers();

            if (!isMounted) return;

            //Token Expired
            if (response.message === 'Invalid Token') {
                // Handle token expiration
                setIsLoading(false);
                setErrorMessage('登录信息过期，请重新登录！');
                setIsModalVisible(true);
            } else 
            if (!response.success) {
                setIsLoading(false);
                setErrorMessage(response.message); 
            } else {
                setIsLoading(false);
                setAllUsers(response.data);
            };
        };
        getAllUsers();
        return () => {
            isMounted = false;  // Set to false when component unmounts
        };
        
     }, [currentUser]);

     const closeModal = () => {
        setIsModalVisible(false);
        setErrorMessage(''); // Clear the error message
    };

    const toggleIsAddingUser = () => {
        setIsAddingUser(prevState => !prevState);
    };

    const toggleIsUpdatingUser = (user) => {
        setSelectedUser(user);
        // Pass selected user data to defaultUserInfo 
        setIsUpdatingUser(prevState => !prevState);
    };

    const handleUserAdded = (returnedUser) => {
        // When a user is successfully added, update the 'allUsers' state
        setAllUsers((prevAllUsers) => [...prevAllUsers, returnedUser]);
    };

    const handleUserUpdated = (returnedUser) => {
        const updatedUsersList = allUsers.map(user => 
            user._id === returnedUser._id ? returnedUser : user
        );
    
        setAllUsers(updatedUsersList);
    };

    const handleCopyLink = async (id) => {
        const domain = `${window.location.origin}/initial-password/${id}`;

        try {
            // TODO
            await navigator.clipboard.writeText(domain);
            setCopiedUserId(id);// Mark this user's link as copied

            // Hide the "copied" message after 2 seconds
            setTimeout(() => {
                setCopiedUserId("");
            }, 1500);
        } catch (err) {
            alert('Failed to copy the link.');
        }
    }
    

    return (
        currentUser ?
        <div className='personnel-management-page-container'>
            <h1>人事管理</h1>
            <div className='function-buttons'>
                <button onClick={toggleIsAddingUser}>新增人员</button>
            </div>
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
                        <th>修改或删除</th>
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
                            <td>{
                                user.status === 'pending'? 
                                    <div className='status-container'>
                                        <span>{user.status}</span>
                                        <FontAwesomeIcon icon={faLink} onClick={() => {handleCopyLink(user._id)}} className='link-icon' />
                                        {copiedUserId === user._id && 
                                        <div className="copied-msg">已复制</div>}
                                    </div>
                                    :
                                    user.status
                            }
                            </td>
                            <td>
                                <div className='modify-user-buttons'>
                                    <FontAwesomeIcon icon={faWrench} onClick={() => {toggleIsUpdatingUser(user)}} className='update-icon' />
                                    <FontAwesomeIcon icon={faSquareXmark} onClick={() => {console.log('Delete Button Clicked')}} className='delete-icon' />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {
                isLoading && <Loading className='loadingIcon' />
            }
            {   isModalVisible && 
            <Modal message={errorMessage} 
                onClose={closeModal} 
                signOut={true} 
            />
            }
            {
                isAddingUser && 
                    <AddUserModal 
                        setIsAddingUser={setIsAddingUser} 
                        onUserAdded={handleUserAdded}
                    />
            }
            {
                isUpdatingUser && 
                    <UpdateUserModal 
                        setIsUpdatingUser={setIsUpdatingUser} 
                        selectedUser = {selectedUser} 
                        onUserUpdated={handleUserUpdated} 
                    />
            }
        </div> :
        <Navigate to='/' />
    );

}


export default PersonnelManagementPage;