import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdating: false,
  isAddSyllabus: false,
  isRemoveSyllabus: false,
  isProgramUpdate: false,
  updateSyllabusId: -1,
  syllabusList: [],
  trainingSyllabusList: [],
  programData: {
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
  }
};

const trainingProgramDataSlice = createSlice({
  name: 'trainingProgramData',
  initialState,
  reducers: {
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },

    setTrainingProgramData: (state, action) => {
      state.programData = {
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

    resetInitialStateData: () => initialState,

    setIsAddSyllabus: (state, action) => {
      state.isAddSyllabus = action.payload;
    },

    setIsRemoveSyllabus: (state, action) => {
      state.isRemoveSyllabus = action.payload;
    },

    setSyllabusList: (state, action) => {
      state.syllabusList = action.payload;
    },

    setUpdateSyllabusId: (state, action) => {
      state.updateSyllabusId = action.payload;
    },

    setTrainingSyllabusList: (state, action) => {
      state.trainingSyllabusList = action.payload;
    },
    
    setProgramUpdate: (state, action) => {
      state.isProgramUpdate = action.payload;
    }
  }
});

export const { setIsUpdating, 
  setTrainingProgramData,
  resetInitialStateData,
  setIsAddSyllabus,
  setIsRemoveSyllabus,
  setSyllabusList,
  setUpdateSyllabusId,
  setTrainingSyllabusList,
  setProgramUpdate } = trainingProgramDataSlice.actions;
export default trainingProgramDataSlice.reducer;