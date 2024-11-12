import { Box, Table, Tfoot, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, Flex, Tooltip, Text, MenuButton, MenuList, Menu, Button, MenuItem } from "@chakra-ui/react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { MdSort } from "react-icons/md";
import { SearchBar } from "./searchBar";
import EllipsisButton from "./ellipsisButton";
import {RedImportButton } from "./importButton";
import { BlackAddNewButton } from "./addNewButton";
import { Link } from "react-router-dom";

export const ProgramList = () => {
    return (
        <>
            <Box
                width="100%"
                bg="#2D3748"
                color="white"
                borderRadius="8px"
                p="4"
                textAlign="center"
                boxShadow="md"
                marginTop={'1rem'}
            >
                <h2>TRAINING PROGRAM</h2>
            </Box>

            <Flex width={'full'}>
                <SearchBar />
            </Flex>

            <Flex justifyContent={'flex-end'} width={'full'}>
                <RedImportButton />
                <BlackAddNewButton />
            </Flex>

            <TableContainer width='-webkit-fill-available' margin={3} borderRadius={15} backgroundColor='#FFF'>
                <Table variant='simple' fontSize='small'>
                    <Thead backgroundColor='#2D3748'>
                        <Tr>
                            <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>ID <MdSort /></Th>
                            <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Frogram name <MdSort /></Th>
                            <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Create on <MdSort /></Th>
                            <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Create by <MdSort /></Th>
                            <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Duration <MdSort /></Th>
                            <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'>Status <MdSort /></Th>
                            <Th fontSize='small' fontWeight='normal' textTransform='none' color='#FFF'></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Link to={'/dashboard/training-program/detail'}><Td>C# basic program</Td></Link>
                            <Td>21/07/2109</Td>
                            <Td>Warior Tran</Td>
                            <Td>7 days</Td>
                            <Td>
                                <Flex background='#2D3748' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Active</Flex>
                            </Td>
                            <EllipsisButton />
                        </Tr>
                        <Tr>
                            <Td>2</Td>
                            <Link to={'/dashboard/training-program/detail'}><Td>C# basic program</Td></Link>
                            <Td>21/07/2109</Td>
                            <Td>Warior Tran</Td>
                            <Td>7 days</Td>
                            <Td>
                                <Flex background='#808080' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Inactive</Flex>
                            </Td>
                            <EllipsisButton />
                        </Tr>
                        <Tr>
                            <Td>3</Td>
                            <Link to={'/dashboard/training-program/detail'}><Td>C# basic program</Td></Link>
                            <Td>21/07/2109</Td>
                            <Td>Warior Tran</Td>
                            <Td>7 days</Td>
                            <Td>
                                <Flex background='#808080' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Inactive</Flex>
                            </Td>
                            <EllipsisButton />
                        </Tr>
                        <Tr>
                            <Td>4</Td>
                            <Link to={'/dashboard/training-program/detail'}><Td>C# basic program</Td></Link>
                            <Td>21/07/2109</Td>
                            <Td>Warior Tran</Td>
                            <Td>7 days</Td>
                            <Td>
                                <Flex background='#808080' width='fit-content' color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>Inactive</Flex>
                            </Td>
                            <EllipsisButton />
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