import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedOptions from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SelectedOption';

describe('SelectedOptions component', () => {
  test('renders selected options correctly', () => {
    const selectedOptions = [
      { syllabusID: 1, topicName: 'Option 1' },
      { syllabusID: 2, topicName: 'Option 2' },
    ];
    
    render(
      <SelectedOptions 
        selectedOptions={selectedOptions} 
        removeSelectedOption={() => {}} 
        setSyllabusID={() => {}} 
      />
    );
    
    // Assert that each selected option is rendered
    selectedOptions.forEach(option => {
      expect(screen.getByText(option.topicName)).toBeInTheDocument();
    });
  });

  test('calls setSyllabusID and removeSelectedOption when option is clicked', () => {
    const selectedOptions = [
      { syllabusID: 1, topicName: 'Option 1' },
    ];
    const setSyllabusID = jest.fn();
    const removeSelectedOption = jest.fn();
    
    render(
      <SelectedOptions 
        selectedOptions={selectedOptions} 
        removeSelectedOption={removeSelectedOption} 
        setSyllabusID={setSyllabusID} 
      />
    );
    
    const optionElement = screen.getByText('Option 1');
    
    // Simulate click on the option
    fireEvent.click(optionElement);
    
    // Expect setSyllabusID and removeSelectedOption to be called
    expect(setSyllabusID).toHaveBeenCalledWith(1);
    expect(removeSelectedOption).toHaveBeenCalled();
  });
});
