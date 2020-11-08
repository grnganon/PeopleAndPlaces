import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import './MainNavigation.css';
import NavLinks from '../NavLinks/NavLinks';
import SideDrawer from '../SideDrawer/SideDrawer';
import Backdrop from '../../UIElements/Backdrop/Backdrop';

const MainNavigation = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const toggleDrawerHandler = () => setDrawerIsOpen(!drawerIsOpen);
  return (
    <React.Fragment>
      {/*backdrop is visible background when side drawer is open, clicking it
      closes the drawer*/}
      {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
      <SideDrawer show={drawerIsOpen}>
        <nav
          className="main-navigation__drawer-nav"
          onClick={toggleDrawerHandler}
        >
          <NavLinks />
        </nav>
      </SideDrawer>
      )
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={toggleDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
