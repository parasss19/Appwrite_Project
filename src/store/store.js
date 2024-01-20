import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../featuresSlice/authSlice";

const store = configureStore({
    reducer: authSlice
})

export default store
