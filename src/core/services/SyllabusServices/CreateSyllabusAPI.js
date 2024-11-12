import api from '@/config/axios';

const ENDPOINT = '/syllabus';

export const createSyllabusAPI = async (syllabusData) => {
  try {
    const response = await api.post(
      `${ENDPOINT}/createdSyllabus`,
      syllabusData
    );
    return response.data; // Trả về dữ liệu từ phản hồi nếu cần
  } catch (error) {
    throw error; // Xử lý lỗi nếu cần
  }
};
export const createOthers = async (othersData) => {
  try {
    const response = await api.post(`${ENDPOINT}/create/other`, othersData);
    return response.data; // Trả về dữ liệu từ phản hồi nếu cần
  } catch (error) {
    throw error; // Xử lý lỗi nếu cần
  }
};
