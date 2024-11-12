import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResult } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SearchResult';

describe('SearchResult component', () => {
  test('renders result correctly', () => {
    const result = { syllabusID: 1, topicName: 'Result 1' };
    
    render(
      <SearchResult 
        result={result} 
        setSyllabusID={() => {}} 
        addSelectedOption={() => {}} 
      />
    );
    
    // Assert that the result is rendered correctly
    const resultElement = screen.getByText('Result 1');
    expect(resultElement).toBeInTheDocument();
  });

  test('calls setSyllabusID and addSelectedOption when result is clicked', () => {
    const result = { syllabusID: 1, topicName: 'Result 1' };
    const setSyllabusID = jest.fn();
    const addSelectedOption = jest.fn();
    
    render(
      <SearchResult 
        result={result} 
        setSyllabusID={setSyllabusID} 
        addSelectedOption={addSelectedOption} 
      />
    );
    
    const resultElement = screen.getByText('Result 1');
    
    // Simulate click on the result
    fireEvent.click(resultElement);
    
    // Expect setSyllabusID and addSelectedOption to be called
    expect(setSyllabusID).toHaveBeenCalledWith(1);
    expect(addSelectedOption).toHaveBeenCalled();
  });
});
