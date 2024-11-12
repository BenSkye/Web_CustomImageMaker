import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCreating: false,
    isCreated: false,
    searchTerm: '',
    searchSyllabusList: [],
    isAddSyllabus: false,
    isRemoveSyllabus: false,
    updateSyllabusId: -1,
    isUpdateProgram: false,
    trainingProgramName: '',
    trainingProgramData: {
        id: -1,
        topicCode: "",
        startTime: "",
        createdDate: "",
        createBy: "",
        modifyBy: "",
        modifyDate: "",
        duration: 0,
        status: 3,
        generalInformation: ""
    },
    trainingSyllabusList: []
};

const trainingProgramCreateSlice = createSlice({
  name: 'trainingProgramCreate',
  initialState,
  reducers: {
    setTrainingProgramCreate: (state, action) => {
      state.isCreating = action.payload;
    },
    setTrainingProgramCreated: (state, action) => {
      state.isCreated = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSearchSyllabusList: (state, action) => {
      state.searchSyllabusList = action.payload;
    },
    setTrainingProgramData: (state, action) => {
      state.trainingProgramData = {
        id: action.payload.id ?? -1,
        topicCode: action.payload.topicCode ?? "",
        createdDate: action.payload.createdDate ?? new Date().toISOString(),
        createBy: action.payload.createBy ?? "",
        modifyBy: action.payload.modifyBy ?? "",
        modifyDate: action.payload.modifyDate ?? new Date().toISOString(),
        duration: action.payload.duration ?? 0,
        status: action.payload.status ?? 3,
        generalInformation: action.payload.generalInformation ?? "",
        startTime: action.payload.createdDate ?? new Date().toISOString()
      };
    },
    setTrainingSyllabusList: (state, action) => {
      state.trainingSyllabusList = action.payload;
    },
    setAddSyllabus: (state, action) => {
      state.isAddSyllabus = action.payload;
    },
    setUpdateSyllabusId: (state, action) => {
      state.updateSyllabusId = action.payload;
    },
    setTrainingProgramName: (state, action) => {
      state.trainingProgramName = action.payload;
    },
    setRemoveSyllabus: (state, action) => {
      state.isRemoveSyllabus = action.payload;
    },
    resetInitialState: () => initialState,
    setUpdateProgram: (state, action) => {
      state.isUpdateProgram = action.payload;
    }
  }
});

export const { setTrainingProgramCreate, 
  setTrainingProgramData, 
  setTrainingSyllabusList, 
  setSearchTerm, 
  setSearchSyllabusList, 
  setAddSyllabus,
  setUpdateSyllabusId,
  setTrainingProgramName,
  setRemoveSyllabus,
  resetInitialState,
  setTrainingProgramCreated,
  setUpdateProgram } = trainingProgramCreateSlice.actions;
export default trainingProgramCreateSlice.reducer