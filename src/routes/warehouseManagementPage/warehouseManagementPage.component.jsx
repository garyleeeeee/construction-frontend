import './warehouseManagementPage.styles.scss';
import { Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import ProductsManagementPage from '../productsManagementPage/productsManagementPage.components';

const WarehouseManagementPage = () => {
    const { currentUser } = useContext(UserContext);
    const [ currentModule, setCurrentModule ] = useState('产品管理')

    if(!currentUser) {
        return <Navigate to='/' />;
    };

    const handleModuleClick = (moduleName) => {
        setCurrentModule(moduleName);
    };

    const getButtonClass = (moduleName) => (
        moduleName === currentModule ? 'selected-module-button' : 'unselected-module-button'
    );

    return (
        <div className='warehouse-management-page-container'>
            <h1>仓库管理</h1>
            <div className='module-buttons'>
                <button className={`module-button ${getButtonClass('产品管理')}`} onClick={() => handleModuleClick('产品管理')}>
                    产品管理
                </button>
                <button className={`module-button ${getButtonClass('入库管理')}`} onClick={() => handleModuleClick('入库管理')}>
                    入库管理
                </button>
                <button className={`module-button ${getButtonClass('出库管理')}`} onClick={() => handleModuleClick('出库管理')}>
                    出库管理
                </button>
            </div>
            {currentModule === '产品管理' && <ProductsManagementPage />}
            
        </div>
    )
}

export default WarehouseManagementPage