import React from 'react';
import { toast } from 'sonner'; // Importing Sonner

const ShoppingHome = () => {
  const handleGoogleLogout = async () => {
    try {
      // Step 1: Log out from Google (open in same tab to ensure logout)
      window.open("https://accounts.google.com/Logout", "_self");
  
      // Step 2: Call backend to clear cookies
      const response = await fetch("http://localhost:9000/api/auth/logout", {
        method: "POST",
        credentials: "include", // Ensures cookies are sent
      });

      const data = await response.json(); // Get the response data from the backend

      // Step 3: Check the response for success
      if (data?.success) {
        toast.success(data?.message || "Logout successful"); // Show success notification
      } else {
        toast.error(data?.message || "Logout failed"); // Show error notification
      }

      // Step 4: Remove token from localStorage (if used)
      localStorage.removeItem("authToken");

      // Step 5: Redirect to login page after the toast notification
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout failed due to an error."); // Show error notification on failure
    }
  };

  return (
    <div>
      <h1>Shopping Home</h1>
      <button onClick={handleGoogleLogout}>Logout</button>
    </div>
  );
};

export default ShoppingHome;
