import axios from 'axios';

const ENDPOINT = 'https://65e0d362d3db23f7624a26f6.mockapi.io/api/v1';

export const trainingClassControler = {
  getTrainingClass: async () => {
    const response = await axios.get(`${ENDPOINT}/trainingProgram`);
    return response.data;
  },
};
