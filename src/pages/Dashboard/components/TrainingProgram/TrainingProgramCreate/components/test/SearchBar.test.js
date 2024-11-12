import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SearchBar';

describe('SearchBar component', () => {
  test('renders with correct placeholder text', () => {
    render(<SearchBar searchTerm="" handleSearchTerm={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search by...');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls handleSearchTerm when input value changes', () => {
    const handleSearchTerm = jest.fn();
    render(<SearchBar searchTerm="" handleSearchTerm={handleSearchTerm} />);
    const inputElement = screen.getByPlaceholderText('Search by...');
    
    fireEvent.change(inputElement, { target: { value: 'test' } });
    
    expect(handleSearchTerm).toHaveBeenCalledTimes(1);
    expect(handleSearchTerm).toHaveBeenCalledWith('test');
  });
});
