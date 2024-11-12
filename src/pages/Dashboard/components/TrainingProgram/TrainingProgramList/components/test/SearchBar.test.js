import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/SearchBar'; 

describe('SearchBar component', () => {
  test('renders search bar with placeholder text', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText('Search by...');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls handleSearchTerm when input value changes', () => {
    const handleSearchTerm = jest.fn();
    render(<SearchBar handleSearchTerm={handleSearchTerm} />);
    const inputElement = screen.getByPlaceholderText('Search by...');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(handleSearchTerm).toHaveBeenCalled();
  });

  test('calls handleSearching when filter button is clicked', () => {
    const handleSearching = jest.fn();
    render(<SearchBar handleSearching={handleSearching} />);
    const filterButton = screen.getByText('Filter');
    fireEvent.click(filterButton);
    expect(handleSearching).toHaveBeenCalled();
  });
});
