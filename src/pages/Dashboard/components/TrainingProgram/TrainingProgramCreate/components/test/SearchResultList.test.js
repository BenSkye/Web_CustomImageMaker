import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchResultList } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SearchResultList';

describe('SearchResultList component', () => {
  test('renders SearchResult components with correct props', () => {
    const suggestions = [
      { syllabusID: 1, topicName: 'Suggestion 1' },
      { syllabusID: 2, topicName: 'Suggestion 2' },
    ];
    const setSyllabusID = jest.fn();
    const addSelectedOption = jest.fn();
    
    render(
      <SearchResultList 
        suggestions={suggestions} 
        setSyllabusID={setSyllabusID} 
        addSelectedOption={addSelectedOption} 
      />
    );
    
    // Assert that SearchResult components are rendered for each suggestion
    suggestions.forEach((suggestion, index) => {
      const resultElement = screen.getByText(`Suggestion ${index + 1}`);
      expect(resultElement).toBeInTheDocument();
    });
    
    // Assert that SearchResult components are rendered with correct props
    suggestions.forEach(suggestion => {
      const resultElement = screen.getByText(suggestion.topicName);
      expect(resultElement).toBeInTheDocument();
    });
  });
});