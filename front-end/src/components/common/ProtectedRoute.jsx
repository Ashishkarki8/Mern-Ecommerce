

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Move path constants outside component to prevent recreation on each render
const PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  ADMIN: '/admin',
  SHOP: '/shop',
  AUTH_LOGIN: '/auth/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  SHOP_HOME: '/shop/home',
  UNAUTHORIZEDPAGE:'/unauth-page',
};

const ProtectedRoute = ({ children, isAuthenticated, user }) => {
  const location = useLocation();
  


  console.log(location.pathname);
  // Single includes() check instead of multiple
  const currentPath = location.pathname;
  const isAuthPath = currentPath.includes(PATHS.LOGIN) || currentPath.includes(PATHS.REGISTER);  

  // Early return for unauthenticated users
  if (!isAuthenticated && !isAuthPath) {
    return <Navigate to={PATHS.AUTH_LOGIN} state={{ from: location }} />;
  }

  // state={{ from: location }} helps store the previous page so the user can be redirected back after login. This improves user experience and navigation flow. 
  
  // Handle authenticated users
  if (isAuthenticated) {
    const isAdmin = user?.role === 'admin';
    
    // Auth page redirects
    if (isAuthPath) {
      return <Navigate to={isAdmin ? PATHS.ADMIN_DASHBOARD : PATHS.SHOP_HOME} />;
    }

    // Role-based access control
    if (currentPath.includes(PATHS.ADMIN) && !isAdmin) {
      return <Navigate to={PATHS.UNAUTHORIZEDPAGE} />;
    }
    
    if (currentPath.includes(PATHS.SHOP) && isAdmin) {
      return <Navigate to={PATHS.ADMIN_DASHBOARD} />;
    }
  }
  return children; //kei ni prolem chaina bhani bhanekai url return gardini
    /*  How It Works Step by Step
    1️⃣ User visits /auth/login or /auth/register
    2️⃣ ProtectedRoute runs first (because it wraps AuthLayout).
    3️⃣ If authentication checks pass, it returns children, meaning:

    <AuthLayout /> gets rendered.
    4️⃣ Inside <AuthLayout />, React Router loads AuthLogin or AuthRegister based on the URL. */

};

export default ProtectedRoute;