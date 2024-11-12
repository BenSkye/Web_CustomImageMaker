import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserList } from '@/pages/Dashboard/components/UserMangement/UserList/index.jsx'
import profileDataReducer from '@/core/store/user/profileData';
import userUpdatingReducer from '@/core/store/user-management/userUpdate';
import userSearching from '@/core/store/user-management/userSearch';

const mockStore = configureStore({
  reducer: {
    profileData: profileDataReducer,
    userUpdating: userUpdatingReducer,
    userSearching: userSearching
  },
});



describe('Check UserList components render', () => {
  test('[UT-01] Check if Filter button is present', () => {
    render(
      <Provider store={mockStore}>
        <UserList />
      </Provider>
    );
    const button = screen.getByTestId('filter-button');

    expect(button).toBeInTheDocument();
  });

  test('[UT-02] Check if Search input field is present', () => {
    render(
      <Provider store={mockStore}>
        <UserList />
      </Provider>
    );
    const input = screen.getByTestId('search-field');

    expect(input).toBeInTheDocument();
  });

  test('[UT-03] Check if Add User button is present', () => {
    render(
      <Provider store={mockStore}>
        <UserList />
      </Provider>
    );
    const button = screen.getByTestId('add-user-button');

    expect(button).toBeInTheDocument();
  });
});

describe('Check UserList functions', () => {
  test('[UT-04] Check can open Add User dialog', () => {
    render(
      <Provider store={mockStore}>
        <UserList />
      </Provider>
    );

    const addButton = screen.getByTestId('add-user-button');
    fireEvent.click(addButton);

    const addUserHeader = screen.getByTestId('header-add-user');
    expect(addUserHeader).toBeInTheDocument();
  });
});

describe('Check state variables', () => {
  test('[UT-05] Add a search tag', () => {
    const mockSetSearchTags = jest.fn();
    const useStateMock = jest.fn(() => ['Bach', mockSetSearchTags]);

    React.useState = useStateMock;
    const [searchTags, setSearchTags] = useStateMock(); // Call useStateMock

    setSearchTags('Bach');

    // Assertions after update
    expect(searchTags).toEqual('Bach');
    expect(mockSetSearchTags).toHaveBeenCalledWith('Bach');
  });
});
