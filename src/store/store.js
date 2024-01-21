import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../featuresSlice/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice  // Add your other slices here if you have more reducers
    }
})

export default store
