/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accountName: ''
}

export const accountListSlice = createSlice({
    name: 'accountList',
    initialState,
    reducers: {
        setList: (state,action) => {
            state.accountName = action.payload; 
        }
    }
});

export const {setList} = accountListSlice.actions;

export default accountListSlice.reducer;

