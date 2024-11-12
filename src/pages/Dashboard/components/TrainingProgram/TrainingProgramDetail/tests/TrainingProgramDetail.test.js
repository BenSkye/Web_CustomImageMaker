import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { TrainingProgramDetail } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/index.jsx';
import { Provider } from 'react-redux';
import { setPermissionList } from '@/core/store/user/permissionList';
import { trainingProgramController } from '@/core/services/TrainingProgram/trainingProgramAPI';
import store from '@/core/store/index';
import { setTrainingProgramDetailData } from '@/core/store/training-program-management/trainingProgramDetail';
import userEvent from '@testing-library/user-event';

jest.mock('@/core/services/TrainingProgram/trainingProgramAPI');

describe('TrainingProgramDetail Component auth', () => {
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
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const initialState = {
    authentication: {
      roleName: 'SUPER ADMIN',
    },
  };
  it('renders program detail properly', () => {
    trainingProgramController.getProgram.mockResolvedValue(detailData);
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        {/* Call store function with initial state */}
        <MemoryRouter initialEntries={['/dashboard/training-program/2']}>
          <Routes>
            <Route
              path='/dashboard/training-program/:id'
              element={<TrainingProgramDetail />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
  it('Test access denied', () => {
    store.dispatch(
      setPermissionList({
        syllabusPermission: 5,
        trainingProgramPermission: 5,
        classPermission: 5,
        learningMaterialPermission: 5,
        userManagementPermission: 5,
      })
    );
    render(
      <Provider store={store}>
        {/* Call store function with initial state */}
        <MemoryRouter initialEntries={['/dashboard/training-program/2']}>
          <Routes>
            <Route
              path='/dashboard/training-program/:id'
              element={<TrainingProgramDetail />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText('Access Denied')).toBeInTheDocument();
  });
  it('test auth button ... click ', () => {
    store.dispatch(
      setPermissionList({
        syllabusPermission: 5,
        trainingProgramPermission: 1,
        classPermission: 5,
        learningMaterialPermission: 5,
        userManagementPermission: 5,
      })
    );
    trainingProgramController.getProgram.mockResolvedValue(detailData);
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        {/* Call store function with initial state */}
        <MemoryRouter initialEntries={['/dashboard/training-program/2']}>
          <Routes>
            <Route
              path='/dashboard/training-program/:id'
              element={<TrainingProgramDetail />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    const buttonMenu = screen.getByText('...');
    fireEvent.click(buttonMenu);
    expect(getByText('manage')).toBeInTheDocument();
  });
});

describe('TrainingProgramDetail Component', () => {
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
  beforeEach(() => {
    store.dispatch(setPermissionList({ trainingProgramPermission: 1 }));
    store.dispatch(
      setTrainingProgramDetailData({ programDetailData: detailData })
    );
    jest
      .spyOn(trainingProgramController, 'getProgram')
      .mockResolvedValue(detailData);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard/training-program/2']}>
          <TrainingProgramDetail />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders information', async () => {
    await screen.getByTestId('topic-code');
    await screen.getByTestId('status-badge');
    await screen.getByTestId('duration-program');
    await screen.getByTestId('general-heading');
    expect(screen.getByTestId('topic-code')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge')).toBeInTheDocument();
    expect(screen.getByTestId('duration-program')).toBeInTheDocument();
    expect(screen.getByTestId('general-heading')).toBeInTheDocument();
  });
  it('should handle status 1 correctly', async () => {
    jest
      .spyOn(trainingProgramController, 'changeStatusProgram')
      .mockResolvedValue({ id: detailData.id, status: 1 });

    userEvent.click(screen.getByTestId('change-status'));
    expect(
      await jest
        .spyOn(trainingProgramController, 'changeStatusProgram')
        .mockResolvedValue({ id: detailData.id, status: 1 })
    ).toHaveBeenCalledWith(undefined, 1);
  });

  it('should handle duplicate correctly', async () => {
    userEvent.click(screen.getByTestId('duplicate-program'));
    store.dispatch(
      setTrainingProgramDetailData({
        programDetailData: detailData,
        isTriggerModalDuplicate: true,
      })
    );
    jest
      .spyOn(trainingProgramController, 'duplicateProgram')
      .mockResolvedValue(detailData.id);
    userEvent.click(screen.getByText('Duplicate'));
    expect(
      await trainingProgramController.duplicateProgram
    ).toHaveBeenCalledWith(2);
  });
});
