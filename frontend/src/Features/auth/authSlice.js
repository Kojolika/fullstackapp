import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null, csrfAccessToken: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, csrfAccessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.csrfAccessToken = csrfAccessToken ? csrfAccessToken : state.csrfAccessToken 
        },
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
            state.csrfAccessToken = null;
            console.log('loging out user in authslice');
        }
    }
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;