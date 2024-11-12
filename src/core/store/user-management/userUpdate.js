import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isUpdating: false,
  userData: {
    id: null,
    name: "",
    userEmail: "",
    email: "",
    dob: "",
    phone: "",
    updateDate: "",
    male: false,
    roleName: "",
    active: true,
    isEnable: true,
    userPermissionId: 1
  }
};

const userUpdatingSlice = createSlice({
  name: 'userUpdating',
  initialState,
  reducers: {
    setIsUpdating: (state, action) => {
      state.isUpdating = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = {
        id: action.payload.id ?? -1,
        name: action.payload.name ?? "No Name",
        userEmail: action.payload.userEmail ?? "unset@example.com",
        email: action.payload.email ?? "unset@example.com",
        dob: action.payload.dob ?? (new Date()).toISOString(),
        phone: action.payload.phone ?? "000000000",
        updateDate: action.payload.updateDate ?? (new Date()).toISOString(),
        male: action.payload.male ?? false,
        roleName: action.payload.roleName ?? "Trainer",
        active: action.payload.active ?? true,
        userPermissionId: action.payload.userPermissionId ?? 1,
        isEnable: action.payload.isEnable ?? true
      };
    }
  }
});

export const { setIsUpdating, setUserData } = userUpdatingSlice.actions;
export default userUpdatingSlice.reducer;