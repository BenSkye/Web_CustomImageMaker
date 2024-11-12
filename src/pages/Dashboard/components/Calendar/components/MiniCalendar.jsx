import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaRegCalendar } from 'react-icons/fa';
import { convertDateToDDMMYYYY } from '@/utils/convertDate';
import '@/pages/Dashboard/components/Class/components/ClassView/components/miniCalendarStyle.css';

export default function MiniCalendar({ setDatePicked }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDatePicked(convertDateToDDMMYYYY(date));
    console.log('datePicked', convertDateToDDMMYYYY(date));
  }, [date, setDate]);

  const clearDate = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const formattedDateRange =
    startDate && endDate
      ? `${convertDateToDDMMYYYY(startDate)} - ${convertDateToDDMMYYYY(endDate)}`
      : '';

  return (
    <Popover isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button display={'flex'} justifyContent={'start'}>
          <FaRegCalendar /> <Text ml={3}>{convertDateToDDMMYYYY(date) || 'Created date'}</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Calendar onChange={setDate} value={date} locale='en-US' />
          <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
            <Button mt={2} onClick={clearDate} size='sm' colorScheme='red'>
              Clear
            </Button>
            <Button mt={2} onClick={() => setIsOpen(false)} size='sm' colorScheme='red'>
              Close
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
