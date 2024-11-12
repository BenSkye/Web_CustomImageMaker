import api from '@/config/axios/index.js';

export const classDetailController = {
  getClassDetail: async (id) => {
    const endpoint = `/classes/detail/${id}`
    const response = await api.get(endpoint)
    if (response && response.data) {
      return response.data
    } else {
      console.log('error')
    }
  },

  UpdateClass: async (classData) => {
    const endpoint = `/classes/update`;
    try {
      const response = await api.put(endpoint, classData);
      return response.data;
    } catch (error) {
      console.error('Error updating class detail:', error);
      throw error;
    }
  },

  UpdateClassSyllabus: async (classSyllabusData) => {
    const endpoint = `/classes/updateClassSyllabus`;
    try {
      const response = await api.put(endpoint, classSyllabusData);
      return response.data;
    } catch (error) {
      console.error('Error updating class detail:', error);
      throw error;
    }
  },

  getFSU: async () => {
    const response = await api.get(`/classes/fsu`);
    if (response && response.data) {
      return response.data;
    } else {
      console.error('Response or data is undefined');
    }
  },

  getAllUser: async (page = 0, size = 100) => {
    try {
      const response = await api.get(`/user/`, {
        params: {
          page: page,
          size: size,
          sort: 'asc' // Assuming ascending order is required
        }
      });
      if (response && response.data) {
        return response.data;
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },

  searchTrainingPrograms: async (keyword) => {
    const encodedKeyword = encodeURIComponent(keyword);
    const response = await api.get(`/trainingPrograms/search/${encodedKeyword}`);
    if (response && response.data) {
      return response.data;
    } else {
      console.error('Response or data is undefined');
    }
  },

  trainingProgramDetail: async (trainingProgramID) => {
    const response = await api.get(`/trainingPrograms/${trainingProgramID}`);
    if (response && response.data) {
      return response.data;
    } else {
      console.error('Response or data is undefined');
    }
  },

  getSyllabusDetail: async (syllabusID) => {
    const response = await api.get(`/syllabus/detail/${syllabusID}`);
    if (response && response.data) {
      return response.data;
    } else {
      console.error('Response or data is undefined');
    }
  },

  searchSyllabus: async (keyword) => {
    try {
      const encodedKeyword = encodeURIComponent(keyword);
      const response = await api.get(`/syllabus/search/text/${encodedKeyword}`);

      if (response && response.data) {
        return response.data;
      } else {
        throw new Error('Response or data is undefined');
      }
    } catch (error) {
      console.error('Error searching syllabus:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  },

  getUserDetail: async (userId) => {
    const response = await api.get(`/user?id=${userId}`);
    if (response && response.data) {
      return response.data;
    } else {
      console.error('Response or data is undefined');
    }
  }
}

