import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { render, fireEvent, waitFor, screen, renderHook, act } from '@testing-library/react';
import { ClassUpdate } from '@/pages/Dashboard/components/Class/components/ClassUpdate/index.jsx';
import { classDetailController } from '@/core/services/ClassDetail/classDetailAPI.js';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 123 }),
  useNavigate: () => jest.fn(), 
}));

const handleChange = jest.fn();

// Mock the fsuOptions data
const fsuOptions = [
  { id: 1, fsuName: 'FSU 1' },
  { id: 2, fsuName: 'FSU 2' },
];

describe('ClassUpdate Component', () => {
  it('renders class update form', async () => {
    render(
      <Router initialEntries={['/class/edit/123']}>
        <Routes>
          <Route path="/class/edit/:id" element={<ClassUpdate />} />
        </Routes>
      </Router>
    );

    // Check if essential elements are rendered
    expect(await screen.findByTestId('class-card-update')).toBeInTheDocument();
    expect(await screen.findByTestId('class-name-update')).toBeInTheDocument();
    expect(await screen.findByTestId('class-code-update')).toBeInTheDocument();
    expect(await screen.findByTestId('duration-heading-update')).toBeInTheDocument();
    expect(await screen.findByTestId('icons-update')).toBeInTheDocument();
  });

  it('updates class name on input change', async () => {
    render(
      <Router initialEntries={['/class/edit/123']}>
        <Routes>
          <Route path="/class/edit/:id" element={<ClassUpdate />} />
        </Routes>
      </Router>
    );

    const classNameInput = await screen.findByRole('textbox', { name: /class name/i });
    fireEvent.change(classNameInput, { target: { value: 'New Class Name' } });

    expect(classNameInput).toHaveValue('New Class Name');
  });

  it('submits class update form on save button click', async () => {
    render(
      <Router initialEntries={['/class/edit/123']}>
        <Routes>
          <Route path="/class/edit/:id" element={<ClassUpdate />} />
        </Routes>
      </Router>
    );

    const saveButton = await screen.findByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // You may need to mock the API response to test the success scenario
    // Expectations will depend on the behavior of the class update function
  });

  it('displays error message on class update failure', async () => {
    // Mocking classDetailController.UpdateClass to throw an error
    jest.spyOn(classDetailController, 'UpdateClass').mockRejectedValue(new Error('Update failed'));

    render(
      <Router initialEntries={['/class/edit/123']}>
        <Routes>
          <Route path="/class/edit/:id" element={<ClassUpdate />} />
        </Routes>
      </Router>
    );

    const saveButton = await screen.findByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    // Expect error message to be displayed
    expect(await screen.findByText(/an error occurred while updating class details/i)).toBeInTheDocument();
  });
});

