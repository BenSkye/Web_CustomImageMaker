import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Task } from './Task';
import { useTranslation } from 'react-i18next';

export const WeekShow = ({ schedule = [] }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentWeek, setCurrentWeek] = useState(new Date('2024-02-23')); // Change the initial week as needed
  const [tasks, setTasks] = useState({});

  const handleFormattedDate = (taskDate) => {
    return taskDate.toISOString().split('T')[0];
  };

  useEffect(() => {
    const newTasks = {};

    // Flatten the schedule data into tasks for each date
    Object.keys(schedule).forEach((section) => {
      schedule[section].forEach((task) => {
        const taskDate = new Date(`${task.date} ${task.time}`);
        const formattedDate = handleFormattedDate(taskDate);

        if (!newTasks[formattedDate]) {
          newTasks[formattedDate] = [];
        }

        newTasks[formattedDate].push(task.task);
      });
    });

    setTasks(newTasks);
  }, [currentWeek]); // Update tasks when currentWeek changes

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Add your custom logic for handling the selected date here
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(currentWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
  };

  const handlePrevWeek = () => {
    const prevWeek = new Date(currentWeek);
    prevWeek.setDate(currentWeek.getDate() - 7);
    setCurrentWeek(prevWeek);
  };

  const days = 7;

  const calendarDays = [];
  const startOfWeek = new Date(currentWeek);
  startOfWeek.setDate(currentWeek.getDate() - currentWeek.getDay()); // Adjust to start on Sunday (0)

  for (let j = 0; j < days; j++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + j);

    calendarDays.push(currentDate);
  }

  const { t, i18n } = useTranslation();

  return (
    <Box width={'100%'}>
      <Box mb={4} textAlign='center'>
        <Button onClick={handlePrevWeek} mr={2}>
          <GrFormPrevious />
        </Button>
        <span>{`${t('week')}  ${
          i18n.language === 'en'
            ? 'of ' +
              currentWeek.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'của ' +
              currentWeek.toLocaleDateString(undefined, {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
        }`}</span>
        <Button onClick={handleNextWeek} ml={2}>
          <GrFormNext />
        </Button>
      </Box>
      <Box>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>{t('sun')}</Th>
              <Th>{t('mon')}</Th>
              <Th>{t('tue')}</Th>
              <Th>{t('wed')}</Th>
              <Th>{t('thu')}</Th>
              <Th>{t('fri')}</Th>
              <Th>{t('sat')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              {calendarDays.map((date) => (
                <Td
                  key={date ? date.toISOString() : ''}
                  onClick={() => handleDateClick(date)}
                  bgColor={
                    selectedDate && date && selectedDate.toISOString() === date.toISOString()
                      ? 'teal.200'
                      : ''
                  }
                  _hover={date ? { cursor: 'pointer', bgColor: 'teal.100' } : {}}
                >
                  {date && date.getDate()}
                </Td>
              ))}
            </Tr>
            <Tr>
              {calendarDays.map((date) => (
                <Td width={'300px'} border={'1px solid #333'} key={date ? date.toISOString() : ''}>
                  {tasks[date.toISOString().split('T')[0]] &&
                    tasks[date.toISOString().split('T')[0]].map((task, index) => (
                      <Task isWeekShow key={index} task={task} />
                    ))}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
