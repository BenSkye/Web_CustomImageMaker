import { renderHook, act } from '@testing-library/react-hooks';
import useSyllabusSorting from './useSyllabusSorting';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchSort } from '@/core/store/syllabus-management/syllabusSort';

// Mock useDispatch and useSelector
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('useSyllabusSorting', () => {
  it('should initialize typeSort state correctly', () => {
    // Write test case to check initial state of typeSort
    // Render the hook
    const { result } = renderHook(() => useSyllabusSorting());
    // Verify the initial state of typeSort
    expect(result.current.typeSort).toEqual({
      topicName: { active: false, asc: false },
      codeName: { active: false, asc: false },
      createdDate: { active: false, asc: false },
      duration: { active: false, asc: false },
      createdBy: { active: false, asc: false },
    });
  });

  it('should toggle sorting attributes correctly', () => {
    // Write test case to check if sorting attributes are toggled correctly
    // Mock useDispatch
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    // Render the hook
    const { result } = renderHook(() => useSyllabusSorting());
    // Toggle sorting attribute
    act(() => {
      result.current.handleSortToggle('topicName');
    });
    // Verify if sorting attribute is toggled correctly
    expect(result.current.typeSort.topicName).toEqual({ active: true, asc: true });
    // Toggle again to check if toggle works correctly
    act(() => {
      result.current.handleSortToggle('topicName');
    });
    expect(result.current.typeSort.topicName).toEqual({ active: true, asc: false });
  });

  it('should dispatch setSearchSort action with correct attributes when sorting attributes are active', () => {
    // Write test case to check if setSearchSort action is dispatched correctly
    // Mock useDispatch
    const dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);
    // Render the hook
    const { result } = renderHook(() => useSyllabusSorting());
    // Toggle sorting attributes
    act(() => {
      result.current.handleSortToggle('topicName');
      result.current.handleSortToggle('createdDate');
    });
    // Verify if setSearchSort action is dispatched with correct attributes
    expect(dispatch).toHaveBeenCalledWith(
      setSearchSort([
        { attribute: 'topicName', asc: true },
        { attribute: 'createdDate', asc: true },
      ])
    );
  });

  // Add more test cases as needed to cover other scenarios
});
