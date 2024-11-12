import React from 'react';
import { render, screen } from '@testing-library/react';
import { ActiveStatus, InactiveStatus, DraftStatus } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/Status';

describe('StatusComponents', () => {
  test('renders Active status component', () => {
    render(<ActiveStatus />);
    const activeElement = screen.getByText('Active');
    expect(activeElement).toBeInTheDocument();
    expect(activeElement).toHaveStyle({ background: '#90EE90', color: '#FFF' });
  });

  test('renders Inactive status component', () => {
    render(<InactiveStatus />);
    const inactiveElement = screen.getByText('Inactive');
    expect(inactiveElement).toBeInTheDocument();
    expect(inactiveElement).toHaveStyle({ background: '#2D3748', color: '#FFF' });
  });

  test('renders Draft status component', () => {
    render(<DraftStatus />);
    const draftElement = screen.getByText('Draft');
    expect(draftElement).toBeInTheDocument();
    expect(draftElement).toHaveStyle({ background: '#d3d3d3', color: '#000000' });
  });
});
