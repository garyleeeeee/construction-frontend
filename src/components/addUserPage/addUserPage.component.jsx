import './addUserPage.styles.scss';
import { useState } from 'react';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

const AddUserPage = ({setIsAddingUser}) => {

    const [formData, setFormData] = useState({
        name: '',
        accessLevel: 0,
        role: '员工',
        phoneNumber: '',
        salary: 0
      });

      const handleChange = (e) => {
        const { name, value } = e.target;

        // Convert value for specific fields
        const finalValue = (name === 'accessLevel' || name === 'salary') ? +value : value;
    
        setFormData(prevData => ({ ...prevData, [name]: finalValue }));
      };

    return (
        <div className='add-user-page-overlay'>
            <div className='add-user-page-content'>
            <CloseIcon className="close-button" onClick={() => setIsAddingUser(false)}/>
                <h2>新增人员信息</h2>
                <form onSubmit={()=> {}}>
                    <div className="input-group">
                        <label htmlFor="name">姓名</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="accessLevel">访问等级</label>
                        <select 
                            id="accessLevel" 
                            name="accessLevel"
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
                        <label htmlFor="role">职务</label>
                        <select 
                            id="role" 
                            name="role"
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
                        <label htmlFor="salary">薪资</label>
                        <input 
                            type="number" 
                            id="salary" 
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phoneNumber">电话号码</label>
                        <input 
                            type="text" 
                            id="phoneNumber" 
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <button type="submit">完成</button>
                </form>
            </div>
        </div>
    );
};


export default AddUserPage;