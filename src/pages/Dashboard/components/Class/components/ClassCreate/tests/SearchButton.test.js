import { render, screen, fireEvent } from '@testing-library/react';
import SearchButton from '@/pages/Dashboard/components/Class/components/ClassCreate/components/SearchButton.jsx';
import '@testing-library/jest-dom';

describe('SearchButton', () => {
  test('renders search button with placeholder text', () => {
    render(<SearchButton />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toHaveTextContent('Search ...');
  });

  test('calls onOpen prop when clicked', () => {
    const mockOnOpen = jest.fn();
    render(<SearchButton onOpen={mockOnOpen} />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
  });
});
