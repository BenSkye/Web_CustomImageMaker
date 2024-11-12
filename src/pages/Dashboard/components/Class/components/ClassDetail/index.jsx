import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Table,
  Tbody,
  Td,
  Tr,
  Flex,
  Button,
  Icon,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import { AiOutlineBook } from "react-icons/ai";
import { CgAlarm } from "react-icons/cg";
import { MdCalendarToday, MdOutlineModeEdit } from "react-icons/md";
import { BiCaretDownCircle, BiBuildingHouse, BiFontFamily, BiUser } from "react-icons/bi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaRegStar, FaRegHandPaper } from "react-icons/fa";
import { GiAlliedStar } from "react-icons/gi";
import { RiSignalTowerLine, RiInformationFill } from "react-icons/ri";
import { Calendar } from "react-multi-date-picker";
import { classDetailController } from "@/core/services/ClassDetail/classDetailAPI.js";
import useAuthorization from '@/hooks/useAuthorization';



export const ClassDetail = () => {

  const [classDetail, setClassDetail] = useState([]);
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const [isTableVisible, setIsTableVisible] = useState(true); // State to manage the visibility of the table
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainingProgramDetail, setTrainingProgramDetail] = useState(null);
  const { classPermission } = useSelector((state) => state.permissionList.data);
  const { isAccessible } = useAuthorization(classPermission);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible); // Toggle the visibility state
  };

  const [isCardVisible, setIsCardVisible] = useState(true);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const StatusBar = (status) => {
    switch (status) {
      case 1:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='green' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Scheduled')}
              </Text>
            </Box>
          </Flex>
        )
      case 2:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='#FE7F9C' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Planning')}
              </Text>
            </Box>
          </Flex>
        )
      case 3:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='#B3EB92' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Opening')}
              </Text>
            </Box>
          </Flex>
        )
      case 4:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='black' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Completed')}
              </Text>
            </Box>
          </Flex>
        )
      default:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='#F4E1EF' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Disabled')}
              </Text>
            </Box>
          </Flex>
        )
    }
  };

  const ActiveBar = (status) => {
    switch (status) {
      case 1:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px' data-testid="active-bar">
            <Box bg='#2D3748' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Active')}
              </Text>
            </Box>
          </Flex>
        )
      case 2:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px' data-testid="active-bar">
            <Box bg='#95D1CE' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Inactive')}
              </Text>
            </Box>
          </Flex>
        )
      case 3:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px' data-testid="active-bar">
            <Box bg='#65A8BD' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Draft')}
              </Text>
            </Box>
          </Flex>
        )
      default:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px' data-testid="active-bar">
            <Box bg='#F4E1EF' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                {t('Disabled')}
              </Text>
            </Box>
          </Flex>
        )
    }
  };

  useEffect(() => {
    const fetchData = async (classId) => {
      try {
        const response = await classDetailController.getClassDetail(classId);
        if (response) {
          setClassDetail(response)
          const trainingProgramID = response.trainingProgramDto.id;
          const trainingProgramDetailResponse = await classDetailController.trainingProgramDetail(trainingProgramID);
          if (trainingProgramDetailResponse) {
            setTrainingProgramDetail(trainingProgramDetailResponse);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(id);
  }, [id]);

  const navigate = useNavigate();

  const handleNavigateToClassUpdate = () => {
    navigate(`/dashboard/class/edit/${id}`);
  };

  const handleNavigateToClassSyllabus = () => {
    navigate(`/dashboard/class/syllabus/${id}`);
  };

  const startDate = new Date(classDetail.startDate);
  const endDate = new Date(classDetail.endDate);

  return (
    <>

      <Card w='100%' bgColor='#2D3748' mt='3px'>
        <CardHeader textAlign='left' color='white' letterSpacing='5px'>
          <Heading fontSize='25px' fontWeight='normal' fontFamily='Arial'>
            {t('class')}
          </Heading>
        </CardHeader>
        <CardBody textAlign='left' color='white' pt='0px'>
          <Flex align='center' justify='space-between' direction={{}}>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Flex align='center'>
                  <Heading fontSize={{ base: '20px', md: '40px' }} letterSpacing='7px' data-testid='class-name'>
                    {classDetail.className}
                  </Heading>
                  {StatusBar(classDetail.status)}
                </Flex>
                <Text pt='2' fontSize='17px' fontFamily='Arial' fontWeight='bold' data-testid='class-code'>
                  {classDetail.classCode}
                </Text>
              </Box>

              <Flex direction='row' align='center'>
                <Box data-testid='duration-heading'>
                  <Text as="span" fontSize={{ base: '17px', sm: '25px' }} fontWeight='bold'>
                    {classDetail.duration} </Text>
                  <Text as="span" pt='2' fontSize='sm'>
                    {t('minutes')}
                  </Text>
                </Box>
                <Box mx='4' h='20px' mt='14px' ml='40px' mr='-25px' borderRight='1px solid #CCCCCC' />
                <Box mt='14px' ml='40px' display='flex' align='center' data-testid='icons'>
                  <Icon as={AiOutlineBook} mr='10px'></Icon>
                  <Icon as={BiUser} mr='10px'></Icon>
                  <Icon as={BiFontFamily} mr='10px'></Icon>
                  <Icon as={RiSignalTowerLine} mr='10px'></Icon>
                  <Icon as={FaRegHandPaper} mr='10px'></Icon>
                </Box>
              </Flex>
            </Stack>

            {isAccessible.modify ? (
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label='Options'
                  icon={<HiOutlineDotsHorizontal color='white' fontSize='50px' />}
                  color='white'
                  mb='80px'
                  bg='none'
                  _hover={{ backgroundColor: '#2D3748' }} // Set hover background color to match the default background color
                  data-testid='edit-button'
                />
                <MenuList color='black' data-testid='edit-menu'>
                  <Text fontSize='15px' alignItems='center' fontWeight='bold' mt='-3px' mb='3px' ml='8px'>
                    {t('manage')} {t('class')}
                  </Text>
                  <MenuItem onClick={handleNavigateToClassUpdate} icon={<MdOutlineModeEdit />} fontSize='15px' color="blue">
                    {t('edit')} {t('class')}
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <></>
            )}
          </Flex>
        </CardBody>

      </Card>

      <Flex direction={{ base: 'column', xl: 'row' }} // Stack on smaller screens, row on larger screens
        alignItems={{ base: 'center', xl: 'flex-start' }} >
        <Flex flexDirection='column' w={{ lg: '70%' }} mr={{ base: '0', xl: '100px', "2xl": '260px' }} mb={{ base: '20px' }}>
          <Menu>
            <MenuButton
              as={Button}
              bgColor='#2D3748'
              color='white'
              leftIcon={<MdCalendarToday />}
              rightIcon={<BiCaretDownCircle />}
              _hover={{ backgroundColor: '#2D3748' }} // Set hover background color to match the default background color
              _active={{ backgroundColor: '#2D3748' }} // Set active background color to match the default background color
              onClick={toggleTableVisibility} // Toggle table visibility on button click
              w='100%' // Set the button width to 100% to match the table
              zIndex='1'
              textAlign='left'
              data-testid="general-button"
            >
              {t('general')}
            </MenuButton>
          </Menu>

          {isTableVisible && (
            <Table variant='simple' w={{ lg: '100%' }} data-testid="general-table">
              <Card bgColor='white' mt='3px' fontSize='15px'>
                <Tbody>
                  <Tr>
                    <Td>
                      <Flex align='center'>
                        <CgAlarm mr='5px' fontSize='25px' color='purple' />
                        <Text fontWeight='bold' ml='5px'>
                          {t('class_time')}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      {classDetail.startTime} - {classDetail.endTime}</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex align='center'>
                        <BiBuildingHouse fontSize='25px' color='purple' />
                        <Text fontWeight='bold' ml='5px'>
                          {t('location')}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Flex>
                        <Text mb='3px'>{classDetail.location}</Text>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex alignItems='center'>
                        <BiUser fontSize='25px' color='purple' />
                        <Text fontWeight='bold' ml='5px'>
                          {t('trainer')}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color='blue' textDecoration='underline' data-testid="trainer-names">
                      {classDetail.admin && classDetail.trainer.map((trainer, index) => (
                        <Flex key={index}>
                          <Text mb='3px'>{trainer.name}</Text>
                          <RiInformationFill color='red' fontSize='10px' />
                        </Flex>
                      ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex align='center'>
                        <FaRegStar fontSize='25px' color='purple' />
                        <Text fontWeight='bold' ml='5px'>Admin</Text>
                      </Flex>
                    </Td>
                    <Td color='blue' textDecoration='underline' data-testid="admin-names">
                      {classDetail.admin && classDetail.admin.map((admin, index) => (
                        <Flex key={index}>
                          <Text mb='3px'>{admin.name}</Text>
                          <RiInformationFill color='red' fontSize='10px' />
                        </Flex>
                      ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Flex alignItems='center'>
                        <GiAlliedStar fontSize='25px' color='purple' />
                        <Text fontWeight='bold' ml='5px'>FSU</Text>
                      </Flex>
                    </Td>
                    <Td>
                      <Text mb='3px'>{classDetail.fsu && classDetail.fsu.fsuName}</Text>
                      {/* <Text mb='3px'>{classDetail[0]?.email}</Text> */}
                    </Td>
                  </Tr>
                  <Flex justifyContent='center'>
                    <Divider orientation='horizontal' borderColor='black' w='90%' />
                  </Flex>
                  <Tr>
                    <Td fontWeight='bold' >{t('created_on')}</Td>
                    <Td>{classDetail.createDate} {t('by')} {classDetail.createBy}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight='bold' >{t('review')}</Td>
                    <Td>{classDetail[0]?.review} {t('by')} {classDetail[0]?.reviewedBy}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight='bold' >{t('approve')}</Td>
                    <Td>{classDetail[0]?.approve} {t('by')} {classDetail[0]?.approvedBy}</Td>
                  </Tr>
                </Tbody>
              </Card>
            </Table>
          )}

          <Menu >
            <MenuButton
              mt='20px'
              as={Button}
              bgColor='#2D3748'
              color='white' // Set text color to white
              leftIcon={<FaRegStar />}
              rightIcon={<BiCaretDownCircle />}
              _hover={{ backgroundColor: '#2D3748' }} // Set hover background color to match the default background color
              _active={{ backgroundColor: '#2D3748' }} // Set active background color to match the default background color
              onClick={toggleCardVisibility} // Toggle table visibility on button click
              w='100%' // Set the button width to 100% to match the table
              zIndex='1'
              textAlign='left'
              data-testid='fresher-button'
            >
              <Text as="span">
                {t('attendee')} </Text>
              <Text as="span" fontWeight='normal'>
                {classDetail.attendeeType}
              </Text>
            </MenuButton>
          </Menu>

          {isCardVisible && (
            <Flex flexDirection='row' justifyContent='center' alignItems='center' data-testid='fresher-table'>
              <Card w='100%' bgColor='#2D3748' color='white' mt='1px' fontSize='14px' fontWeight='normal'>
                <Text mt='10px'>
                  {t('planned')}
                </Text>
                <Text letterSpacing='5px' mb='9px' fontSize='25px'>{classDetail.plannedAttendee}</Text>
              </Card>
              <Card w='100%' bgColor='#2A63A0' color='white' mt='1px' fontSize='14px' fontWeight='normal'>
                <Text mt='10px'>
                  {t('accepted')}
                </Text>
                <Text letterSpacing='5px' mb='9px' fontSize='25px'>{classDetail.acceptedAttendee}</Text>
              </Card>
              <Card w='100%' bgColor='#E1E1E1' mt='1px' fontSize='14px' fontWeight='normal'>
                <Text mt='10px'>
                  {t('actual')}
                </Text>
                <Text letterSpacing='5px' mb='9px' fontSize='25px'>{classDetail.actualAttendee}</Text>
              </Card>
            </Flex>
          )}
        </Flex>

        <Flex direction='column' alignItems={['flex-start', 'center']} data-testid='calendar-table'>
          <Menu >
            <MenuButton
              as={Button}
              bgColor='#2D3748'
              color='white' // Set text color to white
              leftIcon={<MdCalendarToday />}
              rightIcon={<BiCaretDownCircle />}
              _hover={{ backgroundColor: '#2D3748' }} // Set hover background color to match the default background color
              _active={{ backgroundColor: '#2D3748' }} // Set active background color to match the default background color
              w='100%' // Set the button width to 100% to match the table
              zIndex='1'
              textAlign='left'
            >
              <Text as='span'>{t('time_frame')}: </Text>
              <Text as='span' ml='10px'>{classDetail.startDate}  {t('to')}  {classDetail.endDate}</Text>
            </MenuButton>
          </Menu>
          <Calendar
            multiple={true}
            numberOfMonths={2}
            value={[startDate, endDate]}
            highlightToday={false}
          />
        </Flex>
      </Flex>

      <Tabs variant='enclosed' mr='auto' flexDirection='column' data-testid='tab-buttons'>
        <TabList borderRadius='30' width={{ base: '300px', md: '570px', xl: '757px' }} gap={1} >
          <Tab w={{ base: '100px', lg: '130px', xl: '190px' }} fontSize={{ base: '12px', xl: '16px' }}
            _selected={{ color: 'white', bg: '#2D3748' }} bg='#8CAFAD' borderTopRadius='30'>
            {t('Training Program')}</Tab>
          <Tab w={{ base: '100px', lg: '130px', xl: '190px' }} fontSize={{ base: '12px', xl: '16px' }}
            _selected={{ color: 'white', bg: '#2D3748' }} bg='#8CAFAD' borderTopRadius='30'>
            {t('attendee_list')}</Tab>
          <Tab w={{ base: '100px', lg: '130px', xl: '190px' }} fontSize={{ base: '12px', xl: '16px' }}
            _selected={{ color: 'white', bg: '#2D3748' }} bg='#8CAFAD' borderTopRadius='30'>
            {t('budget')}</Tab>
          <Tab w={{ base: '100px', lg: '130px', xl: '190px' }} fontSize={{ base: '12px', xl: '16px' }}
            _selected={{ color: 'white', bg: '#2D3748' }} bg='#8CAFAD' borderTopRadius='30'>
            {t('others')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel ml='-16px' data-testid='program-tab' pt='3'>
            {trainingProgramDetail && (
              <Flex direction='column' w={{ base: '100%', xl: '1240px' }}>
                <Card bgColor='#2D3748' mt='-14px' >
                  <CardHeader textAlign='left' textColor='white' letterSpacing='5px' mt='-7px' ml='20px'>
                    <Flex align='center'>
                      <Heading size='md' fontSize='40px' fontWeight='normal' fontFamily='Arial' data-testid="topic-code">
                        {trainingProgramDetail.topicCode}
                      </Heading>
                      {isAccessible.modify ? (
                        <Button ml='40px' w='50px' h='35px' borderRadius='10px'
                          as={IconButton}
                          icon={<MdOutlineModeEdit fontSize='30px' />}
                          onClick={handleNavigateToClassSyllabus}
                        />
                      ) : (
                        <></>
                      )}
                    </Flex>
                  </CardHeader>

                  <CardBody textAlign='left' textColor='white' paddingTop='0px'>
                    <Flex align='center'>
                      <Flex direction='row' marginTop='-10px' marginLeft='20px' fontSize='sm'>
                        <Box>
                          <Text as='span' pt='2' data-testid="training-program-duration">
                            {trainingProgramDetail.duration} {t('minutes')}
                          </Text>
                        </Box>
                        <Box height='20px' ml='20px' mr='-20px' borderRight='1px solid #CCCCCC' />
                        <Box ml='40px' data-testid="training-program-modify">
                          <Text as='span'>{t('modified_on')} </Text>
                          <Text as='span' fontStyle='italic'>{trainingProgramDetail.modifyDate} </Text>
                          <Text as='span'>{t('by')} </Text>
                          <Text as='span' fontWeight='bold'>{trainingProgramDetail.modifyBy}</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </CardBody>
                </Card>

                {trainingProgramDetail.listSyllabus
                  .filter(syllabus => syllabus.status === 1)
                  .map((syllabus, index) => (
                    <Flex direction='row' key={index}>
                      <Card h={{ base: '160px', sm: '113px' }}
                        w='200px'
                        bgColor='#2D3748'
                        color='white'
                        mt='20px'
                        fontWeight='bold'
                        justifyContent='center'
                        alignItems='center'
                        borderTopLeftRadius={'20'}
                        borderBottomLeftRadius={'20'}
                      >
                        <Stack direction={'row'} data-testid="avatars">
                          <Avatar size={{ base: 'sm', lg: 'md' }} src='https://bit.ly/broken-link' />
                          <Avatar size={{ base: 'sm', lg: 'md' }} src='https://bit.ly/broken-link' />
                          <Avatar size={{ base: 'sm', lg: 'md' }} src='https://bit.ly/broken-link' />
                        </Stack>
                      </Card>
                      <Card h={{ base: '160px', sm: '113px' }}
                        w='100%'
                        bgColor='white'
                        mt='auto'
                        justifyContent='center'
                        borderTopRightRadius='20'
                        borderBottomRightRadius='20'
                        data-testid="syllabus-card"
                      >
                        <CardHeader textAlign='left' textColor='black' marginTop='-7px' marginLeft='20px'>
                          <Flex align='center'>
                            <Heading size='md' fontSize={{ base: '20px', md: '30px', xl: '40px' }} fontWeight='bold' fontFamily='Arial' letterSpacing='5px' data-testid="syllabus-code">
                              {syllabus.topicName}
                            </Heading>
                            {ActiveBar(syllabus.status)}
                          </Flex>
                        </CardHeader>
                        <CardBody textAlign='left' textColor='black' paddingTop='0px'>
                          <Flex direction='row' align='center' marginTop='-10px' marginLeft='20px'>
                            <Box fontSize='sm' data-testid="syllabus-duration">
                              <Text as='span'>
                                {syllabus.version}
                              </Text>
                            </Box>
                            <Box mx='4' height='20px' marginLeft='20px' marginRight='-20px' borderRight='1px solid black' />
                            <Box marginLeft='40px' fontSize='sm' data-testid="syllabus-duration">
                              <Text as='span'>
                                {syllabus.duration} {t('minutes')}
                              </Text>
                            </Box>
                            <Box mx='4' height='20px' marginLeft='20px' marginRight='-20px' borderRight='1px solid black' />
                            <Box marginLeft='40px' fontSize='sm' >
                              <Text as='span'>
                                {t('on')} </Text>
                              <Text as='span' fontStyle='italic' data-testid="syllabus-createdDate">
                                {syllabus.createdDate} </Text>
                              <Text as='span'>
                                {t('by')} </Text>
                              <Text as='span' fontWeight='bold' data-testid="syllabus-createdBy">
                                {syllabus.createdBy.name}
                              </Text>
                            </Box>
                          </Flex>
                        </CardBody>
                      </Card>
                    </Flex>
                  ))}
              </Flex>
            )}
          </TabPanel>
          <TabPanel data-testid='attendee-tab'>
            <p>{t('attendee_list')}</p>
          </TabPanel>
          <TabPanel data-testid='budget-tab'>
            <p>{t('budget')}</p>
          </TabPanel>
          <TabPanel data-testid='others-tab'>
            <p>{t('others')}</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </>

  );
}
