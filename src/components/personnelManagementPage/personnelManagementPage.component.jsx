import './personnelManagementPage.styles.scss';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';
import { httpFetchAllUsers, httpDeleteUser } from '../../hooks/requests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faLink, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Loading } from '../../icons/loading.svg';
import Modal from '../modal/modal.component';
import AlertModal from '../alertModal/alertModal.component';
import UpdateUserModal from '../updateUserModal/updateUserModal.component';
import AddUserModal from '../addUserModal/addUserModal.component';


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
    const [ isDeletingUser, setIsDeletingUser ] = useState(false);


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

    // Add a new User
    const toggleIsAddingUser = () => {
        setIsAddingUser(prevState => !prevState);
    };

    // User added callback function
    const handleUserAdded = (returnedUser) => {
        // When a user is successfully added, update the 'allUsers' state
        setAllUsers((prevAllUsers) => [...prevAllUsers, returnedUser]);
    };

    // Update a user
    const toggleIsUpdatingUser = (user) => {
        setSelectedUser(user);
        // Pass selected user data to defaultUserInfo 
        setIsUpdatingUser(prevState => !prevState);
    };

    // User updated callback function
    const handleUserUpdated = (returnedUser) => {
        const updatedUsersList = allUsers.map(user => 
            user._id === returnedUser._id ? returnedUser : user
        );
    
        setAllUsers(updatedUsersList);
        setSelectedUser(null);
    };

    // Delete button pressed
    const toggleIsDeletingUser = (user) => {
        setSelectedUser(user);
        setIsDeletingUser(prevState => !prevState);
    };

    // Execute user deletion
    const handleUserDeletion = async () => {
        console.log('deleting user:')
        console.log(selectedUser);
        try {
            setIsLoading(true);
            if (!selectedUser) {
                setIsLoading(false);
                throw new Error('用户出错，请重试！')
            };
            const response = await httpDeleteUser(selectedUser);
            
            if (response.message === 'ID有误，用户删除失败!') {
                setIsLoading(false);
                setErrorMessage('用户ID无效导致删除失败，请重试！');
                setIsDeletingUser(false);
                setSelectedUser(null);
            } else 
            if (!response.success) {
                setIsLoading(false);
                setIsDeletingUser(false);
                setErrorMessage('用户删除失败！');
                setSelectedUser(null);
            } else {
                // Succeeded
                setIsLoading(false);
                const {_id} = response.data;
                // Handle returned Deleted User
                const updatedAllUsers = allUsers.filter(user=>user._id!==_id);
                setAllUsers(updatedAllUsers);
                setIsDeletingUser(false);
                setSelectedUser(null);
            } 





        } catch (error) {
            console.log(error.message)
        }
    }



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
                                    <FontAwesomeIcon icon={faSquareXmark} onClick={()=> toggleIsDeletingUser(user)} className='delete-icon' />
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
            {
                isDeletingUser && 
                    <AlertModal 
                        promptMessage={<>
是否确定要删除用户
<br/> 【{selectedUser.name}】
                        </>}
                        primaryLabel='删除'
                        primaryFunction={handleUserDeletion}
                        secondaryLabel='取消'
                        secondaryFunction={()=>{setIsDeletingUser(prevState=>!prevState)}}
                    />
                 
            }
        </div> :
        <Navigate to='/' />
    );

}


export default PersonnelManagementPage;