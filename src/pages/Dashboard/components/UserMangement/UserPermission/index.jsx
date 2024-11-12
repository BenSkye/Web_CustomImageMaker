import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Flex,
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
  useToast,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FaAngleDown } from 'react-icons/fa';
import { MdOutlineVisibilityOff, MdOutlineVisibility, MdOutlineEdit } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { IoMdStarOutline } from 'react-icons/io';
import userPermissionController from '@/core/services/userPermissonAPI';
import useAuthorization from '@/hooks/useAuthorization';

const translatedOptions = [
  { label: 'Full access', icon: <IoMdStarOutline fontSize={'23px'} />, num: 1 },
  { label: 'Create', icon: <IoAddCircleOutline fontSize={'23px'} />, num: 2 },
  { label: 'Modify', icon: <MdOutlineEdit fontSize={'23px'} />, num: 3 },
  { label: 'View', icon: <MdOutlineVisibility fontSize={'23px'} />, num: 4 },
  { label: 'Access denied', icon: <MdOutlineVisibilityOff fontSize={'23px'} />, num: 5 },
];

export const UserPermission = () => {
  const { t } = useTranslation();
  const [options, setOptions] = useState(translatedOptions);
  const [data, setData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const toast = useToast();

  // Get Role Permission
  const { userManagementPermission } = useSelector((state) => state.permissionList.data);
  const { isAccessible } = useAuthorization(userManagementPermission);

  const fetchData = async () => {
    const response = await userPermissionController.getAllUserPermission();
    setData(response);
  };

  useEffect(() => {
    fetchData();
  }, [isUpdate]); // Add isUpdate as dependency

  const initialSelectedOptions = useMemo(() => {
    return data.map((i) => ({
      syllabusPermission: translatedOptions[i.syllabusPermission - 1],
      trainingProgramPermission: translatedOptions[i.trainingProgramPermission - 1],
      classPermission: translatedOptions[i.classPermission - 1],
      learningMaterialPermission: translatedOptions[i.learningMaterialPermission - 1],
      userManagementPermission: translatedOptions[i.userManagementPermission - 1],
    }));
  }, [data]);

  useEffect(() => {
    setSelectedOptions(initialSelectedOptions);
  }, [initialSelectedOptions]);

  const handleOptionChange = (index, field, option, item) => {
    const selectedOption = selectedOptions[index]?.[field];
    if (
      selectedOption &&
      selectedOption.label === option.label &&
      selectedOption.num === option.num
    ) {
      return;
    }
    const newSelectedOptions = selectedOptions.map((selectedOption, idx) => {
      if (idx === index) {
        return { ...selectedOption, [field]: option };
      }
return selectedOption;
    });
    setSelectedOptions(newSelectedOptions);
    const updatedObj = {
      ...updatedData,
      id: item.id,
      roleName: item.roleName,
      [field]: option.num,
    };
    console.log(
      item.roleName +
        ' | ' +
        'selected at: ' +
        field +
        ' | Text: ' +
        option.label +
        ' | Number: ' +
        option.num
    );
    console.table(updatedObj);
    setUpdatedData(updatedObj);
  };


  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };
  const handleSave = () => {
    const item = data.find((i) => i.id === updatedData.id);
    console.table({ ...item, ...updatedData });
    userPermissionController
      .updateUserPermission({ ...item, ...updatedData })
      .then(() => {
        toast({
          title: t('Success'),
          status: 'success',
          description: t('Data updated successfully!'),
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
        setIsUpdate(!isUpdate);
        window.location.reload(); 
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        toast({
          title: 'Error',
          status: 'error',
          description: 'Failed to update data. Please try again later.',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        });
      });
    setUpdatedData({});
    setIsEdit(false); 
  };
  return (
    <Box p='1rem' display='flex' flexDir='column' w='100%'>
      <Text aria-label='Heading Page' m={2} textAlign='left' mt={3} fontWeight='semibold'>
        {t('User Permission')}
      </Text>
      {!isEdit && isAccessible.modify ? (
        <Flex justifyContent='flex-end'>
          <Button
            onClick={handleEditClick}
            _hover={{ backgroundColor: '#000' }}
            backgroundColor='#2D3748'
            color={'white'}
            borderRadius={'10px'}
          >
            {t('Update permission')}
          </Button>
        </Flex>
      ) : (
        <Flex justifyContent='flex-end'>
          <Flex width={136.75} height={10} paddingX={'16px'}></Flex>
        </Flex>
      )}

      <TableContainer width='100%' borderRadius={15} backgroundColor='#FFF' mt={6}>
        <Table variant='simple' fontSize='small'>
          <Thead backgroundColor='#2D3748'>
            <Tr>
              <Th color='#FFF'>{t('roleName')}</Th>
              <Th color='#FFF'>{t('syllabus')}</Th>
              <Th color='#FFF'>{t('trainingProgram')}</Th>
              <Th color='#FFF'>{t('class')}</Th>
              <Th color='#FFF'>{t('learningMaterial')}</Th>
              <Th color='#FFF'>{t('user')}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                {item.roleName === 'SUPER ADMIN' && (
                  <Td fontWeight='750'>
                    <Text
                      paddingY={2}
                      borderRadius={'10px'}
                      textAlign={'center'}
                      width={'100px'}
                      backgroundColor={'#D45B13'}
                      color={'white'}
                    >
                      {item.roleName}
                    </Text>
                  </Td>
                )}
                {item.roleName === 'ADMIN' && (
                  <Td fontWeight='750'>
                    <Text
                      paddingY={2}
borderRadius={'10px'}
                      textAlign={'center'}
                      width={'100px'}
                      backgroundColor={'#2F903F'}
                      color={'white'}
                    >
                      {item.roleName}
                    </Text>
                  </Td>
                )}
                {item.roleName === 'TRAINER' && (
                  <Td fontWeight='750'>
                    <Text
                      paddingY={2}
                      borderRadius={'10px'}
                      textAlign={'center'}
                      width={'100px'}
                      backgroundColor={'#0B2136'}
                      color={'white'}
                    >
                      {item.roleName}
                    </Text>
                  </Td>
                )}
                {[
                  'syllabusPermission',
                  'trainingProgramPermission',
                  'classPermission',
                  'learningMaterialPermission',
                ].map((field, idx) => (
                  <Td key={idx}>
                    {isEdit ? (
                      <>
                        <Menu>
                          <MenuButton
                            data-testid='menu-button'
                            boxShadow={'xl'}
                            width={'100%'}
                            as={Button}
                            rightIcon={<FaAngleDown />}
                            alignItems='center'
                            _hover={{ bgColor: '#F7FAFC' }}
                            _focus={{ bgColor: '#F7FAFC' }}
                          >
                            <Flex alignItems='center'>
                              {selectedOptions[index]?.[field]?.label}
                            </Flex>
                          </MenuButton>
                          <MenuList>
                            {options.map((option, optionIndex) => (
                              <MenuItem
                                key={optionIndex}
                                onClick={() => handleOptionChange(index, field, option, item)}
                                className='menu-item'
                              >
                                {option.icon}
                                <Text fontSize={'14px'} ml={2}>
                                  {t(`${option.label}`)}
                                </Text>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      </>
                    ) : (
                      <Flex alignItems={'center'}>
                        {selectedOptions[index]?.[field]?.icon}
                        <Text ml={'0.6rem'} fontSize='md' fontWeight={'600'}>
                          {t(`${selectedOptions[index]?.[field]?.label}`)}
                        </Text>
                      </Flex>
                    )}
                  </Td>
))}
                <Td>
                  <Flex alignItems='center'>
                    {translatedOptions[item.userManagementPermission - 1].icon}
                    <Text ml={'0.6rem'} fontSize='md' fontWeight={'600'}>
                      {translatedOptions[item.userManagementPermission - 1].label}
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {isEdit && isAccessible.modify && (
        <Flex mt={3} justify={'flex-end'}>
          <Flex flex={0.1} align={'center'} justifyContent={'space-around'}>
            <Text
              onClick={handleEditClick}
              textDecoration={'underline'}
              _hover={{ opacity: '0.6', cursor: 'pointer' }}
              fontSize={'sm'}
              color='red'
              borderRadius={'10px'}
            >
              {t('Cancel')}
            </Text>
            <Button
              onClick={handleSave}
              _hover={{ backgroundColor: '#000' }}
              color={'white'}
              width={'80px'}
              backgroundColor={'#2D3748'}
              borderRadius={'10px'}
            >
              {t('Save')}
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default UserPermission;
