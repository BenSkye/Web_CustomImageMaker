import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DailySchedule from '@/pages/Dashboard/components/Calendar/components/DailySchedule';
import { MemoryRouter } from 'react-router-dom';

const mockSchedule = {
  section1: [
    { date: '2024-02-23', time: '12:00', task: 'Task 1' },
    { date: '2024-02-24', time: '14:00', task: 'Task 2' },
  ],
  section2: [
    { date: '2024-02-22', time: '10:00', task: 'Task 3' },
    { date: '2024-02-22', time: '16:00', task: 'Task 4' },
  ],
};

describe('DailySchedule component', () => {
  test('renders correctly with sample data', () => {
    render(
      <MemoryRouter>
        <DailySchedule data={mockSchedule} />
      </MemoryRouter>
    );

    // Check if Morning, Noon, and Night sections are rendered
    expect(screen.getByText('Morning')).toBeInTheDocument();
    expect(screen.getByText('Noon')).toBeInTheDocument();
    expect(screen.getByText('Night')).toBeInTheDocument();

    // Check if tasks are rendered in the respective sections
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  test('renders task in the Morning section if time is between 8 and 12', () => {
    render(
      <MemoryRouter>
        <DailySchedule data={[{ time: '09:30', task: 'Morning Task' }]} />
      </MemoryRouter>
    );

    // Check if the Morning section is rendered
    expect(screen.getByText('Morning')).toBeInTheDocument();

    // Check if the task is rendered in the Morning section
    expect(screen.getByText('Morning Task')).toBeInTheDocument();
  });

  test('renders task in the Noon section if time is between 12 and 17', () => {
    render(
      <MemoryRouter>
        <DailySchedule data={[{ time: '13:30', task: 'Noon Task' }]} />
      </MemoryRouter>
    );

    // Check if the Noon section is rendered
    expect(screen.getByText('Noon')).toBeInTheDocument();

    // Check if the task is rendered in the Noon section
    expect(screen.getByText('Noon Task')).toBeInTheDocument();
  });

  test('renders task in the Night section if time is after 17', () => {
    render(
      <MemoryRouter>
        <DailySchedule data={[{ time: '20:30', task: 'Night Task' }]} />
      </MemoryRouter>
    );

    // Check if the Night section is rendered
    expect(screen.getByText('Night')).toBeInTheDocument();

    // Check if the task is rendered in the Night section
    expect(screen.getByText('Night Task')).toBeInTheDocument();
  });
});
