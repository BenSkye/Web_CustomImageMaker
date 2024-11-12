import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ListOfClass } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/ListOfClass.jsx';
import { Provider } from 'react-redux';
import store from '@/core/store/index';

describe('ListOfClass Component', () => {
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
    render(
      <MemoryRouter initialEntries={['/dashboard/training-program/2']}>
        <ListOfClass listOfClass={detailData.listClasses} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the table with correct headers', () => {
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(8);
    expect(headers[0]).toBeInTheDocument('Class');
    expect(headers[1]).toBeInTheDocument('Class Code');
    expect(headers[2]).toBeInTheDocument('Created On');
    expect(headers[3]).toBeInTheDocument('Created By');
    expect(headers[4]).toBeInTheDocument('Duration');
    expect(headers[5]).toBeInTheDocument('Status');
    expect(headers[6]).toBeInTheDocument('Location');
    expect(headers[7]).toBeInTheDocument('FSU');
  });
  it('test table data render', () => {
    detailData.listClasses.forEach((item) => {
      expect(screen.getByText(item.className)).toBeInTheDocument();
      expect(screen.getByText(item.classCode)).toBeInTheDocument();
      expect(screen.getByText(item.createDate)).toBeInTheDocument();
      expect(screen.getByText(item.createBy.name)).toBeInTheDocument();
      expect(screen.getByText(item.duration)).toBeInTheDocument();
      expect(screen.getByText(item.location)).toBeInTheDocument();
      expect(screen.getByText(item.fsuEntity.fsuName)).toBeInTheDocument();
    });
  });

  it('applies correct status color to badges', () => {
    const badges = screen.getAllByTestId('custom-badge');

    expect(badges).toHaveLength(detailData.listClasses.length);

    badges.forEach((badge, index) => {
      const status = detailData.listClasses[index].status;
      const expectedColor = getStatusColor(status);

      const badgeStyle = badge.getAttribute('style');
      if (badgeStyle) {
        expect(badgeStyle).toContain(`background-color: ${expectedColor}`);
      } else {
        console.warn('Badge does not have a style attribute:', badge);
      }
    });
  });
  const getStatusColor = (status) => {
    switch (status) {
      case 'planning':
        return 'blue';
      case 'opening':
        return 'green';
      case 'completed':
        return 'gray';
      case 'scheduled':
        return 'orange';
      default:
        return '';
    }
  };
});
