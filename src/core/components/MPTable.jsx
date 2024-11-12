import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PiUserCircle } from 'react-icons/pi';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { TbGenderDemiboy, TbGenderDemigirl } from 'react-icons/tb';
import { IoChevronDownCircleOutline, IoFilter, IoTrashBinOutline } from 'react-icons/io5';
import { MdOutlineEdit, MdOutlineNavigateNext, MdOutlineRemoveRedEye } from 'react-icons/md';
import { Flex, Button, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { sortData } from '@/utils/sort';
import { convertDateToDDMMYYYY } from '@/utils/convertDate';
import { convertTablePerPage } from '@/utils/covertItemPerPage';
import { setIsUpdating, setUserData } from '@/core/store/user-management/userUpdate';
import { setSearchPage, setSearchSize } from '@/core/store/user-management/userSearch';

export const MPTable = ({
  data = [],
  pageNo = 0,
  pageSize = 5,
  totalElement = 0,
  totalPage = 0,
  lastPage = false,
  firstPage = false
}) => {

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [dataGot, setDataGot] = React.useState([]);
  const [covertedData, setConvertedData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [rowPerPage, setRowPerPage] = React.useState(5);

  React.useEffect(() => {
    setDataGot(data);
  }, [data]);

  React.useEffect(() => {
    setCurrentPage(0);
    setConvertedData(convertTablePerPage(dataGot, rowPerPage));
  }, [dataGot]);

  React.useEffect(() => {
    setCurrentPage(0);
    setConvertedData(convertTablePerPage(dataGot, rowPerPage));
    dispatch(setSearchSize(rowPerPage));
  }, [rowPerPage]);

  React.useEffect(() => {
    dispatch(setSearchPage(currentPage));
  }, [currentPage]);

  const changePos = (step) => {
    if (step === 0) {
      if (currentPage % 3 === 1) {
        setCurrentPage(currentPage - 1)
      } else if (currentPage % 3 === 2) {
        setCurrentPage(currentPage - 2)
      }
    } else if (step === 1) {
      if (currentPage % 3 === 0) {
        setCurrentPage(currentPage + step)
      } else if (currentPage % 3 === 2) {
        setCurrentPage(currentPage - step)
      }
    } else if (step === 2) {
      if (currentPage % 3 === 0) {
        setCurrentPage(currentPage + step)
      } else if (currentPage % 3 === 1) {
        setCurrentPage(currentPage + 1)
      }
    }
  }

  const checkValidPos = (currentPage) => {
    if (rowPerPage * currentPage <= rowPerPage * Math.ceil(data.length / rowPerPage)) {
      return true;
    }
    return false;
  }

  const changeStepSkip = (step) => {
    if (step === -1) {
      let newCurrentPage = currentPage - 3;
      if (newCurrentPage < 0) {
        newCurrentPage = 0;
      }
      setCurrentPage(newCurrentPage);
    } else if (step === 1) {
      let newCurrentPage = currentPage + 3;
      if (newCurrentPage > Math.floor(data.length / rowPerPage)) {
        newCurrentPage = Math.floor(data.length / rowPerPage)
      }
      setCurrentPage(newCurrentPage);
    }
  }

  const checkValidPosJumpBack = () => {
    return currentPage - 1 > 0;
  }

  const checkValidPosJumpNext = () => {
    return currentPage + 1 < Math.floor(data.length / rowPerPage);
  }

  const [typeSort, setTypeSort] = React.useState({
    id: { active: false, ascending: true },
    name: { active: false, ascending: true },
    dob: { active: false, ascending: true },
    male: { active: false, ascending: true },
    roleName: { active: false, ascending: true },
  });

  const handleSortToggle = (property) => {
    setTypeSort((prevStates) => {
      const newStates = { ...prevStates };
      for (const prop in newStates) {
        if (prop === property) {
          newStates[prop] = {
            active: true,
            ascending: !prevStates[prop].ascending,
          };
        } else {
          newStates[prop] = {
            ...newStates[prop],
            active: false,
          };
        }
      }
      return newStates;
    });
  };

  React.useEffect(() => {
    if (dataGot.length > 0) {
      let firstSortProperty;
      let firstSortState;

      for (const [property, state] of Object.entries(typeSort)) {
        if (state.active) {
          firstSortProperty = property;
          firstSortState = state;
          break;
        }
      }

      if (firstSortProperty) {
        const sortType = firstSortState.ascending ? 'asc' : 'des';
        setDataGot(sortData(dataGot, firstSortProperty, sortType));
      } else {
        setDataGot(dataGot.slice());
      }
    }
  }, [typeSort]);

  return (
    <Flex
      flex={1}
      flexDirection='column'
    >
      <TableContainer width='-webkit-fill-available' margin={3} borderRadius={15} backgroundColor='#FFF'>
        <Table variant='simple' fontSize='medium'>
          <Thead backgroundColor='#2D3748'>
            <Tr>
              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>ID</Text>
                  <IoFilter
                    cursor="pointer"
                    onClick={() => handleSortToggle('id')}
                    style={{
                      transform: `rotate(${typeSort.id.ascending ? 0 : 180}deg)`
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('fullname')}</Text>
                  <IoFilter
                    cursor="pointer"
                    onClick={() => handleSortToggle('name')}
                    style={{
                      transform: `rotate(${typeSort.name.ascending ? 0 : 180}deg)`
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('date_of_birth')}</Text>
                  <IoFilter
                    cursor="pointer"
                    onClick={() => handleSortToggle('dob')}
                    style={{
                      transform: `rotate(${typeSort.dob.ascending ? 0 : 180}deg)`
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('gender')}</Text>
                  <IoFilter
                    cursor="pointer"
                    onClick={() => handleSortToggle('male')}
                    style={{
                      transform: `rotate(${typeSort.male.ascending ? 0 : 180}deg)`
                    }}
                  />
                </Flex>
              </Th>

              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'>
                <Flex flexDirection='row' columnGap={2} alignItems='center'>
                  <Text>{t('type')}</Text>
                  <IoFilter
                    cursor="pointer"
                    onClick={() => handleSortToggle('roleName')}
                    transform={`rotate(180)deg)`}
                    style={{
                      transform: `rotate(${typeSort.roleName.ascending ? 0 : 180}deg)`
                    }}
                  />
                </Flex>
              </Th>
              <Th fontSize='medium' fontWeight='semibold' textTransform='none' color='#FFF'></Th>
            </Tr>
          </Thead>

          <Tbody>
            {
              covertedData.length !== 0 ?
                covertedData[currentPage].map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{convertDateToDDMMYYYY(new Date(item.dob))}</Td>
                    <Td>
                      {
                        item.male === true ?
                          <TbGenderDemiboy color='blue' size='20px' /> :
                          <TbGenderDemigirl color='red' size='20px' />
                      }
                    </Td>
                    <Td>
                      <Flex background={item.roleName === 'Admin' ? '#4DB848' : '#0B2136'} width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>{item.roleName}</Flex>
                    </Td>
                    <Td onClick={
                      () => {
                        dispatch(setUserData(item))
                      }
                    }>
                      <MenuUserItems />
                    </Td>
                  </Tr>
                )) :
                <Flex width='100%' height='100%' justifyContent='center' alignItems='center'>
                  <Text width='100%' fontSize='medium' textAlign='center' color='gray' marginY={3} marginX={3}>*Nothing to display</Text>
                </Flex>
            }
          </Tbody>
        </Table>

        {/* Pagigation */}
        <Flex flexDirection='row' justifyContent='center' alignItems='center' width='100%' marginY={3} >
          <GrFormPrevious pointerEvents={checkValidPosJumpBack() ? 'auto' : 'none'} opacity={checkValidPosJumpBack() ? 1 : 0.5} cursor='pointer' onClick={() => changeStepSkip(-1)} />
          <Flex pointerEvents={checkValidPos(3 * Math.floor(currentPage / 3) + 1) ? 'auto' : 'none'} opacity={checkValidPos(3 * Math.floor(currentPage / 3) + 1) ? 1 : 0.5} color={(currentPage % 3 === 0) ? '#FFF' : '#2D3748'} marginLeft={3} onClick={() => changePos(0)} cursor='pointer' fontSize='medium' fontWeight='semibold' width='35px' height='35px' backgroundColor={currentPage % 3 === 0 ? '#2D3748' : 'transparent'} borderRadius={8} justifyContent='center' alignItems='center'>{3 * Math.floor(currentPage / 3) + 1}</Flex>
          <Flex pointerEvents={checkValidPos(3 * Math.floor(currentPage / 3) + 2) ? 'auto' : 'none'} opacity={checkValidPos(3 * Math.floor(currentPage / 3) + 2) ? 1 : 0.5} color={(currentPage % 3 === 1) ? '#FFF' : '#2D3748'} onClick={() => changePos(1)} cursor='pointer' fontSize='medium' fontWeight='semibold' width='35px' height='35px' backgroundColor={currentPage % 3 === 1 ? '#2D3748' : 'transparent'} borderRadius={8} justifyContent='center' alignItems='center'>{3 * Math.floor(currentPage / 3) + 2}</Flex>
          <Flex pointerEvents={checkValidPos(3 * Math.floor(currentPage / 3) + 3) ? 'auto' : 'none'} opacity={checkValidPos(3 * Math.floor(currentPage / 3) + 3) ? 1 : 0.5} color={(currentPage % 3 === 2) ? '#FFF' : '#2D3748'} marginRight={3} onClick={() => changePos(2)} cursor='pointer' fontSize='medium' fontWeight='semibold' width='35px' height='35px' backgroundColor={currentPage % 3 === 2 ? '#2D3748' : 'transparent'} borderRadius={8} justifyContent='center' alignItems='center'>{3 * Math.floor(currentPage / 3) + 3}</Flex>
          <GrFormNext pointerEvents={checkValidPosJumpNext() ? 'auto' : 'none'} opacity={checkValidPosJumpNext() ? 1 : 0.5} cursor='pointer' onClick={() => changeStepSkip(1)} />
        </Flex>
      </TableContainer>

      {/* Item per page chaging */}
      <Flex flex={1} justifyContent='flex-end' mx={3} mb={3}>
        <Menu>
          <MenuButton fontSize='medium' background='transparent' _hover={{ backgroundColor: 'transparent' }} as={Button} rightIcon={<IoChevronDownCircleOutline />}>
            Row per page - {rowPerPage}
          </MenuButton>

          <MenuList p={2} borderRadius='12px'>
            <MenuItem onClick={() => setRowPerPage(5)} borderRadius='8px' fontSize='medium'>5</MenuItem>
            <MenuItem onClick={() => setRowPerPage(10)} borderRadius='8px' fontSize='medium'>10</MenuItem>
            <MenuItem onClick={() => setRowPerPage(25)} borderRadius='8px' fontSize='medium'>25</MenuItem>
            <MenuItem onClick={() => setRowPerPage(50)} borderRadius='8px' fontSize='medium'>50</MenuItem>
            <MenuItem onClick={() => setRowPerPage(100)} borderRadius='8px' fontSize='medium'>100</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

const MenuUserItems = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<HiOutlineDotsHorizontal />} iconSpacing={0} backgroundColor='transparent' _hover={{ backgroundColor: 'transparent' }}></MenuButton>

        <MenuList padding={3} borderRadius='12px'>
          <MenuItem borderRadius='8px' onClick={() => {
            dispatch(setIsUpdating(true));
          }}>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              <Flex flex={1} columnGap={3}>
                <MdOutlineEdit size='20px' />
                <Text fontWeight='semibold'>{t('edit_user')}</Text>
              </Flex>
              <MdOutlineNavigateNext color='transparent' />
            </Flex>
          </MenuItem>

          <MenuItem borderRadius='8px'>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              <Flex flex={1} columnGap={3}>
                <PiUserCircle size='20px' />
                <Text fontWeight='semibold'>{t('change_role')}</Text>
              </Flex>
            </Flex>
            <MdOutlineNavigateNext />
          </MenuItem>

          <MenuItem borderRadius='8px'>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              <Flex flex={1} columnGap={3}>
                <MdOutlineRemoveRedEye size='20px' />
                <Text fontWeight='semibold'>{t('deactive_user')}</Text>
              </Flex>
              <MdOutlineNavigateNext color='transparent' />
            </Flex>
          </MenuItem>

          <MenuItem borderRadius='8px'>
            <Flex alignItems='center' width='100%' justifyContent='space-between'>
              <Flex flex={1} columnGap={3}>
                <IoTrashBinOutline size='20px' />
                <Text fontWeight='semibold'>{t('delete_user')}</Text>
              </Flex>
              <MdOutlineNavigateNext color='transparent' />
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};