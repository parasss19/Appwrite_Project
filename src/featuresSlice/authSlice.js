import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,  //initially user is not authenticated
    userData: null
}


//this is used to track user (authenticated or not)
const authSlice = createSlice({
      name: "auth",
      initialState,

      reducers: {
         login : (state, action) => {
            state.status = true
            state.userData = action.payload
         },

         logout : (state) => {
            state.status = false
            state.userData = null
         }
      }
   }
)

//exporting all reducers
export default authSlice.reducer

//exporting all actions(methods inside reducer) separately as they will be used in different components
export const {login, logout} = authSlice.actions