import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userReducer"

const store = configureStore({
    reducer:{
        userStore :userReducer
    }
})

export default store