import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  programDetailData: {},
  programDetailLoading: false,
  isTriggerModalDuplicate: false,
  isTriggerModalEdit: false,
  isUpdating: false,
  isUpdated: false
}

const trainingProgramDetailSlice = createSlice({
  name: 'trainingProgramDetail',
  initialState,
  reducers: {
    setTrainingProgramDetailData: (state, action) => {
      state.programDetailData = action.payload
    },
    setTrainingProgramDetailLoading: (state, action) => {
      state.programDetailLoading = action.payload
    },
    setDuplicateModal: (state, action) => {
      state.isTriggerModalDuplicate = action.payload
    },
    setEditModal: (state, action) => {
      state.isTriggerModalEdit = action.payload
    },
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload
    },
    setIsUpdated: (state, action) => {
      state.isUpdated = action.payload
    },
    resetState: () => initialState,
  }
})

export const {
  setTrainingProgramDetailData,
  setTrainingProgramDetailLoading,
  setDuplicateModal,
  setEditModal,
  setIsUpdating,
  setIsUpdated,
  resetState
} = trainingProgramDetailSlice.actions
export default trainingProgramDetailSlice.reducer