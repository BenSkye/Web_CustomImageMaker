import React from 'react';
import axios from 'axios';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
  getAllByTestId,
} from '@testing-library/react';
import { AccordionContent } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/components/AccordionContent.jsx';
import { Provider } from 'react-redux';
import { setPermissionList } from '@/core/store/user/permissionList';
import { trainingProgramController } from '@/core/services/TrainingProgram/trainingProgramAPI';
import store from '@/core/store/index';
import { setTrainingProgramDetailData } from '@/core/store/training-program-management/trainingProgramDetail';

describe('Accordion Content Component', () => {
  const detailData = {
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
  const mockDataSyllabus = [
    {
      unitCode: 37,
      syllabusCode: 1,
      unitName: 'Introduction',
      dayNumber: 1,
      duration: 45,
      contentList: [
        {
          contentId: 18,
          contentName: 'sds',
          deliveryType: 'ds',
          duration: 45,
          isOnline: true,
          note: 'asds',
          learningObjective: {
            id: 1,
            name: 'LO1',
            description: 'LO1',
          },
          trainingUnit: 37,
        },
      ],
    },
    {
      unitCode: 38,
      syllabusCode: 1,
      unitName: 'Introduction',
      dayNumber: 1,
      duration: 45,
      contentList: [
        {
          contentId: 19,
          contentName: 'sds',
          deliveryType: 'ds',
          duration: 45,
          isOnline: true,
          note: 'asds',
          learningObjective: {
            id: 2,
            name: 'LO2',
            description: 'LO2',
          },
          trainingUnit: 38,
        },
      ],
    },
  ];
  const groupByDayNumber = (trainingUnit) => {
    const grouped = {};
    Object.values(trainingUnit).forEach((unit) => {
      const dayNumber = unit.dayNumber;
      if (!grouped[dayNumber]) {
        grouped[dayNumber] = [];
      }
      grouped[dayNumber].push(unit);
    });
    return grouped;
  };


  beforeEach(async () => {
    jest.spyOn(store, 'getState').mockReturnValue({
      trainingProgramDetail: { programDetailData: detailData },
      permissionList: { data: { trainingProgramPermission: 1 } },
    });
    store.dispatch(setPermissionList({ trainingProgramPermission: 1 }));
    store.dispatch(
      setTrainingProgramDetailData({ programDetailData: detailData })
    );
    jest
      .spyOn(trainingProgramController, 'getProgram')
      .mockResolvedValue(detailData);
    jest
      .spyOn(trainingProgramController, 'getSyllabusList')
      .mockResolvedValue(mockDataSyllabus);
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard/training-program/2']}>
            <AccordionContent />
          </MemoryRouter>
        </Provider>
      );
      await waitFor(() => {});
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mock calls after each test
  });

  it('renders accordion', () => {
    expect(screen.getByTestId('heading-1')).toBeInTheDocument();
    expect(screen.getByTestId('badge-test')).toBeInTheDocument()
    expect(screen.getByTestId('duration-1')).toBeInTheDocument();
    expect(screen.getByTestId('day-test')).toBeInTheDocument();
  });
  it('correctly groups training units by day number', () => {
    const trainingUnits = [
      { dayNumber: 1, name: 'Unit 1' },
      { dayNumber: 2, name: 'Unit 2' },
      { dayNumber: 1, name: 'Unit 3' },
    ];

    const groupedData = groupByDayNumber(trainingUnits);

    expect(groupedData).toEqual({
      1: [{ dayNumber: 1, name: 'Unit 1' }, { dayNumber: 1, name: 'Unit 3' }],
      2: [{ dayNumber: 2, name: 'Unit 2' }],
    });
  });
});
