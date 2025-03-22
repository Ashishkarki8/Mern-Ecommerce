import AuthLayout from "@/components/auth/layout";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import AdminDashboard from "@/pages/admin-view/dashboard";
import AdminFeatures from "@/pages/admin-view/features";
import AdminLayout from "@/pages/admin-view/layout";
import AdminOrders from "@/pages/admin-view/orders";
import AdminProducts from "@/pages/admin-view/products";
import AuthLogin from "@/pages/auth/login";
import SetPassword from "@/pages/auth/setPassword";
import Notfound from "@/pages/not-found";
import ShoppingAccount from "@/pages/shopping-view/account";
import ShoppingHome from "@/pages/shopping-view/home";
import ShoppingLayout from "@/pages/shopping-view/layout";
import ShoppingListing from "@/pages/shopping-view/listing";
import UnauthPage from "@/pages/unauth-page";
import { checkAuth } from "@/store/auth-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

// const App = () => {
   
//   const { user, isAuthenticated, isLoading,error} = useSelector((state) => state.auth);
//   console.log("From login page","isloading", isLoading ,"isAuthenticated",isAuthenticated,"user",user ,"error",error);
//   const dispatch = useDispatch();
  
//  useEffect(() => {
//     console.log("inside useeffect");
//     dispatch(checkAuth());
//   }, [dispatch]) ;
   
//   // if (isLoading && isAuthenticated ) {
//   //   console.log("isloading",isLoading)
//   //   /* alert("isloading active") */
//   //   return <div>loading data....</div>
//   // } 

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//      {/*  <h1>header component</h1> */}
//       <Routes>
//         <Route path="/" element={<div>This is home page</div>} />
        
//         <Route path="/auth" element={<ProtectedRoute  user={user}  isAuthenticated={isAuthenticated}><AuthLayout/></ProtectedRoute>}>
//           {console.log("inside any auth")}
//           <Route path="login" element={<AuthLogin></AuthLogin>}></Route>
//           {/* <Route path="register" element={<AuthRegister></AuthRegister>}></Route> */}
//           <Route path="set-password" element={<SetPassword></SetPassword>}></Route>
//         </Route>
//         <Route path="/admin" element={<ProtectedRoute user={user} isAuthenticated={isAuthenticated}><AdminLayout /></ProtectedRoute> }>
//         {console.log("inside admin auth")}
//           <Route path="dashboard" element={<AdminDashboard />}></Route>
//           <Route path="products" element={<AdminProducts />}></Route>
//           <Route path="orders" element={<AdminOrders />}></Route>
//           <Route path="features" element={<AdminFeatures />}></Route>
//         </Route>
//         <Route path="/shop" element={<ProtectedRoute user={user} isAuthenticated={isAuthenticated}><ShoppingLayout /></ProtectedRoute>}>
//         {console.log("inside user auth")}
//           <Route path="home" element={<ShoppingHome />}></Route>
//           <Route path="listing" element={<ShoppingListing />}></Route>
//           <Route path="account" element={<ShoppingAccount />}></Route>
//         </Route>
//         <Route path="*" element={<Notfound />}></Route>
//         <Route path="/unauth-page" element={<UnauthPage />}></Route>
//       </Routes>
//     </div>
//   );
// };

// export default App;




//if  isauthentication ===false garnu rah !isAuthentication garnu isAuthentication ===false,null,undefined,0,NaN,empty string, false, garnu ho 


/* const App = () => {
  const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      await dispatch(checkAuth());
      setAuthChecked(true);
    };
    
    checkAuthentication();
  }, [dispatch]);

  // Don't render any routes until we've checked authentication status
  if (!authChecked) {
    // Optional: Return an empty div instead of a loading spinner
    // This prevents any flash of content while checking auth
    return <div className="invisible h-0"></div>;
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<div>This is home page</div>} />

        <Route path="/auth" element={<ProtectedRoute user={user} isAuthenticated={isAuthenticated}><AuthLayout/></ProtectedRoute>}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="set-password" element={<SetPassword />} />
        </Route>
        
        <Route path="/admin" element={<ProtectedRoute user={user} isAuthenticated={isAuthenticated}><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        
        <Route path="/shop" element={<ProtectedRoute user={user} isAuthenticated={isAuthenticated}><ShoppingLayout /></ProtectedRoute>}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>
        
        <Route path="*" element={<Notfound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
};

export default App; */



const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const fetchAuth = async () => {
      await dispatch(checkAuth());
      setAuthChecked(true); // Mark authentication check as complete
    };
    fetchAuth();
  }, [dispatch]);

  // Don't render anything until authentication check is complete
  if (!authChecked) {
    return null; // Or return <></> for an empty fragment
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<div>This is home page</div>} />

        <Route
          path="/auth"
          element={
            <ProtectedRoute user={user} isAuthenticated={isAuthenticated}>
              <AuthLayout />
            </ProtectedRoute>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="set-password" element={<SetPassword />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} isAuthenticated={isAuthenticated}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <ProtectedRoute user={user} isAuthenticated={isAuthenticated}>
              <ShoppingLayout />
            </ProtectedRoute>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="" element={<Notfound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
};

export default App;