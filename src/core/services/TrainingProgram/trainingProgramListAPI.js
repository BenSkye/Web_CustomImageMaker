import axios from 'axios';
import api from '@/config/axios';
import { customParamsSerializer } from '@/utils/generateSortString';

// const ENDPOINT = 'https://65e04d2dd3db23f76248e362.mockapi.io';
const ENDPOINT = 'http://anataarisa.hopto.org:8080/api/v1/trainingPrograms';

export const trainingProgramListController = {

  getTrainingProgramList: async (pageSize, page, field) => {
    const response = await api.get(`${ENDPOINT}/getTrainingPrograms`,
      {
        paramsSerializer: customParamsSerializer,
        params: {
          size: pageSize,
          page: page,
          sort: field
        }
      })
    if (response && response.data) {
      return response
    } else {

    }
  },

  searchTrainingProgramList: async (keyword = [''], pageSize, page, field) => {
    let keywordString = '';

    if (keyword.length > 0) {
      keywordString += `${keyword[0]}`
      for (let i = 1; i < keyword.length; i++) {
        keywordString += `${keyword[i]}`
      }
    }

    const response = await api.get(`${ENDPOINT}/search/${keyword}`,
      {
        paramsSerializer: customParamsSerializer,
        params: {
          size: pageSize,
          page: page,
          sort: field
        }
      })
    if (response && response.data) {
      return response
    } else {

    }
  },

  duplicateProgram: async (id) => {
    try {
      const response = await api.post(`${ENDPOINT}/duplicate/${id}`);
      if (response && response.data) {
        return { success: response.data, error: null };
      } else {
        return { success: null, error: response.data };
      }
    } catch (error) {
      return { success: null, error: error.message };
    }
  },

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
      }
    } catch (error) {
      throw error
    }
  },

  getTrainingProgramSyllabus: async (id) => {
    try {
      const response = await api.get(`${ENDPOINT}/${id}`);
      if (response && response.data) {
        return response
      } else {

      }
    } catch (error) {
      throw error
    }
  },

  addTrainingProgramSyllabus: async (id, syllabusId) => {
    try {
      const response = await api.post(`${ENDPOINT}/${id}/syllabuses/add?syllabusIds=${syllabusId}`);
      if (response && response.data) {
        return response.data
      } else {
      }
    } catch (error) {
      throw error
    }
  },

  removeTrainingProgramSyllabus: async (id, syllabusId) => {
    try {
      const response = await api.post(`${ENDPOINT}/${id}/syllabuses/remove?syllabusIds=${syllabusId}`);
      if (response && response.data) {
        return response
      } else {
      }
    } catch (error) {
      throw error
    }
  },

  updateTrainingProgram: async (id, startTime, topicCode, generalInformation, status) => {
    try {
      const response = await api.put(`${ENDPOINT}/update`,{
        id: id,
        startTime: startTime,
        topicCode: topicCode,
        generalInformation: generalInformation,
        status: status
      });
      if (response && response.data) {
        return response
      } else {
      }
    } catch (error) {
      throw error
    }
  },

  activateTrainingProgram: async (id, startTime, topicCode, generalInformation) => {
    try {
      const response = await api.put(`${ENDPOINT}/update`,{
        id: id,
        startTime: startTime,
        topicCode: topicCode,
        generalInformation: generalInformation,
        status: 1
      })
      if (response && response.data) {
        return response
      } else {
      }
    } catch (error) {
      throw error
    }
  },

  deactivateTrainingProgram: async (id, startTime, topicCode, generalInformation) => {
    try {
      const response = await api.put(`${ENDPOINT}/update`,{
        id: id,
        startTime: startTime,
        topicCode: topicCode,
        generalInformation: generalInformation,
        status: 2
      })
      if (response && response.data) {
        return response
      } else {
      }
    } catch (error) {
      throw error
    }
  },

  imporTrainingProgram: async (file, duplicateHandle) => {
    try {
      const formData = new FormData();
      formData.append('file', file)
      const response = await api.post(`${ENDPOINT}/import/${duplicateHandle}`, formData);
      return response;
    } catch (err) {
      throw err;
    }
  }

}