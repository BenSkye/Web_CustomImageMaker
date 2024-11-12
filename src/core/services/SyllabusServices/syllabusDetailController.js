import api from '@/config/axios';

export const syllabusDetailController = {
  getSyllabusDetail: async (id) => {
    try {
      const response = await api.get(`/syllabus/detail/${id}`);
      if (response && response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (err) {
      return err.message;
    }
  },
  getTrainingUnit: async (id) => {
    try {
      const response = await api.get(`syllabus/training-unit/${id}`);
      if (response && response.data) {
        return response.data;
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
  duplicateSyllabus: async (id) => {
    const response = await api.post(`syllabus/duplicate/${id}`);
    return response;
  },
  updateStatusSyllabus: async (id, status) => {
    const response = await api.put(
      `syllabus/update/publish-status/${id}/${status}`
    );
    return response;
  },
  deleteSyllabus: async (id) => {
      const response = await api.delete(`syllabus/deactivate/${id}`);
      return response
  },
  updateGeneralTab: async (data) => {
    try {
      const response = await api.put(`syllabus/updateGeneralTab`, data);
      if (response) {
        return {
          err: response.data.message,
          message: 'Updated General Tab Successfully',
        };
      }
    } catch (Error) {
      return Error.message;
    }
  },
  updateOtherTab: async (data) => {
    try {
      const response = await api.put(`syllabus/updateOther`, data);
      if (response) {
        return {
          err: response.data.message,
          message: 'Updated Others Tab Successfully',
        };
      }
    } catch (Error) {
      return Error.message;
    }
  },
  addTrainingUnitContent: async (id, data) => {
    try {
      const response = await api.post(
        `training-contents/list/${id}/create`,
        data
      );
      if (response && response.data) {
        return { success: 'Add Success', error: response.data.details };
      } else {
        return response.data.details;
      }
    } catch (error) {
      return error.message;
    }
  },
  getLearningObjectives: async () => {
    try {
      const response = await api.get('learning-objectives');
      if (response) {
        return response.data;
      }
    } catch (err) {
      return err.message;
    }
  },
  editTrainingContent: async (data) => {
    try {
      const response = await api.put(`syllabus/updateTrainingContent`, data);
      if (response === 'undefined') {
        return response.details;
      }
      if (response) {
        return { success: 'Update Success', error: response.details };
      } else {
        return { success: 'Update Success', error: response.details };
      }
    } catch (error) {
      return error.message;
    }
  },
  addTrainingUnit: async (data) => {
    try {
      const response = await api.post(`training-units/add`, data);
      if (response && response.data) {
        return { success: 'Add Success', error: response.data.message };
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
  updateTrainingUnit: async (data) => {
    try {
      const response = await api.put(`syllabus/updateTrainingUnit`, data);
      if (response && response.data) {
        return { success: 'Update Success', error: response.data.details };
      } else {
        return { success: 'Update Success', error: response.data.details };
      }
    } catch (error) {
      return error.message;
    }
  },
  deleteSyllabusByDay: async (day, syllabusId) => {
    try {
      const response = await api.delete(
        `syllabus/training-unit/delete-day?day=${day}&syllabusId=${syllabusId}`
      );
      if (response && response.data) {
        return { success: 'Delete Success', error: response.data.message };
      } else {
        return response;
      }
    } catch (error) {
      return error.message;
    }
  },
  addSyllabusOther: async (data) => {
      const response = await api.post(`syllabus/create/other`, data);
      return response
  },
};
