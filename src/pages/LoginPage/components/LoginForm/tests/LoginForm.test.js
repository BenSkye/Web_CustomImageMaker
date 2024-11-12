import React from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, getByText } from '@testing-library/react';
import { LoginForm } from '@/pages/LoginPage/components/LoginForm/index.jsx';
import store from '@/core/store';

jest.mock('axios');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      switch (key) {
        case 'email':
          return 'Email';
        case 'password':
          return 'Password';
        case 'login':
          return 'Login';
      }
    },
  }),
}));

describe('LoginForm component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('[UT-01] Check component can render', () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
      , { wrapper: MemoryRouter });
  });

  it('[UT-02] Check input fields', async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
      , { wrapper: MemoryRouter });

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'vuong@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'cfP9mYW5!' } });

    await waitFor(() => {
      expect(emailInput.value).toBe('vuong@gmail.com');
      expect(passwordInput.value).toBe('cfP9mYW5!');
    });
  });

  it('[UT-03] Check submition', async () => {
    const navigateMock = jest.fn();
    const { getByLabelText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter navigate={navigateMock}>
          <LoginForm />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Password');
    const submitButton = getByRole('button', { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: 'vuong@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'cfP9mYW5!' } });
    fireEvent.click(submitButton);

    axios.mockResolvedValueOnce({
      data: {
        "timeStamp": "2024-03-19T06:39:50.389+00:00",
        "accessToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2dW9uZ0BnbWFpbC5jb20iLCJpYXQiOjE3MTA4MzAzOTAsImV4cCI6MTcxMDkxNjc5MH0.hikdwX_jIEqexq-XRPLwior0IQaFBrZ9eAZn2BGMiBY",
        "refreshToken": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxNjk4MzMzNC1lNzIzLTQxNmItOWQ0Mi1jYjdmNTc4MTIzODV2dW9uZ0BnbWFpbC5jb20iLCJpYXQiOjE3MTA4MzAzOTB9.BF9uhGWyFZAaEUctBvgCYOlx471YZlAsLoh62AhCZT8",
        "roles": "SUPER ADMIN"
      }
    });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard', { replace: true });
    });
  });
});
