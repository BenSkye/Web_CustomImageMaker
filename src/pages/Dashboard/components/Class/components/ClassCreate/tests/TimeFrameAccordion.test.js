import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TimeFrameAccordion from '@/pages/Dashboard/components/Class/components/ClassCreate/components/TimeFrameAccordion.jsx';

describe('TimeFrameAccordion', () => {
  test('renders accordion button with correct text', () => {
    render(<TimeFrameAccordion />);
    const accordionButton = screen.getByRole('button');
    expect(accordionButton).toBeInTheDocument();
    expect(accordionButton).toHaveTextContent('Time frame');
  });
});
