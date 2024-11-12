import { classAPIController } from '@/core/services/ClassAPI/classAPIController';
import { attendees } from '@/mocks/fakeMenDatas';
import GeneralAccordion from '@/pages/Dashboard/components/Class/components/ClassCreate/components/GeneralAccordion';
import InputClassName from '@/pages/Dashboard/components/Class/components/ClassCreate/components/InputClassName';
import InputTrainingProgram from '@/pages/Dashboard/components/Class/components/ClassCreate/components/InputTrainingProgram';
import ProgramCard from '@/pages/Dashboard/components/Class/components/ClassCreate/components/ProgramCard';
import SearchButton from '@/pages/Dashboard/components/Class/components/ClassCreate/components/SearchButton';
import SelectTrainingProgram from '@/pages/Dashboard/components/Class/components/ClassCreate/components/SelectTrainingProgram';
import TimeFrameAccordion from '@/pages/Dashboard/components/Class/components/ClassCreate/components/TimeFrameAccordion';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useTour } from '@reactour/tour';
import { Reorder } from 'framer-motion';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useTranslation } from 'react-i18next';
import { FaRegStar } from 'react-icons/fa';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export const ClassCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [date, setDate] = useState([]);
  const [className, setClassName] = useState('');
  const [active, setActive] = useState(0);
  const modal = useDisclosure();
  const tooltipModal = useDisclosure();
  const toast = useToast();
  const [trainingProgramSelect, setTrainingProgramSelect] = useState(null);
  const [trainingProgramList, setTrainingProgramList] = useState([]);
  const [trainingProgramContent, setTrainingProgramContent] = useState(null);
  const [shouldCloseModal] = useState(true);
  const [updateTrainingProgram, setUpdateTrainingProgram] = useState(true);
  const [updateFSU, setUpdateFSU] = useState(true);
  const [dataFSU, setDataFSU] = useState([]);
  const { setIsOpen } = useTour();
  const [keyword, setKeyword] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [calculateHours, setCalculateHours] = useState();
  const [location, setLocation] = useState();
  const [fsuId, setFsuId] = useState(0);
  const [attendeeType, setAttendeeType] = useState('');
  const [admin, setAdmin] = useState([]);
  const [trainer, setTrainer] = useState([]);
  const [listSyllabus, setListSyllabus] = useState([]);
  const [planned, setPlanned] = useState(0 | null);
  const [accepted, setAccepted] = useState(0 | null);
  const [actual, setActual] = useState(0 | null);
  const [daysOfWeek, setDaysOfWeek] = useState([]);

  function calculateHourDifference(time1, time2) {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    const totalMinutes1 = hour1 * 60 + minute1;
    const totalMinutes2 = hour2 * 60 + minute2;

    const minuteDifference = Math.abs(totalMinutes1 - totalMinutes2);

    const hourDifference = Math.floor(minuteDifference / 60);

    return hourDifference;
  }

  useEffect(() => {
    localStorage.getItem('tooltip') === 'true'
      ? tooltipModal.onOpen()
      : setIsOpen(false);
  }, [className]);

  useEffect(() => {
    if (updateFSU) {
      classAPIController.getFSU().then((res) => {
        setDataFSU(res);
        setUpdateFSU(false);
      });
    }
  }, [updateFSU, setUpdateFSU, dataFSU, setDataFSU]);

  useEffect(() => {
    sessionStorage.getItem('className') &&
      setClassName(sessionStorage.getItem('className'));
  }, [className, setClassName]);

  const countSelectedDays = () => {
    if (daysOfWeek.length === 0) {
      return 0;
    }

    const startDate = new Date(date[0]);
    const endDate = new Date(date[1]);

    let count = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (daysOfWeek.includes(dayOfWeek + 1)) {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return count;
  };

  useEffect(() => {
    if (date.length === 2) {
      const hourDifference = calculateHourDifference(timeStart, timeEnd);

      setCalculateHours(hourDifference * countSelectedDays());
    }
  }, [timeStart, timeEnd, date]);

  useEffect(() => {
    if (updateTrainingProgram && keyword) {
      classAPIController
        .searchTrainingPrograms(keyword)
        .then((res) => {
          setTrainingProgramList(res.content);
          setUpdateTrainingProgram(false);
        })
        .catch(() => {});
    }
  }, [updateTrainingProgram, setUpdateTrainingProgram, keyword]);

  useEffect(() => {
    trainingProgramSelect &&
      classAPIController
        .trainingProgramDetail(trainingProgramSelect.id)
        .then((res) => {
          setTrainingProgramContent(res);
          setListSyllabus(res.listSyllabus);
        })
        .catch(() => {});
  }, [trainingProgramSelect]);

  const handleTrainingProgramSearch = (e) => {
    setUpdateTrainingProgram(true);
    setKeyword(e.target.value.toLowerCase());
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return `${year}-${month}-${day}`;
  }

  const toastCus = (status, title, description, id) =>
    toast({
      id: id ? id : 'NOID',
      title: title,
      description: description,
      status: status,
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });

  const handleSubmitClassCreate = (status) => {
    const userId = [...admin, ...trainer].map((item) => item.value);
    if (!admin) {
      toastCus('error', t('Error'), t('Trainer is required.'), '');
    } else if (!trainer) {
      toastCus('error', t('Error'), t('Admin is required.'), '');
    } else if (!timeStart || !timeEnd) {
      toastCus(
        'error',
        t('Error'),
        t('Please fill in all fields time start, time end!'),
        ''
      );
    } else if (!location) {
      toastCus(
        'error',
        t('Error'),
        t('Please fill in all fields location!'),
        ''
      );
    } else if (!date[0] || !date[date.length - 1]) {
      toastCus('error', t('Error'), t('Time frame is required.', ''));
    } else if (!fsuId) {
      toastCus('error', t('Error'), t('FSU is required.'), '');
    } else if (!attendeeType) {
      toastCus('error', t('Error'), t('Attendee is required.'), '');
    } else if (!trainingProgramSelect) {
      toastCus(
        'error',
        t('Error'),
        t('Please fill choice all fields training program!'),
        ''
      );
    } else if (daysOfWeek.length === 0) {
      toastCus('error', t('Error'), t('Please select at least one day!'), '');
    } else {
      const data = {
        className: className,
        attendeeScheme: `${planned}-${accepted}-${actual}`,
        status: status ? status : 0,
        location: location ? location : null,
        startDate: formatDate(date[0]) ? formatDate(date[0]) : null,
        endDate: formatDate(date[date.length - 1])
          ? formatDate(date[date.length - 1])
          : null,
        startTime: timeStart + ':00',
        endTime: timeEnd + ':00',
        fsuId: fsuId,
        trainingProgramId: trainingProgramSelect?.id,
        attendeeType: attendeeType ? attendeeType : null,
        userId: userId?.length ? userId : null,
        weekDay: daysOfWeek.join('-') ? daysOfWeek.join('-') : null,
      };
      toastCus('loading', t('Create class'), t('Pending...'), 'createClass');
      classAPIController
        .createClass(data)
        .then((res) => {
          if (res.message) {
            toast.close('createClass');
            toastCus('error', t('Create class'), `Error: ${res.message}`, '');
          } else {
            toast.close('createClass');
            setClassName('');
            sessionStorage.removeItem('className');

            navigate('/dashboard/class/detail');
            toastCus(
              'success',
              t('Create class'),
              t('Create class successfully'),
              ''
            );
          }
        })
        .catch((err) => {
          toast.close('createClass');
          toastCus(
            'error',
            t('Create class'),
            t('There was an error creating the class. Please try again!'),
            ''
          );
        });
    }
  };
  return (
    <>
      <Flex flexDirection='column' rowGap={3} width='100%'>
        {className ? (
          <>
            <Modal
              isOpen={tooltipModal.isOpen}
              onClose={tooltipModal.onClose}
              isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalHeader mt={6}>
                  <Stack direction='row' alignItems='baseline'>
                    <RiErrorWarningFill />
                    <Text fontWeight='bold'>
                      {t('Please take short helps for creating a class.')}
                    </Text>
                  </Stack>
                </ModalHeader>

                <ModalFooter>
                  <Checkbox
                    mr={3}
                    onChange={(e) =>
                      localStorage.setItem('tooltip', !e.target.checked)
                    }
                  >
                    {t('Don’t show this again')}
                  </Checkbox>
                  <Button
                    bg={'#2d3748'}
                    color={'white'}
                    _hover={{ opacity: '0.8' }}
                    mr={3}
                    onClick={() => {
                      tooltipModal.onClose();
                      setIsOpen(true);
                    }}
                  >
                    {t('Got it')}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Flex
              flexDir='column'
              p={3}
              backgroundColor={'#2d3748'}
              color={'white'}
            >
              <Text textAlign='left' fontWeight='semibold'>
                {t('Class')}
              </Text>
              <Stack
                direction={'column'}
                alignContent={'center'}
                backgroundColor={'#2d3748'}
                color={'white'}
              >
                <Flex alignItems='center'>
                  <Text fontSize={25} fontWeight={'semibold'}>
                    {className}
                  </Text>
                  <Badge ml={3} variant='solid'>
                    {t('Planning')}
                  </Badge>
                </Flex>
                <Divider />
                <Flex gap={3}>
                  <Text textAlign='left' fontSize={15}>
                    <strong fontSize={20}>{countSelectedDays()}</strong>{' '}
                    <span>
                      {t('days')} ({calculateHours} {t('hrs')})
                    </span>
                  </Text>
                  <Divider orientation='vertical' />
                </Flex>
              </Stack>
            </Flex>
            <Grid templateColumns='repeat(12, 1fr)' gap={5} pr={2}>
              <GridItem colSpan={5} w='100%'>
                <GeneralAccordion
                  dataFSU={dataFSU}
                  setDataFSU={setDataFSU}
                  timeStart={timeStart}
                  timeEnd={timeEnd}
                  setTimeStart={setTimeStart}
                  setTimeEnd={setTimeEnd}
                  location={location}
                  setLocation={setLocation}
                  trainer={trainer}
                  setTrainer={setTrainer}
                  admin={admin}
                  setAdmin={setAdmin}
                  fsuId={fsuId}
                  setFsuId={setFsuId}
                />
              </GridItem>
              <GridItem colSpan={7} w='100%'>
                <TimeFrameAccordion
                  date={date}
                  setDate={setDate}
                  daysOfWeek={daysOfWeek}
                  setDaysOfWeek={setDaysOfWeek}
                />
              </GridItem>
              <GridItem colSpan={5} w='100%'>
                <Accordion allowToggle className='second-step'>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        bg='#2D3748'
                        color='white'
                        _hover={{ opacity: '0.8' }}
                        borderRadius='13px'
                      >
                        <Flex flex='1' textAlign='left' alignItems={'center'}>
                          <FaRegStar />
                          <Text ml={2} fontWeight={'bold'}>
                            {t('Attendee')}
                          </Text>
                          <Select
                            placeholder={t('Select attendee type')}
                            w={'40%'}
                            height={'30px'}
                            ml={2}
                            _focus={{ background: 'white' }}
                            variant='filled'
                            onChange={(e) => setAttendeeType(e.target.value)}
                            color={'#2D3748'}
                          >
                            {attendees.map((item, index) => (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            ))}
                          </Select>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel shadow='md' p='4' rounded='md' bg='white'>
                      <Flex w={'100%'} direction={'column'}>
                        <Grid templateColumns='repeat(3, 1fr)'>
                          <GridItem
                            colSpan={1}
                            p={5}
                            backgroundColor={'#37364d'}
                          >
                            <Text
                              fontWeight={'bold'}
                              mb={5}
                              fontSize={18}
                              color={'white'}
                            >
                              {t('Planned')}
                            </Text>
                            <Input
                              textAlign={'center'}
                              background={'white'}
                              fontSize={18}
                              type='number'
                              onChange={(e) => setPlanned(e.target.value)}
                            />
                          </GridItem>
                          <GridItem
                            colSpan={1}
                            p={5}
                            backgroundColor={'#EDF2F7'}
                          >
                            <Text fontWeight={'bold'} fontSize={18} mb={5}>
                              {t('Accepted')}
                            </Text>
                            <Input
                              background={'white'}
                              textAlign={'center'}
                              type='number'
                              onChange={(e) => setAccepted(e.target.value)}
                            ></Input>
                          </GridItem>
                          <GridItem
                            colSpan={1}
                            p={5}
                            backgroundColor={'#DFDEDE'}
                          >
                            <Text fontWeight={'bold'} fontSize={18} mb={5}>
                              {t('Actual')}
                            </Text>
                            <Input
                              background={'white'}
                              textAlign={'center'}
                              type='number'
                              onChange={(e) => setActual(e.target.value)}
                            />
                          </GridItem>
                        </Grid>
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </GridItem>
              <GridItem colSpan={12} w='100%'>
                <Tabs variant='enclosed' isFitted>
                  <TabList gap={1}>
                    <Tab
                      _selected={{ color: 'white', bg: '#2d3748' }}
                      bg={'#6d7684'}
                      borderTopRadius={14}
                      color={'white'}
                    >
                      {t('Training Program')}
                    </Tab>
                    <Tab
                      isDisabled
                      borderTopRadius={14}
                      _selected={{ color: 'white', bg: '#2d3748' }}
                      bg={'#6d7684'}
                      color={'white'}
                    >
                      {t('Attendee List')}
                    </Tab>
                    <Tab
                      isDisabled
                      borderTopRadius={14}
                      _selected={{ color: 'white', bg: '#2d3748' }}
                      bg={'#6d7684'}
                      color={'white'}
                    >
                      {t('Budget')}
                    </Tab>
                    <Tab
                      isDisabled
                      borderTopRadius={14}
                      _selected={{ color: 'white', bg: '#2d3748' }}
                      bg={'#6d7684'}
                      color={'white'}
                    >
                      {t('Others')}
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel p={0}>
                      {!trainingProgramSelect ? (
                        <Flex
                          w={'100%'}
                          bg={'#2d3748'}
                          p={4}
                          justifyContent={'center'}
                          borderBottomRadius={14}
                        >
                          <Text
                            color={'white'}
                            my={'auto'}
                            fontSize={16}
                            fontWeight={600}
                          >
                            {t('Training Program Name')}
                          </Text>
                          <SearchButton onOpen={modal.onOpen} />
                          <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>
                                <InputTrainingProgram
                                  handleTrainingProgramSearch={
                                    handleTrainingProgramSearch
                                  }
                                />
                              </ModalHeader>
                              <ModalBody
                                sx={{ maxH: '60vh', overflow: 'scroll' }}
                              >
                                <SelectTrainingProgram
                                  modal={modal}
                                  active={active}
                                  setActive={setActive}
                                  setTrainingProgramSelect={
                                    setTrainingProgramSelect
                                  }
                                  shouldCloseModal={shouldCloseModal}
                                  trainingProgramList={trainingProgramList}
                                />
                              </ModalBody>
                            </ModalContent>
                          </Modal>
                        </Flex>
                      ) : (
                        <>
                          <Flex
                            w={'100%'}
                            bg={'#2d3748'}
                            color={'white'}
                            flexDir={'column'}
                            p={4}
                          >
                            <Text align={'left'} fontWeight={'semibold'}>
                              {trainingProgramSelect.topicCode}
                            </Text>
                            <Text align={'left'} fontSize={15} mt={5}>
                              <strong>{trainingProgramSelect.duration}</strong>{' '}
                              {t('minutes')} | {t('Modified on')}{' '}
                              <strong>
                                {' '}
                                {trainingProgramSelect.modifyDate}
                              </strong>{' '}
                              {t('by')}{' '}
                              <strong fontWeight='bold'>
                                {trainingProgramSelect.createBy}
                              </strong>
                            </Text>
                          </Flex>
                          {listSyllabus && (
                            <Reorder.Group
                              values={listSyllabus}
                              onReorder={setListSyllabus}
                              axis='y'
                            >
                              {listSyllabus.map((item, index) => (
                                <Reorder.Item value={item} key={item.topicCode}>
                                  {
                                    <ProgramCard
                                      index={index}
                                      item={item}
                                      trainingProgramSelect={
                                        trainingProgramSelect
                                      }
                                    />
                                  }
                                </Reorder.Item>
                              ))}
                            </Reorder.Group>
                          )}
                          {trainingProgramContent &&
                            !trainingProgramContent.listSyllabus.length && (
                              <Flex justifyContent='center' mt={4}>
                                <Text fontSize={15}>
                                  {t('No Syllabus Found!')}
                                </Text>
                              </Flex>
                            )}
                        </>
                      )}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </GridItem>
              <GridItem colSpan={12} w='100%'>
                <Flex w={'100%'} gap={3} my={8}>
                  <Button
                    variant={'solid'}
                    bg={'#2d3748'}
                    color={'white'}
                    _hover={{ opacity: '0.8' }}
                    borderRadius={'12px'}
                    onClick={() => {
                      if (trainingProgramSelect) {
                        setTrainingProgramSelect(null);
                      } else {
                        setClassName('');
                        sessionStorage.removeItem('className');
                      }
                    }}
                  >
                    {t('Back')}
                  </Button>
                  <Button
                    ml={'auto'}
                    variant='link'
                    _hover={{ opacity: '0.8' }}
                    borderRadius={'12px'}
                    color={'red'}
                    onClick={() => {
                      setUpdateTrainingProgram(true);
                      setClassName('');
                      sessionStorage.removeItem('className');
                      setTrainingProgramSelect(null);
                    }}
                  >
                    {t('Cancel')}
                  </Button>
                  <Button
                    bg={'#474747'}
                    color={'white'}
                    borderRadius={'12px'}
                    _hover={{ opacity: '0.8' }}
                    onClick={() => handleSubmitClassCreate(1)}
                  >
                    {t('Save as draft')}
                  </Button>
                  <Button
                    bg={'#2d3748'}
                    color={'white'}
                    className='fourth-step'
                    borderRadius={'12px'}
                    _hover={{ opacity: '0.8' }}
                    onClick={() => handleSubmitClassCreate(2)}
                  >
                    {t('Next')}
                  </Button>
                </Flex>
              </GridItem>
            </Grid>
          </>
        ) : (
          <InputClassName className={className} setClassName={setClassName} />
        )}
      </Flex>
    </>
  );
};
