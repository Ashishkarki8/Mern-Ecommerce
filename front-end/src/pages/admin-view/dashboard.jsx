import React from 'react'

const AdminDashboard = () => {
  const handleGoogleLogout = () => {
    // Step 1: Log out from Google
    window.open("https://accounts.google.com/Logout", "_blank");
  
    // Step 2: Clear cookies or localStorage
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("authToken");
  
    // Step 3: Redirect to login page
    window.location.href = "/auth/login";
  };
  

  
  return (
    <div>
    <h1>Admin dashboard</h1>
    <button onClick={handleGoogleLogout}>Logout from Google</button>;
    </div>
  )
}

export default AdminDashboard