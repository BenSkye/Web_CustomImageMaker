import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchString: '',
  page: 0,
  size: 5,
  sort: [{
    attribute: 'id',
    asc: false
  }]
};

const userSearchSlice = createSlice({
  name: 'userUpdating',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    setSearchPage: (state, action) => {
      state.page = action.payload;
    },
    setSearchSize: (state, action) => {
      state.size = action.payload;
    },
    setSearchSort: (state, action) => {
      state.sort = action.payload;
    }
  }
});

export const { setSearchString, setSearchPage, setSearchSize, setSearchSort } = userSearchSlice.actions;
export default userSearchSlice.reducer;