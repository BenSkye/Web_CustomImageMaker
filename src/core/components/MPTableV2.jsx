import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { TbGenderDemiboy, TbGenderDemigirl } from "react-icons/tb";
import {
  IoChevronDownCircleOutline,
  IoFilter,
} from "react-icons/io5";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineEdit,
  MdOutlineNavigateNext,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  FormControl,
  FormLabel,
  Select,
  AlertDialogFooter,
  Switch,
  useToast
} from "@chakra-ui/react";
import { convertDateToDDMMYYYY } from "@/utils/convertDate";
import {
  setIsUpdating,
  setUserData,
} from "@/core/store/user-management/userUpdate";
import {
  setSearchPage,
  setSearchSize,
} from "@/core/store/user-management/userSearch";
import { setSearchSort } from "@/core/store/user-management/userSearch";
import { changeRole } from "@/core/services/userController";
import { MPAlert } from "@/core/components/MPAlert";
import { deactiveUser } from "@/core/services/userController";

export const MPTableV2 = ({
  data = [],
  totalPage = 0,
  lastPage = false,
  firstPage = false,
  reloadData,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [typeSort, setTypeSort] = React.useState({
    id: { active: true, asc: false },
    name: { active: false, asc: true },
    dob: { active: false, asc: true },
    isMale: { active: false, asc: true },
    rolePermissionEntity: { active: false, asc: true },
  });

  const searchPage = useSelector((state) => state.userSearching.page);
  const searchSize = useSelector((state) => state.userSearching.size);

  const { userManagementPermission } = useSelector((state) => state.permissionList.data);

  React.useEffect(() => {
    dispatch(setSearchPage(0));
  }, [searchSize]);

  const handleSortToggle = (property) => {
    setTypeSort((prevStates) => {
      const newStates = { ...prevStates };
      for (const prop in newStates) {
        if (prop === property) {
          newStates[prop] = {
            active: true,
            asc: !prevStates[prop].asc,
          };
        } else {
          newStates[prop] = {
            active: false,
            asc: false,
          };
        }
      }
      return newStates;
    });
  };

  React.useEffect(() => {
    const activeAttributes = [];

    for (const attributeName in typeSort) {
      if (typeSort[attributeName].active === true) {
        activeAttributes.push({
          attribute: attributeName,
          asc: typeSort[attributeName].asc,
        });
      }
    }

    if (activeAttributes.length === 0) {
      dispatch(setSearchSort([]));
    } else {
      dispatch(setSearchSort(activeAttributes));
    }
  }, [typeSort]);

  return (
    <Flex flex={1} flexDirection="column">
      <TableContainer
        width="-webkit-fill-available"
        marginX={3}
        marginBottom={3}
        borderRadius={15}
        backgroundColor="#FFF"
      >
        <Table variant="simple" fontSize="medium">
          <Thead backgroundColor="#2D3748">
            <Tr>
              <Th
                fontSize="medium"
                fontWeight="semibold"
                textTransform="none"
                color="#FFF"
              >
                <Flex flexDirection="row" columnGap={2} alignItems="center">
                  <Text>ID</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={typeSort.id.active ? 1 : 0.5}
                    onClick={() => handleSortToggle("id")}
                    style={{
                      transform: `rotate(${typeSort.id.asc ? 0 : 180}deg)`,
                    }}
                  />
                </Flex>
              </Th>

              <Th
                fontSize="medium"
                fontWeight="semibold"
                textTransform="none"
                color="#FFF"
              >
                <Flex flexDirection="row" columnGap={2} alignItems="center">
                  <Text>{t("fullname")}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={typeSort.name.active ? 1 : 0.5}
                    onClick={() => handleSortToggle("name")}
                    style={{
                      transform: `rotate(${typeSort.name.asc ? 0 : 180}deg)`,
                    }}
                  />
                </Flex>
              </Th>

              <Th
                fontSize="medium"
                fontWeight="semibold"
                textTransform="none"
                color="#FFF"
              >
                <Flex flexDirection="row" columnGap={2} alignItems="center">
                  <Text>{t("date_of_birth")}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={typeSort.dob.active ? 1 : 0.5}
                    onClick={() => handleSortToggle("dob")}
                    style={{
                      transform: `rotate(${typeSort.dob.asc ? 0 : 180}deg)`,
                    }}
                  />
                </Flex>
              </Th>

              <Th
                fontSize="medium"
                fontWeight="semibold"
                textTransform="none"
                color="#FFF"
              >
                <Flex flexDirection="row" columnGap={2} alignItems="center">
                  <Text>{t("gender")}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={typeSort.isMale.active ? 1 : 0.5}
                    onClick={() => handleSortToggle("isMale")}
                    style={{
                      transform: `rotate(${typeSort.isMale.asc ? 0 : 180}deg)`,
                    }}
                  />
                </Flex>
              </Th>

              <Th
                fontSize="medium"
                fontWeight="semibold"
                textTransform="none"
                color="#FFF"
              >
                <Flex flexDirection="row" columnGap={2} alignItems="center">
                  <Text>{t("type")}</Text>
                  <IoFilter
                    cursor="pointer"
                    opacity={typeSort.rolePermissionEntity.active ? 1 : 0.5}
                    onClick={() => handleSortToggle("rolePermissionEntity")}
                    transform={`rotate(180)deg)`}
                    style={{
                      transform: `rotate(${typeSort.rolePermissionEntity.asc ? 0 : 180
                        }deg)`,
                    }}
                  />
                </Flex>
              </Th>
              <Th
                fontSize="medium"
                fontWeight="semibold"
                textTransform="none"
                color="#FFF"
              ></Th>
            </Tr>
          </Thead>

          <Tbody>
            {
              data.length !== 0 && (
                data.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{convertDateToDDMMYYYY(new Date(item.dob))}</Td>
                    <Td>
                      {item.male === true ? (
                        <TbGenderDemiboy color="blue" size="20px" />
                      ) : (
                        <TbGenderDemigirl color="red" size="20px" />
                      )}
                    </Td>
                    <Td>
                      <Flex
                        background={
                          item.roleName === "ADMIN"
                            ? "#4DB848"
                            : item.roleName === "TRAINER"
                              ? "#D45B13"
                              : "#0B2136" // Default color for SUPER ADMIN
                        }
                        width="fit-content"
                        color="#FFF"
                        paddingX={2}
                        paddingY={1}
                        borderRadius={8}
                      >
                        {item.roleName}
                      </Flex>
                    </Td>
                    <Td
                      onClick={(e) => {
                        if (userManagementPermission === 1 || userManagementPermission === 3) {
                          dispatch(setUserData(item));
                        } else {
                          e.preventDefault();
                        }
                      }}
                    >
                      <MenuUserItems reloadUser={reloadData} />
                    </Td>
                  </Tr>
                ))
              )
            }
          </Tbody>
        </Table>

        {
          data.length === 0 && (
            <Flex
              flexDir={'column'}
              w='100%'
              alignItems={'center'}
              textAlign={'center'}
              p={4}
            >
              <svg
                width='140'
                height='152'
                viewBox='0 0 184 152'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g fill='none' fill-rule='evenodd'>
                  <g transform='translate(24 31.67)'>
                    <ellipse
                      fill-opacity='.8'
                      fill='#F5F5F7'
                      cx='67.797'
                      cy='106.89'
                      rx='67.797'
                      ry='12.668'
                    ></ellipse>
                    <path
                      d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
                      fill='#AEB8C2'
                    ></path>
                    <path
                      d='M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z'
                      fill='url(#linearGradient-1)'
                      transform='translate(13.56)'
                    ></path>
                    <path
                      d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
                      fill='#F5F5F7'
                    ></path>
                    <path
                      d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
                      fill='#DCE0E6'
                    ></path>
                  </g>
                  <path
                    d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
                    fill='#DCE0E6'
                  ></path>
                  <g transform='translate(149.65 15.383)' fill='#FFF'>
                    <ellipse cx='20.654' cy='3.167' rx='2.849' ry='2.815'></ellipse>
                    <path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z'></path>
                  </g>
                </g>
              </svg>
              <Text color={'gray'} w='full' fontSize='xl'>
                {t('empty_list')}
              </Text>
              <Text color={'gray'} w={'full'} mt={2}>
                {
                  userManagementPermission === 5 ?
                    t('Current user is blocked to view user') :
                    t('there_are_no_user_to_display')
                }
              </Text>
            </Flex>
          )
        }

        {/* Pagigation */}
        <Flex
          columnGap={3}
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          width="100%"
          marginY={3}
          overflow='hidden'
        >
          <MdKeyboardDoubleArrowLeft
            pointerEvents={firstPage === false ? "auto" : "none"}
            opacity={firstPage === false ? 1 : 0.5}
            cursor="pointer"
            onClick={() => dispatch(setSearchPage(0))}
          />
          <GrFormPrevious
            pointerEvents={firstPage === false ? "auto" : "none"}
            opacity={firstPage === false ? 1 : 0.5}
            cursor="pointer"
            onClick={() => dispatch(setSearchPage(searchPage - 1))}
          />
          <Flex borderRadius={8} justifyContent="center" alignItems="center">
            {searchPage}
          </Flex>
          <GrFormNext
            pointerEvents={lastPage === false ? "auto" : "none"}
            opacity={lastPage === false ? 1 : 0.5}
            cursor="pointer"
            onClick={() => dispatch(setSearchPage(searchPage + 1))}
          />
          <MdKeyboardDoubleArrowRight
            pointerEvents={lastPage === false ? "auto" : "none"}
            opacity={lastPage === false ? 1 : 0.5}
            cursor="pointer"
            onClick={() => dispatch(setSearchPage(totalPage - 1))}
          />
        </Flex>
      </TableContainer>

      {/* Item per page chaging */}
      <Flex flex={1} justifyContent="flex-end" mx={3} mb={3}>
        <Menu>
          <MenuButton
            fontSize="medium"
            background="transparent"
            _hover={{ backgroundColor: "transparent" }}
            as={Button}
            rightIcon={<IoChevronDownCircleOutline />}
          >
            {t('Row per page')} - {searchSize}
          </MenuButton>

          <MenuList p={2} borderRadius="12px">
            <MenuItem
              onClick={() => dispatch(setSearchSize(5))}
              borderRadius="8px"
              fontSize="medium"
            >
              5
            </MenuItem>
            <MenuItem
              onClick={() => dispatch(setSearchSize(10))}
              borderRadius="8px"
              fontSize="medium"
            >
              10
            </MenuItem>
            <MenuItem
              onClick={() => dispatch(setSearchSize(25))}
              borderRadius="8px"
              fontSize="medium"
            >
              25
            </MenuItem>
            <MenuItem
              onClick={() => dispatch(setSearchSize(50))}
              borderRadius="8px"
              fontSize="medium"
            >
              50
            </MenuItem>
            <MenuItem
              onClick={() => dispatch(setSearchSize(100))}
              borderRadius="8px"
              fontSize="medium"
            >
              100
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

const MenuUserItems = ({ reloadUser }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isOpeningEditRole, setIsOpeningEditRole] = React.useState(false);
  const [isOpeningDeactive, setIsOpeningDeacive] = React.useState(false);
  const { userManagementPermission } = useSelector((state) => state.permissionList.data);

  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<HiOutlineDotsHorizontal />}
          iconSpacing={0}
          backgroundColor="transparent"
          _hover={{ backgroundColor: "transparent" }}
          disabled={userManagementPermission !== 1 && userManagementPermission !== 3}
        ></MenuButton>

        <MenuList padding={3} borderRadius="12px">
          <MenuItem
            borderRadius="8px"
            onClick={() => {
              dispatch(setIsUpdating(true));
            }}
          >
            <Flex
              alignItems="center"
              width="100%"
              justifyContent="space-between"
            >
              <Flex flex={1} columnGap={3}>
                <MdOutlineEdit size="20px" />
                <Text fontWeight="semibold">{t("edit_user")}</Text>
              </Flex>
              <MdOutlineNavigateNext color="transparent" />
            </Flex>
          </MenuItem>

          <MenuItem
            borderRadius="8px"
            onClick={() => setIsOpeningDeacive(true)}
          >
            <Flex
              alignItems="center"
              width="100%"
              justifyContent="space-between"
            >
              <Flex flex={1} columnGap={3}>
                <MdOutlineRemoveRedEye size="20px" />
                <Text fontWeight="semibold">{t("deactive_user")}</Text>
              </Flex>
              <MdOutlineNavigateNext color="transparent" />
            </Flex>
          </MenuItem>

          <MenuItem
            borderRadius="8px"
            onClick={() => setIsOpeningEditRole(true)}
          >
            <Flex
              alignItems="center"
              width="100%"
              justifyContent="space-between"
            >
              <Flex flex={1} columnGap={3}>
                <MdOutlineEdit size="20px" />
                <Text fontWeight="semibold">{t("change_role")}</Text>
              </Flex>
              <MdOutlineNavigateNext color="transparent" />
            </Flex>
          </MenuItem>
        </MenuList>
      </Menu>

      <ChangeRoleDialog
        onOpen={setIsOpeningEditRole}
        isOpen={isOpeningEditRole}
        reloadUser={reloadUser}
      />

      <DeactiveDialog
        onOpen={setIsOpeningDeacive}
        isOpen={isOpeningDeactive}
        reloadUser={reloadUser}
      />
    </>
  );
};

