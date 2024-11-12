import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Spinner,
  useToast,
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { PopupModal } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/PopupModal';
import CalendarPopover from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/CalendarPopover';
import AddButton from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/AddButton';
import { DataTableSyllabus } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/DataTableSyllabus';
import {
  setTotalPage,
  setCurrentPage,
  setRowPerPage,
} from '@/core/store/syllabus-management/paginationPage';
import { setData } from '@/core/store/syllabus-management/syllabusData';
import syllabusService from '@/core/services/SyllabusServices/syllabusController.js';
import { setTagInputValue } from '@/core/store/syllabus-management/tagSearch';
import { setSearchSort } from '@/core/store/syllabus-management/syllabusSort';
import { generateSortString } from '@/utils/generateSortString';
import useAuthorization from '@/hooks/useAuthorization';

export const SyllabusList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const tagInputValue = useSelector(
    (state) => state.tagInputValue.tagInputValue
  );
  const currentPage = useSelector((state) => state.paginationPage.currentPage);
  const rowPerPage = useSelector((state) => state.paginationPage.rowPerPage);
  const sortAttributes = useSelector((state) => state.syllabusSort.sort);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTags, setSearchTags] = useState([]);

  // Get Role Permission
  const { syllabusPermission } = useSelector(
    (state) => state.permissionList.data
  );
  const { isAccessible } = useAuthorization(syllabusPermission);

  const fetchData = async () => {
    let sort = [''];
    if (sortAttributes) {
      sort = generateSortString(sortAttributes);
    }
    syllabusService
      .getSyllabusByPage(currentPage, rowPerPage, tagInputValue, sort)
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [sortAttributes]);

  useEffect(() => {
    dispatch(setTagInputValue(''));
    dispatch(setCurrentPage(0));
    dispatch(setRowPerPage(5));
    dispatch(setSearchSort([]));
    fetchData();
  }, []);

  const handleAddSearchTag = async () => {
    if (tagInputValue.trim() !== '') {
      // Check if the tag already exists
      if (searchTags.includes(tagInputValue.trim())) {
        return;
      }
      try {
        syllabusService
          .getSyllabusByPage(currentPage, rowPerPage, tagInputValue.trim())
          .then((res) => {
            dispatch(setData(res.content));
            dispatch(setTotalPage(res.totalPage));
          })
          .catch((err) =>
            toast({
              title: 'Error',
              description: 'Somethings went wrong, error: ' + err,
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          )
          .finally(() => {
            setIsLoading(false);
          });
        setSearchTags([...searchTags, tagInputValue.trim()]);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Somethings went wrong, error: ' + err,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleRemoveSearchTag = (tagToRemove) => {
    dispatch(setTagInputValue(''));
    dispatch(setCurrentPage(0));
    dispatch(setRowPerPage(5));
    dispatch(setSearchSort([]));
    setSearchTags(searchTags.filter((tag) => tag !== tagToRemove));
    fetchData();
  };

  return (
    <Box p='1rem' display='flex' flexDir={'column'} w='100%'>
      <Text
        aria-label='Heading Page'
        m={2}
        textAlign='left'
        mt={3}
        fontWeight='semibold'
      >
        {t('syllabus')}
      </Text>

      <Spacer />

      {isAccessible.denied ? (
        <Text
          aria-label='Access Denied'
          m={2}
          textAlign='left'
          mt={3}
          fontWeight='semibold'
          color={'red.400'}
        >
          {t('access_denied')}
        </Text>
      ) : (
        <>
          <Flex
            width='100%'
            flexWrap='wrap'
            columnGap={3}
            rowGap={3}
            justifyContent='space-between'
          >
            <Flex
              justifyContent='flex-start'
              flexDirection={{ md: 'row', base: 'column' }}
              columnGap={3}
              rowGap={3}
            >
              <InputGroup width='240px'>
                <InputLeftElement pointerEvents='none'>
                  <FaSearch color='gray.500' />
                </InputLeftElement>
                <Input
                  borderRadius='12px'
                  type='text'
                  placeholder={t('search')}
                  value={tagInputValue}
                  onChange={(e) => dispatch(setTagInputValue(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddSearchTag();
                    }
                  }}
                />
              </InputGroup>
              <CalendarPopover />
            </Flex>
            {isAccessible.create && (
              <Flex
                flexDirection={{ md: 'row', base: 'column' }}
                columnGap={3}
                rowGap={3}
              >
                <PopupModal isAccessible={isAccessible} />
                <AddButton />
              </Flex>
            )}
          </Flex>
          <Box mt='0.6rem'>
            <Flex>
              {searchTags.map((tag, index) => (
                <Tag
                  key={index}
                  size='md'
                  borderRadius='full'
                  variant='solid'
                  backgroundColor='#474747'
                  color='#FFF'
                  height='32px'
                >
                  <Text pr='0.4rem'>{tag}</Text>
                  <MdOutlineClose
                    aria-label='remove-tag-button'
                    __hover={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveSearchTag(tag)}
                  />
                </Tag>
              ))}
            </Flex>
          </Box>
          {isLoading ? (
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          ) : (
            <DataTableSyllabus />
          )}
        </>
      )}
    </Box>
  );
};
