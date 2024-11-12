import { useState } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CiCalendar } from 'react-icons/ci';
import { Calendar } from 'react-multi-date-picker';

import { convertDate } from '@/utils/convertDate';

export default function TimeFrameAccordion({
  date,
  setDate,
  daysOfWeek,
  setDaysOfWeek,
}) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleChange = (datePick, po) => {
    const formattedDates = new Date(
      datePick.year,
      datePick.month.number - 1,
      datePick.day
    );

    if (po === 'start') {
      setStartDate(formattedDates);
      setDate([formattedDates, endDate]);
    } else {
      setEndDate(formattedDates);
      setDate([startDate, formattedDates]);
    }
  };

  const handlePickerDay = (day) => () => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day));
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  return (
    <>
      <Accordion allowToggle className='third-step'>
        <AccordionItem>
          <h2>
            <AccordionButton
              bg='#2D3748'
              color='white'
              _hover={{ opacity: '0.8' }}
              borderRadius='12px'
            >
              <Flex flex='1' textAlign='left' alignItems={'center'}>
                <CiCalendar />
                <Text ml={2} fontWeight={'bold'}>
                  {t('Time frame')}
                </Text>

                <Text ml={2}>
                  {convertDate(date[0])}{' '}
                  {convertDate(date[date.length - 1]) ? t('to') : ''}{' '}
                  {convertDate(date[date.length - 1])}
                </Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel shadow='md' p='4' rounded='xl' bg='white'>
            <Flex
              w={'100%'}
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <FormControl>
                <FormLabel>{t('Select days of week')}</FormLabel>
                <Flex dir='row' w={'100%'}>
                  <Button
                    borderLeftRadius={'12px'}
                    borderRightRadius={'none'}
                    bg={daysOfWeek.includes(2) ? '#2d3748' : '#e2e8f0'}
                    color={daysOfWeek.includes(2) ? 'white' : 'black'}
                    _hover={{ opacity: '0.8' }}
                    onClick={handlePickerDay(2)}
                  >
                    {t('MON')}
                  </Button>
                  <Button
                    borderRadius={'none'}
                    bg={daysOfWeek.includes(3) ? '#2d3748' : '#e2e8f0'}
                    color={daysOfWeek.includes(3) ? 'white' : 'black'}
                    _hover={{ opacity: '0.8' }}
                    onClick={handlePickerDay(3)}
                  >
                    {t('TUE')}
                  </Button>
                  <Button
                    borderRadius={'none'}
                    bg={daysOfWeek.includes(4) ? '#2d3748' : '#e2e8f0'}
                    color={daysOfWeek.includes(4) ? 'white' : 'black'}
                    _hover={{ opacity: '0.8' }}
                    onClick={handlePickerDay(4)}
                  >
                    {t('WED')}
                  </Button>
                  <Button
                    borderRadius={'none'}
                    bg={daysOfWeek.includes(5) ? '#2d3748' : '#e2e8f0'}
                    color={daysOfWeek.includes(5) ? 'white' : 'black'}
                    _hover={{ opacity: '0.8' }}
                    onClick={handlePickerDay(5)}
                  >
                    {t('THU')}
                  </Button>
                  <Button
                    borderRadius={'none'}
                    bg={daysOfWeek.includes(6) ? '#2d3748' : '#e2e8f0'}
                    color={daysOfWeek.includes(6) ? 'white' : 'black'}
                    _hover={{ opacity: '0.8' }}
                    onClick={handlePickerDay(6)}
                  >
                    {t('FRI')}
                  </Button>
                  <Button
                    borderRadius={'none'}
                    bg={daysOfWeek.includes(7) ? '#2d3748' : '#e2e8f0'}
                    color={daysOfWeek.includes(7) ? 'white' : 'black'}
                    _hover={{ opacity: '0.8' }}
                    onClick={handlePickerDay(7)}
                  >
                    {t('SAT')}
                  </Button>
                  <Button
                    borderLeftRadius={'none'}
                    borderRightRadius={'12px'}
                    bg={daysOfWeek.includes(8) ? '#2d3748' : '#e2e8f0'}
                    color={daysOfWeek.includes(8) ? 'white' : 'black'}
                    _hover={{ opacity: '0.8' }}
                    onClick={handlePickerDay(8)}
                  >
                    {t('SUN')}
                  </Button>
                </Flex>
                <FormHelperText textAlign={'left'}>
                  {' '}
                  {t('Select at least one day!')}
                </FormHelperText>
              </FormControl>

              <Flex my={8} gap={8}>
                <FormControl>
                  <FormLabel>{t('Start date')}</FormLabel>
                  <Calendar
                    numberOfMonths={1}
                    format='DD/MM/YYYY'
                    value={startDate}
                    maxDate={endDate}
                    onChange={(date) => handleChange(date, 'start')}
                    sort
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>{t('End date')}</FormLabel>
                  <Calendar
                    numberOfMonths={1}
                    format='DD/MM/YYYY'
                    minDate={startDate}
                    value={endDate}
                    onChange={(date) => handleChange(date, 'end')}
                    sort
                  />
                </FormControl>
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
