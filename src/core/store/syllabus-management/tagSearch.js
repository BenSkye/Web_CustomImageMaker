import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tagInputValue: '',
  objRange: {},
};

const tagInputValueSlice = createSlice({
  name: 'tagInputValue',
  initialState,
  reducers: {
    setTagInputValue: (state, action) => {
      state.tagInputValue = action.payload;
    },
    setObjRange: (state, action) => {
      state.objRange = action.payload;
    },
  },
});

export const { setTagInputValue, setObjRange } = tagInputValueSlice.actions;
export default tagInputValueSlice.reducer;
