import api from '@/config/axios';

const ENDPOINT = '/training-units';

export const createSyllabusUnitDetailAPI = async (syllabusUnitData) => {
  try {
    const response = await api.post(`${ENDPOINT}/detail/add`, syllabusUnitData);
    return response.data; // Trả về dữ liệu từ phản hồi nếu cần
  } catch (error) {
    throw error; // Xử lý lỗi nếu cần
  }
};
export const createSyllabusUnitAPI = async (syllabusUnitData) => {
  try {
    const response = await api.post(`${ENDPOINT}/add`, syllabusUnitData);
    return response.data; // Trả về dữ liệu từ phản hồi nếu cần
  } catch (error) {
    throw error; // Xử lý lỗi nếu cần
  }
};
