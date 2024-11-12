import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Button,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { FaRegCalendar } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { setTotalPage, setCurrentPage } from '@/core/store/syllabus-management/paginationPage';
import { setObjRange } from '@/core/store/syllabus-management/tagSearch';
import { setData } from '@/core/store/syllabus-management/syllabusData';
import syllabusController from '@/core/services/SyllabusServices/syllabusController';
import { generateSortString } from '@/utils/generateSortString';

const CalendarPopover = () => {
  const dispatch = useDispatch();
  const toast = useToast(); // Initialize the useToast hook
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentPage = useSelector((state) => state.paginationPage.currentPage);
  const rowPerPage = useSelector((state) => state.paginationPage.rowPerPage);
  const tagInputValue = useSelector((state) => state.tagInputValue.tagInputValue);
  const sortAttributes = useSelector((state) => state.syllabusSort.sort);

  const formatDate = (date, formatSearch = false) => {
    let day;
    let month;
    let year;
    if (date !== null) {
      day = date.getDate();
      month = date.getMonth() + 1;
      year = date.getFullYear();
      if (formatSearch) {
        return `${year}-${month}-${day}`;
      }
    }

    return `${day}/${month}/${year}`;
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSearchDate = (startDate, endDate) => {
    let sort = [''];
    if (sortAttributes) {
      sort = generateSortString(sortAttributes);
    }
    const startDateFormated = formatDate(startDate, true);
    const endDateFormated = formatDate(endDate, true);

    const objRange = { startDate: startDateFormated, endDate: endDateFormated };
    dispatch(setObjRange(objRange));
    dispatch(setCurrentPage(0));
    syllabusController
      .getSyllabusByPage(0, rowPerPage, tagInputValue.trim(), sort, objRange)
      .then((res) => {
        dispatch(setData(res.content));
        dispatch(setTotalPage(res.totalPage));
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Somethings went wrong, error: ' + err,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const clearDate = async () => {
    setStartDate(null);
    setEndDate(null);
    dispatch(setObjRange({}));
    dispatch(setCurrentPage(0));
    await syllabusController
      .getSyllabusByPage(0, rowPerPage, '', [''], {})
      .then((res) => {
        dispatch(setData(res.content));
        dispatch(setTotalPage(res.totalPage));
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: 'Somethings went wrong, error: ' + err,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const formattedDateRange =
    startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : '';

  return (
    <Popover isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Button
          borderRadius='12px'
          data-testid='created_date'
          display={'flex'}
          justifyContent={'start'}
          width='240px'
        >
          <FaRegCalendar />{' '}
          <Text aria-label='created_date' ml={4}>
            {formattedDateRange || t('created_date')}
          </Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
          <Flex align={'center'} justifyContent={'space-around'}>
            <Button onClick={clearDate}>{t('clear')}</Button>
            <Button onClick={() => handleSearchDate(startDate, endDate)}>{t('search')}</Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CalendarPopover;
