import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { WeekShow } from '@/pages/Dashboard/components/Calendar/components/WeekShow';

// Testing WeekShow Components
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

describe('WeekShow component', () => {
  test('renders correctly with sample data', () => {
    render(
      <MemoryRouter>
        <WeekShow schedule={mockSchedule} />
      </MemoryRouter>
    );

    // Check if the days of the week are rendered
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();

    // Check if the tasks are rendered correctly
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
    expect(screen.getByText('Task 4')).toBeInTheDocument();
  });

  test('handles date click correctly', () => {
    render(
      <MemoryRouter>
        <WeekShow schedule={mockSchedule} />
      </MemoryRouter>
    );

    // Click on a date
    fireEvent.click(screen.getByText('23'));

    // Check if the clicked date is highlighted
    expect(screen.getByText('23')).toHaveStyle('background-color: teal.200');
  });
});
