import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/Header';

describe('Header component', () => {
  test('renders with createClicked true', () => {
    render(<Header createClicked={true} programName="Test Program" />);
    
    expect(screen.getByText('Test Program')).toBeInTheDocument();
    
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  test('renders with createClicked false', () => {
    render(<Header createClicked={false} />);
    
    // Assert that the header text is rendered correctly
    expect(screen.getByText('Test Program')).toBeInTheDocument();
    
    // Assert that the menu button is not rendered
    expect(screen.queryByText('...')).toBeNull();
  });

  test('renders additional information when createClicked is true', () => {
    render(<Header createClicked={true} />);
    
    // Assert that additional information is rendered
    expect(screen.getByText('... days')).toBeInTheDocument();
    expect(screen.getByText('(... hours)')).toBeInTheDocument();
    expect(screen.getByText('Modified on 23/07/2022 by')).toBeInTheDocument();
    expect(screen.getByText('Warrior Tran')).toBeInTheDocument();
    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });

  test('does not render additional information when createClicked is false', () => {
    render(<Header createClicked={false} />);
    
    // Assert that additional information is not rendered
    expect(screen.queryByText('... days')).toBeNull();
    expect(screen.queryByText('(... hours)')).toBeNull();
    expect(screen.queryByText('Modified on 23/07/2022 by')).toBeNull();
    expect(screen.queryByText('Warrior Tran')).toBeNull();
    expect(screen.queryByTestId('divider')).toBeNull();
  });
});