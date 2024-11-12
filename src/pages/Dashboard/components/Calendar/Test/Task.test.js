import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Task } from '@/pages/Dashboard/components/Calendar/components/Task';

describe('Task component', () => {
  test('renders correctly with default props', () => {
    render(<Task task='Sample Task' />);

    // Check if the task button is rendered
    expect(screen.getByText('Sample Task')).toBeInTheDocument();
  });

  test('renders popover content on button click', () => {
    render(<Task task='Sample Task' />);

    // Click on the task button to open the popover
    fireEvent.click(screen.getByText('Sample Task'));

    // Check if the popover content is rendered
    expect(screen.getByText('Business Analyst Foundation')).toBeInTheDocument();
    expect(screen.getByText('Day 10 of 20')).toBeInTheDocument();
    expect(screen.getByText('MVC Architecture in ASP.NET')).toBeInTheDocument();
  });
});
