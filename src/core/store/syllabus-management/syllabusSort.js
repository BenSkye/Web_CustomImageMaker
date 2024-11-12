import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchString: '',
  page: 0,
  size: 5,
  sort: [
    {
      attribute: '',
      asc: false,
    },
  ],
};

const syllabusSortSlice = createSlice({
  name: 'syllabusSort',
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
    },
  },
});

export const { setSearchString, setSearchPage, setSearchSize, setSearchSort } =
  syllabusSortSlice.actions;
export default syllabusSortSlice.reducer;
