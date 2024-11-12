import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProgramNameInput from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/ProgramNameInput';

test('renders the input field with the correct placeholder', () => {
  render(<ProgramNameInput />);
  const inputElement = screen.getByPlaceholderText('Search by...');
  expect(inputElement).toBeInTheDocument();
});

test('triggers the handleInputTerm function when input value changes', () => {
  // Mocking handleInputTerm function
  const handleInputTerm = jest.fn();
  
  // Rendering ProgramNameInput component with the mocked function
  render(<ProgramNameInput handleInputTerm={handleInputTerm} />);
  
  // Getting input element by placeholder text
  const inputElement = screen.getByPlaceholderText('Search by...');
  
  // Simulating change event on input element
  fireEvent.change(inputElement, { target: { value: 'test' } });
  
  // Expecting handleInputTerm to be called with 'test'
  expect(handleInputTerm).toHaveBeenCalledWith('test');
});
