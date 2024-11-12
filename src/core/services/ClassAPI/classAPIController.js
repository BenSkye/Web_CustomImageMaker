import api from '@/config/axios/index.js';
import { useToast } from '@chakra-ui/react';

export const classAPIController = {
  getAllClass: async () => {
    const response = await api.get(`/classes/all`);
    if (response && response.data) {
      return response.data;
    }
    return null;
  },

  searchTrainingPrograms: async (keyword) => {
    const response = await api.get(`/trainingPrograms/search/${keyword}`);
    if (response && response.data) {
      return response.data;
    }
    return null;
  },

  trainingProgramDetail: async (trainingProgramID) => {
    const response = await api.get(`/trainingPrograms/${trainingProgramID}`);
    if (response && response.data) {
      return response.data;
    }
    return null;
  },

  getFSU: async () => {
    const response = await api.get(`/classes/fsu`);
    if (response && response.data) {
      return response.data;
    }
    return null;
  },

  deleteClass: async (classID) => {
    const response = await api.delete(`/classes/deactivate/${classID}`);
    if (response && response.data) {
      return response.data;
    }
    return null;
  },

  getAllUser: async () => {
    const response = await api.get(`user/all?page=0&size=100000&sort=ASC`);
    if (response && response.data) {
      return response.data;
    }
    return null;
  },

  createClass: async (data) => {
    const response = await api.post(`/classes/create`, data);
    if (response && response.data) {
      return response.data;
    }
    return null;
  },
};
