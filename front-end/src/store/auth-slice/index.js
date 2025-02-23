import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,  // Start with true
    error: null,
    // isInitialized: false  // Add this flag
  };
 
  /* alert(initialState) */
  console.log("index slice");
  export const registerUser = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:9000/api/auth/register", formData, {
        withCredentials: true,
      });
      console.log("from register index",response.data)
      return response.data;
    } catch (error) {
      console.error("Error response:", error.response?.data?.message);
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  });

  export const loginUser = createAsyncThunk("/auth/login", async (formData, { rejectWithValue }) => {
    try {

      const response = await axios.post("http://localhost:9000/api/auth/login", formData, {
        withCredentials: true,
      });
      console.log("response from login",response.data)
      return response.data;  //action.payload
    } catch (error) {
      console.error("Error response:", error.response?.data?.message);
      return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
  });

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
        }
      },
        extraReducers:(builder)=>{
         builder
         .addCase(registerUser.pending,(state,action)=>{
          console.log("inside pending case");
          console.log("initialState pending",initialState) ; 
          state.isLoading=true;
         })
         .addCase(registerUser.fulfilled,(state,action)=>{
            console.log("fullfilled state",state); //func
            console.log("Before updating state:", { ...state });
            console.log("fullfilled action",action); // response data plus meta()
            console.log("inside fulfilled case");   
            state.isLoading=false;
            state.user = action.payload.user || null;
            state.isAuthenticated = false;
            console.log("initialState fullfilled",initialState) ; 
            console.log("After updating state:", { ...state });
            console.log("After initial state:", initialState );     //jaba sakkincha tespachi feri main batai suru huncha
         })
         .addCase(registerUser.rejected, (state, action) => {  
          console.log("inside rejected case");
          console.log("Rejected action:", action);
          state.isLoading = false;
          // If `rejectWithValue` is used, `action.payload` contains the response from the server.
          state.error = action.payload?.message || action.error?.message || "Something went wrong.";
        })
        /* .addCase(loginUser.pending,(state,action)=>{
          console.log("inside login pending case");
          state.isLoading=true;
         }) */
         .addCase(loginUser.fulfilled,(state,action)=>{
            console.log("fullfilled state",state);   //func
            console.log("Before updating state:", { ...state });
            console.log("fullfilled action",action); // response data plus meta()
            console.log("inside fulfilled case");   
            state.isLoading=false;
            state.user = action.payload.user || null;
            state.isAuthenticated = true;
            console.log("After updating state: login", { ...state });
            console.log("After initial state: login", initialState );
         })
         .addCase(loginUser.rejected, (state, action) => {  
          console.log("inside rejected case");
          console.log("Rejected action:", action);
          state.isLoading = false;
          state.isAuthenticated = false;
          // If `rejectWithValue` is used, `action.payload` contains the response from the server.
          state.error = action.payload?.message || action.error?.message || "Something went wrong.";
        });
                
    },
})

export default authSlice.reducer;