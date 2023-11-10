import './App.scss';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import NavBar from './routes/navBar/navBar.component';
import HomePage from './routes/homePage/homePage.component';
import { UserContext } from './contexts/user.context';
import PersonalInfoPage from './routes/personalInfoPage/personalInfoPage.component';
import PersonnelManagementPage from './routes/personnelManagementPage/personnelManagementPage.component';
import InitialPasswordPage from './components/initialPasswordPage/initialPasswordPage.component';
import WareHouseSearchSection from './routes/warehouseSearchSection/warehouseSearchSection.component';
import WarehouseManagementPage from './routes/warehouseManagementPage/warehouseManagementPage.component';


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
    <Fragment>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='warehouse/search' element={<WareHouseSearchSection />} />
        <Route path='warehouse/management' element={<WarehouseManagementPage />} />
        <Route path='personal-info' element={<PersonalInfoPage />}/>
        <Route path='personnel-management' element={<PersonnelManagementPage />}/>
        <Route path='initial-password/:id' element={<InitialPasswordPage />}/>
      </Routes>
    </Fragment>

  );
}

export default App;
