import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDotsHorizontal, HiOutlineDuplicate } from 'react-icons/hi';
import {
  MdOutlineDeleteForever,
  MdVisibility,
  MdOutlineEdit,
  MdOutlineNavigateNext,
  MdVisibilityOff,
} from 'react-icons/md';
import { setData } from '@/core/store/syllabus-management/syllabusData';
import { setCurrentPage } from '@/core/store/syllabus-management/paginationPage';
import { RiDraftLine } from 'react-icons/ri';
import syllabusService from '@/core/services/SyllabusServices/syllabusController.js';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { setTotalPage } from '@/core/store/syllabus-management/paginationPage';

export const MenuUserItems = ({ item, isAccessible }) => {
  const toast = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tagInputValue = useSelector((state) => state.tagInputValue.tagInputValue);
  const currentPage = useSelector((state) => state.paginationPage.currentPage);
  const rowPerPage = useSelector((state) => state.paginationPage.rowPerPage);
  const sortAttributes = useSelector((state) => state.syllabusSort.sort);
  const objRange = useSelector((state) => state.tagInputValue.objRange);

  // Handle Data API
  const handleDuplicate = async () => {
    try {
      // Make an API call to duplicate the item
      const response = syllabusService.duplicateSyllabus(item.topicCode);

      toast.promise(response, {
        success: { title: t('duplicate_syllabus_success'), description: response.message },
        error: { title: t('duplicate_syllabus_fail'), description: response.message },
        loading: { title: t('duplicate_syllabus_pending'), description: t('please_wait') },
      });

      // Refresh data by fetching the updated syllabus list
      await syllabusService
        .getSyllabusByPage(currentPage, rowPerPage, tagInputValue, sortAttributes, objRange)
        .then((response) => {
          dispatch(setData(response.content));
          dispatch(setTotalPage(response.totalPage));
        })
        .catch((error) => {
          toast({
            title: t('fetching_data_fail'),
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });

      response
        .then(() => {
          dispatch(setCurrentPage(currentPage + 1));
        })
        .catch((error) => {
          toast({
            title: t('duplicate_syllabus_fail'),
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (error) {
      // Handle error, e.g., display an error message
      toast({
        title: t('duplicate_syllabus_fail'),
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async () => {
    try {
      // Make an API call to duplicate the item
      await syllabusService
        .deleteSyllabus(item.topicCode)
        .then(() => {
          toast({
            title: t('delete_syllabus_success'),
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: t('delete_syllabus_fail'),
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return;
        });

      // Refresh data by fetching the updated syllabus list
      await syllabusService
        .getSyllabusByPage(currentPage, rowPerPage)
        .then((newData) => {
          dispatch(setData(newData.content));
        })
        .catch((error) => {
          toast({
            title: t('fetching_data_fail'),
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return;
        });
    } catch (error) {
      toast({
        title: t('delete_syllabus_fail'),
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = async (status) => {
    try {
      await syllabusService
        .updateStatusSyllabus(item.topicCode, status)
        .then((res) => {
          toast({
            title: t('update_syllabus_success'),
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: t('update_syllabus_fail'),
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return;
        });
      // Refresh data by fetching the updated syllabus list

      await syllabusService
        .getSyllabusByPage(currentPage, rowPerPage)
        .then((newData) => {
          dispatch(setData(newData.content));
        })
        .catch((error) => {
          toast({
            title: t('fetching_data_fail'),
            description: error,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return;
        });
    } catch (error) {
      toast({
        title: t('update_syllabus_fail'),
        description: error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<HiOutlineDotsHorizontal />}
          iconSpacing={0}
          backgroundColor='transparent'
          _hover={{ backgroundColor: 'transparent' }}
          data-testid='menu-button'
        ></MenuButton>
        <MenuList padding={3} borderRadius='12px'>
          <MenuItem borderRadius='8px'>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              <Flex flex={1} columnGap={3}>
                <MdOutlineEdit fontSize='1.2rem' />
                <Text onClick={() => navigate(`${item.topicCode}`)} fontWeight='semibold'>
                  {t('editSyllabus')}
                </Text>
              </Flex>
              <MdOutlineNavigateNext color='transparent' />
            </Flex>
          </MenuItem>
          {isAccessible.create && (
            <MenuItem borderRadius='8px'>
              <Flex alignItems='center' width='100%' justifyContent='space-between'>
                <Flex onClick={handleDuplicate} flex={1} columnGap={3}>
                  <HiOutlineDuplicate size='20px' />
                  <Text fontWeight='semibold'>{t('duplicateSyllabus')}</Text>
                </Flex>
                <MdOutlineNavigateNext color='transparent' />
              </Flex>
            </MenuItem>
          )}
          <MenuItem borderRadius='8px'>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              {item.status === 1 || item.status === 3 ? (
                <Flex onClick={() => handleUpdate(2)} flex={1} columnGap={3}>
                  <MdVisibilityOff size='20px' />
                  <Text fontWeight='semibold'>{t('deactivateSyllabus')}</Text>
                </Flex>
              ) : (
                <Flex onClick={() => handleUpdate(1)} flex={1} columnGap={3}>
                  <MdVisibility size='20px' />
                  <Text fontWeight='semibold'>{t('activateSyllabus')}</Text>
                </Flex>
              )}
            </Flex>
          </MenuItem>
          {item.status === 3 && (
            <MenuItem borderRadius='8px'>
              <Flex alignItems='center' width='100%' justifyContent='space-between'>
                <Flex onClick={() => handleUpdate(1)} flex={1} columnGap={3}>
                  <MdVisibility size='20px' />
                  <Text fontWeight='semibold'>{t('activateSyllabus')}</Text>
                </Flex>
              </Flex>
            </MenuItem>
          )}
          {item.status !== 3 && (
            <MenuItem borderRadius='8px'>
              <Flex
                onClick={() => handleUpdate(3)}
                alignItems='center'
                width='100%'
                justifyContent='space-between'
              >
                <Flex flex={1} columnGap={3}>
                  <RiDraftLine size='20px' />
                  <Text fontWeight='semibold'>{t('turnIntoDraft')}</Text>
                </Flex>
              </Flex>
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
