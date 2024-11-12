import {
  Badge,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { IoMdAddCircleOutline, IoMdSearch } from 'react-icons/io';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { classAPIController } from '@/core/services/ClassAPI/classAPIController';
import { generateFakeData } from '@/mocks/fakeDataClassList';
import ActionButton from '@/pages/Dashboard/components/Class/components/ClassView/components/ActionButton';
import FilterPopoverContent from '@/pages/Dashboard/components/Class/components/ClassView/components/FilterPopoverContent';
import '@/pages/Dashboard/components/Class/components/ClassView/paginationStyle.css';
import { CgSortAz, CgSortZa } from 'react-icons/cg';
import ReactPaginate from 'react-paginate';
import { calculateHourDifference } from '@/utils/convertDate';

export const ClassView = () => {
  const [data, setData] = useState(() => [...generateFakeData(1000)]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [active, setActive] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [update, setUpdate] = useState(true);
  const [sorting, setSorting] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    classAPIController
      .getAllClass()
      .then((res) => {
        const filteredRes = res.filter((item) => item.status !== 0);
        setData(filteredRes);
        setUpdate(false);
      })
      .catch(() => {});
  }, [update, setUpdate]);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('className', {
      cell: (info) => (
        <Link
          to={`/dashboard/class/${info.row.original.classId}`}
          style={{ color: '#2d3748' }}
        >
          <Text _hover={{ textDecoration: 'underline' }}>
            {info.getValue()}
          </Text>
        </Link>
      ),
      header: t('Class'),
    }),
    columnHelper.accessor('classCode', {
      cell: (info) => (
        <Link
          to={`/dashboard/class/${info.row.original.classId}`}
          style={{ color: '#2d3748' }}
        >
          <Text _hover={{ textDecoration: 'underline' }}>
            {info.getValue()}
          </Text>
        </Link>
      ),
      header: t('Class code'),
    }),
    columnHelper.accessor('createDate', {
      cell: (info) => (
        <span style={{ color: '#2d3748' }}>{info.getValue()}</span>
      ),
      header: t('Created On'),
    }),
    columnHelper.accessor('createdBy', {
      cell: (info) => (
        <span style={{ color: '#2d3748' }}>{info.getValue().username}</span>
      ),
      header: t('Created By'),
    }),
    columnHelper.accessor('duration', {
      cell: (info) => (
        <span style={{ color: '#2d3748' }}>
          {Math.floor(
            info.getValue() /
              60 /
              calculateHourDifference(
                info.row.original.endTime,
                info.row.original.startTime
              )
          )}{' '}
          {t('days')}
        </span>
      ),
      header: t('Duration'),
    }),
    columnHelper.accessor('attendeeType', {
      cell: (info) => (
        <div className='flex gap-3'>
          <Badge
            variant='subtle'
            px={3}
            py={2}
            color={'white'}
            backgroundColor={
              {
                'Offline fee-fresher': '#d45b13',
                Intern: '#2d3748',
                'Online fee-fresher': '#2f903f',
                Fresher: '#ff7568',
              }[info.getValue()] || 'gray.500'
            }
            borderRadius={12}
          >
            {info.getValue()}
          </Badge>
        </div>
      ),
      header: t('Attendee'),
    }),
    columnHelper.accessor('location', {
      cell: (info) => (
        <span style={{ color: '#2d3748' }}>{info.getValue()}</span>
      ),
      header: t('Location'),
    }),
    columnHelper.accessor('fsu', {
      cell: (info) => (
        <span style={{ color: '#2d3748' }}>{info.getValue().fsuName}</span>
      ),
      header: 'FSU',
    }),
    columnHelper.accessor('action', {
      cell: (info) => (
        <ActionButton data={info.row.original} setUpdate={setUpdate} />
      ),
      header: '',
    }),
  ];

  const table = useReactTable({
    data,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    columns,
    state: {
      globalFilter,
      sorting,
    },
    sortingFns: {
      myCustomSorting: (rowA, rowB, columnId) =>
        rowA.getValue(columnId).value < rowB.getValue(columnId).value ? 1 : -1,
    },

    onSortingChange: setSorting,
  });

  useEffect(() => {
    table.setPageSize(rowsPerPage);
  }, [rowsPerPage]);

  const next = () => {
    if (active === table.getPageCount) return;
    table.nextPage();
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    table.previousPage();
    setActive(active - 1);
  };
  return (
    <>
      <Flex flexDirection='column' rowGap={3} width='100%'>
        <Text m={2} textAlign='left' mt={3} fontWeight='semibold'>
          {t('Training Class')}
        </Text>
        <Flex
          flex={1}
          mx={3}
          flexDirection='row'
          alignItems='center'
          justifyContent='center'
        >
          <Flex
            flex={1}
            flexDirection='row'
            justifyContent='flex-start'
            columnGap={3}
          >
            <InputGroup borderRadius='12px' width='300px' height='36px'>
              <InputLeftElement pointerEvents='none'>
                <IoMdSearch color='#2D3748' />
              </InputLeftElement>
              <Input
                borderRadius='12px'
                type='text'
                placeholder={t('Search by...')}
                onChange={(e) => {
                  table.setGlobalFilter(e.target.value);
                  setGlobalFilter(e.target.value);
                }}
              />
            </InputGroup>
            <FilterPopoverContent />
          </Flex>
          <Button
            borderRadius='12px'
            as={Link}
            to={'/dashboard/class/create'}
            leftIcon={<IoMdAddCircleOutline />}
            backgroundColor='#2D3748'
            color='#FFF'
            _hover={{ backgroundColor: '#2D3748', color: '#FFF' }}
            variant='solid'
          >
            {t('Add new class')}
          </Button>
        </Flex>

        <TableContainer
          width='-webkit-fill-available'
          margin={3}
          borderRadius={15}
          backgroundColor='#FFF'
        >
          <Table variant='simple' fontSize='small'>
            <Thead backgroundColor='#2D3748'>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id} className='bg-[#2D3748]'>
                  {headerGroup.headers.map((column) => (
                    <Th
                      key={column.id}
                      colSpan={column.colSpan}
                      className=' border-b border-blue-gray-100  p-4 '
                      onClick={column.column.getToggleSortingHandler()}
                    >
                      <Flex gap={2} alignItems={'center'}>
                        <Text variant='small' color='white'>
                          {flexRender(
                            column.column.columnDef.header,
                            column.getContext()
                          )}
                        </Text>
                        {column.column.id === 'action' ? null : (
                          <>
                            {
                              {
                                asc: <CgSortZa size={20} color='white' />,
                                desc: <CgSortAz size={20} color='white' />,
                              }[column.column.getIsSorted() ?? null]
                            }
                            {column.column.getIsSorted() ? null : (
                              <Stack gap={0}>
                                <CgSortAz
                                  size={20}
                                  color='white'
                                  opacity={0.8}
                                />
                              </Stack>
                            )}
                          </>
                        )}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, i) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td
                        key={cell.id}
                        alignItems='center'
                        color='darkgray'
                        fontSize='medium'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))
              ) : (
                <Tr className='text-center h-32'>
                  <Td colSpan={12}>
                    <Flex justifyContent='center'>
                      <Text fontSize={'large'}>{t('No Record Found!')}</Text>
                    </Flex>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>

          <Flex
            flexDir={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            w={'100%'}
            marginY={4}
          >
            <ReactPaginate
              breakLabel={<span className='mr-4'>...</span>}
              nextLabel={
                <Button
                  variant='text'
                  name='NextPage'
                  className='flex items-center gap-2'
                  onClick={() => {
                    if (active !== table.getPageCount()) {
                      next();
                    }
                  }}
                >
                  <GrFormNext />
                </Button>
              }
              previousLabel={
                <Button
                  variant='text'
                  name='PreviousPage'
                  className='flex items-center gap-2'
                  onClick={prev}
                >
                  <GrFormPrevious />
                </Button>
              }
              containerClassName='container_pagination'
              pageCount={table.getPageCount()}
              pageRangeDisplayed={1}
              pageClassName='default_page'
              breakClassName='default_page'
              previousClassName='default_page'
              nextClassName='default_page'
              activeClassName='active_page'
              onPageChange={(page) => {
                table.setPageIndex(page.selected);
                setActive(page.selected + 1);
              }}
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
              {t('Row per page')} - {rowsPerPage}
            </MenuButton>
            <MenuList p={2} borderRadius='12px'>
              {[5, 10, 15, 20, 50, 100].map((value) => (
                <MenuItem
                  key={value}
                  borderRadius='8px'
                  fontSize='small'
                  onClick={() => {
                    const rowsPerPage = parseInt(value, 10);
                    setRowsPerPage(rowsPerPage);
                  }}
                >
                  {value}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
};
