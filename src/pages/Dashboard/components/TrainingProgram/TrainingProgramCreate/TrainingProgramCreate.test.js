import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TrainingProgramCreate from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate';
import { trainingProgramCreateController } from '@/core/services/TrainingProgram/trainingProgramCreateAPI';

jest.mock('@/core/services/TrainingProgram/trainingProgramCreateAPI', () => ({
  searchSyllabuses: jest.fn(),
  createTrainingProgram: jest.fn(),
  addSyllabusTrainingProgram: jest.fn(),
  removeSyllabusTrainingProgram: jest.fn()
}));

describe('TrainingProgramCreate component', () => {
  test('renders header and program name input when createClicked is true', () => {
    render(<TrainingProgramCreate />);
    // Assert that header is rendered
    expect(screen.getByText('New Training Program')).toBeInTheDocument();
    // Assert that program name input is rendered
    expect(screen.getByPlaceholderText('Enter program name')).toBeInTheDocument();
  });

  test('calls createTrainingProgram when program name is entered and button is clicked', async () => {
    const programName = 'Test Program';
    trainingProgramCreateController.createTrainingProgram.mockResolvedValueOnce({ id: 1 });
    render(<TrainingProgramCreate />);

    // Enter program name
    fireEvent.change(screen.getByPlaceholderText('Enter program name'), { target: { value: programName } });

    // Click the create button
    fireEvent.click(screen.getByText('Create'));

    // Wait for createTrainingProgram to be called
    await waitFor(() => {
      expect(trainingProgramCreateController.createTrainingProgram).toHaveBeenCalledWith(programName);
    });

    // Assert that success message is shown
    expect(screen.getByText('Create program success!')).toBeInTheDocument();
  });

  test('renders selected options, search bar, and search result list when createClicked is true', () => {
    render(<TrainingProgramCreate />);
    // Assert that selected options component is rendered
    expect(screen.getByText('Selected Options')).toBeInTheDocument();
    // Assert that search bar component is rendered
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    // Assert that search result list component is rendered
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

});
