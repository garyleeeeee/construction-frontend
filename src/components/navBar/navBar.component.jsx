import React, { Fragment, useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import './navBar.styles.scss';
import SideMenu from '../sideMenu/sideMenu.component';
import { ReactComponent as HamIcon } from '../../icons/menu.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

const NavBar = () => {
  const [showsCloseIcon, setShowsCloseIcon] = useState(false);
  const [width, setWidth] = useState(getBodyWidth());

    useEffect(() => {
        const handleResize = () => {
            setWidth(getBodyWidth());
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

  const toggleMenu = () => {
    setShowsCloseIcon(prevState => !prevState);
  };

  function getBodyWidth() {
    const bodyWidth = document.body.clientWidth;
    const bodyStyle = window.getComputedStyle(document.body);
    const paddingLeft = parseFloat(bodyStyle.paddingLeft);
    const paddingRight = parseFloat(bodyStyle.paddingRight);
    return bodyWidth - paddingLeft - paddingRight;
}

  return (
    <Fragment>
        <nav className='nav-bar' style={{ position: 'fixed', width: `${width}px` }}>
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
