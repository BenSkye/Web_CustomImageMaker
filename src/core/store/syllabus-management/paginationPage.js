import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 0,
  rowPerPage: 5,
  totalPage: 0,
};

const currentPageSlice = createSlice({
  name: 'paginationPage',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setRowPerPage: (state, action) => {
      state.rowPerPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
  },
});

export const { setCurrentPage, setRowPerPage, setTotalPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
