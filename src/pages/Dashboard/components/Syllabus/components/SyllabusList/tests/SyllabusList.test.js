import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setPermissionList } from '@/core/store/user/permissionList';
import {
  setCurrentPage,
  setRowPerPage,
  setTotalPage,
} from '@/core/store/syllabus-management/paginationPage';
import { setTagInputValue } from '@/core/store/syllabus-management/tagSearch';
import { setSearchSort } from '@/core/store/syllabus-management/syllabusSort';
import { setData } from '@/core/store/syllabus-management/syllabusData';
import store from '@/core/store/index';

import { SyllabusList } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('SyllabusList', () => {
  // Test case 1: Renders component correctly
  it('renders SyllabusList component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SyllabusList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByLabelText('Heading Page')).toBeInTheDocument();
  });

  // Test case 2: Renders access denied message when access is denied
  it('renders access denied message when access is denied', () => {
    store.dispatch(
      setPermissionList({
        syllabusPermission: 5,
        trainingProgramPermission: 5,
        classPermission: 5,
        learningMaterialPermission: 5,
        userManagementPermission: 5,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SyllabusList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Access Denied')).toBeInTheDocument();
  });

  // Test case 3: Renders add button when user has create permission
  it('renders add button when user has create permission', () => {
    store.dispatch(
      setPermissionList({
        syllabusPermission: 2,
        trainingProgramPermission: 5,
        classPermission: 5,
        learningMaterialPermission: 5,
        userManagementPermission: 5,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SyllabusList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Add Button')).toBeInTheDocument();
  });

  // Test case 4: Renders components when access is granted
  it('renders components when access is granted', () => {
    store.dispatch(
      setPermissionList({
        syllabusPermission: 1,
        trainingProgramPermission: 5,
        classPermission: 5,
        learningMaterialPermission: 5,
        userManagementPermission: 5,
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SyllabusList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Heading Page')).toBeInTheDocument();
    expect(screen.queryByLabelText('Access Denied')).not.toBeInTheDocument();
  });

  it('searches correctly with Enter key', async () => {
    // Render the component with the mock store
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SyllabusList />
        </MemoryRouter>
      </Provider>
    );

    // Perform searching action here
    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: 'search term' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    // Assert the expected outcome
    expect(screen.getByPlaceholderText('search')).toHaveValue('search term');
  });

  // Test case 7: Tests handleRemoveSearchTag function
  it('removes search tag correctly', async () => {
    store.dispatch(
      setPermissionList({
        syllabusPermission: 1,
        trainingProgramPermission: 5,
        classPermission: 5,
        learningMaterialPermission: 5,
        userManagementPermission: 5,
      })
    );
    // Render the component
    render(
      <Provider store={store}>
        <MemoryRouter>
          <SyllabusList />
        </MemoryRouter>
      </Provider>
    );

    // Add a tag to the search tags list
    const initialSearchTag = 'tag1';
    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: initialSearchTag } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

    // Simulate removing the tag
    const removeButton = screen.getByLabelText('remove-tag-button');
    fireEvent.click(removeButton);

    // Assert that the tag is removed
    expect(screen.queryByText(initialSearchTag)).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText('remove-tag-button')
    ).not.toBeInTheDocument();
    // Ensure appropriate dispatch actions are called
    // Assert the expected outcome
    expect(screen.getByPlaceholderText('search')).not.toHaveValue(
      initialSearchTag
    );
  });
});
