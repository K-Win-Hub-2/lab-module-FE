import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "medicinesale",
    initialState: {
      // url : 'http://clinicdenovobackend.kwintechnologies.com:3000/',
      login : false,
      user: '',
      url : 'http://localhost:9000/'
    },
    reducers: {
       loginSuccess:(state) => {
        state.login = true;
       },
       addUser:(state,action) => {
        state.user = action.payload;
       },
       logoutSuccess:(state) => {
        state.login = false;
        state.user = '';
       }
    }
})

export const{loginSuccess,addUser,logoutSuccess} = authSlice.actions
export default authSlice.reducer;