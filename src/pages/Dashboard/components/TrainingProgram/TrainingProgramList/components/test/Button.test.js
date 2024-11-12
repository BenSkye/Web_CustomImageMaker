import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgramMenuEllipsisButton, RedImportButton, BlackAddNewButton } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/Buttons';

describe('Buttons', () => {
  test('renders program menu ellipsis button with correct menu items', () => {
    render(<ProgramMenuEllipsisButton />);
    const buttonElement = screen.getByText('...');
    expect(buttonElement).toBeInTheDocument();

    const menuItems = ['Training material', 'Edit program', 'Duplicate program', 'De-activate program', 'Delete program'];
    menuItems.forEach(item => {
      const menuItemElement = screen.getByText(item);
      expect(menuItemElement).toBeInTheDocument();
    });
  });

  test('renders red import button and opens modal on click', async () => {
    render(<RedImportButton />);
    const buttonElement = screen.getByText('Import');
    expect(buttonElement).toBeInTheDocument();

    fireEvent.click(buttonElement);
    const modalTitleElement = await screen.findByText('Import Training Program');
    expect(modalTitleElement).toBeInTheDocument();
  });

  test('renders black add new button', () => {
    render(<BlackAddNewButton />);
    const buttonElement = screen.getByText('Add new');
    expect(buttonElement).toBeInTheDocument();
  });
});
