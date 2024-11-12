import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { render, waitFor, screen, fireEvent, renderHook, act } from '@testing-library/react';
import { ClassDetail, StatusBar } from '@/pages/Dashboard/components/Class/components/ClassDetail/index.jsx';
import { classDetailController } from '@/core/services/ClassDetail/classDetailAPI.js';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 123 }),
  useNavigate: () => jest.fn(), 
}));

// Mock classDetailController
jest.mock('@/core/services/ClassDetail/classDetailAPI.js');
beforeEach(() => {
  classDetailController.getClassDetail.mockResolvedValue({
    id: 123,
    className: 'Test Class',
    classCode: 'TEST123',
    duration: 60,
    status: 1,
    location: 'Test Location',
    startDate: '2024-04-04T03:01:01.232Z',
    endDate: '2024-04-04T03:01:01.232Z',
    createDate: '2024-04-04T03:01:01.232Z',
    modifyDate: '2024-04-04T03:01:01.232Z',
    createBy: 'Admin',
    updateBy: 'Admin',
    plannedAttendee: 10,
    acceptedAttendee: 5,
    actualAttendee: 3,
    attendeeType: 'Employee',
    fsu: {
      id: 1,
      fsuName: 'Test FSU'
    },
    trainingProgramDto: {
      id: 2,
      topicCode: 'TOPIC123',
      startTime: '2024-04-04T03:01:01.232Z',
      createdDate: '2024-04-04T03:01:01.232Z',
      createBy: 'Admin',
      modifyBy: 'Admin',
      modifyDate: '2024-04-04T03:01:01.232Z',
      duration: 60,
      status: 1,
      generalInformation: 'Test information'
    },
    admin: [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@example.com',
        roleName: 'Admin'
      }
    ],
    trainer: [
      {
        id: 1,
        name: 'Trainer',
        email: 'trainer@example.com',
        roleName: 'Trainer'
      }
    ]
  });
});

afterEach(() => {
  jest.clearAllMocks(); 
});

it('Render heading of class detail', async () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>
  );
  expect(await screen.getByTestId('class-name')).toBeInTheDocument()
  expect(await screen.getByTestId('class-code')).toBeInTheDocument()
  expect(await screen.getByTestId('duration-heading')).toBeInTheDocument()
  expect(await screen.getByTestId('icons')).toBeInTheDocument()
});

it('render edit class button', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>);
  const editButton = screen.getByTestId('edit-button')
  fireEvent.click(editButton);
  const editMenu = screen.getByTestId('edit-menu')
  expect(editMenu).toBeInTheDocument();
})

describe('ClassDetail Component', () => {
  test('opens modal when edit button is clicked', () => {
    render(<ClassDetail />);
    
    fireEvent.click(screen.getByTestId('edit-button'));
    
    expect(screen.getByTestId('edit-menu')).toBeInTheDocument();
  });

});

it('render general table', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>);
  const generalTable = screen.getByTestId('general-table')
  expect(generalTable).toBeInTheDocument();
  const generalButton = screen.getByTestId('general-button')
  fireEvent.click(generalButton);
  expect(generalTable).not.toBeInTheDocument();
})

it('render fresher table', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>);
  const fresherTable = screen.getByTestId('fresher-table')
  expect(fresherTable).toBeInTheDocument();
  const fresherButton = screen.getByTestId('fresher-button')
  fireEvent.click(fresherButton);
  expect(fresherTable).not.toBeInTheDocument();
})

it('render calendar table', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>);
  const calendarTable = screen.getByTestId('calendar-table')
  expect(calendarTable).toBeInTheDocument();
})

it('renders training program tab by default', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>
  );
  const trainingProgramTab = screen.getByTestId('program-tab');
  expect(trainingProgramTab).toBeInTheDocument();
  expect(screen.getByTestId('avatars')).toBeInTheDocument()
  expect(screen.getByTestId('topic-code')).toBeInTheDocument()
  expect(screen.getByTestId('training-program-duration')).toBeInTheDocument()
  expect(screen.getByTestId('training-program-modify')).toBeInTheDocument()
});

it('renders attendee list tab when clicked', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>
  );

  const attendeeListTab = screen.getByText('Attendee List');
  fireEvent.click(attendeeListTab);
  const attendeeTabPanel = screen.getByTestId('attendee-tab');
  expect(attendeeTabPanel).toBeInTheDocument();
});

it('renders budget tab when clicked', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>
  );

  const budgetTab = screen.getByText('Budget');
  fireEvent.click(budgetTab);
  const budgetTabPanel = screen.getByTestId('budget-tab');
  expect(budgetTabPanel).toBeInTheDocument();
});

it('renders others tab when clicked', () => {
  render(
    <Router initialEntries={["/class/123"]}>
      <Routes>
        <Route path='/class/:id' element={<ClassDetail />} />
      </Routes>
    </Router>
  );

  const othersTab = screen.getByText('Others');
  fireEvent.click(othersTab);
  const othersTabPanel = screen.getByTestId('others-tab');
  expect(othersTabPanel).toBeInTheDocument();
});



describe('Trainer and Admin sections', () => {
  it('renders trainer names with information icons', async () => {
    render(
      <Router initialEntries={["/class/123"]}>
        <Routes>
          <Route path='/class/:id' element={<ClassDetail />} />
        </Routes>
      </Router>
    );

    const trainersSection = screen.getByTestId('trainer-names');

    expect(await screen.findByText('Trainer')).toBeInTheDocument();
    expect(trainersSection).toContainHTML('<RiInformationFill');

  });

  it('renders admin names with information icons', async () => {
    render(
      <Router initialEntries={["/class/123"]}>
        <Routes>
          <Route path='/class/:id' element={<ClassDetail />} />
        </Routes>
      </Router>
    );

    const adminsSection = screen.getByTestId('admin-names');

    expect(await screen.findByText('Admin')).toBeInTheDocument();
    expect(adminsSection).toContainHTML('<RiInformationFill');
  });
});