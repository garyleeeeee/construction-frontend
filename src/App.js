import './App.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './routes/navBar/navBar.component';
import HomePage from './routes/homePage/homePage.component';
import { UserContext } from './contexts/user.context';
import WarehousePage from './routes/warehousePage/warehousePage.component';
import PersonalInfoPage from './routes/personalInfoPage/personalInfoPage.component';
import PersonnelManagementPage from './routes/personnelManagementPage/personnelManagementPage.component';
import InitialPasswordPage from './components/initialPasswordPage/initialPasswordPage.component';


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
      <Route path='initial-password/:id' element={<InitialPasswordPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
