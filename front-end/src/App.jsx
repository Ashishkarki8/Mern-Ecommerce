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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

const App = () => {
   
  const { user, isAuthenticated, isLoading,error} = useSelector((state) => state.auth);
  console.log("From login page","isloading", isLoading ,"isAuthenticated",isAuthenticated,"user",user ,"error",error);
  const dispatch = useDispatch();
  
 useEffect(() => {
    console.log("inside useeffect");
    dispatch(checkAuth());
  }, [dispatch]) ;

  if (isLoading) {
    console.log("isloading",isLoading)
    alert("isloading active")
    return <div>loading ....</div>
  } 

  return (
    <div className="flex flex-col overflow-hidden bg-white">
     {/*  <h1>header component</h1> */}
      <Routes>
        <Route path="/" element={<div>This is home page</div>} />
        
        <Route path="/auth" element={<ProtectedRoute  user={user}  isAuthenticated={isAuthenticated}><AuthLayout/></ProtectedRoute>}>
          {console.log("inside any auth")}
          <Route path="login" element={<AuthLogin></AuthLogin>}></Route>
          {/* <Route path="register" element={<AuthRegister></AuthRegister>}></Route> */}
          <Route path="set-password" element={<SetPassword></SetPassword>}></Route>
        </Route>
        <Route path="/admin" element={<ProtectedRoute user={user} isAuthenticated={isAuthenticated}><AdminLayout /></ProtectedRoute> }>
        {console.log("inside admin auth")}
          <Route path="dashboard" element={<AdminDashboard />}></Route>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
          <Route path="features" element={<AdminFeatures />}></Route>
        </Route>
        <Route path="/shop" element={<ProtectedRoute user={user} isAuthenticated={isAuthenticated}><ShoppingLayout /></ProtectedRoute>}>
        {console.log("inside user auth")}
          <Route path="home" element={<ShoppingHome />}></Route>
          <Route path="listing" element={<ShoppingListing />}></Route>
          <Route path="account" element={<ShoppingAccount />}></Route>
        </Route>
        <Route path="*" element={<Notfound />}></Route>
        <Route path="/unauth-page" element={<UnauthPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;




//if  isauthentication ===false garnu rah !isAuthentication garnu isAuthentication ===false,null,undefined,0,NaN,empty string, false, garnu ho 
