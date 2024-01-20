import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    status: false,  //initially user is not authenticated
    userData: null
}


//this is used to track user (authenticated or not)
const authSlice = createSlice({
      name: "auth",
      intialState,

      reducers: {
         login : (state, action) => {
            state.status = true
            state.userData = action.payload.userData
         },

         logout : (state, action) => {
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