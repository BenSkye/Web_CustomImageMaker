import { render, screen, fireEvent } from '@testing-library/react';
import SelectTrainingProgram from '@/pages/Dashboard/components/Class/components/ClassCreate/components/SelectTrainingProgram.jsx';
import '@testing-library/jest-dom';

describe('SelectTrainingProgram', () => {
  const trainingProgramList = [
    {
      id: 1,
      programName: 'Program 1',
      createOn: '2022-01-01',
      createBy: 'User 1',
    },
    {
      id: 2,
      programName: 'Program 2',
      createOn: '2022-01-02',
      createBy: 'User 2',
    },
  ];
  const setTrainingProgramSelect = jest.fn();

  test('renders training program list', () => {
    render(
      <SelectTrainingProgram
        trainingProgramList={trainingProgramList}
        setTrainingProgramSelect={setTrainingProgramSelect}
      />
    );

    const program1 = screen.getByText('Program 1');
    const program2 = screen.getByText('Program 2');

    expect(program1).toBeInTheDocument();
    expect(program2).toBeInTheDocument();
  });

  test('calls setTrainingProgramSelect when a program is clicked', () => {
    render(
      <SelectTrainingProgram
        trainingProgramList={trainingProgramList}
        setTrainingProgramSelect={setTrainingProgramSelect}
      />
    );

    const program1 = screen.getByText('Program 1');

    fireEvent.click(program1);

    expect(setTrainingProgramSelect).toHaveBeenCalledWith(
      trainingProgramList[0]
    );
  });
});
