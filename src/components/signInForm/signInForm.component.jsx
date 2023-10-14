import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import './signInForm.styles.scss';
import { httpSignInUser } from '../../hooks/requests';
import { ReactComponent as Loading } from '../../icons/loading.svg';

const SignInForm = () => {
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const {setCurrentUser} = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setErrorMessage('');
    const response = await httpSignInUser(formData);

    if (response.success) {
      setIsLoading(false);
      const user = response.data;
      const accessToken = response.accessToken;

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', accessToken);

      setCurrentUser(user);
    } else {
      setIsLoading(false);
      setErrorMessage(response.message)
    }
  };

  return (
    <div className="sign-in-form">
      <h1>登录信息</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="sign-in-name">姓名</label>
          <input 
            type="text" 
            id="sign-in-name" 
            name="name"
            value={formData.name}
            onChange={handleChange} 
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="sign-in-password">密码</label>
          <input 
            type="password" 
            id="sign-in-password" 
            name="password"
            value={formData.password}
            onChange={handleChange} 
            required
          />
        </div>
        {errorMessage && <h4 className='errorMessage'>{errorMessage}</h4>}
        { isLoading && <Loading className='loadingIcon' /> }
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default SignInForm;
