import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, MenuButton, MenuList, Menu, Button, MenuItem } from '@chakra-ui/react';

export const ExampleComponent = () => {
  return (
    <>
      <TableContainer width='-webkit-fill-available' margin={3} borderRadius={15} backgroundColor='#FFF'>
        <Table variant='simple' fontSize='small'>
          <Thead backgroundColor='#2D3748'>
            <Tr>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>ID</Th>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Full Name</Th>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Date of Birth</Th>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Gender</Th>
              <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Type</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Nguyen Van A</Td>
              <Td>20/10/2002</Td>
              <Td>Male</Td>
              <Td>
                <Flex background='#4DB848' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Admin</Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Nguyen Van B</Td>
              <Td>20/10/2002</Td>
              <Td>Male</Td>
              <Td>
                <Flex background='#0B2136' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Trainer</Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>3</Td>
              <Td>Nguyen Van C</Td>
              <Td>20/10/2002</Td>
              <Td>Male</Td>
              <Td>
                <Flex background='#0B2136' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Trainer</Flex>
              </Td>
            </Tr>
            <Tr>
              <Td>1</Td>
              <Td>Nguyen Van A</Td>
              <Td>20/10/2002</Td>
              <Td>Male</Td>
              <Td>
                <Flex background='#0B2136' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Trainer</Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>

        <Flex
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
          width='100%'
          marginY={3}
        >
          <GrFormPrevious cursor='pointer' />
          <Flex cursor='pointer' fontSize='small' fontWeight='semibold' width='35px' height='35px' borderRadius={8} justifyContent='center' alignItems='center'>1</Flex>
          <Flex cursor='pointer' fontSize='small' fontWeight='semibold' width='35px' height='35px' backgroundColor='#2D3748' borderRadius={8} justifyContent='center' color='#FFF' alignItems='center'>2</Flex>
          <Flex cursor='pointer' fontSize='small' fontWeight='semibold' width='35px' height='35px' borderRadius={8} justifyContent='center' alignItems='center'>3</Flex>
          <GrFormNext cursor='pointer' />
        </Flex>
      </TableContainer>

      <Flex justifyContent='flex-end' width='100%'>
        <Menu>
          <MenuButton fontSize='small' background='transparent' as={Button} rightIcon={<IoChevronDownCircleOutline />}>
            Row per page - 5
          </MenuButton>
          
          <MenuList>
            <MenuItem fontSize='small'>10</MenuItem>
            <MenuItem fontSize='small'>25</MenuItem>
            <MenuItem fontSize='small'>50</MenuItem>
            <MenuItem fontSize='small'>100</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}