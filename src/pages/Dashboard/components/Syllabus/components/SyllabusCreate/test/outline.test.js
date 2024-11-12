import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Outline } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/OutlineCreate.jsx';
describe('Outline Component', () => {
  test('renders the component', () => {
    render(<Outline />);
    expect(screen.getByText('Add Day')).toBeTruthy();
  });

  test('adding a day', () => {
    render(<Outline />);
    fireEvent.click(screen.getByText('Add Day'));
    expect(screen.getByText('Day 1')).toBeTruthy();
  });

  test('deleting a day', () => {
    render(<Outline />);
    fireEvent.click(screen.getByText('Add Day'));
    fireEvent.click(screen.getByText('Add Day'));
    fireEvent.click(screen.getByText('Add Day'));
    fireEvent.click(screen.getByTestId('delete-day-button-Day-1'));
    expect(screen.queryByText('Day 1')).not.toBeTruthy();
    expect(screen.getAllByText(/^Day/)).toHaveLength(2);
  });

  test('adding a card', () => {
    render(<Outline />);
    fireEvent.click(screen.getByText('Add Day'));
    fireEvent.click(screen.getByText('Add Unit'));
    fireEvent.click(screen.getByTestId('add-card-button'));
    const cardNameInput = screen.getByPlaceholderText('Name Lession');
    fireEvent.change(cardNameInput, { target: { value: 'New Card Name' } });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('New Card Name')).toBeTruthy();
  });
});