const ChangeRoleDialog = ({ onOpen, isOpen, reloadUser }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updatingData = useSelector((state) => state.userUpdating.userData);
  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const toast = useToast();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={() => {
          onOpen(false);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width="542px" maxW="100vw" borderRadius={16}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("change_role")}
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isRequired>
                <Flex width="100%" marginBottom={3} alignItems="center">
                  <FormLabel
                    width="150px"
                    fontSize="small"
                    fontWeight="semibold"
                  >
                    {t("user_type")}
                  </FormLabel>
                  <Select
                    flex={1}
                    value={updatingData?.roleName}
                    onChange={(e) => {
                      dispatch(
                        setUserData({
                          ...updatingData,
                          roleName: e.target.value,
                        })
                      );
                    }}
                  >
                    <option value="SUPER ADMIN">SUPER ADMIN</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="TRAINER">TRAINER</option>
                  </Select>
                </Flex>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button borderRadius="12px" onClick={() => onOpen(false)}>
                {t("cancel")}
              </Button>
              <Button
                borderRadius="12px"
                ml={3}
                backgroundColor="#2D3748"
                color="#FFF"
                _hover={{ backgroundColor: "#2D3748", color: "#FFF" }}
                onClick={() => {
                  changeRole(updatingData.id, updatingData.roleName)
                    .then(() => {
                      onOpen(false);
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
                      reloadUser();
                    })
                    .catch(() => {
                      toast({
                        title: t('Fail'),
                        status: 'error',
                        description: t('Failure when updating user!'),
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right'
                      });
                    });
                }}
              >
                {t("update")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <MPAlert
        isOpen={isOpenAlert}
        type={alertType}
        message={alertMessage}
        triggerClose={() => setIsOpenAlert(false)}
      />
    </>
  );
};

const DeactiveDialog = ({ onOpen, isOpen, reloadUser }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const updatingData = useSelector((state) => state.userUpdating.userData);
  const [isOpenAlert, setIsOpenAlert] = React.useState(false);
  const [alertType, setAlertType] = React.useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const toast = useToast();

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={() => {
          onOpen(false);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width="542px" maxW="100vw" borderRadius={16}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("change_role")}
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl isRequired>
                <Flex width="100%" marginBottom={3} alignItems="center">
                  <FormLabel
                    width="150px"
                    mb="0"
                    fontSize="small"
                    fontWeight="semibold"
                  >
                    {t("active")}
                  </FormLabel>
                  <Switch
                    required
                    onChange={(e) => {
                      dispatch(
                        setUserData({
                          ...updatingData,
                          isEnable: e.target.checked,
                        })
                      );
                    }}
                    isChecked={updatingData?.isEnable}
                  />
                </Flex>
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button borderRadius="12px" onClick={() => onOpen(false)}>
                {t("cancel")}
              </Button>
              <Button
                borderRadius="12px"
                ml={3}
                backgroundColor="#2D3748"
                color="#FFF"
                _hover={{ backgroundColor: "#2D3748", color: "#FFF" }}
                onClick={() => {
                  deactiveUser(updatingData.id, `${!updatingData.isEnable}`)
                    .then((res) => {
                      onOpen(false);
                      if (res.data.hasOwnProperty('status') && res.data.status === 'METHOD_NOT_ALLOWED') {
                        toast({
                          title: t('Fail'),
                          status: 'error',
                          description: t(`${res.data.message}`),
                          duration: 5000,
                          isClosable: true,
                          position: 'top-right'
                        });
                      } else {
                        toast({
                          title: t('Success'),
                          status: 'success',
                          description: t('Update user successfully!'),
                          duration: 5000,
                          isClosable: true,
                          position: 'top-right'
                        });
                      }
                    })
                    .then(() => {
                      reloadUser();
                    })
                    .catch(() => {
                      toast({
                        title: t('Fail'),
                        status: 'error',
                        description: t('Failure when updating user!'),
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right'
                      });
                    });
                }}
              >
                {t("update")}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <MPAlert
        isOpen={isOpenAlert}
        type={alertType}
        message={alertMessage}
        triggerClose={() => setIsOpenAlert(false)}
      />
    </>
  );
};
