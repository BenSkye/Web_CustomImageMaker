import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { General } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/GeneralCreate.jsx';

test('renders General component', () => {
  render(
    <General
      onLevelChange={() => {}}
      onAttendeeNumberChange={() => {}}
      onTechReqChange={() => {}}
      onCourseObjChange={() => {}}
      clearGeneral={false}
      setClearGeneral={() => {}}
    />
  );

  // Test các phần tử trong component
  const levelSelect = screen.getByLabelText('level');
  expect(levelSelect).toBeInTheDocument();

  const attendeeNumberInput = screen.getByLabelText('attendeeNumber');
  expect(attendeeNumberInput).toBeInTheDocument();

  const techReqInput = screen.getByLabelText('technicalRequirement(s)');
  expect(techReqInput).toBeInTheDocument();

  const courseObjEditor = screen.getByLabelText('courseObjects');
  expect(courseObjEditor).toBeInTheDocument();
});

test('calls handlers when inputs change', () => {
  const mockLevelChange = jest.fn();
  const mockAttendeeNumberChange = jest.fn();
  const mockTechReqChange = jest.fn();
  const mockCourseObjChange = jest.fn();

  render(
    <General
      onLevelChange={mockLevelChange}
      onAttendeeNumberChange={mockAttendeeNumberChange}
      onTechReqChange={mockTechReqChange}
      onCourseObjChange={mockCourseObjChange}
      clearGeneral={false}
      setClearGeneral={() => {}}
    />
  );

  // Simulate input change and check if handlers are called
  fireEvent.change(screen.getByLabelText('level'), {
    target: { value: 'Intermediate' },
  });
  expect(mockLevelChange).toHaveBeenCalled();

  fireEvent.change(screen.getByLabelText('attendeeNumber'), {
    target: { value: '50' },
  });
  expect(mockAttendeeNumberChange).toHaveBeenCalled();

  fireEvent.change(screen.getByLabelText('technicalRequirement(s)'), {
    target: { value: 'Some technical requirements' },
  });
  expect(mockTechReqChange).toHaveBeenCalled();

  fireEvent.change(screen.getByLabelText('courseObjects'), {
    target: { value: 'Some course objectives' },
  });
  expect(mockCourseObjChange).toHaveBeenCalled();
});
