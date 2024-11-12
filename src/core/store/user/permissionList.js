// {
//     "id": 3,
//     "roleName": "TRAINER",
//     "syllabusPermission": 1,
//     "trainingProgramPermission": 2,
//     "classPermission": 4,
//     "learningMaterialPermission": 4,
//     "userManagementPermission": 5
//   }

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {
        syllabusPermission: 5,
        trainingProgramPermission: 5,
        classPermission: 5,
        learningMaterialPermission: 5,
        userManagementPermission: 5
    }
};

const permissionListSlice = createSlice({
    name: 'permissionList',
    initialState,
    reducers: {
        setPermissionList: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setPermissionList } = permissionListSlice.actions;
export default permissionListSlice.reducer;