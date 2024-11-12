import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  syllabusDetailData: {},
  trainingUnitData: [],
  dataLoading: false,
  isEditModal: false,
  isRender: false,
  learningObjective: [],
};

const syllabusDetailSlice = createSlice({
  name: 'syllabusDetail',
  initialState,
  reducers: {
    setSyllabusDetail: (state, action) => {
      state.syllabusDetailData = action.payload;
    },
    setTrainingUnit: (state, action) => {
      state.trainingUnitData = action.payload;
    },
    setIsEditModal: (state, action) => {
      state.isEditModal = action.payload;
    },
    setIsRender: (state, action) => {
      state.isRender = action.payload;
    },
    setLearningObjective: (state, action) => {
      state.learningObjective = action.payload;
    },
    resetState: () => initialState,
  },
});
export const {
  setSyllabusDetail,
  setTrainingUnit,
  setIsEditModal,
  setIsRender,
  setLearningObjective,
  resetState
} = syllabusDetailSlice.actions;
export default syllabusDetailSlice.reducer;
