import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setData } from '@/core/store/syllabus-management/syllabusData';
import '@testing-library/jest-dom';
import store from '@/core/store/index';
import syllabusService from '@/core/services/SyllabusServices/syllabusController.js';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import AddButton from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/AddButton';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('AddButton', () => {
  it('renders the button with correct text and icon', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <AddButton />
        </Provider>
      </MemoryRouter>
    );

    const addButton = screen.getByRole('button', { name: 'Add Button' });
    expect(addButton).toBeInTheDocument();

    const buttonText = screen.getByText(/add syllabus/i);
    expect(buttonText).toBeInTheDocument();

    const addIcon = screen.getByLabelText('Add Button');
    expect(addIcon).toBeInTheDocument();
  });

  it('navigates to the correct route when clicked', () => {
    render(
      <MemoryRouter>
        <AddButton />
      </MemoryRouter>
    );

    const addButton = screen.getByLabelText('Add Button');
    fireEvent.click(addButton);
  });
});
