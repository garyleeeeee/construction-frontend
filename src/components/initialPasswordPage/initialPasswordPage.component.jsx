import { useState, useEffect } from 'react';
import './initialPasswordPage.styles.scss';
import { Navigate, useParams } from 'react-router-dom';
import { httpFindUserById, httpInitialisePassword } from '../../hooks/requests';
import Modal from '../modal/modal.component';

const InitialPasswordPage = () => {

    const { id } = useParams();
    const [ isResetSuccessful, setIsResetSuccessful ] = useState(false);
    const [ isModalVisible, setIsModalVisible] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ formData, setFormData ] = useState({
        name: '',
        genPassword: '',
        rePassword: ''
    });

    useEffect(() => {
        
        async function assignUserName () {
            const userData = {id}
            const response = await httpFindUserById(userData);
            
            if (response.success) {
                const {name} = response.data;
                setFormData(prevFormData => ({
                    ...prevFormData,
                    name
                }));
            } else {
                console.log(response.message);
                if (response.message.includes("Cast to ObjectId")){
                    return setErrorMessage('链接有误，请联系管理员！');
                }
                setErrorMessage(response.message);
              }
        };

        assignUserName()
    },[id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const { genPassword, rePassword } = formData;

        if (genPassword !== rePassword) {
            setErrorMessage('密码不一致！');
            return;
        }
        const submitData = {
            id,
            password: genPassword,
            rePassword
        };
        const response = await httpInitialisePassword(submitData);

        if (response.success) {
            setIsModalVisible(true);
        } else {
            console.log(response.message);
            setErrorMessage(response.message);
        }

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(formData)
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setIsResetSuccessful(true)
    };
    return (
        isResetSuccessful ?
            <Navigate to='/' />:
        <div className='initial-password-page-container'>
            <form onSubmit={handleSubmit}>
                    <h2>初始化密码</h2>
                    <div className="input-group">
                        <label htmlFor="genPassName">姓名</label>
                        <input 
                            type="text" 
                            id="genPassName" 
                            name="genPassName"
                            value={formData.name}
                            disabled 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="genPassword">输入新密码</label>
                        <input 
                            type="password" 
                            id="genPassword" 
                            name="genPassword"
                            value={formData.password}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="rePassword">再次输入新密码</label>
                        <input 
                            type="password" 
                            id="rePassword" 
                            name="rePassword"
                            value={formData.rePassword}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    {errorMessage && <h4 className='errorMessage'>{errorMessage}</h4>}
                    <button type="submit">完成</button>
                </form>
            {isModalVisible && 
            <Modal message={'账户初始化完成，返回主页'} onClose={closeModal} signOut={false}  />
        }
        </div>
    );
};



export default InitialPasswordPage;