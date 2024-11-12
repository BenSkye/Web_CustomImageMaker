import axios from 'axios';
import api from '@/config/axios/index.js';
import { trainingProgramController } from '@/core/services/TrainingProgram/trainingProgramAPI';

jest.mock('@/config/axios/index.js'); // Mocking the axios instance
const mockProgramData = {
  id: 2,
  topicCode: 'string',
  generalInformation: 'Test 1',
  startTime: '2024-03-14',
  duration: 3,
  status: 2,
  createBy: 'RootAdmin4',
  createDate: '2024-03-14',
  modifyBy: 'Nam',
  modifyDate: '2024-03-28',
  listSyllabus: [
    {
      topicCode: 1,
      topicName: '.NET basic ',
      createdDate: '2024-03-05',
      createdBy: {
        id: 2,
        name: 'RootAdmin2',
        email: 'vuong@gmail.com',
        dob: '2003-02-28',
        roleName: 'SUPER ADMIN',
        phone: '000000001',
        isEnable: true,
        male: true,
      },
      duration: 377,
      status: 1,
      version: '1.0.1',
    },
  ],
  listClasses: [
    {
      id: 9,
      className: 'DevOps Advanced',
      classCode: 'HCM24_DevOps_Advanced_01',
      duration: 3,
      status: 0,
      location: 'HCM',
      createDate: '2024-04-04',
      createBy: {
        id: 4,
        name: 'minhmnd',
        email: 'minhmnd@gmail.com',
        dob: '2003-02-27',
        roleName: 'SUPER ADMIN',
        phone: null,
        isEnable: true,
        male: true,
      },
      fsuEntity: {
        id: 1,
        fsuName: 'FMC',
      },
    },
  ],
};
const mockResponseTrainingUnit = [
  {
    unitCode: 2,
    syllabusCode: 1,
    unitName: "First project",
    dayNumber: 2,
    duration: 0,
    contentList: []
  },
  {
    unitCode: 3,
    syllabusCode: 1,
    unitName: "Basic principle: OOP",
    dayNumber: 2,
    duration: 0,
    contentList: []
  },
  {
    unitCode: 4,
    syllabusCode: 1,
    unitName: "VS code installation",
    dayNumber: 1,
    duration: 0,
    contentList: []
  },
  {
    unitCode: 1,
    syllabusCode: 1,
    unitName: "Introduction to .NET framework",
    dayNumber: 1,
    duration: 3,
    contentList: [
      {
        contentId: 1,
        contentName: "Content 1 for Introduction to .NET framework",
        deliveryType: "1",
        duration: 1,
        isOnline: false,
        note: null,
        learningObjective: "LO1",
        trainingUnit: 1
      },
      {
        contentId: 3,
        contentName: "Content 2 for Introduction to .NET framework",
        deliveryType: "1",
        duration: 1,
        isOnline: false,
        note: null,
        learningObjective: "LO1",
        trainingUnit: 1
      },
      {
        contentId: 2,
        contentName: "Content 3 for Introduction to .NET framework",
        deliveryType: "2",
        duration: 1,
        isOnline: false,
        note: null,
        learningObjective: "LO1",
        trainingUnit: 1
      }
    ]
  },
  {
    unitCode: 17,
    syllabusCode: 1,
    unitName: "Introduction",
    dayNumber: 1,
    duration: 0,
    contentList: []
  },
  {
    unitCode: 18,
    syllabusCode: 1,
    unitName: "Introduction",
    dayNumber: 1,
    duration: 0,
    contentList: []
  }
]
describe('trainingProgramController', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock call history after each test
  });
  test('getProgram returns program data when successful', async () => {
    api.get.mockResolvedValueOnce({ data: mockProgramData });

    const programData = await trainingProgramController.getProgram(2);

    expect(programData).toEqual(mockProgramData);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('trainingPrograms/2');
  });

  test('getProgram returns undefined when response is empty', async () => {
    api.get.mockResolvedValueOnce({});

    const programData = await trainingProgramController.getProgram('123');

    expect(programData).toBeUndefined();
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('trainingPrograms/123');
  });

  test('getSyllabusList returns program data when successful', async () => {
    api.get.mockResolvedValueOnce({ data: mockResponseTrainingUnit });

    const programData = await trainingProgramController.getSyllabusList(1);

    expect(programData).toEqual(mockResponseTrainingUnit);
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('syllabus/training-unit/1');
  });

  test('getSyllabusList returns undefined when response is empty', async () => {
    api.get.mockResolvedValueOnce({});

    const programData = await trainingProgramController.getSyllabusList('123');

    expect(programData).toBeUndefined();
    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith('syllabus/training-unit/123');
  });

  test('returns success message when duplication is successful', async () => {
    const mockResponseData = { message: 'Program duplicated successfully' };
    api.post.mockResolvedValueOnce({ data: mockResponseData });

    const result = await trainingProgramController.duplicateProgram('123');

    expect(result).toEqual({ success: mockResponseData, error: null });
    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('trainingPrograms/duplicate/123');
  });
  test('returns error message when duplication fails due to API error', async () => {
    const mockErrorMessage = 'Error duplicating program';
    api.post.mockRejectedValueOnce({ message: mockErrorMessage });

    const result = await trainingProgramController.duplicateProgram('100000');

    expect(result).toEqual({ success: null, error: mockErrorMessage });
    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('trainingPrograms/duplicate/100000');
  });

  test('returns error message when an exception occurs', async () => {
    const mockErrorMessage = 'Network error';
    api.post.mockRejectedValueOnce(new Error(mockErrorMessage));

    const result = await trainingProgramController.duplicateProgram('100000');

    expect(result).toEqual({ success: null, error: mockErrorMessage });
    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith('trainingPrograms/duplicate/100000');
  });

  test('returns success message when status change is successful', async () => {
    const mockResponseData = { message: 'Status changed successfully' };
    api.delete.mockResolvedValueOnce({ data: mockResponseData });

    const result = await trainingProgramController.changeStatusProgram('123', 1);

    expect(result).toEqual({ success: mockResponseData, error: null });
    expect(api.delete).toHaveBeenCalledTimes(1);
    expect(api.delete).toHaveBeenCalledWith('trainingPrograms/switchStatus/123/1');
  });

  test('returns error message when status change fails due to API error', async () => {
    const mockErrorMessage = 'Error changing status';
    api.delete.mockRejectedValueOnce({ message: mockErrorMessage });

    const result = await trainingProgramController.changeStatusProgram('100000', 2);

    expect(result).toEqual({ success: null, error: mockErrorMessage });
    expect(api.delete).toHaveBeenCalledTimes(1);
    expect(api.delete).toHaveBeenCalledWith('trainingPrograms/switchStatus/100000/2');
  });

  test('returns error message when an exception occurs s', async () => {
    const mockErrorMessage = 'Network error';
    api.delete.mockRejectedValueOnce(new Error(mockErrorMessage));

    const result = await trainingProgramController.changeStatusProgram('100000', 3);

    expect(result).toEqual({ success: null, error: mockErrorMessage });
    expect(api.delete).toHaveBeenCalledTimes(1);
    expect(api.delete).toHaveBeenCalledWith('trainingPrograms/switchStatus/100000/3');
  }); 
})