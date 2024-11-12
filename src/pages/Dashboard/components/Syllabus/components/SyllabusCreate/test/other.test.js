import { render, screen, fireEvent } from '@testing-library/react';
import { Others } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/GeneralCreate.jsx';

test('renders Others component', () => {
  render(<Others onOthersDataChange={() => {}} />);

  // Test các phần tử trong component
  const othersTitle = screen.getByText('Others');
  expect(othersTitle).toBeInTheDocument();
});

test('calls handler when others data change', () => {
  const mockOthersDataChange = jest.fn();

  render(<Others onOthersDataChange={mockOthersDataChange} />);

  // Simulate change and check if handler is called
  fireEvent.change(screen.getByLabelText('Training Principles'), {
    target: { value: 'Some training principles' },
  });
  expect(mockOthersDataChange).toHaveBeenCalled();
});
