// // import appConfig from "@/appConfig";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";


// const initialState = {
//     user: null,
//     isAuthenticated: false,
//     isLoading: true,  // Start with true
//     error: null,
//     // isInitialized: false  // Add this flag
//   };
 
  
//   export const registerUser = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("http://localhost:9000/api/auth/register", formData, {
//         withCredentials: true,
//       });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { message: "Registration failed." });
//     }
//   });
  
// const authSlice=createSlice({
//     name:"auth",
//     initialState,
//     reducers:{
//         setUser:(state,action)=>{
//         }
//       },
//         extraReducers:(builder)=>{
//          builder
//          .addCase(registerUser.pending,(state,action)=>{
//              state.isLoading=true;
//          })
//          .addCase(registerUser.fulfilled,(state,action)=>{
//             state.isLoading=false;
//             state.user = action.payload.user || null;
//             state.isAuthenticated = true;
//          })
//          .addCase(registerUser.rejected,(state,action)=>{  
//             state.isLoading=false;
//             state.error = action.payload?.message || "Registration failed.";
//          });        
//     },
// })

// export default authSlice.reducer;



// import appConfig from "@/appConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,  // Start with true
    error: null,
    // isInitialized: false  // Add this flag
  };
 
  console.log(initialState)
  export const registerUser = createAsyncThunk('/auth/register', async (formData) => {
    try {
      const response = await axios.post("http://localhost:9000/api/auth/register", formData, {
        withCredentials: true,
      });
      console.log("response from data",response.data) //preview ko data aayo state
      return response.data;
    } catch (error) {
      return error;
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
            console.log("fullfilled action",action); //data plus meta
            console.log("inside fulfilled case");   
            state.isLoading=false;
            state.user = action.payload.user || null;
            state.isAuthenticated = false;
            console.log("initialState fullfilled",initialState) ; 
            console.log("After updating state:", { ...state });
            console.log("After initial state:", initialState );
         })
         .addCase(registerUser.rejected,(state,action)=>{  
          console.log("inside rejected case"); 
            state.isLoading=false;
            // state.error=action.payload;
            state.error = action.payload.message || "Registration failed.";
         });        
    },
})

export default authSlice.reducer;