import './warehousePage.styles.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';

const WarehousePage = () => {
    const { currentUser } = useContext(UserContext);

    return (
        currentUser ?
        <div className='warehouse-page-container'>
        <h1>仓库</h1>
    </div> :
        <Navigate to='/' />
    );
};


export default WarehousePage;