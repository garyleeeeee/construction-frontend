import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import './signInForm.styles.scss';
import { httpSignInUser } from '../../hooks/requests';

const SignInForm = () => {
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

    const response = await httpSignInUser(formData);

    if (response.success) {
      const user = response.data;
      const accessToken = response.accessToken;

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('token', accessToken);

      setCurrentUser(user);
    } else {
      // Notification on top about Error
      console.log(response.message)
    }
  };

  return (
    <div className="sign-in-form">
      <h1>登录信息</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="password">密码</label>
          <input 
            type="password" 
            id="password" 
            name="password"
            value={formData.password}
            onChange={handleChange} 
            required
          />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default SignInForm;
