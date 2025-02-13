// import appConfig from "@/appConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,  // Start with true
    error: null,
    isInitialized: false  // Add this flag
  };

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload
        },
        setIsAuthenticated(state,action){
            state.isAuthenticated=action.payload
        },
        setIsLoading(state,action){
            state.isLoading=action.payload
        },
        setError(state,action){
            state.error=action.payload
        },
        setIsInitialized(state,action){
            state.isInitialized=action.payload
        }
    }
})

export default authSlice.reducer;