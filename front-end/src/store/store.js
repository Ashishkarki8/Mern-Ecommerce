import {  configureStore} from "@reduxjs/toolkit";
import authReducer from './auth-slice/index.js'
// collects all the store
/* alert("store") */
console.log("store")
const store=configureStore({
    reducer:{
        auth:authReducer,
    }
})

export default store;