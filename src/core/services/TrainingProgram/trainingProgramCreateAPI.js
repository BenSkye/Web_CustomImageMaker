import axios from 'axios';
import api from '@/config/axios/index.js';
import { customParamsSerializer } from '@/utils/generateSortString';

const ENDPOINT = 'http://anataarisa.hopto.org:8080/api/v1';

export const trainingProgramCreateController = {
  searchSyllabus: async (keyword) => {
    try {
      const response = await api.get(`http://anataarisa.hopto.org:8080/api/v1/syllabus/search/text/active-syllabus/${keyword}`,
        {
          paramsSerializer: customParamsSerializer,
          params: {
            size: 5,
            page: 0
          }
        }
      );
      if (response && response.data) {
        return response
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  },

  loadTrainingProgram: async (trainingProgramId) => {
    const response = await api.get(`/trainingPrograms/${trainingProgramId}`);
    if (response && response.data) {
      return response.data
    } else {
      console.error('Response or data is undefined');
    }
  },

  getTrainingProgramSyllabus: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}/trainingPrograms/${id}`);
      if (response && response.data) {
        return response
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  },

  createTrainingProgram: async (topicCode) => {

    const data = {
      startTime: new Date(),
      duration: 0,
      topicCode: topicCode,
      syllabusIdList: [],
      generalInformation: 'Empty'
    }

    const response = await api.post(`trainingPrograms/create`, data);
    if (response && response.data) {
      return response.data
    } else {
      console.error('Response or data is undefined');
    }
  },

  addTrainingProgramSyllabus: async (id, syllabusId) => {
    try {
      const response = await api.post(`${ENDPOINT}/trainingPrograms/${id}/syllabuses/add?syllabusIds=${syllabusId}`);
      if (response && response.data) {
        return response.data
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  },

  removeTrainingProgramSyllabus: async (id, syllabusId) => {
    try {
      const response = await api.post(`${ENDPOINT}/trainingPrograms/${id}/syllabuses/remove?syllabusIds=${syllabusId}`);
      if (response && response.data) {
        return response
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  },

  getTrainingProgramSyllabus: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}/trainingPrograms/${id}`);
      if (response && response.data) {
        return response
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  },

  getTrainingProgramById: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}/trainingPrograms/${id}`);
      if (response && response.data) {
        return response.data
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  },

  duplicateProgram: async (id) => {
    try {
      const response = await api.post(`${ENDPOINT}/trainingPrograms/duplicate/${id}`);
      if (response && response.data) {
        return { success: response.data, error: null };
      } else {
        return { success: null, error: response.data };
      }
    } catch (error) {
      return { success: null, error: error.message };
    }
  },

  activateTrainingProgram: async (id, startTime, topicCode, generalInformation) => {
    try {
      const response = await api.put(`${ENDPOINT}/trainingPrograms/update`,{
        id: id,
        startTime: startTime,
        topicCode: topicCode,
        generalInformation: generalInformation,
        status: 1
      })
      if (response) {
        return response
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  },

  deactivateTrainingProgram: async (id, startTime, topicCode, generalInformation) => {
    try {
      const response = await api.put(`${ENDPOINT}/trainingPrograms/update`,{
        id: id,
        startTime: startTime,
        topicCode: topicCode,
        generalInformation: generalInformation,
        status: 2
      })
      if (response) {
        return response
      } else {
        console.error('Response or data is undefined');
      }
    } catch (error) {
      throw error;
    }
  }
}