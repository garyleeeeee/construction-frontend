import './personalInfoPage.component.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';

const PersonalInfoPage = () => {
    
    const { currentUser } = useContext(UserContext);

    return (
        currentUser ?
        <div className='personal-info-page-container'>
            <h1>个人信息</h1>
        </div> :
        <Navigate to='/' />
    );

}


export default PersonalInfoPage;