import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { FaRegCalendar } from 'react-icons/fa';
import { convertDateToDDMMYYYY } from '@/utils/convertDate';
import '@/pages/Dashboard/components/Class/components/ClassView/components/miniCalendarStyle.css';
import 'react-calendar/dist/Calendar.css';

export default function MiniCalendar({ setDatePicked }) {
  const { t } = useTranslation();
  const [setStartDate] = useState(null);
  const [setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDatePicked(convertDateToDDMMYYYY(date));
  }, [date, setDate, setDatePicked]);

  const clearDate = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button display={'flex'} justifyContent={'start'}>
          <FaRegCalendar />{' '}
          <Text ml={3}>{convertDateToDDMMYYYY(date) || 'Created date'}</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Calendar onChange={setDate} value={date} locale='en-US' />
          <Box
            display={'flex'}
            justifyContent={'space-around'}
            alignItems={'center'}
          >
            <Button mt={2} onClick={clearDate} size='sm' colorScheme='red'>
              {t('Clear')}
            </Button>
            <Button
              mt={2}
              onClick={() => setIsOpen(false)}
              size='sm'
              colorScheme='red'
            >
              {t('Close')}
            </Button>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
