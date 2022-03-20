import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import { useStoreState } from 'easy-peasy';
import { useLocation, useNavigate } from 'react-router';
import { useStoreState } from 'easy-peasy';

import Sign from '../containers/Sign/Sign';
import Dashboard from '../containers/Dashboard/Dashboard';
import Register from './SignUp/Register';
import Spinner from './common/Spinner/Spinner';
import ProjectDetails from './ProjectDetails/ProjectDetails';
import CreateProject from './CreateProject/CreateProject';

const RouteOptions = {
  BECOME_CREATOR: 'BECOME_CREATOR',
  NOT_CONNECTED: 'NOT_CONNECTED',
  CREATOR: 'CREATOR',
  DASHBOARD: 'DASHBOARD',
};

const Router = (props) => {
  const [routerAction, setRouterAction] = useState(null);

  const { isWalletConnected, account } = useStoreState((state) => state.walletStore);

  const location = useLocation();
  const navigate = useNavigate();

  const defaultRoutes = (
    <>
      <Route path="/project/details" element={<ProjectDetails />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to='/' />} />
    </>
  )

  useEffect(() => {
    setRouterAction(resolveNavigationRoute())
  });

  useEffect(() => {
    if ('#' + location.pathname !== window.location.hash) {
      navigate(location.pathname)
    }
  }, [location.pathname]);

  const resolveNavigationRoute = () => {
    switch (true) {
      case !isWalletConnected:
        return RouteOptions.NOT_CONNECTED;
      case isWalletConnected && !account.token:
        return RouteOptions.BECOME_CREATOR;
      case isWalletConnected && !!account.token:
        return RouteOptions.CREATOR;
      default:
        return RouteOptions.DASHBOARD;
    }
  };

  if (!routerAction) {
    return (<Spinner />)
  }

  if (routerAction) {
    switch (routerAction) {
      case RouteOptions.BECOME_CREATOR:
        return <Routes>
          <Route path="/register" exact element={<Register />} />
          {defaultRoutes}
        </Routes>
      case RouteOptions.CREATOR:
        return <Routes>
          <Route path="/create" exact element={<CreateProject />} />
          {defaultRoutes}
        </Routes>
      case RouteOptions.NOT_CONNECTED:
        return <Routes>
          <Route path="/login" exact element={<Sign />} />
          {defaultRoutes}
        </Routes>
      default:
        return <Routes>
          {defaultRoutes}
        </Routes>
    }
  }
}

export default Router;