import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IoMdSearch, IoMdAddCircleOutline } from 'react-icons/io';
import {
  Flex, Text, Button, InputGroup, InputLeftElement, Input, HStack, Tag,
  TagLabel, TagCloseButton, AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, FormControl,
  FormLabel, Select, RadioGroup, Stack, Radio, Switch, useToast
} from '@chakra-ui/react';
import { MPAlert } from '@/core/components/MPAlert';
import { MPTableV2 } from '@/core/components/MPTableV2';
import { setUserData } from '@/core/store/user-management/userUpdate';
import { setIsUpdating } from '@/core/store/user-management/userUpdate';
import { updateUser, createUser } from '@/core/services/userController';
import { getUsers } from '@/core/services/userController';
import { formatDateToISOShorten } from '@/utils/convertDate';
import { generateSortString } from '@/utils/generateSortString';
import { setSearchPage } from '@/core/store/user-management/userSearch';

export const UserList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const toast = useToast();

  const isUpdating = useSelector((state) => state.userUpdating.isUpdating);
  const updatingData = useSelector((state) => state.userUpdating.userData);
  const searchPage = useSelector((state) => state.userSearching.page);
  const searchSize = useSelector((state) => state.userSearching.size);
  const sortAttributes = useSelector((state) => state.userSearching.sort);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onClose: onCloseUpdate } = useDisclosure();
  const cancelRef = React.useRef();
  const cancelRefUpdate = React.useRef();

  const [users, setUsers] = React.useState([]);
  const [tableData, setTableData] = React.useState({
    totalElement: 0,
    totalPage: 0,
    lastPage: false,
    firstPage: false
  });

  const [searchTags, setSearchTags] = React.useState([]);
  const [currentSearchValue, setCurrentSearchValue] = React.useState('');

  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');

  const { userManagementPermission } = useSelector((state) => state.permissionList.data);

  React.useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const sortStringArray = generateSortString(sortAttributes);

    getUsers(
      searchTags.join(' '),
      searchPage,
      searchSize,
      sortStringArray
    )
      .then((res) => {
        const data = res.data;
        setUsers(data.content);

        setTableData({
          totalElement: data.totalElement,
          totalPage: data.totalPage,
          lastPage: data.lastPage,
          firstPage: data.firstPage
        });
      })
      .catch(() => {
        setUsers([]);
      });
  }

  const handleRemoveSearchTags = (tagName) => {
    let tags = searchTags.filter((tag) => tag !== tagName);
    setSearchTags(tags);
  }

  const handleAddSearchTags = (val) => {
    if (!searchTags.includes(val)) {
      setSearchTags(
        [...searchTags, val]
      );
      setCurrentSearchValue('');
    } else {
      setCurrentSearchValue('');
    }
  }

  const handleSearchKeyDown = (key) => {
    if (key === 'Enter') {
      handleAddSearchTags(currentSearchValue);
    }
  }

  const openAddDialog = () => {
    dispatch(setUserData({
      name: '',
      email: '',
      dob: '',
      phone: '',
      male: false,
      roleName: '',
      active: true
    }));
    onOpen();
  }

  const handleCreateUser = () => {
    if (userManagementPermission === 2 || userManagementPermission === 1) {
      createUser(updatingData)
        .then(() => {
          toast({
            title: t('Success'),
            status: 'success',
            description: t('Create user successfully!'),
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          });
          onClose();
          loadUsers();
        })
        .catch((err) => {
          err.response.data.details.forEach((e) => (
            toast({
              title: t('Fail'),
              status: 'error',
              description: t(`${e}`),
              duration: 5000,
              isClosable: true,
              position: 'top-right'
            })
          ));
        })
    } else {
      toast({
        title: t('Fail'),
        status: 'error',
        description: t('Current user does not have permission to create user!'),
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      });
      onClose();
    }
  }

  React.useEffect(() => {
    const sortStringArray = generateSortString(sortAttributes);

    getUsers(
      searchTags.join(' '),
      0, // search page always to first when apply new filter strings
      searchSize,
      sortStringArray
    )
      .then((res) => {
        const data = res.data;
        setUsers(data.content);

        setTableData({
          totalElement: data.totalElement,
          totalPage: data.totalPage,
          lastPage: data.lastPage,
          firstPage: data.firstPage
        });
      })
      .then(() => {
        dispatch(setSearchPage(0));
      })
      .catch(() => {
        setUsers([]);
      });
  }, [searchTags]);

  React.useEffect(() => {
    loadUsers();
  }, [searchPage]);

  React.useEffect(() => {
    loadUsers();
  }, [searchSize]);

  React.useEffect(() => {
    loadUsers();
  }, [sortAttributes]);

  return (
    <>
      <Flex flexDirection='column' rowGap={3} width='100%'>
        <Text m={2} data-testid='header-page' textAlign='left' mt={3} fontWeight='semibold'>{t('user_management')}</Text>

        <Flex flex={1} mx={3} flexDirection='row' alignItems='center' justifyContent='center'>
          <Flex flex={1} flexDirection='row' justifyContent='flex-start' columnGap={3}>
            <InputGroup borderRadius='12px' width='300px' height='36px'>
              <InputLeftElement pointerEvents='none'>
                <IoMdSearch color='#2D3748' />
              </InputLeftElement>
              <Input required data-testid='search-field' value={currentSearchValue} onKeyDown={(e) => handleSearchKeyDown(e.key)} onChange={(e) => setCurrentSearchValue(e.target.value)} borderRadius='12px' type='text' placeholder={t('search_by')} />
            </InputGroup>
          </Flex>

          <Button name='Add User' data-testid='add-user-button' value='Add User' onClick={openAddDialog} borderRadius='12px' leftIcon={<IoMdAddCircleOutline />} backgroundColor='#2D3748' color='#FFF' _hover={{ backgroundColor: '#2D3748', color: '#FFF' }} variant='solid'>
            {t('add_user')}
          </Button>
        </Flex>

        <Flex flex={1} mx={3} marginTop={3} flexDirection='row' alignItems='center' justifyContent='flex-start'>
          <HStack spacing={4}>
            {
              searchTags.map((tagName) => (
                <Tag
                  size='md'
                  key={tagName}
                  borderRadius='full'
                  variant='solid'
                  backgroundColor='#474747'
                  color='#FFF'
                  height='32px'
                >
                  <TagLabel>{tagName}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveSearchTags(tagName)} />
                </Tag>
              ))
            }
          </HStack>
        </Flex>

        <MPTableV2
          data={users}
          pageNo={searchPage}
          pageSize={searchSize}
          totalElement={tableData.totalElement}
          totalPage={tableData.totalPage}
          lastPage={tableData.lastPage}
          firstPage={tableData.firstPage}
          reloadData={loadUsers}
        />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width='542px' maxW='100vw' borderRadius={16}>
            <AlertDialogHeader data-testid='header-add-user' fontSize='lg' fontWeight='bold'>
              {t('add_a_new_user')}
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isRequired>
                <Flex width='100%' marginBottom={3} alignItems='center'>
                  <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('user_type')}</FormLabel>
                  <Select required flex={1} value={updatingData?.userPermissionId} onChange={(e) => {
                    dispatch(setUserData({
                      ...updatingData,
                      userPermissionId: e.target.value
                    }))
                  }}>
                    <option value={1}>SUPER ADMIN</option>
                    <option value={2}>ADMIN</option>
                    <option value={3}>TRAINER</option>
                  </Select>
                </Flex>

                <Flex width='100%' marginBottom={3} alignItems='center'>
                  <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('name')}</FormLabel>
                  <Input required flex={1} placeholder='' type='text' onChange={(e) => {
                    dispatch(setUserData({
                      ...updatingData,
                      name: e.target.value
                    }))
                  }} />
                </Flex>

                <Flex width='100%' marginBottom={3} alignItems='center'>
                  <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('email')}</FormLabel>
                  <Input required flex={1} placeholder='' value={updatingData?.userEmail} type='email' onChange={(e) => {
                    dispatch(setUserData({
                      ...updatingData,
                      userEmail: e.target.value
                    }))
                  }} />
                </Flex>

                <Flex width='100%' marginBottom={3} alignItems='center'>
                  <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('phone')}</FormLabel>
                  <Input flex={1} required placeholder='' type='text' value={updatingData?.phone} onChange={(e) => {
                    dispatch(setUserData({
                      ...updatingData,
                      phone: e.target.value
                    }))
                  }} />
                </Flex>

                <Flex width='100%' marginBottom={3} alignItems='center'>
                  <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('date_of_birth')}</FormLabel>
                  <Input flex={1} required placeholder='' type='date' onChange={(e) => {
                    dispatch(setUserData({
                      ...updatingData,
                      dob: (new Date(e.target.value)).toISOString()
                    }))
                  }} value={formatDateToISOShorten(updatingData?.dob)} />
                </Flex>

                <Flex width='100%' marginBottom={3} alignItems='center'>
                  <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('gender')}</FormLabel>
                  <RadioGroup marginX={0} onChange={(val) => {
                    dispatch(setUserData({
                      ...updatingData,
                      male: val === 'male'
                    }))
                  }} value={updatingData?.male === true ? 'male' : 'female'}>
                    <Stack direction='row'>
                      <Radio value='male'>{t('male')}</Radio>
                      <Radio value='female'>{t('female')}</Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>

                <Flex width='100%' marginBottom={3} alignItems='center'>
                  <FormLabel width='150px' mb='0' fontSize='small' fontWeight='semibold'>
                    {t('active')}
                  </FormLabel>
                  <Switch required onChange={(e) => {
                    dispatch(setUserData({
                      ...updatingData,
                      active: e.target.value
                    }))
                  }} value={updatingData?.active === true} />
                </Flex>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button borderRadius='12px' ref={cancelRef} onClick={onClose}>
                {t('cancel')}
              </Button>
              <Button borderRadius='12px' backgroundColor='#2D3748' color='#FFF' _hover={{ backgroundColor: '#2D3748', color: '#FFF' }} onClick={handleCreateUser} ml={3}>
                {t('create')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {
        updatingData &&
        <AlertDialog
          isOpen={isUpdating}
          leastDestructiveRef={cancelRefUpdate}
          onClose={
            () => {
              dispatch(setIsUpdating(false));
              onCloseUpdate();
            }
          }
        >
          <AlertDialogOverlay>
            <AlertDialogContent width='542px' maxW='100vw' borderRadius={16}>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                {t('update_a_user')}
              </AlertDialogHeader>

              <AlertDialogBody>
                <FormControl isRequired>
                  <Flex width='100%' marginBottom={3} alignItems='center'>
                    <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('user_type')}</FormLabel>
                    <Select disabled={true} defaultValue={updatingData?.roleName} flex={1} value={updatingData?.roleName}>
                      <option value='SUPER ADMIN'>SUPER ADMIN</option>
                      <option value='ADMIN'>ADMIN</option>
                      <option value='TRAINER'>TRAINER</option>
                    </Select>
                  </Flex>

                  <Flex width='100%' marginBottom={3} alignItems='center'>
                    <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('name')}</FormLabel>
                    <Input required value={updatingData?.name} flex={1} placeholder='' type='text' onChange={(e) => {
                      dispatch(setUserData({
                        ...updatingData,
                        name: e.target.value
                      }))
                    }} />
                  </Flex>

                  <Flex width='100%' marginBottom={3} alignItems='center'>
                    <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('email')}</FormLabel>
                    <Input disabled={true} value={updatingData?.email} flex={1} placeholder='' type='email' />
                  </Flex>

                  <Flex width='100%' marginBottom={3} alignItems='center'>
                    <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('phone')}</FormLabel>
                    <Input required value={updatingData?.phone} flex={1} placeholder='' type='text' onChange={(e) => {
                      dispatch(setUserData({
                        ...updatingData,
                        phone: e.target.value
                      }))
                    }} />
                  </Flex>

                  <Flex width='100%' marginBottom={3} alignItems='center'>
                    <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('date_of_birth')}</FormLabel>
                    <Input required type='date' onChange={(e) => {
                      dispatch(setUserData({
                        ...updatingData,
                        dob: (new Date(e.target.value)).toISOString()
                      }))
                    }} value={formatDateToISOShorten(updatingData?.dob)} flex={1} placeholder='' />
                  </Flex>

                  <Flex width='100%' marginBottom={3} alignItems='center'>
                    <FormLabel width='150px' fontSize='small' fontWeight='semibold'>{t('gender')}</FormLabel>
                    <RadioGroup marginX={0} onChange={(val) => {
                      dispatch(setUserData({
                        ...updatingData,
                        male: val === 'male'
                      }))
                    }} value={updatingData?.male === true ? 'male' : 'female'}>
                      <Stack direction='row'>
                        <Radio value='male'>{t('male')}</Radio>
                        <Radio value='female'>{t('female')}</Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>

                  <Flex width='100%' marginBottom={3} alignItems='center'>
                    <FormLabel width='150px' mb='0' fontSize='small' fontWeight='semibold'>
                      {t('active')}
                    </FormLabel>
                    <Switch isReadOnly isFocusable isDisabled onChange={(e) => {
                      dispatch(setUserData({
                        ...updatingData,
                        isEnable: e.target.value
                      }))
                    }} isChecked={updatingData?.isEnable === true} />
                  </Flex>
                </FormControl>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button borderRadius='12px' ref={cancelRef} onClick={() => dispatch(setIsUpdating(false))}>
                  {t('cancel')}
                </Button>
                <Button borderRadius='12px' ml={3} backgroundColor='#2D3748' color='#FFF' _hover={{ backgroundColor: '#2D3748', color: '#FFF' }} onClick={() => {
                  updateUser(updatingData)
                    .then(() => {
                      dispatch(setIsUpdating(false));
                    })
                    .then(() => {
                      toast({
                        title: t('Success'),
                        status: 'success',
                        description: t('Update user successfully!'),
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right'
                      });
                    })
                    .then(() => {
                      loadUsers();
                    })
                    .catch((err) => {
                      err.response.data.details.forEach((e) => (
                        toast({
                          title: t('Fail'),
                          status: 'error',
                          description: t(`${e}`),
                          duration: 5000,
                          isClosable: true,
                          position: 'top-right'
                        })
                      ));
                    })
                }}>
                  {t('update')}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      }

      <MPAlert
        isOpen={isOpenAlert}
        type={alertType}
        message={alertMessage}
        triggerClose={() => setIsOpenAlert(false)}
      />
    </>
  );
}
