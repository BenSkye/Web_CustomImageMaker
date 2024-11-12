import api from '@/config/axios';
const END_POINT = '/permission';

const userPermissionController = {
  getAllUserPermission: async () => {
    const response = await api.get(`${END_POINT}/all`);
    return response.data;
  },

  updateUserPermission: async (updatedData) => {
    const response = await api.put(`${END_POINT}/update`, updatedData);
    return response.data; // You can return the updated data if needed
  },
};

export default userPermissionController;
