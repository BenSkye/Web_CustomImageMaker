import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import store from '@/core/store/index';
import CalendarPopover from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/CalendarPopover';
import {
  setTotalPage,
  setCurrentPage,
} from '@/core/store/syllabus-management/paginationPage';
import { setObjRange } from '@/core/store/syllabus-management/tagSearch';
import { setData } from '@/core/store/syllabus-management/syllabusData';

// Mock the useDispatch hook
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

// Mock useSelector hook implementation
const mockState = {
  paginationPage: { currentPage: 0, rowPerPage: 5 },
  tagInputValue: { tagInputValue: '' },
  syllabusSort: { sort: [] },
};

describe('CalendarPopover', () => {
  store.dispatch(setCurrentPage(0));
  store.dispatch(setTotalPage(0));
  store.dispatch(setObjRange({ startDate: null, endDate: null }));
  store.dispatch(setData([]));
  it('renders the CalendarPopover component', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CalendarPopover />
        </Provider>
      </MemoryRouter>
    );

    const calendarPopover = screen.getByLabelText('created_date');
    expect(calendarPopover).toBeInTheDocument();
  });

  it('searches for syllabus data with the selected date range when Search button is clicked', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <CalendarPopover />
        </Provider>
      </MemoryRouter>
    );

    const createdDateButton = screen.getByTestId('created_date');
    fireEvent.click(createdDateButton);

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);
  });
});
