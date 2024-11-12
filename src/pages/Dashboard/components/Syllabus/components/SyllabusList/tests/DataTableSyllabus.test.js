import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setData } from '@/core/store/syllabus-management/syllabusData';
import '@testing-library/jest-dom';
import store from '@/core/store/index';
import syllabusService from '@/core/services/SyllabusServices/syllabusController.js';
import { DataTableSyllabus } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/DataTableSyllabus';

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

const mockData = [
  {
    topicCode: 47,
    topicName: 'ádsad',
    codeName: 'Á',
    createdDate: '2024-03-19',
    createdBy: {
      username: 'RootAdmin9',
    },
    duration: 0,
    status: 2,
    learningObjectives: [],
    technicalGroup: 'sadsdadsad',
    trainingAudience: 23,
    topicOutline:
      '<h1><strong class="ql-size-huge"><em>sádfdsfdsfdsfdsdsfds</em></strong></h1>',
    level: 'Beginner',
    version: '1.0.0',
    assessmentScheme: null,
    trainingPrinciples: null,
  },
  {
    topicCode: 46,
    topicName: 'Nhat',
    codeName: 'N',
    createdDate: '2024-03-19',
    createdBy: {
      username: 'RootAdmin9',
    },
    duration: 0,
    status: 2,
    learningObjectives: [],
    technicalGroup: 'ádasdsdasdadsadsa',
    trainingAudience: 30,
    topicOutline:
      '<p><span class="ql-size-huge ql-font-serif">asdsaddasd</span></p>',
    level: 'Intermediate',
    version: '1.0.0',
    assessmentScheme: null,
    trainingPrinciples: null,
  },
  {
    topicCode: 45,
    topicName: 'Springboot basic  Duplicated',
    codeName: 'SBD',
    createdDate: '2024-03-19',
    createdBy: {
      username: 'RootAdmin2',
    },
    duration: 3,
    status: 3,
    learningObjectives: [
      {
        id: 2,
        name: 'LO2',
        description: 'LO2',
      },
    ],
    technicalGroup: 'Technical requirement:\n- t1\n- t2\n- t3',
    trainingAudience: 35,
    topicOutline: 'OUTLINE:\n- 1111\n- 22222\n- CABSRVHAEGDSGRSG',
    level: 'Beginner',
    version: '1.0.0',
    assessmentScheme: {
      id: 31,
      quiz: 30,
      assignment: 40,
      finalPoint: 30,
      finalTheory: 70,
      finalPractical: 30,
      gpa: 60,
    },
    trainingPrinciples: 'hmmmmm(max 1250 character)',
  },
  {
    topicCode: 44,
    topicName: '.NET basic  Duplicated',
    codeName: 'NBD',
    createdDate: '2024-03-19',
    createdBy: {
      username: 'RootAdmin2',
    },
    duration: 3,
    status: 3,
    learningObjectives: [
      {
        id: 1,
        name: 'LO1',
        description: 'LO1',
      },
    ],
    technicalGroup: 'Technical requirement:\n- t1\n- t2\n- t3',
    trainingAudience: 35,
    topicOutline: 'OUTLINE:\n- 1111\n- 22222\n- CABSRVHAEGDSGRSG',
    level: 'Beginner',
    version: '1.0.0',
    assessmentScheme: {
      id: 30,
      quiz: 20,
      assignment: 30,
      finalPoint: 50,
      finalTheory: 60,
      finalPractical: 40,
      gpa: 60,
    },
    trainingPrinciples: 'hmmmmm(max 1250 character)',
  },
  {
    topicCode: 43,
    topicName: 'Software Architecture',
    codeName: 'SA',
    createdDate: '2024-03-18',
    createdBy: {
      username: 'minhmnd',
    },
    duration: 0,
    status: 2,
    learningObjectives: [],
    technicalGroup: 'FPT HCM 2024',
    trainingAudience: 30,
    topicOutline: 'asdfgfd sdfdg',
    level: 'Beginner',
    version: '1.0.0',
    assessmentScheme: null,
    trainingPrinciples: null,
  },
];

describe('DataTableSyllabus', () => {
  it('renders data correctly', async () => {
    store.dispatch(setData(mockData));
    // Render the component with Redux store provider
    render(
      <Provider store={store}>
        <DataTableSyllabus />
      </Provider>
    );
    // Assert that the mock data is displayed correctly
    expect(screen.getByLabelText('topicName')).toBeInTheDocument();
    // Add more assertions as needed
  });

  it('handles pagination correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DataTableSyllabus />
        </MemoryRouter>
      </Provider>
    );

    // Simulate click on the next page button
    const nextPageButton = screen.getByLabelText('Next page');
    fireEvent.click(nextPageButton);

    // Assert the expected outcome of pagination
    // Add assertions based on your pagination logic
  });

  it('displays data correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DataTableSyllabus />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the data is displayed correctly based on your mock state
    // Add assertions to check if the data is rendered properly
  });
});
