import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgramList, MenuProgramItems } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/ProgramList';

describe('ProgramList', () => {
  const mockData = [
    { id: 1, topicCode: 'Topic 1', createdDate: '2022-01-01', createBy: 'User 1', duration: '3', status: 1 },
    { id: 2, topicCode: 'Topic 2', createdDate: '2022-01-02', createBy: 'User 2', duration: '5', status: 2 },
  ];

  test('renders program list with correct data', () => {
    render(<ProgramList data={mockData} />);
    const topic1Element = screen.getByText('Topic 1');
    const topic2Element = screen.getByText('Topic 2');
    expect(topic1Element).toBeInTheDocument();
    expect(topic2Element).toBeInTheDocument();
  });

});

describe('MenuProgramItems', () => {
  test('renders menu items correctly', () => {
    render(<MenuProgramItems />);
    const editUserElement = screen.getByText('Edit User');
    const changeRoleElement = screen.getByText('Change Role');
    const deactiveUserElement = screen.getByText('De-active User');
    const deleteUserElement = screen.getByText('Delete User');
    expect(editUserElement).toBeInTheDocument();
    expect(changeRoleElement).toBeInTheDocument();
    expect(deactiveUserElement).toBeInTheDocument();
    expect(deleteUserElement).toBeInTheDocument();
  });

});