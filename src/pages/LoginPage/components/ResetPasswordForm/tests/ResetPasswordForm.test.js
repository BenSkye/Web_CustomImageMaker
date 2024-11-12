import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ResetPasswordForm } from '@/pages/LoginPage/components/ResetPasswordForm/index.jsx';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      switch (key) {
        case 'email':
          return 'Email';
      }
    },
  }),
}));

describe('ResetPasswordForm component', () => {
  it('[UT-01] Check component can render', () => {
    render(<ResetPasswordForm />, { wrapper: MemoryRouter });
  });

  it('[UT-02] Check input fields', async () => {
    const { getByLabelText } = render(<ResetPasswordForm />, { wrapper: MemoryRouter });

    const emailInput = getByLabelText('Email');

    fireEvent.change(emailInput, { target: { value: 'vuong@gmail.com' } });

    await waitFor(() => {
      expect(emailInput.value).toBe('vuong@gmail.com');
    });
  });
});
