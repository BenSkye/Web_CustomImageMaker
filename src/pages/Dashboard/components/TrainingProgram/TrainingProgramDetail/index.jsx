import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useNavigate,
  useParams,
  useHistory,
} from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { MdOutlineEdit } from 'react-icons/md';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { TbTrashX } from 'react-icons/tb';
import { AccordionContent } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/components/AccordionContent.jsx';
import { ListOfClass } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/ListOfClass.jsx';
import { trainingProgramController } from '@/core/services/TrainingProgram/trainingProgramAPI';
import { EditModal } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/components/EditModal.jsx';
import { DuplicateButton } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/components/DuplicateButton.jsx';
import {
  setDuplicateModal,
  setEditModal,
  setIsUpdated,
  setTrainingProgramDetailData,
  resetState,
} from '@/core/store/training-program-management/trainingProgramDetail';
import useAuthorization from '@/hooks/useAuthorization';

export const TrainingProgramDetail = () => {
  const dispatch = useDispatch();
  const programDetail = useSelector(
    (state) => state.trainingProgramDetail.programDetailData
  );
  const isUpdated = useSelector(
    (state) => state.trainingProgramDetail.isUpdated
  );
  const authenticate = useSelector((state) => state.authentication.roleName);
  const { id } = useParams();
  const { t } = useTranslation();
  const toast = useToast();
  const { trainingProgramPermission } = useSelector(
    (state) => state.permissionList.data
  );
  const { isAccessible } = useAuthorization(trainingProgramPermission);
  const navigate = useNavigate();
  const handleInformation = (data) => {
    if (!data) {
      return <></>;
    } else {
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      return (
        <>
          {lines.map((line, index) => (
            <Text key={index}>{line.trim()}</Text>
          ))}
        </>
      );
    }
  };
  const handleChangeStatus = async (id, status) => {
    try {
      let response;
      switch (status) {
        case 1:
          response = await trainingProgramController.changeStatusProgram(id, 3);
          if (response.data.message) {
            return toast({
              title: t('Training program not found'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          } else {
            return toast({
              title: t('Deactive program success'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'success',
            });
          }
        case 2:
          response = await trainingProgramController.changeStatusProgram(id, 1);
          if (response.data.message) {
            return toast({
              title: t('Training program not found'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          } else {
            return toast({
              title: t('Active program success'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'success',
            });
          }
        case 3:
          response = await trainingProgramController.changeStatusProgram(id, 1);
          if (response.data.message) {
            return toast({
              title: t('Training program not found'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          } else {
            return toast({
              title: t('Active program success'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'success',
            });
          }
        default:
          response = 'ERROR';
      }
    } catch (error) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: t('Error'),
              description: error.message,
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            })}
          </WrapItem>
        </Wrap>
      );
    } finally {
      const reRender = await trainingProgramController.getProgram(id);
      dispatch(setTrainingProgramDetailData(reRender));
    }
  };

  const statusRender = (status) => {
    switch (status) {
      case 1:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            variant='outline'
            mb={2}
            color={'white'}
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
            data-testId='status-badge'
          >
            {t('active')}
          </Badge>
        );
      case 2:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            variant='outline'
            mb={2}
            color={'white'}
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
            data-testId='status-badge'
          >
            {t('inactive')}
          </Badge>
        );
      case 3:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            variant='outline'
            mb={2}
            color={'white'}
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
            data-testId='status-badge'
          >
            {t('Draft')}
          </Badge>
        );
      default:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            variant='outline'
            mb={2}
            color={'white'}
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
            data-testId='status-badge'
          >
            {t('Invalid status')}
          </Badge>
        );
    }
  };
  const statusButtonChange = (status) => {
    switch (status) {
      case 1:
        return {
          title: t('deactive_program'),
          icon: <FaRegEyeSlash size={'20px'} />,
        };
      case 2:
        return {
          title: t('active_program'),
          icon: <FaRegEye size={'20px'} />,
        };
      case 3:
        return {
          title: t('active_program'),
          icon: <FaRegEye size={'20px'} />,
        };
      default:
        return <>Invalid Status</>;
    }
  };

  const handleDeleteProgram = async (id, status) => {
    try {
      let response;
      switch (status) {
        case 1:
          response = await trainingProgramController.changeStatusProgram(id, 2);
          if (response.data.message) {
            return toast({
              title: t('Training program not found'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          } else {
            return toast({
              title: t('Delete program success'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'success',
            });
          }
        case 3:
          response = await trainingProgramController.changeStatusProgram(id, 2);
          if (response.data.message) {
            return toast({
              title: t('Training program not found'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            });
          } else {
            return toast({
              title: t('Delete program success'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'success',
            });
          }
        case 2:
          return toast({
            title: t('Program has been deleted'),
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'warning',
          });
        default:
          response = 'ERROR';
      }
    } catch (error) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: t('Error occur when delete program'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            })}
          </WrapItem>
        </Wrap>
      );
    } finally {
      const reRender = await trainingProgramController.getProgram(id);
      dispatch(setTrainingProgramDetailData(reRender));
    }
  };
  const truncateDecimal = (number, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.trunc(number * factor) / factor;
  };

  useEffect(() => {
    const fetchData = async (programId) => {
      const response = await trainingProgramController.getProgram(programId);
      if (response) {
        dispatch(setTrainingProgramDetailData(response));
      }
    };
    if (id) {
      fetchData(id);
    }
    if (isUpdated) {
      fetchData(id);
      dispatch(setIsUpdated(false));
    }
  }, [dispatch, id, isUpdated]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  return (
    <>
      {isAccessible.denied ? (
        <>
          <Box
            mt={{ base: 0, md: 0, lg: 1, sm: 0 }}
            bg='#2D3748'
            w={'100%'}
            textAlign={'left'}
            p={6}
            pb={2}
            color='white'
          >
            <Text
              data-testId='heading'
              textAlign='left'
              mt={3}
              fontWeight='semibold'
            >
              {t('training_program')}
            </Text>
            <Text
              aria-label='Access Denied'
              textAlign='left'
              mt={3}
              fontWeight='semibold'
              color={'red.400'}
            >
              {t('access_denied')}
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Box
            mt={{ base: 0, md: 0, lg: 1, sm: 0 }}
            bg='#2D3748'
            w={'100%'}
            textAlign={'left'}
            p={6}
            pb={2}
            color='white'
          >
            <Text
              data-testId='heading'
              textAlign='left'
              mt={3}
              fontWeight='semibold'
            >
              {t('training_program')}
            </Text>
            <br />
            <Flex>
              <Box w={{ base: '100%', sm: '100%', md: '100%', lg: '40%' }}>
                <Text
                  data-testId='topic-code'
                  fontSize={{ base: '2xl', sm: '2xl', md: '2xl', lg: '4xl' }}
                  as='kbd'
                >
                  {programDetail?.topicCode}
                </Text>
                {statusRender(programDetail?.status)}
              </Box>
              <Box w={'60%'} textAlign={'right'}>
                {isAccessible.modify ? (
                  <Menu>
                    <MenuButton
                      fontSize={{
                        base: '3xl',
                        lg: '5xl',
                        sm: '3xl',
                        md: '3xl',
                      }}
                      as={Button}
                      colorScheme='#2D3748'
                    >
                      <Text data-testId='popup-button' mb={'50%'}>
                        ...
                      </Text>
                    </MenuButton>
                    <MenuList>
                      <MenuGroup
                        data-testId='manage'
                        color={'black'}
                        fontSize={'lg'}
                        textAlign={'left'}
                        title={t('manage')}
                      >
                        <MenuItem
                          data-testId='edit-program'
                          onClick={() => dispatch(setEditModal(true))}
                          fontSize={'md'}
                          color='#2D3748'
                          icon={<MdOutlineEdit size={'20px'} />}
                        >
                          {t('edit_program')}
                        </MenuItem>
                        <MenuItem
                          data-testId='duplicate-program'
                          onClick={() => dispatch(setDuplicateModal(true))}
                          fontSize={'md'}
                          color='#2D3748'
                          icon={<HiOutlineDuplicate size={'20px'} />}
                        >
                          {t('duplicate_program')}
                        </MenuItem>
                        {programDetail?.duration ? (
                          <>
                            <MenuItem
                              data-testId='change-status'
                              onClick={() =>
                                handleChangeStatus(id, programDetail?.status)
                              }
                              fontSize={'md'}
                              color='#2D3748'
                              icon={
                                statusButtonChange(programDetail?.status).icon
                              }
                            >
                              {statusButtonChange(programDetail?.status).title}
                            </MenuItem>
                            <MenuItem
                              data-testId='delete-program'
                              onClick={() =>
                                handleDeleteProgram(id, programDetail?.status)
                              }
                              fontSize={'md'}
                              color='#2D3748'
                              icon={<TbTrashX size={'20px'} />}
                            >
                              {t('delete_program')}
                            </MenuItem>
                          </>
                        ) : (
                          <>
                            <Tooltip
                              label='Duration must be greater than 0 to change status'
                              placement='auto-start'
                            >
                              <MenuItem
                                data-testId='change-status'
                                fontSize={'md'}
                                color='#2D3748'
                                isDisabled={true}
                                icon={
                                  statusButtonChange(programDetail?.status).icon
                                }
                              >
                                {
                                  statusButtonChange(programDetail?.status)
                                    .title
                                }
                              </MenuItem>
                            </Tooltip>
                            <Tooltip
                              label='Duration must be greater than 0 to delete'
                              placement='auto-start'
                            >
                              <MenuItem
                                data-testId='delete-program'
                                onClick={() =>
                                  handleDeleteProgram(id, programDetail?.status)
                                }
                                fontSize={'md'}
                                color='#2D3748'
                                icon={<TbTrashX size={'20px'} />}
                                isDisabled={
                                  programDetail?.duration ? false : true
                                }
                              >
                                {t('delete_program')}
                              </MenuItem>
                            </Tooltip>
                          </>
                        )}
                      </MenuGroup>
                    </MenuList>
                  </Menu>
                ) : (
                  <></>
                )}
              </Box>
            </Flex>
          </Box>
          <Box
            pl={3}
            py={3}
            w={'100%'}
            textAlign={'left'}
            fontSize={'lg'}
            borderBottom={'solid 2px black'}
          >
            <Text>
              <span
                data-testId='duration-program'
                style={{ fontSize: '2rem', fontWeight: 'bold' }}
              >
                {truncateDecimal(
                  programDetail?.duration
                    ? programDetail?.duration / 60 / 24
                    : 0,
                  2
                )}
              </span>{' '}
              {t('day')}{' '}
              <span style={{ fontStyle: 'italic' }}>
                (
                {truncateDecimal(
                  programDetail?.duration ? programDetail?.duration / 60 : 0,
                  2
                )}{' '}
                {t('hour')})
              </span>
            </Text>
            <Text>
              {t('modified_on')}{' '}
              <span style={{ fontStyle: 'italic' }}>
                {programDetail?.modifyDate}
              </span>{' '}
              {t('by')}{' '}
              <span style={{ fontWeight: 'bold' }}>
                {programDetail?.modifyBy}
              </span>
            </Text>
          </Box>
          <Box pl={3} w={'100%'} textAlign={'left'} fontSize={'lg'}>
            <Heading
              data-testId='general-heading'
              fontSize={{ base: '1rem', lg: '1.5rem' }}
              fontWeight='semibold'
            >
              {t('general_information')}
            </Heading>
            <Box
              data-testId='general-information'
              mt={5}
              borderRadius={'1rem'}
              w={{ base: '80%' }}
              px={3}
              py={5}
              background='#FAFAFA'
              _hover={{ backgroundColor: '#FFF' }}
            >
              {programDetail?.generalInformation ? (
                handleInformation(programDetail?.generalInformation)
              ) : (
                <Flex
                  flexDir={'column'}
                  w={'full'}
                  alignItems={'center'}
                  textAlign={'center'}
                  p={4}
                >
                  <svg
                    width={140}
                    height={152}
                    viewBox='0 0 184 152'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <g fill='none' fillRule='evenodd'>
                      <g transform='translate(24 31.67)'>
                        <ellipse
                          fillOpacity='.8'
                          fill='#F5F5F7'
                          cx='67.797'
                          cy='106.89'
                          rx='67.797'
                          ry='12.668'
                        />
                        <path
                          d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
                          fill='#AEB8C2'
                        />
                        <path
                          d='M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z'
                          fill='url(#linearGradient-1)'
                          transform='translate(13.56)'
                        />
                        <path
                          d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
                          fill='#F5F5F7'
                        />
                        <path
                          d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
                          fill='#DCE0E6'
                        />
                      </g>
                      <path
                        d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
                        fill='#DCE0E6'
                      />
                      <g transform='translate(149.65 15.383)' fill='#FFF'>
                        <ellipse cx='20.654' cy='3.167' rx='2.849' ry='2.815' />
                        <path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z' />
                      </g>
                    </g>
                  </svg>

                  <Text color={'gray'} w='full' fontSize='xl'>
                    {t('Empty content')}
                  </Text>
                  <Text color={'gray'} w={'full'} mt={2}>
                    {t('There are no item to display')}
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>
          <Box pl={3} my={5} w={'100%'} textAlign={'left'} fontSize={'lg'}>
            <Heading
              data-testId='content-heading'
              fontSize={{ base: '1rem', lg: '1.5rem' }}
              fontWeight='semibold'
            >
              {t('content')}
            </Heading>
            {/* Accordion Content */}
            <AccordionContent />
            <Box my={3} marginRight={3}>
              <Heading
                data-testId='class-heading'
                fontSize={{ base: '1rem', lg: '1.5rem' }}
                fontWeight='semibold'
                marginBottom={3}
              >
                {t('list_class')}
              </Heading>
              {/* List of Class Content Table */}
              <ListOfClass listOfClass={programDetail?.listClasses} />
              <Box
                display='flex'
                w={'100%'}
                justifyContent='center'
                mx={5}
                mt={5}
              >
                <Box marginRight={{ base: 0, lg: 'auto' }} w={'20%'}>
                  <Button
                    fontSize={{ base: 'sm', lg: 'lg' }}
                    width='fit-content'
                    fontWeight='semibold'
                    borderRadius='12px'
                    _hover={'none'}
                    color='white'
                    bg={'#2D3748'}
                    py={0}
                    px={6}
                    onClick={() => {
                      navigate('/dashboard/training-program/list', {
                        replace: true,
                      });
                      dispatch(resetState());
                    }}
                    data-testId='back-button'
                  >
                    {t('back')}
                  </Button>
                </Box>
                {isAccessible.modify ? (
                  <Box
                    marginLeft={{ base: 0, lg: 'auto' }}
                    w={'80%'}
                    display={'flex'}
                    justifyContent={'end'}
                    mr={10}
                  >
                    <Button
                      onClick={() => dispatch(setEditModal(true))}
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      borderRadius={'12px'}
                      _hover={'none'}
                      width='fit-content'
                      fontWeight='semibold'
                      colorScheme='blue'
                      py={0}
                      px={6}
                      mr={{ base: 1, lg: 3 }}
                      data-testId='edit-button'
                    >
                      {t('edit')}
                    </Button>
                    <Button
                      onClick={() => dispatch(setDuplicateModal(true))}
                      fontSize={{ base: 'sm', lg: 'lg' }}
                      borderRadius={'12px'}
                      _hover={'none'}
                      width='fit-content'
                      fontWeight='semibold'
                      colorScheme='orange'
                      py={0}
                      px={6}
                      mr={{ base: 1, lg: 3 }}
                      data-testId='duplicate-button'
                    >
                      {t('duplicate')}
                    </Button>
                    {programDetail?.duration ? (
                      <Button
                        onClick={() =>
                          handleChangeStatus(id, programDetail?.status)
                        }
                        fontSize={{ base: 'sm', lg: 'lg' }}
                        borderRadius={'12px'}
                        _hover={'none'}
                        width='fit-content'
                        fontWeight='semibold'
                        colorScheme='blackAlpha'
                        bg={'gray.900'}
                        color='white'
                        py={0}
                        px={6}
                      >
                        {statusButtonChange(programDetail?.status).title}
                      </Button>
                    ) : (
                      <Tooltip
                        label='Duration must be greater than 0 to change status'
                        placement='auto-start'
                      >
                        <Button
                          isDisabled
                          fontSize={{ base: 'sm', lg: 'lg' }}
                          borderRadius={'12px'}
                          _hover={'none'}
                          width='fit-content'
                          fontWeight='semibold'
                          bg={'#2D3748'}
                          color='white'
                          py={0}
                          px={6}
                        >
                          {statusButtonChange(programDetail?.status).title}
                        </Button>
                      </Tooltip>
                    )}
                  </Box>
                ) : (
                  <></>
                )}
              </Box>
            </Box>
          </Box>
          <EditModal />
          <DuplicateButton />
        </>
      )}
    </>
  );
};
