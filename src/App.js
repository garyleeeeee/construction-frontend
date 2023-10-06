import './App.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './components/navBar/navBar.component';
import HomePage from './components/homePage/homePage.component';
import { UserContext } from './contexts/user.context';
import WarehousePage from './components/warehousePage/warehousePage.component';
import PersonalInfoPage from './components/personalInfoPage/personalInfoPage.component';
import PersonnelManagementPage from './components/personnelManagementPage/personnelManagementPage.component';

function App() {
  const { setCurrentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    };

    setIsLoading(false);
  }, [setCurrentUser]);

  if (isLoading) return; //Make sure currentUser has been set

  return (

    <Routes>
      <Route path='/' element={<NavBar />} >
      <Route index element={<HomePage />} />
      <Route path='warehouse' element={<WarehousePage />}/>
      <Route path='personal-info' element={<PersonalInfoPage />}/>
      <Route path='personnel-management' element={<PersonnelManagementPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
