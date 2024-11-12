import api from '@/config/axios';
import { customParamsSerializer } from '@/utils/generateSortString';

const END_POINT = '/syllabus'; // Replace with your actual API base URL

const syllabusController = {
  getSyllabus: async () => {
    try {
      const response = await api.get(`${END_POINT}/all`);
      return response.data;
    } catch (err) {
      return err;
    }
  },

  searchRangeDateSyllabus: async (page = 0, rowPerPage = 5, startDate, endDate) => {
    try {
      const response = await api.get(
        `${END_POINT}/search/date/${startDate}/${endDate}?page=${page}&pageSize=${rowPerPage}`
      );
      return response.data;
    } catch (err) {
      return [];
    }
  },

  deleteSyllabus: async (id) => {
    try {
      await api.delete(`${END_POINT}/deactivate/${id}`);
    } catch (err) {
      throw new Error();
    }
  },

  duplicateSyllabus: async (syllabusId) => {
    try {
      const response = await api.post(`${END_POINT}/duplicate/${syllabusId}`);
      return response;
    } catch (err) {
      return err;
    }
  },

  updateStatusSyllabus: async (id, status) => {
    try {
      const response = await api.put(`${END_POINT}/update/publish-status/${id}/${status}`);
      return response.data;
    } catch (err) {
      return err;
    }
  },

  importSyllabusFile: async (file) => {
    try {
      const formData = new FormData(); // Create a FormData object

      // Append the file to the FormData object
      formData.append('file', file);
      const response = await api.post(`/file${END_POINT}/import`, formData);
      return response.data;
    } catch (err) {
      throw new Error();
    }
  },

  getSyllabusByPage: async (
    page = 0,
    rowPerPage = 5,
    tagInputValue = '',
    sort = [''],
    { startDate = '', endDate = '' } = {}
  ) => {
    try {
      // Convert array of attributes to header string
      let sortString = '';

      if (sort === null || sort.length === 0) {
        sortString = '';
      } else {
        sortString = sort.length > 0 ? sort.join('&sort=') : '';
      }

      let endpoint = `${END_POINT}/all?page=${page}&pageSize=${rowPerPage}`;

      if (startDate.length > 0 && endDate.length > 0) {
        endpoint = `${END_POINT}/search/date/${startDate}/${endDate}?page=${page}&pageSize=${rowPerPage}`;
      } else if (tagInputValue !== '') {
        const encodedTagInputValue = encodeURIComponent(tagInputValue);
        endpoint = `${END_POINT}/search/text/${encodedTagInputValue}?page=${page}&pageSize=${rowPerPage}`;
      }

      const response = await api.get(endpoint, {
        paramsSerializer: customParamsSerializer,
        params: {
          page: page,
          size: rowPerPage,
          sort: sortString,
        },
      });
      return response.data;
    } catch (err) {
      return [];
    }
  },
};

export default syllabusController;
