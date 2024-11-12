import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Calendar } from '@/pages/Dashboard/components/Calendar';

describe('Calendar component', () => {
  test('renders correctly', () => {
    render(<Calendar />);

    // Check if the "Training Calendar" text is present
    expect(screen.getByText('Training Calendar')).toBeInTheDocument();

    // Check if the search input is rendered
    expect(screen.getByPlaceholderText('Search by...')).toBeInTheDocument();

    // Check if the Day and Week tabs are rendered
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();

    // You can add more assertions based on your component structure
  });

  test('updates global filter state on input change', () => {
    render(
      <MemoryRouter>
        <Calendar />
      </MemoryRouter>
    );

    // Get the search input
    const searchInput = screen.getByPlaceholderText(/Search by.../i);

    // Type into the search input
    fireEvent.change(searchInput, { target: { value: 'example search' } });

    // Check if the global filter state is updated
    expect(searchInput.value).toBe('example search');
  });
});
