import './personnelManagementPage.styles.scss';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';
import { httpFetchAllUsers } from '../../hooks/requests';
import AddUserPage from '../addUserPage/addUserPage.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWrench, faLink } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Loading } from '../../icons/loading.svg';
import Modal from '../modal/modal.component';


const PersonnelManagementPage = () => {

    const [copiedUserId, setCopiedUserId] = useState("");
    const { currentUser } = useContext(UserContext);
    const [ allUsers, setAllUsers ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ isAddingUser, setIsAddingUser ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);

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


     const handleUserAdded = (newUser) => {
        // When a user is successfully added, update the 'allUsers' state
        setAllUsers((prevAllUsers) => [...prevAllUsers, newUser]);
      };

     const updateUser = async () => {
        console.log('Updating User');
     };

     const closeModal = () => {
        setIsModalVisible(false);
        setErrorMessage(''); // Clear the error message
    };

    const toggleIsAddingUser = () => {
        setIsAddingUser(prevState => !prevState);
      };

    const handleLink = async (id) => {
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
                            <td>{
                                user.status === 'pending'? 
                                    <div className='status-container'>
                                        <span>{user.status}</span>
                                        <FontAwesomeIcon icon={faLink} onClick={() => {handleLink(user._id)}} className='link-icon' />
                                        {copiedUserId === user._id && 
                                        <div className="copied-msg">已复制</div>}
                                    </div>
                                    :
                                    user.status
                            }
                            </td>
                            <td><FontAwesomeIcon icon={faWrench} onClick={updateUser} className='update-icon' /></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {
                isLoading && <Loading className='loadingIcon' />
            }
            {   isModalVisible && 
            <Modal message={errorMessage} onClose={closeModal} signOut={true} />
            }
            {
                isAddingUser && <AddUserPage setIsAddingUser={setIsAddingUser} onUserAdded={handleUserAdded}/>
            }
        </div> :
        <Navigate to='/' />
    );

}


export default PersonnelManagementPage;