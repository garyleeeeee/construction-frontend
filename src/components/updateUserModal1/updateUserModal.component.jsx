import './updateUserModal.styles.scss';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import { httpUpdateUser } from '../../hooks/requests';
import { ReactComponent as Loading } from '../../icons/loading.svg';

const UpdateUserModal = ({ setIsUpdatingUser, onUserUpdated, selectedUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(selectedUser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const finalValue = ['accessLevel', 'salary'].includes(name) ? +value : value;
        setFormData(prevData => ({ ...prevData, [name]: finalValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        
        if (!isValidPhoneNumber(formData.phoneNumber)) {
            setErrorMessage('电话号码有误！');
            return;
        };
    
        setIsLoading(true);
    
        try {
            const response = await httpUpdateUser(formData);
    
            if (response.success) {
                onUserUpdated?.(response.data);
                setIsUpdatingUser(false);
            } else {
                handleErrorResponse(response.message);
            };
        } catch (error) {
            // This handles unexpected errors
            setErrorMessage('信息更新出现意外，请重试！');
        } finally {
            setIsLoading(false);
        }
    }
    
    const isValidPhoneNumber = (phoneNumber) => {
        return /^[0-9]+$/.test(phoneNumber);
    }
    
    const handleErrorResponse = (message) => {
        if (message.includes('duplicate key error')) {
            setErrorMessage('用户更新信息与数据库重复！');
        } else {
            setErrorMessage(message);
        }
        console.log(message);
    };

    return (
        <div className='update-user-page-overlay'>
            <div className='update-user-page-content'>
                <CloseIcon className="close-button" onClick={() => setIsUpdatingUser(false)} />
                <h2>更新人员信息</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="update-name">姓名</label>
                        <input 
                            type="text" 
                            id="update-name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="update-accessLevel">访问等级</label>
                        <select 
                            id="update-accessLevel" 
                            name="accessLevel"
                            value={formData.accessLevel}
                            onChange={handleChange} 
                            required
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="update-status">状态</label>
                        <select 
                            id="update-status" 
                            name="status"
                            value={formData.status}
                            onChange={handleChange} 
                            required
                        >
                            <option value="active">active</option>
                            <option value="inactive">inactive</option>
                            <option value="pending">pending</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="update-role">职务</label>
                        <select 
                            id="update-role" 
                            name="role"
                            value={formData.role}
                            onChange={handleChange} 
                            required
                        >
                            <option value="员工">员工</option>
                            <option value="出纳">出纳</option>
                            <option value="仓管">仓管</option>
                            <option value="财务">财务</option>
                            <option value="老板">老板</option>
                            <option value="施工员">施工员</option>
                            <option value="采购员">采购员</option>
                            <option value="预算员">预算员</option>
                            <option value="资料员">资料员</option>
                            <option value="预算主管">预算主管</option>
                            <option value="现场主管">现场主管</option>
                            <option value="后勤主管">后勤主管</option>
                            <option value="车辆主管">车辆主管</option>
                            <option value="资料主管">资料主管</option>
                            <option value="人事主管">人事主管</option>
                            <option value="项目主管">项目主管</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="update-salary">薪资</label>
                        <input 
                            type="number" 
                            id="update-salary" 
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="update-phoneNumber">电话号码</label>
                        <input 
                            type="text" 
                            id="update-phoneNumber" 
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {errorMessage && <h4 className='errorMessage'>{errorMessage}</h4>}
                    <button type="submit">更新</button>
                </form>
                {isLoading && <Loading className='loadingIcon' />}
            </div>
        </div>
    );
};

export default UpdateUserModal;
