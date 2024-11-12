import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SaveButton from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SaveButton';

describe('SaveButton component', () => {
  test('renders the button with correct text', () => {
    render(<SaveButton />);
    const saveButton = screen.getByText('Save');
    expect(saveButton).toBeInTheDocument();
  });

  test('opens popover on button click', async () => {
    render(<SaveButton />);
    const saveButton = screen.getByText('Save');
    
    // Click the save button to open the popover
    fireEvent.click(saveButton);
    
    // Wait for the popover to appear
    await waitFor(() => {
      expect(screen.getByText('SAVED SUCCESSFULLY')).toBeInTheDocument();
      expect(screen.getByText('Your data has been saved!')).toBeInTheDocument();
    });
  });

  test('closes popover on close button click', async () => {
    render(<SaveButton />);
    const saveButton = screen.getByText('Save');
    
    // Click the save button to open the popover
    fireEvent.click(saveButton);
    
    // Wait for the popover to appear
    await waitFor(() => {
      expect(screen.getByText('SAVED SUCCESSFULLY')).toBeInTheDocument();
      expect(screen.getByText('Your data has been saved!')).toBeInTheDocument();
    });
    
    const closeButton = screen.getByLabelText('Close');
    
    // Click the close button to close the popover
    fireEvent.click(closeButton);
    
    // Wait for the popover to close
    await waitFor(() => {
      expect(screen.queryByText('SAVED SUCCESSFULLY')).not.toBeInTheDocument();
      expect(screen.queryByText('Your data has been saved!')).not.toBeInTheDocument();
    });
  });
});
