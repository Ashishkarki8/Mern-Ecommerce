

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
  console.log("user",user); //undefined
  console.log(isAuthenticated)

  console.log(location.pathname);
  // Single includes() check instead of multiple
  const currentPath = location.pathname;
  const isAuthPath = currentPath.includes(PATHS.LOGIN) || currentPath.includes(PATHS.REGISTER);  

  // authenticated pani false cha ani login page or register page mah ni chaina bhani
  if (!isAuthenticated && !isAuthPath) {
    console.log("goes to login")
    return <Navigate to={PATHS.AUTH_LOGIN} state={{ from: location }} />;
  }

  // state={{ from: location }} helps store the previous page so the user can be redirected back after login. This improves user experience and navigation flow. 
  
  // Handle authenticated users
  if (isAuthenticated) {
    const isAdmin = user?.role === 'admin';
    
    // Auth page redirects
    if (isAuthPath) {
      console.log("dashnoard sending")
      return <Navigate to={isAdmin ? PATHS.ADMIN_DASHBOARD : PATHS.SHOP_HOME} />;
    }

    // Role-based access control
    if (currentPath.includes(PATHS.ADMIN) && !isAdmin) {
      console.log("redirecting user to unauth page if tries admin url")
      return <Navigate to={PATHS.UNAUTHORIZEDPAGE} />;
    }
    
    if (currentPath.includes(PATHS.SHOP) && isAdmin) {
      console.log("redirecting admin to admin dashboard  if tries user url")
      return <Navigate to={PATHS.ADMIN_DASHBOARD} />;
    }
  }
  console.log("goes to children")
  // When redirecting, only the ProtectedRoute is re-executing its checks, not the entire App
  return children; //kei ni prolem chaina bhani bhanekai url return gardini
    /*  How It Works Step by Step
    1️⃣ User visits /auth/login or /auth/register
    2️⃣ ProtectedRoute runs first (because it wraps AuthLayout).
    3️⃣ If authentication checks pass, it returns children, meaning:

    <AuthLayout /> gets rendered.
    4️⃣ Inside <AuthLayout />, React Router loads AuthLogin or AuthRegister based on the URL. */

};

export default ProtectedRoute;