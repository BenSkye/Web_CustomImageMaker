import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { TrainingProgramList } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/index';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: jest.fn() }),
}));

jest.mock('@/core/services/TrainingProgram/trainingProgramListAPI', () => ({
  trainingProgramListController: {
    getTrainingProgramList: jest.fn().mockResolvedValue({ content: [{ id: 1, topicCode: 'Topic 1' }] }),
    searchTrainingPrograms: jest.fn().mockResolvedValue([{ id: 1, topicCode: 'Topic 1' }]),
  },
}));

describe('TrainingProgramList', () => {
  test('renders training program list correctly', async () => {
    render(<TrainingProgramList />);
    expect(screen.getByText('TRAINING PROGRAM')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Topic 1')).toBeInTheDocument();
    });
  });

});

