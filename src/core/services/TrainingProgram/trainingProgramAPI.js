import api from '@/config/axios/index.js';
import { customParamsSerializer } from '@/utils/generateSortString';

export const trainingProgramController = {
  getProgram: async (id) => {
    try {
      const endpoint = `trainingPrograms/${id}`;
      const response = await api.get(endpoint);
      if (response && response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (err) {
      return err.message;
    }
  },
  getSyllabusList: async (id) => {
    try {
      const endpoint = `syllabus/training-unit/${id}`;
      const response = await api.get(endpoint);
      if (response && response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (err) {
      return err.message;
    }
  },
  duplicateProgram: async (id) => {
      const endpoint = `trainingPrograms/duplicate/${id}`;
      const response = await api.post(endpoint);
      return response
  },
  changeStatusProgram: async (id, status) => {
      const endpoint = `trainingPrograms/switchStatus/${id}/${status}`;
      const response = await api.delete(endpoint);
      return response
  },
  uploadFile: async (trainingContentId, fileData) => {
    try {
      const endpoint = `file/upload/${trainingContentId}`;
      const response = await api.post(endpoint, fileData);
      if (response && response.data) {
        return { message: response.data.message };
      } else {
        return { message: response.data.message };
      }
    } catch (error) {
      return { message: error.message };
    }
  },
  getListOfTrainingMaterail: async (contentId) => {
    try {
      const endpoint = `trainingMaterial/training-content/${contentId}`;
      const response = await api.get(endpoint);
      if (response && response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
  downloadFile: async (trainingId) => {
    try {
      const endpoint = `file/download/${trainingId}`;
      const response = await api.get(endpoint, { responseType: 'blob' });
      if (response && response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
  deleteTrainingMaterial: async (materialId) => {
    try {
      const endpoint = `file/delete/${materialId}`;
      const response = await api.delete(endpoint);
      if (response) {
        return { message: response.data.message };
      } else {
        return { message: response.data.message };
      }
    } catch (error) {
      return { message: error.message };
    }
  },
  updateFileTrainingMaterial: async (materialId, data) => {
    try {
      const endpoint = `file/training-material/update-file/${materialId}`;
      const response = await api.put(endpoint, data);
      if (response) {
        return { message: response.data.message };
      } else {
        return { message: response.data.message };
      }
    } catch (error) {
      return { message: error.message };
    }
  },
  addTrainingProgramSyllabus: async (id, syllabusId) => {
    try {
      const response = await api.post(
        `trainingPrograms/${id}/syllabuses/add?syllabusIds=${syllabusId}`
      );
      if (response && response.data) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },

  removeTrainingProgramSyllabus: async (id, syllabusId) => {
    try {
      const response = await api.post(
        `trainingPrograms/${id}/syllabuses/remove?syllabusIds=${syllabusId}`
      );
      if (response && response.data) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
  updateTrainingProgram: async (
    id,
    startTime,
    topicCode,
    generalInformation,
    status
  ) => {
    try {
      const response = await api.put(`trainingPrograms/update`, {
        id: id,
        startTime: startTime,
        topicCode: topicCode,
        generalInformation: generalInformation,
        status: status,
      });
      if (response && response.data) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
  searchSyllabus: async (keyword) => {
    try {
      const response = await api.get(
        `syllabus/search/text/active-syllabus/${keyword}`,
        {
          paramsSerializer: customParamsSerializer,
          params: {
            pageSize: 5,
            page: 0,
          },
        }
      );
      if (response && response.data) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
};
