import React, { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Text } from '@chakra-ui/react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import DailySchedule from './DailySchedule';
import { useTranslation } from 'react-i18next';

export const DateShow = ({ schedule = [] }) => {
  const { i18n, t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date('2024-02-23')); // Change the initial month as needed
  const handleFormattedDate = (taskDate) => {
    const parsedDate = new Date(taskDate);
    return parsedDate.toISOString().split('T')[0];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    // Add your custom logic for handling the selected date here
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getWeeksInMonth = () => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear())
    );

    const firstDayWeekday = firstDayOfMonth.getDay();
    const lastDayWeekday = lastDayOfMonth.getDay();

    const daysInMonthCount = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());

    let weeks = Math.ceil((daysInMonthCount + firstDayWeekday) / 7);

    // If the last day is not in the last week, add an additional week
    if (lastDayWeekday < 6) {
      weeks++;
    }

    return weeks;
  };

  const weeks = getWeeksInMonth();
  const days = 7;

  const startDate = new Date(currentMonth);
  startDate.setDate(1);
  startDate.setDate(startDate.getDate() - startDate.getDay() + 7);

  const calendarDays = [];

  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < days; j++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i * days + j);

      if (currentDate.getMonth() === currentMonth.getMonth()) {
        week.push(currentDate);
      }
    }
    calendarDays.push(week);
  }

  // Filter tasks for the selected date
  const selectedDateTasks = selectedDate
    ? [...(schedule.morning || []), ...(schedule.noon || []), ...(schedule.night || [])].filter(
        (task) => {
          return handleFormattedDate(task.date) === selectedDate.toISOString().split('T')[0];
        }
      )
    : [];

  // Display task in that date
  selectedDateTasks.map((s) => console.log(s));

  return (
    <Box width={'100%'} p={4}>
      <Box mb={4} textAlign='center'>
        <Button onClick={handlePrevMonth} mr={2}>
          <GrFormPrevious />
        </Button>
        <span>
          {i18n.language === 'en'
            ? currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            : currentMonth.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}
        </span>
        <Button onClick={handleNextMonth} ml={2}>
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
            {calendarDays.map((week, index) => (
              <Tr key={index}>
                {week.map((date) => (
                  <Td
                    key={date ? date.toISOString() : ''}
                    onClick={() => date && handleDateClick(date)}
                    _hover={date ? { cursor: 'pointer' } : {}}
                  >
                    <Text
                      textAlign={'center'}
                      width={50}
                      borderRadius={'15px'}
                      bgColor={
                        selectedDate && date && selectedDate.toISOString() === date.toISOString()
                          ? '#2D3748'
                          : ''
                      }
                      color={
                        selectedDate && date && selectedDate.toISOString() === date.toISOString()
                          ? '#fff'
                          : ''
                      }
                    >
                      {date && date.getDate()}
                    </Text>
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <DailySchedule data={selectedDateTasks} />
    </Box>
  );
};
