import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgramCard from '@/pages/Dashboard/components/Class/components/ClassCreate/components/ProgramCard.jsx';

describe('ProgramCard', () => {
  const item = {
    programDetailName: 'Test Program',
    status: 'Active',
    programDetailCode: 'ABC123',
  };

  const trainingProgramSelect = {
    ID: 1,
    programName: 'Training Program for Computer Science',
    durationHours: 9,
    durationDays: 20,
    createBy: 'NnnAwympJ',
    createOn: '2023-11-21 20:33:06',
    content: [
      {
        programDetailName: 'ZmuVGlUUnt',
        programDetailCode: 'CBW V.9',
        status: 'Active',
      },
      {
        programDetailName: 'iwJjKiwxlb',
        programDetailCode: 'DWC V.91',
        status: 'Active',
      },
      {
        programDetailName: 'OemqCCOAlQ',
        programDetailCode: 'LMH V.22',
        status: 'Inactive',
      },
      {
        programDetailName: 'jXiCRZgXAf',
        programDetailCode: 'HKM V.13',
        status: 'Inactive',
      },
      {
        programDetailName: 'trBfOeeaIu',
        programDetailCode: 'VRE V.34',
        status: 'Active',
      },
      {
        programDetailName: 'OLsVjlUyoK',
        programDetailCode: 'UDE V.48',
        status: 'Active',
      },
      {
        programDetailName: 'ovECnlMbaf',
        programDetailCode: 'WNW V.80',
        status: 'Active',
      },
      {
        programDetailName: 'AJjsYHbkkI',
        programDetailCode: 'ZGI V.69',
        status: 'Inactive',
      },
      {
        programDetailName: 'ekeBOApNqQ',
        programDetailCode: 'YNC V.86',
        status: 'Inactive',
      },
      {
        programDetailName: 'TYCuZCNAyv',
        programDetailCode: 'CMX V.30',
        status: 'Active',
      },
    ],
  };

  test('renders program name', () => {
    render(
      <ProgramCard item={item} trainingProgramSelect={trainingProgramSelect} />
    );
    const programName = screen.getByText('Test Program');
    expect(programName).toBeInTheDocument();
  });

  test('renders program status', () => {
    render(
      <ProgramCard item={item} trainingProgramSelect={trainingProgramSelect} />
    );
    const programStatus = screen.getByText('Active');
    expect(programStatus).toBeInTheDocument();
  });
});
