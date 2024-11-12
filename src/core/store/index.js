import { configureStore } from '@reduxjs/toolkit';
import profileDataReducer from '@/core/store/user/profileData';
import userUpdatingReducer from '@/core/store/user-management/userUpdate';
import tagInputValueReducer from '@/core/store/syllabus-management/tagSearch';
import paginationPage from '@/core/store/syllabus-management/paginationPage';
import syllabusData from '@/core/store/syllabus-management/syllabusData';
import authenticateReducer from '@/core/store/auth/authenticate';
import userSearching from '@/core/store/user-management/userSearch';
import trainingProgramViewReducer from '@/core/store/training-program-management/trainingProgramView';
import trainingProgramDataReducer from '@/core/store/training-program-management/trainingProgramData';
import trainingProgramDetailReducer from '@/core/store/training-program-management/trainingProgramDetail';
import trainingProgramCreateReducer from '@/core/store/training-program-management/trainingProgramCreate';
import syllabusDetailReducer from '@/core/store/syllabus-management/syllabus-detail/syllabusDetail';
import syllabusSort from '@/core/store/syllabus-management/syllabusSort';
import permissionListReducer from '@/core/store/user/permissionList';

const store = configureStore({
  reducer: {
    profileData: profileDataReducer,
    userUpdating: userUpdatingReducer,
    authentication: authenticateReducer,
    userSearching: userSearching,
    trainingProgramView: trainingProgramViewReducer,
    trainingProgramData: trainingProgramDataReducer,
    trainingProgramDetail: trainingProgramDetailReducer,
    syllabusDetail: syllabusDetailReducer,
    tagInputValue: tagInputValueReducer,
    paginationPage: paginationPage,
    syllabusData: syllabusData,
    syllabusSort: syllabusSort,
    trainingProgramCreate: trainingProgramCreateReducer,
    permissionList: permissionListReducer
  },
});

export default store;
