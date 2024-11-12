import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Flex,
  Button,
  Icon,
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
  TabPanel,
  useToast,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Grid,
  GridItem,
  Select
} from '@chakra-ui/react';
import { AiOutlineBook } from "react-icons/ai";
import { CgAlarm } from "react-icons/cg";
import { MdCalendarToday, } from "react-icons/md";
import { BiBuildingHouse, BiFontFamily, BiUser } from "react-icons/bi";
import { FaRegStar, FaRegHandPaper, FaSearch } from "react-icons/fa";
import { GiAlliedStar } from "react-icons/gi";
import { RiSignalTowerLine } from "react-icons/ri";
import { Calendar } from "react-multi-date-picker";
import { classDetailController } from "@/core/services/ClassDetail/classDetailAPI.js";

export const ClassUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const toast = useToast();
  const [fsuOptions, setFsuOptions] = useState([]);
  const [trainingProgramList, setTrainingProgramList] = useState([]);
  const [updateTrainingProgram, setUpdateTrainingProgram] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [classDetail, setClassDetail] = useState({});
  const [updatedClassData, setUpdatedClassData] = useState({
    classId: 0,
    className: '',
    startTime: '',
    endTime: '',
    location: '',
    fsuId: 0,
    startDate: '',
    endDate: '',
    trainingProgramId: 0,
    attendeeType: '',
    userId: []
  });

  useEffect(() => {
    const fetchFSU = async () => {
      try {
        const fsuData = await classDetailController.getFSU();
        setFsuOptions(fsuData);
      } catch (error) {
        console.error('Error fetching FSU data:', error);
      }
    }; fetchFSU();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await classDetailController.getClassDetail(id);
        if (response) {
          setClassDetail(response);
          setUpdatedClassData({
            classId: response.id,
            className: response.className,
            startTime: response.startTime,
            endTime: response.endTime,
            startDate: response.startDate,
            endDate: response.endDate,
            location: response.location,
            fsuId: response.fsu.id,
            trainingProgramId: response.trainingProgramDto.id,
            attendeeType: response.attendeeType,
            userId: response.admin?.id
          });
        }
      } catch (error) {
        console.error('Error fetching class detail:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (updateTrainingProgram) {
      classDetailController
        .searchTrainingPrograms(keyword)
        .then((res) => {
          setTrainingProgramList(res.content);
          setUpdateTrainingProgram(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [updateTrainingProgram, setUpdateTrainingProgram, keyword]);

  const handleTrainingProgramSearch = (e) => {
    console.log(e.target.value);
    setUpdateTrainingProgram(true);
    setKeyword(e.target.value);
  };

  const handleSelectTrainingProgram = (programId) => {
    setUpdatedClassData((prevState) => ({
      ...prevState,
      trainingProgramId: programId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userId') {
      // If input is empty, set userId to an empty array
      const userIdArray = value ? value.split(',').map(id => id.trim()) : [];
      setUpdatedClassData(prevData => ({
        ...prevData,
        [name]: userIdArray,
      }));
    } else {
      setUpdatedClassData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleBack = () => {
    navigate(`/dashboard/class/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updatedClassData.userId || updatedClassData.userId.length === 0) {
      toast({
        title: t('Error'),
        description: t('Please enter admin ID.'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const classDetailRepsonse = await classDetailController.getUserDetail(updatedClassData.userId);
      if (classDetailRepsonse) {
        if (classDetailRepsonse.roleName !== "SUPER ADMIN" && classDetailRepsonse.roleName !== "ADMIN") {
          toast({
            title: t('Error'),
            description: t('User must be an admin!'),
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }
    if (new Date(updatedClassData.startDate) >= new Date(updatedClassData.endDate)) {
      toast({
        title: t('Error'),
        description: t('End date must come after start date.'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (updatedClassData.startTime >= updatedClassData.endTime) {
      toast({
        title: t('Error'),
        description: t('End time must come after start time.'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!updatedClassData.className) {
      toast({
        title: t('Error'),
        description: t('Please enter class name.'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!updatedClassData.location) {
      toast({
        title: t('Error'),
        description: t('Please fill in a location.'),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      if (classDetail.status !== 1 && classDetail.status !== 2) {
        throw new Error(t("Cannot be updated as it is not in Planning or Scheduled status."));
      }
      await classDetailController.UpdateClass(updatedClassData);
      toast({
        title: t('Class Updated'),
        description: t('Class details have been updated successfully.'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate(`/dashboard/class/${id}`);

    } catch (error) {
      console.error(t('Error updating class:'), error);
      let errorMessage = t('An error occurred while updating class details.');
      if (error.message === t("Cannot be updated as it is not in Planning or Scheduled status.")) {
        errorMessage = error.message;
      }
      toast({
        title: t('Error'),
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const StatusBar = (status) => {
    switch (status) {
      case 1:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='green' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                Scheduled
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
                Opening
              </Text>
            </Box>
          </Flex>
        )
      case 4:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='black' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                Completed
              </Text>
            </Box>
          </Flex>
        )
      default:
        return (
          <Flex align='center' marginTop='10px' marginLeft='30px'>
            <Box bg='#F4E1EF' h='25px' minW='90px' mr='6' borderRadius='30' position='relative'>
              <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
                Disabled
              </Text>
            </Box>
          </Flex>
        )
    }
  };

  return (
    <>
      <Card w='100%' bgColor='#2D3748' mt='3px' data-testid='class-card-update'>
        <CardHeader textAlign='left' color='white' letterSpacing='5px'>
          <Heading fontSize='25px' fontWeight='normal' fontFamily='Arial'>
            {t('class')}
          </Heading>
        </CardHeader>
        <CardBody textAlign='left' color='white' pt='0px'>
          <Flex align='center' justify='space-between'>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Flex align='center' mt='-10px'>
                  <Heading fontSize={{ base: '20px', md: '40px' }} letterSpacing='7px' data-testid='class-name-update'>
                    <FormControl>
                      <Input type="text"
                        name="className"
                        value={updatedClassData.className}
                        onChange={handleChange} />
                    </FormControl>
                  </Heading>
                  {StatusBar(classDetail.status)}
                </Flex>
                <Text pt='2' fontSize='17px' fontFamily='Arial' fontWeight='bold' data-testid='class-code-update'>
                  {classDetail.classCode}
                </Text>
              </Box>

              <Flex direction='row' align='center'>
                <Box data-testid='duration-heading-update'>
                  <Text as="span" fontSize={{ base: '17px', sm: '25px' }} fontWeight='bold'>
                    {classDetail.duration} </Text>
                  <Text as="span" pt='2' fontSize='sm'>
                    {t('minutes')}
                  </Text>
                </Box>
                <Box mx='4' h='20px' mt='14px' ml='40px' mr='-25px' borderRight='1px solid #CCCCCC' />
                <Box mt='14px' ml='40px' display='flex' align='center' data-testid='icons-update'>
                  <Icon as={AiOutlineBook} mr='10px'></Icon>
                  <Icon as={BiUser} mr='10px'></Icon>
                  <Icon as={BiFontFamily} mr='10px'></Icon>
                  <Icon as={RiSignalTowerLine} mr='10px'></Icon>
                  <Icon as={FaRegHandPaper} mr='10px'></Icon>
                </Box>
              </Flex>
            </Stack>
          </Flex>
        </CardBody>
      </Card>

      <Grid templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(12, 1fr)' }} gap='5' pr='2'>
        <GridItem colSpan={{ base: 'auto', lg: 5 }} w='100%'>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg='#2D3748'
                  color='white'
                  _hover={{ opacity: '0.8' }}
                  borderRadius='10px'
                  data-testid="general-button"
                >
                  <Flex
                    flex='1'
                    textAlign='left'
                    alignItems={'center'}
                    className='first-step'
                  >
                    <MdCalendarToday />
                    <Text ml='2' fontWeight='bold' fontSize={{ base: '12px', xl: '16px' }}>
                      {t('General')}
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb='4' data-testid="general-table-update">
                <Stack w='100%' justifyContent='start'>
                  <Flex
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'
                    gap='2'
                  >
                    <Flex alignItems='center' gap='2'>
                      <CgAlarm mr='5px' fontSize='25px' color='purple' />
                      <Text fontWeight='semibold' fontSize='17px'>{t('class_time')} </Text>
                    </Flex>

                    <Flex alignItems='center' gap='2' direction={{ base: 'column', xl: 'row' }}>
                      <FormControl>
                        <Input type="time"
                          name="startTime"
                          value={updatedClassData.startTime}
                          onChange={handleChange}
                          step="1" />
                      </FormControl>
                      <Text fontSize='18px'>{t('to')}</Text>
                      <FormControl>
                        <Input type="time"
                          name="endTime"
                          value={updatedClassData.endTime}
                          onChange={handleChange}
                          step="1" />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'
                    gap='9'
                  >
                    <Flex alignItems='center' gap='2'>
                      <BiBuildingHouse fontSize='25px' color='purple' />
                      <Text fontWeight='semibold' fontSize='17px'>{t('Location')} </Text>
                    </Flex>
                    <Flex w='60%'>
                      <FormControl>
                        <Input type="text"
                          name="location"
                          value={updatedClassData.location}
                          onChange={handleChange}
                          step="1" />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'
                    gap='9'
                  >
                    <Flex alignItems='center' gap='2'>
                      <BiUser fontSize='25px' color='purple' />
                      <Text fontWeight='semibold' color='gray' fontSize='17px'> {t('Trainer')}</Text>
                    </Flex>
                    <Flex w='60%' />
                  </Flex>
                  <Flex
                    w={'100%'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    gap={9}
                  >
                    <Flex alignItems='center' gap='2'>
                      <FaRegStar fontSize='25px' color='purple' />
                      <Text fontWeight='semibold' fontSize='17px'>Admin</Text>
                    </Flex>
                    <Flex w='60%'>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder='Admin ID'
                          name="userId"
                          value={updatedClassData.userId}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <Flex
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'
                    gap='9'
                  >
                    <Flex alignItems='center' gap='2'>
                      <GiAlliedStar fontSize='25px' color='purple' />
                      <Text fontWeight='semibold' fontSize='17px'> FSU</Text>
                    </Flex>
                    <Flex w='60%'>

                      <Select
                        value={updatedClassData.fsuId}
                        onChange={(e) => handleChange({ target: { name: 'fsuId', value: e.target.value } })}
                      >
                        {fsuOptions.map(fsu => (
                          <option key={fsu.id} value={fsu.id}>
                            {fsu.fsuName}
                          </option>
                        ))}
                      </Select>
                    </Flex>
                  </Flex>
                  <Flex justifyContent='center' mt='3' mb='2'>
                    <Divider orientation='horizontal' borderColor='black' w='100%' />
                  </Flex>
                  <Flex direction='column' gap='2'>
                    <Text textAlign='left' fontWeight='bold' fontSize='15' color='gray'>
                      {t('Created')}
                    </Text>
                    <Text textAlign='left' fontWeight='bold' fontSize='15' color='gray'>
                      {t('Review')}
                    </Text>
                    <Text textAlign='left' fontWeight='bold' fontSize='15' color='gray'>
                      {t('Approve')}
                    </Text>
                  </Flex>
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
        <GridItem colSpan={{ base: 'auto', lg: 7 }} w={{ base: '100%', lg: '86%' }} ml={{ lg: '50px', xl: '90px' }}>
          <Accordion allowToggle className='third-step'>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg='#2D3748'
                  color='white'
                  _hover={{ opacity: '0.8' }}
                  borderRadius='10px'
                  w='100%'
                  data-testid="time-button-update"
                >
                  <Flex flex='1' textAlign='left' alignItems='center' >
                    <MdCalendarToday />
                    <Text ml='2' fontWeight='bold' fontSize={{ base: '12px', xl: '16px' }}>
                      {t('Time frame')}
                    </Text>
                    <Flex alignItems='center' justifyContent='center'>
                      <FormControl w='40%' ml={{ base: '5px', xl: '20px' }}>
                        <Input type="date"
                          bgColor='white'
                          color='black'
                          h='80%'
                          name="startDate"
                          value={updatedClassData.startDate}
                          onChange={handleChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FormControl>
                      <Text ml='2px' mr='2px'>-</Text>
                      <FormControl w='40%'>
                        <Input type="date"
                          bgColor='white'
                          color='black'
                          h='80%'
                          name="endDate"
                          value={updatedClassData.endDate}
                          onChange={handleChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </FormControl>
                    </Flex>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb='4' data-testid="time-frame-show">
                <Flex justifyContent='center'>
                  <Calendar
                    multiple={true}
                    numberOfMonths={2}
                    value={[updatedClassData.startDate, updatedClassData.endDate]}
                    highlightToday={false}
                  />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
        <GridItem colSpan={{ base: 'auto', lg: 5 }} w='100%'>
          <Accordion allowToggle className='second-step'>
            <AccordionItem>
              <h2>
                <AccordionButton
                  bg='#2D3748'
                  color='white'
                  _hover={{ opacity: '0.8' }}
                  borderRadius='10px'
                  data-testid="fresher-button-update"
                >
                  <Flex flex='1' textAlign='left' alignItems='center'>
                    <MdCalendarToday />
                    <Text ml='2' fontWeight='bold' fontSize={{ base: '12px', xl: '16px' }}>
                      {t('Attendee')}
                    </Text>
                    <Select
                      bgColor='white'
                      alignItems='center'
                      w='47%'
                      h='80%'
                      ml='2'
                      color='#2D3748'
                      value={updatedClassData.attendeeType} // Set the value of the select to the current attendeeType
                      onChange={(e) => setUpdatedClassData(prevData => ({
                        ...prevData,
                        attendeeType: e.target.value // Update the attendeeType when an option is selected
                      }))}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value='Intern'>Intern</option>
                      <option value='Fresher'>Fresher</option>
                      <option value='Online fee-fresher'>Online fee-fresher</option>
                      <option value='Offline fee-fresher'>Offline fee-fresher</option>
                    </Select>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb='4' data-testid='fresher-table-update'>
                <Flex flexDirection='row' justifyContent='center' alignItems='center' mt='-5px'>
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
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
      <Tabs variant='enclosed' mr='auto' flexDirection='column' data-testid='tab-buttons-update'>
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
          <TabPanel ml='-16px' data-testid='program-tab-update' pt='3'>
            <Flex direction='column' w={{ base: '500px', lg: '120%', xl: '167%' }}>
              <Card bgColor='#2D3748' mt='-14px' >
                <CardHeader textAlign='left' textColor='white' letterSpacing='5px' mt='-7px' ml='20px'>
                  <Heading size='md' fontSize='40px' fontWeight='normal' fontFamily='Arial'>
                    {t('Training Program Name')}
                  </Heading>
                </CardHeader>

                <CardBody textAlign='left' textColor='white' paddingTop='0px' data-testid="search-bar">
                  <Flex align='center'>
                    <Flex direction='row' marginTop='-10px' marginLeft='20px' fontSize='sm'>
                      <Box>
                        <FormControl>
                          <InputGroup>
                            <InputLeftElement> {/* This element will be positioned on the right */}
                              <FaSearch />
                            </InputLeftElement>
                            <Input
                              type="text"
                              placeholder={t("Search training programs")}
                              value={keyword}
                              onChange={handleTrainingProgramSearch}
                            />
                          </InputGroup>
                        </FormControl>
                      </Box>
                    </Flex>
                  </Flex>
                </CardBody>
              </Card>

              <Flex>
                {/* Render training program list */}
                <Box mt='5px' w='100%' data-testid="program-search-list">
                  {trainingProgramList.map((program) => (
                    <Box key={program.id}
                      p={4}
                      flex='1'
                      mt='4'
                      bg={program.id === updatedClassData.trainingProgramId ? 'blue.100' : 'white'}
                      borderRadius="md"
                      onClick={() => handleSelectTrainingProgram(program.id)}
                      cursor="pointer">
                      <Text textAlign='left'>{program.topicCode}</Text>
                      <Flex>
                        <Text>
                          {program.duration} {t('minutes')} {program.createOn} {t('by')}{' '}
                          {program.createBy}
                        </Text>
                      </Flex>
                    </Box>
                  ))}
                </Box>
              </Flex>
            </Flex>
          </TabPanel>
          <TabPanel data-testid='attendee-tab-update'></TabPanel>
          <TabPanel data-testid='budget-tab-update'></TabPanel>
          <TabPanel data-testid='others-tab-update'></TabPanel>
        </TabPanels>
      </Tabs>
      <GridItem mr='auto' w='98%'>
        <Flex my='8'>
          <Button
            variant='solid'
            bg='#2d3748'
            color='white'
            _hover={{ opacity: '0.8' }}
            mr='auto'
            onClick={handleBack}
          >
            {t('Back')}
          </Button>
          <Button
            ml='auto'
            variant='solid'
            bg='#2d3748'
            color='white'
            _hover={{ opacity: '0.8' }}
            onClick={handleSubmit}
          >
            {t('Save')}
          </Button>
        </Flex>
      </GridItem>
    </>
  );
};