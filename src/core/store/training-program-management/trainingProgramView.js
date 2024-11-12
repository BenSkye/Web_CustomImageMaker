import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchString: '',
  syllabusSearchString: '',
  page: 0,
  size: 5,
  update: false,
  updateSyllabus: false,
  updateStatus: false,
  modalIsOpen: false,
  totalElement: 0,
  totalPage: 0,
  lastPage: false,
  firstPage: true,
  trainingProgramList: [],
  searchTags: [],
  tag: '',
  isAddTag: false,
  isRemoveTag: false,
  sortType: 'id',
  sortAsc: false,
  sort: [
    {id: { active: true, asc: false }},
    {topicCode: { active: false, asc: true }},
    {createdDate: { active: false, asc: true }},
    {createBy: { active: false, asc: true }},
    {duration: { active: false, asc: true }},
    {status: { active: false, asc: true }},
  ]
};

const trainingProgramViewSlice = createSlice({
  name: 'trainingProgramView',
  initialState,
  reducers: {
    setProgramSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    setCurrentProgramPage: (state, action) => {
      state.page = action.payload;
    },
    setProgramPageSize: (state, action) => {
      state.size = action.payload;
    },
    setUpdate: (state, action) => {
      state.update = action.payload;
    },
    setUpdateSyllabus: (state, action) => {
      state.updateSyllabus = action.payload;
    },
    setSortType: (state, action) => {
      state.sort = action.payload;
    },
    setUpdateStatus: (state, action) => {
      state.updateStatus = action.payload;
    },
    resetInitialState: () => initialState,
    setTrainingProgramList: (state, action) => {
      state.trainingProgramList = action.payload;
    },
    setModalIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
    setSyllabusSearchString: (state, action) => {
      state.syllabusSearchString = action.payload;
    },
    setTotalElement: (state, action) => {
      state.totalElement = action.payload;
    },
    setTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    setLastPage: (state, action) => {
      state.lastPage = action.payload;
    },
    setFirstPage: (state, action) => {
      state.firstPage = action.payload;
    },
    setSearchTags: (state, action) => {
      state.searchTags = action.payload;
    },
    setTag: (state, action) => {
      state.tag = action.payload;
    },
    setIsAddTag: (state, action) => {
      state.isAddTag = action.payload;
    },
    setIsRemoveTag: (state, action) => {
      state.isRemoveTag = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortType = action.payload;
    },
    setSortAsc: (state, action) => {
      state.sortAsc = action.payload;
    }
  }
});

export const { setProgramSearchString,
  setCurrentProgramPage,
  setProgramPageSize,
  setSortType, 
  setUpdate,
  setUpdateSyllabus,
  setUpdateStatus,
  resetInitialState,
  setTrainingProgramList,
  setModalIsOpen,
  setSyllabusSearchString,
  setTotalElement,
  setTotalPage,
  setLastPage,
  setFirstPage,
  setSearchTags,
  setTag, 
  setIsAddTag, 
  setIsRemoveTag,
  setSortBy, setSortAsc } = trainingProgramViewSlice.actions;
export default trainingProgramViewSlice.reducer;

