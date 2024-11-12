import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';
import { MdOutlineEdit } from 'react-icons/md';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { TbTrashX } from 'react-icons/tb';
import { syllabusDetailController } from '@/core/services/SyllabusServices/syllabusDetailController';
import {
  setSyllabusDetail,
  setIsEditModal,
} from '@/core/store/syllabus-management/syllabus-detail/syllabusDetail';
import { EditModalSyllabus } from './EditModalSyllabus';

export const MenuOfButton = ({ isAccessible }) => {
  const { t } = useTranslation();
  const [alertChangeStatus, setAlertChangeStatus] = useState(false);
  const [alertDelete, setAlertDelete] = useState(false);
  const cancelRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const toastIdRef = React.useRef();
  const syllabusDetail = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const dispatch = useDispatch();
  const toast = useToast();
  const id = syllabusDetail?.topicCode;
  const statusButtonChange = (status) => {
    switch (status) {
      case 1:
        return {
          title: t('deactive_syllabus'),
          icon: <FaRegEyeSlash size={'20px'} />,
        };
      case 2:
        return {
          title: t('active_syllabus'),
          icon: <FaRegEye size={'20px'} />,
        };
      case 3:
        return {
          title: t('active_syllabus'),
          icon: <FaRegEye size={'20px'} />,
        };
      default:
        return <>Invalid Status</>;
    }
  };
  const handleDuplicateSyllabus = async (id) => {
    setLoading(true);
    try {
      const response = await syllabusDetailController.duplicateSyllabus(id);
      if (!response.data.message) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: t('duplicate_syllabus_success'),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'success',
              })}
            </WrapItem>
          </Wrap>
        );
      }
      if (response.data.message) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: t(response.data.message),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'warning',
              })}
            </WrapItem>
          </Wrap>
        );
      }
    } catch (error) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: t('Duplicate is failed'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            })}
          </WrapItem>
        </Wrap>
      );
    } finally {
      setLoading(false);
    }
  };
  const handleChangeStatus = async (id, status) => {
    setLoading(true);
    try {
      switch (status) {
        case 1:
          const response = await syllabusDetailController.updateStatusSyllabus(
            id,
            3
          );
          if (response.data.message) {
            return toast({
              title: t(response.data.message),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          } else {
            return toast({
              title: t('deactive_syllabus_success'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'success',
            });
          }

        case 2:
          const response2 = await syllabusDetailController.updateStatusSyllabus(
            id,
            1
          );
          if (response2.data.message) {
            return toast({
              title: t(response2.data.message),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          } else {
          return toast({
            title: t('active_syllabus_success'),
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'success',
          });
          }
        case 3:
          const response3 = await syllabusDetailController.updateStatusSyllabus(
            id,
            1
          );
          if (response3.data.message) {
            return toast({
              title: t(response3.data.message),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          }
          return toast({
            title: t('active_syllabus_success'),
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'success',
          });
        default:
          return toast({
            title: 'Error',
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'success',
          });
      }
    } catch (error) {
      return toast({
        title: `${error.message}`,
        position: 'top-right',
        isClosable: true,
        duration: 5000,
        status: 'error',
      });
    } finally {
      const reRender = await syllabusDetailController.getSyllabusDetail(id);
      dispatch(setSyllabusDetail(reRender));
      setAlertChangeStatus(false);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      if (syllabusDetail?.status === 2) {
        return toast({
          title: t(`Syllabus has been deleted`),
          position: 'top-right',
          isClosable: true,
          duration: 5000,
          status: 'warning',
        });
      } else {
        const response = await syllabusDetailController.deleteSyllabus(id);
        if (response.data.message) {
          return toast({
            title: t('Syllabus Not Found!'),
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'warning',
          });
        } else {
          return toast({
            title: t('syllabus_delete_success'),
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'success',
          });
        }
      }
    } catch (error) {
      return toast({
        title: `${error.message}`,
        position: 'top-right',
        isClosable: true,
        duration: 5000,
        status: 'error',
      });
    } finally {
      const reRender = await syllabusDetailController.getSyllabusDetail(id);
      dispatch(setSyllabusDetail(reRender));
      setAlertDelete(false);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (loading) {
      toastIdRef.current = toast({
        title: t('loading') + '...',
        position: 'top-right',
        duration: 5000,
        status: 'loading',
      });
    } else {
      toast.close(toastIdRef.current);
    }
  }, [loading]);
  return (
    <>
      <Menu>
        <MenuButton
          fontSize={{ base: '3xl', lg: '5xl', sm: '3xl', md: '3xl' }}
          as={Button}
          colorScheme='#2D3748'
          mr={2}
        >
          <Text textColor={'black'} mb={'50%'}>
            ...
          </Text>
        </MenuButton>
        {isAccessible.modify && (
          <MenuList borderRadius={12}>
            <MenuGroup
              data-testId='manage'
              color={'black'}
              fontSize={'lg'}
              textAlign={'left'}
              title={t('manage')}
            >
              <MenuItem
                fontSize={'md'}
                color={'#2D3748'}
                icon={<MdOutlineEdit size={'20px'} />}
                onClick={() => dispatch(setIsEditModal(true))}
              >
                {t('edit_syllabus')}
              </MenuItem>

              <MenuItem
                fontSize={'md'}
                color={'#2D3748'}
                onClick={() => handleDuplicateSyllabus(id)}
                icon={<HiOutlineDuplicate size={'20px'} />}
              >
                {t('duplicate_syllabus')}
              </MenuItem>
              <MenuItem
                fontSize={'md'}
                color={'#2D3748'}
                onClick={() => setAlertChangeStatus(true)}
                icon={statusButtonChange(syllabusDetail?.status).icon}
              >
                {statusButtonChange(syllabusDetail?.status).title}
              </MenuItem>
              <MenuItem
                fontSize={'md'}
                color={'#2D3748'}
                onClick={() => setAlertDelete(true)}
                icon={<TbTrashX size={'20px'} />}
              >
                {t('delete_syllabus')}
              </MenuItem>
            </MenuGroup>
          </MenuList>
        )}
      </Menu>

      <AlertDialog
        isOpen={alertChangeStatus}
        leastDestructiveRef={cancelRef}
        onClose={() => setAlertChangeStatus(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {statusButtonChange(syllabusDetail?.status).title}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setAlertChangeStatus(false)}
              >
                {t('Cancel')}
              </Button>
              <Button
                colorScheme='blue'
                onClick={() => handleChangeStatus(id, syllabusDetail?.status)}
                ml={3}
              >
                {t('Yes')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={alertDelete}
        leastDestructiveRef={cancelRef}
        onClose={() => setAlertDelete(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {t('delete_syllabus')}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setAlertDelete(false)}>
                {t('Cancel')}
              </Button>
              <Button colorScheme='red' onClick={() => handleDelete(id)} ml={3}>
                {t('Yes')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <EditModalSyllabus />
    </>
  );
};
