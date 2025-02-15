import React from 'react'
import {
  Navbar
} from '../components/component'
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const hideNavbar = location.pathname === '/main-page/buyer';

  return (
    <>
      {hideNavbar ? null : <Navbar />}
      <Outlet />
    </>
  )

}


export default Layout;