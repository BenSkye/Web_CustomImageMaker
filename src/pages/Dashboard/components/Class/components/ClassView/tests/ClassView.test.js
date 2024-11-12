import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClassView } from '@/pages/Dashboard/components/Class/components/ClassView/index.jsx';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mocking react-i18next useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('ClassView Component', () => {
  test('renders table headers correctly', () => {
    render(
      <MemoryRouter>
        <ClassView />
      </MemoryRouter>
    );

    // Asserting the presence of table headers
    expect(screen.getByText('Class')).toBeInTheDocument();
    expect(screen.getByText('Class code')).toBeInTheDocument();
    expect(screen.getByText('Created By')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('Attendee')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('FSU')).toBeInTheDocument();
    expect(screen.getByText('Add new class')).toBeInTheDocument();
  });

  test('search input updates globalFilter state', () => {
    render(
      <MemoryRouter>
        <ClassView />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Search by...');

    // Simulating user typing into the search input
    userEvent.type(searchInput, 'test');

    // Asserting that globalFilter state is updated
    expect(searchInput.value).toBe('test');
  });

  test('clicking on pagination buttons updates active state', () => {
    render(
      <MemoryRouter>
        <ClassView />
      </MemoryRouter>
    );
    const nextPageButton = screen.getByRole('button', {
      name: 'Next page',
    });

    const prevPageButton = screen.getByRole('button', {
      name: 'Previous page',
    });

    // Simulating user clicking on next page button
    fireEvent.click(nextPageButton);

    // Asserting that active state is updated after clicking previous page
    const pageLink1 = screen.getByText('2').closest('li');

    // Asserting that the page link has the class "active_page"
    expect(pageLink1).toHaveClass('active_page');

    // Simulating user clicking on previous page button
    fireEvent.click(prevPageButton);

    // Asserting that active state is updated after clicking previous page
    const pageLink2 = screen.getByText('1').closest('li');

    // Asserting that the page link has the class "active_page"
    expect(pageLink2).toHaveClass('active_page');
  });

  // You can write more tests to cover other functionalities of the component
});
