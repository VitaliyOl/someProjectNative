import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    login: null,
    stateChange: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserProfile: (state, {payload})=> (
            {...state, 
                userId: payload.userId,
                login: payload.login
            }
        ),
        authStateChange: (state, {payload}) => (
            {...state, 
                stateChange: payload.stateChange}
        ),       
    }
})

export const { setUserId, setLogin, updateUserProfile,  authStateChange, } = authSlice.actions;

export default authSlice