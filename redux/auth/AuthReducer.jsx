import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    login: null,
    stateChange: false,
    email: null,
    avatar: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUserProfile: (state, {payload})=> (
           
            {...state, 
                userId: payload.userId,
                login: payload.login,
                email: payload.email,
                avatar: payload.avatar,                
            }
        ),
        authStateChange: (state, {payload}) => (
            {...state, 
                stateChange: payload.stateChange}
        ),           
    }
})

export const { setUserId, setLogin, updateUserProfile,  authStateChange, setAvatar} = authSlice.actions;

export default authSlice