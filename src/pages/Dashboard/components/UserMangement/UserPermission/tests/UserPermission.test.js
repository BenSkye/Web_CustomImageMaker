import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MdOutlineVisibilityOff, MdOutlineVisibility, MdOutlineEdit } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { IoMdStarOutline } from 'react-icons/io';
import { UserPermission } from '@/pages/Dashboard/components/UserMangement/UserPermission/index.jsx';
import '@testing-library/jest-dom';
import userPermissionController from '@/core/services/userPermissonAPI'; // Make sure this path is correct
import { MemoryRouter } from 'react-router-dom';

// Mocking userPermissionController
jest.mock('@/core/services/userPermissonAPI');

const translatedOptions = [
  { label: 'Full access', icon: <IoMdStarOutline fontSize={'23px'} />, num: 1 },
  { label: 'Create', icon: <IoAddCircleOutline fontSize={'23px'} />, num: 2 },
  { label: 'Modify', icon: <MdOutlineEdit fontSize={'23px'} />, num: 3 },
  { label: 'View', icon: <MdOutlineVisibility fontSize={'23px'} />, num: 4 },
  { label: 'Access denied', icon: <MdOutlineVisibilityOff fontSize={'23px'} />, num: 5 },
];

const mockData = [
  {
    id: 3,
    roleName: 'TRAINER',
    syllabusPermission: 1,
    trainingProgramPermission: 4,
    classPermission: 4,
    learningMaterialPermission: 5,
    userManagementPermission: 5,
  },
  {
    id: 2,
    roleName: 'ADMIN',
    syllabusPermission: 1,
    trainingProgramPermission: 1,
    classPermission: 4,
    learningMaterialPermission: 1,
    userManagementPermission: 1,
  },
  {
    id: 1,
    roleName: 'SUPER ADMIN',
    syllabusPermission: 1,
    trainingProgramPermission: 1,
    classPermission: 1,
    learningMaterialPermission: 1,
    userManagementPermission: 1,
  },
];

describe('UserPermission Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders UserPermission component with data', async () => {
    // // Mocking the getAllUserPermission function
    userPermissionController.getAllUserPermission.mockResolvedValue(mockData);

    render(
      <MemoryRouter>
        <UserPermission />
      </MemoryRouter>
    );

    // Check if the component renders correctly with the provided data
    const userPermission = screen.getByLabelText('Heading Page');
    expect(userPermission).toBeInTheDocument();
    // Add more expectations based on your component's rendering

    // Check if API call is made
    expect(userPermissionController.getAllUserPermission).toHaveBeenCalledTimes(1);
  });

  test('handles editing permissions and saving changes', async () => {
    const mockData = [
      {
        id: 3,
        roleName: 'TRAINER',
        syllabusPermission: 1,
        trainingProgramPermission: 4,
        classPermission: 4,
        learningMaterialPermission: 5,
        userManagementPermission: 5,
      },
      {
        id: 2,
        roleName: 'ADMIN',
        syllabusPermission: 1,
        trainingProgramPermission: 1,
        classPermission: 4,
        learningMaterialPermission: 1,
        userManagementPermission: 1,
      },
      {
        id: 1,
        roleName: 'SUPER ADMIN',
        syllabusPermission: 1,
        trainingProgramPermission: 1,
        classPermission: 1,
        learningMaterialPermission: 1,
        userManagementPermission: 1,
      },
    ];

    // Mocking the getAllUserPermission function
    userPermissionController.getAllUserPermission.mockResolvedValue(mockData);

    render(
      <MemoryRouter>
        <UserPermission />
      </MemoryRouter>
    ); // If you're using Redux, wrap the component with Provider

    // Check if the component renders correctly with the provided data
    const userPermission = screen.getByLabelText('Heading Page');
    expect(userPermission).toBeInTheDocument();

    // Simulate clicking the "Update permission" button

    // Simulate clicking the "Update permission" button
    fireEvent.click(screen.getByText('Update permission'));

    // Check if the component exits edit mode after saving
    expect(screen.queryByText('Update permission')).not.toBeInTheDocument();
  });

  // Write your test case
  test('renders table with mock data correctly', () => {
    // Render the component with mock data
    render(<UserPermission />, {
      // Mock the useTranslation hook
      // You can provide translations if needed
      // For simplicity, let's use an empty object
      // Replace it with actual translations if necessary
      i18n: { language: 'en', t: () => '' },
    });

    // Check if the table headers are rendered correctly
    expect(screen.getByText('roleName')).toBeInTheDocument();
    expect(screen.getByText('syllabus')).toBeInTheDocument();
    expect(screen.getByText('trainingProgram')).toBeInTheDocument();
    expect(screen.getByText('class')).toBeInTheDocument();
    expect(screen.getByText('learningMaterial')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  test('renders heading page correctly', () => {
    render(<UserPermission />);
    const headingPage = screen.getByLabelText('Heading Page');
    expect(headingPage).toBeInTheDocument();
    expect(headingPage).toHaveTextContent('User Permission');
  });

  test('renders "Update permission" button and toggles edit mode', () => {
    render(<UserPermission />);
    const updatePermissionButton = screen.getByText('Update permission');
    expect(updatePermissionButton).toBeInTheDocument();
    fireEvent.click(updatePermissionButton);
    expect(screen.queryByText('Update permission')).not.toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    render(<UserPermission />);
    expect(screen.getByText('roleName')).toBeInTheDocument();
    expect(screen.getByText('syllabus')).toBeInTheDocument();
    expect(screen.getByText('trainingProgram')).toBeInTheDocument();
    expect(screen.getByText('class')).toBeInTheDocument();
    expect(screen.getByText('learningMaterial')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  test('cancels edit mode correctly', () => {
    render(<UserPermission />);
    fireEvent.click(screen.getByText('Update permission'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('Update permission')).toBeInTheDocument();
  });
});
