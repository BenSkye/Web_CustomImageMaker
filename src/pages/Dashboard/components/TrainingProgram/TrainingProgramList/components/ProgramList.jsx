import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { IoChevronDownCircleOutline, IoFilter } from 'react-icons/io5';
import { VscVmActive } from "react-icons/vsc";
import { HiOutlineDuplicate } from "react-icons/hi";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineEdit,
  MdOutlineNavigateNext,
  MdOutlineRemoveRedEye
} from 'react-icons/md';
import {
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
  useToast
} from '@chakra-ui/react'
import { convertDateToDDMMYYYY } from '@/utils/convertDate';
import { setTrainingProgramData, setProgramUpdate } from '@/core/store/training-program-management/trainingProgramData';
import {
  setCurrentProgramPage,
  setProgramPageSize,
  setUpdate,
  resetInitialState,
  setModalIsOpen,
  setSortBy,
  setSortAsc
} from '@/core/store/training-program-management/trainingProgramView';
import { ActiveStatus, InactiveStatus, DraftStatus } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/Status';
import { trainingProgramListController } from '@/core/services/TrainingProgram/trainingProgramListAPI';
import useAuthorization from '@/hooks/useAuthorization';


const ProgramList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const pageSize = useSelector((state) => state.trainingProgramView.size);
  const trainingProgramList = useSelector((state) => state.trainingProgramView.trainingProgramList);
  const totalPage = useSelector((state) => state.trainingProgramView.totalPage);
  const lastPage = useSelector((state) => state.trainingProgramView.lastPage);
  const firstPage = useSelector((state) => state.trainingProgramView.firstPage);
  const currentPage = useSelector((state) => state.trainingProgramView.page);
  const sortType = useSelector((state) => state.trainingProgramView.sortType);
  const sortAsc = useSelector((state) => state.trainingProgramView.sortAsc);
  const { trainingProgramPermission } = useSelector(
    (state) => state.permissionList.data
  );

  const { isAccessible } = useAuthorization(trainingProgramPermission);


  React.useEffect(() => {
    resetInitialState();
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(setCurrentProgramPage(currentPage));
  }, [currentPage]);

  const handleSortToggle = (property) => {
    if(property === sortType) {
      dispatch(setSortAsc(!sortAsc));
    } else {
      dispatch(setSortBy(property));
      dispatch(setSortAsc(true));
    }
  };


  return (
    <Flex
      flex={1}
      flexDirection='column'
    >
      <TableContainer width='-webkit-fill-availabe'
        marginX={3}
        marginBottom={3}
        borderRadius={15}
        backgroundColor="#FFF">
        <Table variant='simple' fontSize='medium'>
          <Thead backgroundColor='#2D3748'>
            <Tr>
              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>ID</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={sortType === 'id' ? 1 : 0.5}
                    onClick={() => handleSortToggle('id')}
                    style={{
                      transform: sortType === 'id' ? `rotate(${sortAsc ? 180 : 0}deg)` : 'rotate(0deg)'
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('Program Name')}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={sortType === 'topicCode' ? 1 : 0.5}
                    onClick={() => handleSortToggle('topicCode')}
                    style={{
                      transform: sortType === 'topicCode' ? `rotate(${sortAsc ? 180 : 0}deg)` : 'rotate(0deg)'
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('Created on')}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={sortType === 'createdDate' ? 1 : 0.5}
                    onClick={() => handleSortToggle('createdDate')}
                    style={{
                      transform: sortType === 'createdDate' ? `rotate(${sortAsc ? 180 : 0}deg)` : 'rotate(0deg)'
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('Created-by')}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={sortType === 'createdBy' ? 1 : 0.5}
                    onClick={() => handleSortToggle('createdBy')}
                    style={{
                      transform: sortType === 'createBy' ? `rotate(${sortAsc ? 180 : 0}deg)` : 'rotate(0deg)'
                    }}
                  />
                </Flex>
              </Th>
  
              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('Duration')}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={sortType === 'duration' ? 1 : 0.5}
                    onClick={() => handleSortToggle('duration')}
                    style={{
                      transform: sortType === 'duration' ? `rotate(${sortAsc ? 180 : 0}deg)` : 'rotate(0deg)'
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('Status')}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={sortType === 'status' ? 1 : 0.5}
                    onClick={() => handleSortToggle('status')}
                    transform={`rotate(180)deg)`}
                    style={{
                      transform: sortType === 'status' ? `rotate(${sortAsc ? 180 : 0}deg)` : 'rotate(0deg)'
                    }}
                  />
                </Flex>
              </Th>
              {isAccessible.modify === false ? <></> : <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'></Th>}
            </Tr>
          </Thead>

          <Tbody>
            {
              trainingProgramList.length !== 0 ?
                trainingProgramList.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td _hover={{ cursor: 'pointer', bgColor: '#ECECEC', borderRadius: '8px' }}>
                      <Link to={'/dashboard/training-program/' + item.id} params={{ id: item.id }}>
                        {item.topicCode}
                      </Link>
                    </Td>
                    <Td>{convertDateToDDMMYYYY(new Date(item.createdDate))}</Td>
                    <Td>{item.createBy}</Td>
                    <Td>{(item.duration / 60).toFixed(2)} {t('hours')}</Td>
                    <Td>
                      {item.status === 3 ? < DraftStatus /> :
                        item.status === 2 ? <InactiveStatus /> : <ActiveStatus />}
                    </Td>
                    {isAccessible.modify === false ? <></> : 
                    <Td onClick={
                      () => {
                        dispatch(setTrainingProgramData(item));
                      }
                    }>
                      <MenuItems />
                    </Td>
                    }
                  </Tr>
                )) :
                <Flex width='100%' height='100%' justifyContent='center' alignItems='center'>
                  <Text width='100%' fontSize='medium' textAlign='center' color='gray' marginY={3} marginX={3}>{t('*Nothing to display')}</Text>
                </Flex>
            }
          </Tbody>
        </Table>

        {/* Pagigation */}
        <Flex columnGap={3} flexDirection='row' justifyContent='center' alignItems='center' width='100%' marginY={3}>
          <MdKeyboardDoubleArrowLeft
            cursor={firstPage ? 'auto' : 'pointer'}
            opacity={!firstPage ? 1 : 0.5}
            onClick={firstPage ? null : () => dispatch(setCurrentProgramPage(0))}
          />
          <GrFormPrevious
            cursor={firstPage ? 'auto' : 'pointer'}
            opacity={!firstPage ? 1 : 0.5}
            onClick={firstPage ? null : () => dispatch(setCurrentProgramPage(currentPage - 1))}
          />
          {!firstPage && (
            <Flex
              cursor='pointer'
              borderRadius={8}
              justifyContent='center'
              alignItems='center'
              onClick={() => dispatch(setCurrentProgramPage(currentPage - 1))}
            >
              {currentPage}
            </Flex>
          )}
          <Flex
            width='2.5rem'
            bgColor='#2D3748'
            color='#FFF'
            pointerEvents='none'
            as='u'
            borderRadius={8}
            justifyContent='center'
            alignItems='center'
          >
            {currentPage + 1}
          </Flex>
          {!lastPage && (
            <Flex
              cursor='pointer'
              borderRadius={8}
              justifyContent='center'
              alignItems='center'
              onClick={() => dispatch(setCurrentProgramPage(currentPage + 1))}
            >
              {currentPage + 2}
            </Flex>
          )}
          <GrFormNext
            cursor={lastPage ? 'auto' : 'pointer'}
            opacity={!lastPage ? 1 : 0.5}
            onClick={lastPage ? null : () => dispatch(setCurrentProgramPage(currentPage + 1))}
          />
          <MdKeyboardDoubleArrowRight
            cursor={lastPage ? 'auto' : 'pointer'}
            opacity={!lastPage ? 1 : 0.5}
            onClick={lastPage ? null : () => dispatch(setCurrentProgramPage(totalPage - 1))}
          />
        </Flex>

      </TableContainer>

      {/* Item per page chaging */}
      <Flex flex={1} justifyContent='flex-end' mx={3} mb={3}>
        <Menu>
          <MenuButton fontSize='medium' background='transparent' _hover={{ backgroundColor: 'transparent' }} as={Button} rightIcon={<IoChevronDownCircleOutline />}>
            {t('Rows per page')} - {pageSize}
          </MenuButton>

          <MenuList p={2} borderRadius='12px'>
            <MenuItem onClick={() => dispatch(setProgramPageSize(5))} borderRadius='8px' fontSize='medium'>5</MenuItem>
            <MenuItem onClick={() => dispatch(setProgramPageSize(10))} borderRadius='8px' fontSize='medium'>10</MenuItem>
            <MenuItem onClick={() => dispatch(setProgramPageSize(25))} borderRadius='8px' fontSize='medium'>25</MenuItem>
            <MenuItem onClick={() => dispatch(setProgramPageSize(50))} borderRadius='8px' fontSize='medium'>50</MenuItem>
            <MenuItem onClick={() => dispatch(setProgramPageSize(100))} borderRadius='8px' fontSize='medium'>100</MenuItem>
          </MenuList>
        </Menu>
      </Flex>


    </Flex>
  )
}

const MenuItems = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const trainingProgram = useSelector((state) => state.trainingProgramData.programData);
  const updateStatus = useSelector((state) => state.trainingProgramView.updateStatus);
  const pageUpdate = useSelector((state) => state.trainingProgramView.update);
  const toast = useToast();
  const [showAdditionalInfoActive, setShowAdditionalInfoActive] = useState(false);

  const handleMouseEnterActive = () => {
    setShowAdditionalInfoActive(true);
  };

  const handleMouseLeaveActive = () => {
    setShowAdditionalInfoActive(false);
  };

  const handleUpdateTrainingProgramStatus = () => {
    if (trainingProgram.status === 1) {
      try {
        trainingProgramListController.deactivateTrainingProgram(trainingProgram.id, trainingProgram.startTime, trainingProgram.topicCode, trainingProgram.generalInformation)
          .then((res) => {
            dispatch(setProgramUpdate(true));
            dispatch(setUpdate(!pageUpdate));
          }
          )
          .catch((err) => {
            throw err
          })
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Training program de-activated successfully')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'success'
              })}
            </WrapItem>
          </Wrap>
        )

      } catch (err) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Failed to de-activate training program')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
              })}
            </WrapItem>
          </Wrap>
        )
      }
    } else {
      try {
        trainingProgramListController.activateTrainingProgram(trainingProgram.id, trainingProgram.startTime, trainingProgram.topicCode, trainingProgram.generalInformation)
          .then((res) => {
            dispatch(setProgramUpdate(true));
            dispatch(setUpdate(!pageUpdate));
          }
          )
          .catch((err) => {
            throw err
          })
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Training program activated successfully')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'success'
              })}
            </WrapItem>
          </Wrap>
        )
      } catch (err) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Failed to activate training program')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
              })}
            </WrapItem>
          </Wrap>
        )
      }
    }
  }

  const handleDuplicateProgram = async (id) => {
    try {
      const response = await trainingProgramListController.duplicateProgram(id);
      if (response.success && !response.error) {
        dispatch(setUpdate(!pageUpdate));
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Program duplicated successfully')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'success'
              })}
            </WrapItem>
          </Wrap>
        )
      }
      if (!response.success && response.error) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Failed to duplicate program')),
                description: response.error,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
              })}
            </WrapItem>
          </Wrap>
        )
      }
    } catch (error) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: (t('Failed to duplicate program')),
              description: error.message,
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error'
            })}
          </WrapItem>
        </Wrap>
      );
    }
  };

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<HiOutlineDotsHorizontal />} iconSpacing={0} backgroundColor='transparent' _hover={{ backgroundColor: 'transparent' }}></MenuButton>

        <MenuList padding={3} borderRadius='12px' width={'fit-content'}>
          <MenuItem borderRadius='8px' onClick={() => {
          }}>
            <Link to={'/dashboard/training-program/' + trainingProgram.id} params={{ id: trainingProgram.id }}>
              <Flex alignItems='center' width='100%' justifyContent='space-between'>
                <Flex flex={1} columnGap={3}>
                  <MdOutlineRemoveRedEye size='20px' />
                  <Text fontWeight='semibold'>{t('Training program details')}</Text>
                </Flex>
                <MdOutlineNavigateNext color='transparent' />
              </Flex>
            </Link>
          </MenuItem>

          <MenuItem borderRadius='8px' onClick={() => dispatch(setModalIsOpen(true))}>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              <Flex flex={1} columnGap={3}>
                <MdOutlineEdit size='20px' />
                <Text fontWeight='semibold'>{t('Edit program')}</Text>
              </Flex>
              <MdOutlineNavigateNext color='transparent' />
            </Flex>
          </MenuItem>

          <MenuItem borderRadius='8px' onClick={() => handleDuplicateProgram(trainingProgram.id)}>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              <Flex flex={1} columnGap={3}>
                <HiOutlineDuplicate size={'20px'} />
                <Text fontWeight='semibold'>{t('Duplicate program')}</Text>
              </Flex>
              <MdOutlineNavigateNext color='transparent' />
            </Flex>
          </MenuItem>
          {trainingProgram.duration === 0 ?
            <>
              <MenuItem borderRadius='8px'
                flexDirection={'column'}
                color={'#808080'}
                onMouseEnter={handleMouseEnterActive}
                onMouseLeave={handleMouseLeaveActive}
              >
                <Flex alignItems='center' width='100%' justifyContent='space-between'>
                  <Flex flex={1} columnGap={3}>
                    <VscVmActive size={'20px'} />
                    <Text fontWeight='semibold'>{t('Activate Program')}</Text>
                  </Flex>
                  <MdOutlineNavigateNext color='transparent' />
                </Flex>
                {showAdditionalInfoActive && (
                  <Flex alignItems='center' justifyContent='center' width={'5rem'}>
                    <Text fontSize={'10px'}>{t('Duration must be longer than 0 to activate.')}</Text>
                  </Flex>
                )}
              </MenuItem>
            </>
            :
            <>
              {
                trainingProgram.status === 1 ?
                  <MenuItem borderRadius='8px'
                    onClick={() => handleUpdateTrainingProgramStatus()}
                  >
                    <Flex alignItems='center' width='100%' justifyContent='space-between'>
                      <Flex flex={1} columnGap={3}>
                        <VscVmActive size={'20px'} />
                        <Text fontWeight='semibold'>{t('De-activate Program')}</Text>
                      </Flex>
                      <MdOutlineNavigateNext color='transparent' />
                    </Flex>
                  </MenuItem>
                  :
                  <MenuItem borderRadius='8px'
                    onClick={() => handleUpdateTrainingProgramStatus()}
                  >
                    <Flex alignItems='center' width='100%' justifyContent='space-between'>
                      <Flex flex={1} columnGap={3}>
                        <VscVmActive size={'20px'} />
                        <Text fontWeight='semibold'>{t('Activate Program')}</Text>
                      </Flex>
                      <MdOutlineNavigateNext color='transparent' />
                    </Flex>
                  </MenuItem>
              }
            </>
          }
        </MenuList>
      </Menu>
    </>
  );
};

export default connect(null, resetInitialState)(ProgramList)