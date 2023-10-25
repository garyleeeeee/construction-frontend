import './warehousePage.styles.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import WareHouseSearchSection from './warehouseSearchSection/warehouseSearchSection.component';
import WarehouseManagementPage from './warehouseManagementPage/warehouseManagementPage.component';

const WarehousePage = () => {
    const { currentUser } = useContext(UserContext);
    const [ basketItemsCount, setBasketItemsCount ] = useState(0);
    const [ showsManagementPage, setShowsManagementPage ] = useState(false);

    return (
        currentUser ?
        <div className='warehouse-page-container'>
            <div className='warehouse-page-header'>
                <h1>仓库</h1>
                <div className='warehouse-header-buttons'>
                    <button className='warehouse-cart-button'>
                        <FontAwesomeIcon icon={faCartPlus} />
                        <span>{` ${basketItemsCount}`}</span>
                    </button>
                    <button className='warehouse-management-button'>
                        <FontAwesomeIcon icon={faScrewdriverWrench} />
                    </button>
                    
                </div>
            </div>
                {showsManagementPage ?
                <WarehouseManagementPage />:<WareHouseSearchSection />
                }
                
        </div> :
            <Navigate to='/' />
    );
};


export default WarehousePage;