import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSyllabusSorting from '@/hooks/useSyllabusSorting';
import usePagination from '@/hooks/usePagination';
import { useSelector } from 'react-redux';
import { setTotalPage, setRowPerPage } from '@/core/store/syllabus-management/paginationPage';
import { setData } from '@/core/store/syllabus-management/syllabusData';
import useCapitalization from '@/hooks/useCapitalization';
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
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { IoChevronDownCircleOutline, IoFilter } from 'react-icons/io5';
import { MenuUserItems } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/MenuUserItems';
import { StatusText } from '@/pages/Dashboard/components/Syllabus/components/SyllabusList/components/StatusText';
import { generateSortString } from '@/utils/generateSortString';
import useAuthorization from '@/hooks/useAuthorization';

export const DataTableSyllabus = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.syllabusData.data);
  const { t } = useTranslation();
  const tagInputValue = useSelector((state) => state.tagInputValue.tagInputValue);
  const totalPage = useSelector((state) => state.paginationPage.totalPage);
  const currentPage = useSelector((state) => state.paginationPage.currentPage);
  const rowPerPage = useSelector((state) => state.paginationPage.rowPerPage);
  const sortAttributes = useSelector((state) => state.syllabusSort.sort);
  const objRange = useSelector((state) => state.tagInputValue.objRange);
  const capitalizationStatus = useCapitalization(t('status'));
  const { handleSortToggle, typeSort } = useSyllabusSorting(1, 5, tagInputValue);

  // Get Role Permission
  const { syllabusPermission } = useSelector((state) => state.permissionList.data);
  const { isAccessible } = useAuthorization(syllabusPermission);

  let sort = [''];
  if (sortAttributes) {
    sort = generateSortString(sortAttributes);
  }
  const {
    changePos,
    checkValidPos,
    checkValidPosJumpBack,
    checkValidPosJumpNext,
    changeStepSkip,
    handleRowPerPage,
  } = usePagination(
    currentPage,
    rowPerPage,
    tagInputValue,
    setData,
    setTotalPage,
    totalPage,
    setRowPerPage,
    sort,
    objRange
  );

  return (
    <Flex flex={1} mt={4} flexDirection='column'>
      <TableContainer width='-webkit-fill-available' borderRadius={15} backgroundColor='#FFF'>
        <Table variant='simple' fontSize='small'>
          <Thead backgroundColor='#2D3748'>
            <Tr>
              <Th
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleSortToggle('topicName')}
                fontSize='small'
                fontWeight='normal'
                textTransform='none'
                color='#FFF'
              >
                <Flex
                  justifyContent={'start'}
                  flexDirection='row'
                  columnGap={2}
                  alignItems='center'
                >
                  <Text>{t('syllabus')}</Text>
                  <IoFilter
                    cursor='pointer'
                    style={{
                      transform: `rotate(${typeSort.topicName.asc ? 180 : 0}deg)`,
                    }}
                    opacity={typeSort.topicName.active ? 1 : 0.5}
                  />
                </Flex>
              </Th>
              <Th
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleSortToggle('codeName')}
                fontSize='small'
                fontWeight='normal'
                textTransform='none'
                color='#FFF'
              >
                <Flex
                  justifyContent={'start'}
                  flexDirection='row'
                  columnGap={2}
                  alignItems='center'
                >
                  <Text>{t('code')}</Text>
                  <IoFilter
                    cursor='pointer'
                    style={{
                      transform: `rotate(${typeSort.codeName.asc ? 180 : 0}deg)`,
                    }}
                    opacity={typeSort.codeName.active ? 1 : 0.5}
                  />
                </Flex>
              </Th>
              <Th
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleSortToggle('createdDate')}
                fontSize='small'
                fontWeight='normal'
                textTransform='none'
                color='#FFF'
              >
                <Flex
                  justifyContent={'start'}
                  flexDirection='row'
                  columnGap={2}
                  alignItems='center'
                >
                  <Text>{t('created_on')}</Text>
                  <IoFilter
                    cursor='pointer'
                    style={{
                      transform: `rotate(${typeSort.createdDate.asc ? 180 : 0}deg)`,
                    }}
                    opacity={typeSort.createdDate.active ? 1 : 0.5}
                  />
                </Flex>
              </Th>
              <Th
                _hover={{ cursor: 'pointer' }}
                onClick={() => handleSortToggle('createdBy')}
                fontSize='small'
                fontWeight='normal'
                textTransform='none'
                color='#FFF'
              >
                <Flex
                  justifyContent={'start'}
                  flexDirection='row'
                  columnGap={2}
                  alignItems='center'
                >
                  <Text>{t('created_by')}</Text>
                  <IoFilter
                    cursor='pointer'
                    style={{
                      transform: `rotate(${typeSort.createdBy.asc ? 180 : 0}deg)`,
                    }}
                    opacity={typeSort.createdBy.active ? 1 : 0.5}
                  />
                </Flex>
              </Th>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>
                <Flex
                  justifyContent={'start'}
                  flexDirection='row'
                  columnGap={2}
                  alignItems='center'
                >
                  <Text>{t('duration')}</Text>
                </Flex>
              </Th>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>
                <Flex
                  justifyContent={'start'}
                  flexDirection='row'
                  columnGap={2}
                  alignItems='center'
                >
                  <Text>{t('output_standard')}</Text>
                </Flex>
              </Th>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>
                <Flex
                  justifyContent={'start'}
                  flexDirection='row'
                  columnGap={2}
                  alignItems='center'
                >
                  <Text>{capitalizationStatus}</Text>
                </Flex>
              </Th>
              {(isAccessible.modify || isAccessible.create) && (
                <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'></Th>
              )}
            </Tr>
          </Thead>
          <Tbody>
            {data && data.length ? (
              data.map((item) => (
                <Tr key={`${item.topicName}-${item.topicCode}`}>
                  <Td
                    aria-label='topicName'
                    width={'24rem'}
                    cursor={'pointer'}
                    _hover={{ textDecoration: 'underline' }} // Apply cursor pointer on hover
                    onClick={() => navigate(`${item.topicCode}`)}
                  >
                    {item.topicName}
                  </Td>
                  <Td width={'30px'}>{item.codeName}</Td>
                  <Td width={'10rem'}>{new Date(item.createdDate).toLocaleDateString('en-GB')}</Td>
                  <Td width={'10rem'}>{item.createdBy.username}</Td>
                  <Td width={'10rem'}>{item.duration + ' ' + t('days').toLowerCase()}</Td>
                  {item.learningObjectives.length > 0 ? (
                    <Td textAlign={'center'}>
                      {
                        <StatusText
                          data={item.learningObjectives}
                          number={false}
                          id={item.topicCode}
                        />
                      }
                    </Td>
                  ) : (
                    <Td></Td>
                  )}

                  <Td>
                    <StatusText number={true} data={item.status} />
                  </Td>
                  {(isAccessible.modify || isAccessible.create) && (
                    <Td>
                      <MenuUserItems isAccessible={isAccessible} item={item} />
                    </Td>
                  )}
                </Tr>
              ))
            ) : (
              <tr>
                <Td
                  fontSize='small'
                  fontWeight='normal'
                  textTransform='none'
                  color='#000'
                  colSpan={8}
                >
                  {t('no_data')}
                </Td>
              </tr>
            )}
          </Tbody>
        </Table>
        <Flex
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
          width='100%'
          marginY={3}
        >
          <GrFormPrevious
            pointerEvents={checkValidPosJumpBack() ? 'auto' : 'none'}
            opacity={checkValidPosJumpBack() ? 1 : 0.5}
            cursor='pointer'
            onClick={() => changeStepSkip(-1)}
          />
          <Flex
            pointerEvents={checkValidPos(3 * Math.floor(currentPage / 3) + 1) ? 'auto' : 'none'}
            opacity={checkValidPos(3 * Math.floor(currentPage / 3) + 1) ? 1 : 0.5}
            color={currentPage % 3 === 0 ? '#FFF' : '#2D3748'}
            marginLeft={3}
            onClick={() => changePos(0, currentPage % 3 !== 0)}
            cursor='pointer'
            fontSize='small'
            fontWeight='semibold'
            width='35px'
            height='35px'
            backgroundColor={currentPage % 3 === 0 ? '#2D3748' : 'transparent'}
            borderRadius={8}
            justifyContent='center'
            alignItems='center'
          >
            {3 * Math.floor(currentPage / 3) + 1}
          </Flex>
          <Flex
            pointerEvents={checkValidPos(3 * Math.floor(currentPage / 3) + 2) ? 'auto' : 'none'}
            opacity={checkValidPos(3 * Math.floor(currentPage / 3) + 2) ? 1 : 0.5}
            color={currentPage % 3 === 1 ? '#FFF' : '#2D3748'}
            onClick={() => changePos(1, currentPage % 3 !== 1)}
            cursor='pointer'
            fontSize='small'
            fontWeight='semibold'
            width='35px'
            height='35px'
            backgroundColor={currentPage % 3 === 1 ? '#2D3748' : 'transparent'}
            borderRadius={8}
            justifyContent='center'
            alignItems='center'
          >
            {3 * Math.floor(currentPage / 3) + 2}
          </Flex>
          <Flex
            pointerEvents={checkValidPos(3 * Math.floor(currentPage / 3) + 3) ? 'auto' : 'none'}
            opacity={checkValidPos(3 * Math.floor(currentPage / 3) + 3) ? 1 : 0.5}
            color={currentPage % 3 === 2 ? '#FFF' : '#2D3748'}
            marginRight={3}
            onClick={() => changePos(2, currentPage % 3 !== 2)}
            cursor='pointer'
            fontSize='small'
            fontWeight='semibold'
            width='35px'
            height='35px'
            backgroundColor={currentPage % 3 === 2 ? '#2D3748' : 'transparent'}
            borderRadius={8}
            justifyContent='center'
            alignItems='center'
          >
            {3 * Math.floor(currentPage / 3) + 3}
          </Flex>
          <GrFormNext
            aria-label='Next page'
            pointerEvents={checkValidPosJumpNext() ? 'auto' : 'none'}
            opacity={checkValidPosJumpNext() ? 1 : 0.5}
            cursor='pointer'
            onClick={() => changeStepSkip(1)}
          />
        </Flex>
      </TableContainer>

      <Flex flex={1} justifyContent='flex-end' mx={3} mb={3}>
        <Menu>
          <MenuButton
            fontSize='small'
            background='transparent'
            _hover={{ backgroundColor: 'transparent' }}
            as={Button}
            rightIcon={<IoChevronDownCircleOutline />}
          >
            {t('row_per_page')} - {rowPerPage}
          </MenuButton>
          <MenuList p={2} borderRadius='12px'>
            <MenuItem onClick={() => handleRowPerPage(5)} borderRadius='8px' fontSize='small'>
              5
            </MenuItem>
            <MenuItem onClick={() => handleRowPerPage(10)} borderRadius='8px' fontSize='small'>
              10
            </MenuItem>
            <MenuItem onClick={() => handleRowPerPage(25)} borderRadius='8px' fontSize='small'>
              25
            </MenuItem>
            <MenuItem onClick={() => handleRowPerPage(50)} borderRadius='8px' fontSize='small'>
              50
            </MenuItem>
            <MenuItem onClick={() => handleRowPerPage(100)} borderRadius='8px' fontSize='small'>
              100
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
