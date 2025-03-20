import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with true
  error: null,
};

/* alert(initialState) */
console.log("index slice");
/*   export const registerUser = createAsyncThunk('/auth/register', async (formData, { rejectWithValue }) => {
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
 */

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/auth/login",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("response from login", response.data);
      return response.data; //action.payload
    } catch (error) {
      console.error("Error response:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

export const setPassword = createAsyncThunk(
  "/auth/set-password",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("form data",formData)
      const response = await axios.post(
        "http://localhost:9000/api/auth/set-password",
        formData,
        {
          withCredentials: true,
        }
      );
      console.log("response from setpassword", response.data); //uta json mah pathako data aaucha
      return response.data; //action.payload
    } catch (error) {
      console.error("Error response:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "Something went wrong" }
      );
    }
  }
);

/*  export const checkGoogleAuth = createAsyncThunk("/auth/google", async (_, { rejectWithValue }) => {
    
    try {
      console.log("inside google auth");
      const response = await axios.get("http://localhost:9000/api/auth/check-auth", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      });
      console.log("checkAuth response",response)
      return response.data;
    } catch (error) {
      console.log(" error from check auth" ,error) 
      return rejectWithValue(error.response?.data.message || { message: "Something went wrong" }); ////yeta reject with value nabhayeni error message console huncha tara tala state mah pass hudaina error pmessage rah payload empty huncha so tesailey reject with value pass garna parcha to show below case payload
      //etaa return gareko chij payload mah pass huncha               
    }
  }); */
export const checkAuth = createAsyncThunk(
  "/auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      console.log("inside check auth");
      const response = await axios.get(
        "http://localhost:9000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control":
              "no-store, no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      console.log("checkAuth response", response);
      return response.data;
    } catch (error) {
      console.log(" error from check auth", error);
      return rejectWithValue(
        error.response?.data.message || { message: "Something went wrong" }
      ); ////yeta reject with value nabhayeni error message console huncha tara tala state mah pass hudaina error pmessage rah payload empty huncha so tesailey reject with value pass garna parcha to show below case payload
      //etaa return gareko chij payload mah pass huncha
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("inside login pending case");
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("fullfilled state", state); //func
        console.log("Before updating state:", { ...state });
        console.log("fullfilled action", action); // response data plus meta()
        console.log("inside fulfilled case");
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = action.payload.success || false; //false

        console.log("After updating state: login", { ...state });
        console.log("After initial state: login", initialState);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("inside rejected case");
        console.log("Rejected action:", action);
        state.isLoading = false;
        state.isAuthenticated = false;
        // If `rejectWithValue` is used, `action.payload` contains the response from the server.
        state.error =
          action.payload?.message ||
          action.error?.message ||
          "Something went wrong.";
      })
      .addCase(setPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(setPassword.fulfilled, (state, action) => {
        console.log("action from the set paswword",action);
        state.isLoading = false;
        console.log("Password set successfully!", action.payload);
        console.log("Before updating state:", { ...state });
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to set password";
      })
      .addCase(checkAuth.pending, (state) => {
        console.log("inside check auth pending case");
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("checkauth state", state); //func
        console.log("Before updating state:", { ...state });
        console.log("fullfilled checkAuth action", action); // response data plus meta()
        console.log("inside fulfilled case of check auth");
        state.isLoading = false;
        state.user =
          action.payload.success === true ? action.payload.user : null;
        state.isAuthenticated = action.payload.success || false; //false
        console.log("initialState fullfilled", initialState);
        console.log("After updating state:", { ...state });
        console.log("After initial state:", initialState); //jaba sakkincha tespachi feri main batai suru huncha
      })
      .addCase(checkAuth.rejected, (state, action) => {
        console.log("passed from above checkauth error return", action.payload); //mathi reject with value rakhya bhey yeta dekhaudaina thyo
        console.log("inside rejected case");
        console.log("Rejected action:", action);
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        // If `rejectWithValue` is used, `action.payload` contains the response from the server.
        state.error =
          action.payload || action.error?.message || "Something went wrong.";
      });
  },
});

export default authSlice.reducer;
