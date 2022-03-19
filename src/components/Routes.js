import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import { useStoreState } from 'easy-peasy';
import { useLocation, useNavigate } from 'react-router';
import Sign from '../containers/Sign/Sign';
import Dashboard from '../containers/Dashboard/Dashboard';

const RouteOptions = {
  GO_TO_LOGIN: 'GO_TO_LOGIN',
  GO_TO_DASHBOARD: 'GO_TO_DASHBOARD',
};

const Router = (props) => {
  const [routerAction, setRouterAction] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const defaultRoutes = (
    <Routes>
      <Route path="/login" exact element={<Sign />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
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
      // different cases
      default:
        return RouteOptions.GO_TO_DASHBOARD;
    }
  };

  if (!routerAction) {
    return ('loading...')
  }

  if (routerAction) {
    switch (routerAction) {
      case RouteOptions.GO_TO_LOGIN:
        // ... routes
        return;
      default:
        return defaultRoutes;
    }
  }
}

export default Router;