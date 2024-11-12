import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: JSON.parse(localStorage.getItem('tokens'))?.accessToken || null,
  refreshToken:
    JSON.parse(localStorage.getItem('tokens'))?.refreshToken || null,
  roleName: localStorage.getItem('roleName') || null,
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.roleName = action.payload.roles;
    },
  },
});

export const { setTokens } = authenticationSlice.actions;
export default authenticationSlice.reducer;
