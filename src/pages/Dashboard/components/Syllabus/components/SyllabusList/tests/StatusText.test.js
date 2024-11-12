import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { StatusText } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/StatusText';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('StatusText', () => {
  it('renders the correct status when number prop is true', () => {
    render(<StatusText data={1} number={true} />);
    const activeStatus = screen.getByText('Active');
    expect(activeStatus).toBeInTheDocument();

    render(<StatusText data={3} number={true} />);
    const draftStatus = screen.getByText('Draft');
    expect(draftStatus).toBeInTheDocument();

    render(<StatusText data={0} number={true} />);
    const inactiveStatus = screen.getByText('Inactive');
    expect(inactiveStatus).toBeInTheDocument();
  });

  it('renders the correct status buttons when number prop is false', () => {
    const data = [
      { name: 'Status 1' },
      { name: 'Status 2' },
      { name: 'Status 3' },
    ];

    render(<StatusText data={data} number={false} id='exampleId' />);
    const statusButtons = screen.getAllByRole('button');
    expect(statusButtons).toHaveLength(3);
    expect(screen.getByText('Status 1')).toBeInTheDocument();
    expect(screen.getByText('Status 2')).toBeInTheDocument();
    expect(screen.getByText('Status 3')).toBeInTheDocument();
  });

  it('navigates to the correct route when "More" button is clicked', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    const data = [
      { name: 'Status 1' },
      { name: 'Status 2' },
      { name: 'Status 3' },
      { name: 'Status 4' },
    ];

    render(<StatusText data={data} number={false} id='exampleId' />);
    const moreButton = screen.getByLabelText('more');
    expect(moreButton).toBeInTheDocument();
  });
});
