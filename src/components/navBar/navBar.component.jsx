import React, { Fragment, useState } from 'react';
import { Outlet } from "react-router-dom";
import './navBar.styles.scss';
import SideMenu from '../sideMenu/sideMenu.component';
import { ReactComponent as HamIcon } from '../../icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

const NavBar = () => {
  const [showsCloseIcon, setShowsCloseIcon] = useState(false);

  const toggleMenu = () => {
    setShowsCloseIcon(prevState => !prevState);
  };

  return (
    <Fragment>
        <nav className='nav-bar'>
            <HamIcon 
                className={`ham-icon ${showsCloseIcon ? 'hidden' : ''}`} 
                onClick={toggleMenu} 
            />
            <CloseIcon 
                className={`close-icon ${showsCloseIcon ? '' : 'hidden'}`} 
                onClick={toggleMenu}
            />
            <SideMenu active={showsCloseIcon} toggleMenu={toggleMenu} />
        </nav>
        <Outlet />
    </Fragment>

  );
}

export default NavBar;
