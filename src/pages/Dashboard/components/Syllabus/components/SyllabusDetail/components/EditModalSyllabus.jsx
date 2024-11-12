import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { LuPlus } from 'react-icons/lu';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
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
  StackDivider,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import { IoRadio } from 'react-icons/io5';
import { TfiSaveAlt } from 'react-icons/tfi';
import { MdDeleteForever, MdQuiz } from 'react-icons/md';
import { PiExam } from 'react-icons/pi';
import { TbHandThreeFingers } from 'react-icons/tb';
import { RiUserVoiceLine } from 'react-icons/ri';
import { AiTwotoneBook } from 'react-icons/ai';
import { setIsRender } from '@/core/store/syllabus-management/syllabus-detail/syllabusDetail';
import {
  setIsEditModal,
  setTrainingUnit,
  setSyllabusDetail,
} from '@/core/store/syllabus-management/syllabus-detail/syllabusDetail';
import { syllabusDetailController } from '@/core/services/SyllabusServices/syllabusDetailController';

export const EditModalSyllabus = () => {
  const isEditModal = useSelector((state) => state.syllabusDetail.isEditModal);
  const syllabusData = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const isRender = useSelector((state) => state.syllabusDetail.isRender);
  const { t } = useTranslation();
  const toast = useToast();
  const dispatch = useDispatch();
  const toastIdRef = React.useRef();
  const [loading, setLoading] = useState(false);
  //State for general tab
  const [syllabusByDay, setSyllabusByDay] = useState([]);
  const [level, setLevel] = useState('');
  const [attendee, setAttendee] = useState(0);
  const [courseObj, setCourseObj] = useState('');
  const [technical, setTechnical] = useState('');
  const [topicName, setTopicName] = useState('');
  //State for other tab
  const [quizPercentage, setQuizPercentage] = useState(0);
  const [assignmentPercentage, setAssignmentPercentage] = useState(0);
  const [finalPercentage, setFinalPercentage] = useState(0);
  const [finalTheoryPercentage, setFinalTheoryPercentage] = useState(0);
  const [finalPracticePercentage, setFinalPracticePercentage] = useState(0);
  const [gpaPercentage, setGPAPercentage] = useState(0);
  const [trainingPrinciples, setTrainingPrinciples] = useState('');
  const [totalQuizzAssFinalError, setTotalQuizzAssFinalError] = useState('');
  const [totalTheoryPracticeError, setTotalTheoryPracticeError] = useState('');
  const [gpaPercentageError, setGpaPercentageError] = useState('');
  //State for outline tab
  const [isCheckDelete, setIsCheckDelete] = useState(false);
  const [days, setDays] = useState([]);
  const [dayNumber, setDayNumber] = useState(0);
  const [showAddCardForm, setShowAddCardForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const handleEdit = () => {
    setEditMode(true);
  };
  const openDeleteDialog = (day) => {
    setIsCheckDelete(true);
    setDayNumber(day);
  };
  const handleAddCard = (day, unit) => {
    setShowAddCardForm((prevState) => ({
      ...prevState,
      [`${day}-${unit}`]: true,
    }));
  };

  const handleLevelInput = (e) => {
    setLevel(e.target.value);
  };
  const handleAttendeeInput = (e) => {
    setAttendee(e.target.value);
  };
  const handleCourseObjChange = (e) => {
    setCourseObj(e);
  };

  const handleTechReqInputChange = (e) => {
    setTechnical(e.target.value);
  };

  const handleSubmitGeneral = async () => {
    setLoading(true);
    try {
      const data = {
        level: level,
        trainingAudience: attendee,
        technicalGroup: technical,
        topicOutline: courseObj,
        version: syllabusData?.version,
        topicCode: syllabusData?.topicCode,
        topicName: null,
      };
      if (
        level === '' ||
        attendee <= 0 ||
        technical === '' ||
        courseObj === ''
      ) {
        const error = [];
        if (level === '') {
          error.push(t('level_required'));
        }
        if (attendee <= 0) {
          error.push(t('attendee_required'));
        }
        if (technical === '') {
          error.push(t('technical_required'));
        }
        if (courseObj === '') {
          error.push(t('courseobj_required'));
        }
        return toast({
          title: error.map((e) => <Text key={e}>{e}</Text>),
          status: 'warning',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      } else {
        const response = await syllabusDetailController?.updateGeneralTab(data);
        if (response?.message) {
          dispatch(setIsRender(true));
          return toast({
            title: t('Update general tab success'),
            status: 'success',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        } else {
          return toast({
            title: `${response.err}`,
            status: 'error',
            position: 'top-right',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      return toast({
        title: `${error.message}`,
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOther = async () => {
    setLoading(true);
    try {
      const dataOther = {
        assessmentSchemeId: syllabusData?.assessmentScheme?.id,
        quiz: quizPercentage,
        assignment: assignmentPercentage,
        finalPoint: finalPercentage,
        finalTheory: finalTheoryPercentage,
        finalPractical: finalPracticePercentage,
        gpa: gpaPercentage,
        trainingPrinciples: trainingPrinciples,
      };
      if (
        trainingPrinciples === null ||
        quizPercentage <= 0 ||
        assignmentPercentage <= 0 ||
        finalPercentage <= 0 ||
        finalTheoryPercentage <= 0 ||
        finalPracticePercentage <= 0 ||
        gpaPercentage <= 0 ||
        gpaPercentage > 100
      ) {
        const error = [];
        if (trainingPrinciples === null) {
          error.push(t('trainingPrinciple_required'));
        }
        if (quizPercentage <= 0) {
          error.push(t('quiz_required'));
        }
        if (assignmentPercentage <= 0) {
          error.push(t('asm_required'));
        }
        if (finalPercentage <= 0) {
          error.push(t('final_required'));
        }
        if (finalTheoryPercentage <= 0) {
          error.push(t('finalT_required'));
        }
        if (finalPracticePercentage <= 0) {
          error.push(t('finalP_required'));
        }
        if (gpaPercentage <= 0) {
          error.push(t('gpa_required'));
        }
        if (gpaPercentage > 100) {
          error.push(t('GPA is not exceed 100%'));
        }
        return toast({
          title: error.map((e) => <Text key={e}>{e}</Text>),
          status: 'warning',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      } else {
        if (syllabusData?.assessmentScheme?.id === undefined) {
          const addData = {
            trainingPrinciples: trainingPrinciples,
            topicCode: syllabusData?.topicCode,
            assessmentScheme: {
              quiz: quizPercentage,
              assignment: assignmentPercentage,
              finalPoint: finalPercentage,
              finalTheory: finalTheoryPercentage,
              finalPractical: finalPracticePercentage,
              gpa: gpaPercentage,
            },
            saveAsDraft: false,
          };
          const response = await syllabusDetailController?.addSyllabusOther(
            addData
          );

          if (!response.data.message) {
            dispatch(setIsRender(true));
            return toast({
              title: t('Add syllabus other success'),
              status: 'success',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          } else {
            return toast({
              title: t(response.data.message),
              status: 'error',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          const response = await syllabusDetailController.updateOtherTab(
            dataOther
          );
          if (response.err) {
            return toast({
              title: t(response.err) && t(response.err),
              status: 'error',
              position: 'top-right',
              duration: 5000,
              isClosable: true,
            });
          } else {
            dispatch(setIsRender(true));
            return toast({
              title: t('Update other tab success'),
              position: 'top-right',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          }
        }
      }
    } catch (error) {
      return toast({
        title: t(error.message),
        position: 'top-right',
        status: 'erro',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleBlur = () => {
    const totalQuizzAssFinal =
      parseInt(quizPercentage) +
      parseInt(assignmentPercentage) +
      parseInt(finalPercentage);
    const totalTheoryPractice =
      parseInt(finalTheoryPercentage) + parseInt(finalPracticePercentage);

    const isQuizzAssFinalFilled =
      quizPercentage !== '' &&
      assignmentPercentage !== '' &&
      finalPercentage !== '';
    const isTheoryPracticeFilled =
      finalTheoryPercentage !== '' && finalPracticePercentage !== '';
    const isGpaPercentageFilled = gpaPercentage !== '';

    if (isQuizzAssFinalFilled && totalQuizzAssFinal !== 100) {
      setTotalQuizzAssFinalError(t('total_percentage'));
    } else {
      setTotalQuizzAssFinalError('');
    }
    if (isTheoryPracticeFilled && totalTheoryPractice !== 100) {
      setTotalTheoryPracticeError(t('total_final'));
    } else {
      setTotalTheoryPracticeError('');
    }

    if (isGpaPercentageFilled && parseInt(gpaPercentage) > 100) {
      setGpaPercentageError(t('gpa_error'));
    } else {
      setGpaPercentageError('');
    }
  };

  useEffect(() => {
    if (isEditModal) {
      //Set state cho general tab
      setLevel(syllabusData?.level);
      setAttendee(syllabusData?.trainingAudience);
      setCourseObj(syllabusData?.topicOutline);
      setTechnical(syllabusData?.technicalGroup);
      setTopicName(syllabusData?.topicName);
      //Set state cho other tab
      setQuizPercentage(syllabusData?.assessmentScheme?.quiz);
      setAssignmentPercentage(syllabusData?.assessmentScheme?.assignment);
      setFinalPercentage(syllabusData?.assessmentScheme?.finalPoint);
      setFinalPracticePercentage(
        syllabusData?.assessmentScheme?.finalPractical
      );
      setFinalTheoryPercentage(syllabusData?.assessmentScheme?.finalTheory);
      setGPAPercentage(syllabusData?.assessmentScheme?.gpa);
      setTrainingPrinciples(syllabusData?.trainingPrinciples);
      const dayNumbers = syllabusByDay?.map((day) => day[0]?.dayNumber);
      setDays(dayNumbers);
    }
  }, [
    isEditModal,
    syllabusByDay,
    syllabusData?.assessmentScheme?.assignment,
    syllabusData?.assessmentScheme?.finalPoint,
    syllabusData?.assessmentScheme?.finalPractical,
    syllabusData?.assessmentScheme?.finalTheory,
    syllabusData?.assessmentScheme?.gpa,
    syllabusData?.assessmentScheme?.quiz,
    syllabusData?.level,
    syllabusData?.technicalGroup,
    syllabusData?.topicName,
    syllabusData?.topicOutline,
    syllabusData?.trainingAudience,
    syllabusData?.trainingPrinciples,
  ]);
  useEffect(() => {
    const fetchData = async (id) => {
      const response = await syllabusDetailController.getTrainingUnit(id);
      dispatch(setTrainingUnit(response));
      const groupSyllabusByDay = (syllabus) => {
        const groupedSyllabus = {};

        syllabus?.forEach((item) => {
          if (!(item.dayNumber in groupedSyllabus)) {
            groupedSyllabus[item.dayNumber] = [];
          }
          groupedSyllabus[item.dayNumber].push(item);
        });

        return Object.values(groupedSyllabus);
      };
      const groupData = groupSyllabusByDay(response);
      setSyllabusByDay(groupData);
    };
    const fetchDataSyllabus = async (id) => {
      const response = await syllabusDetailController.getSyllabusDetail(id);
      dispatch(setSyllabusDetail(response));
    };
    if (isEditModal && syllabusData?.topicCode) {
      fetchData(syllabusData?.topicCode);
    }
    if (isRender && syllabusData?.topicCode) {
      fetchDataSyllabus(syllabusData?.topicCode);
      fetchData(syllabusData?.topicCode);
      dispatch(setIsRender(false));
    }
  }, [dispatch, isEditModal, isRender, syllabusData?.topicCode]);

  useEffect(() => {
    if (loading) {
      toastIdRef.current = toast({
        title: t('loading') + '...',
        position: 'top-right',
        duration: 5000,
        status: 'loading',
      });
    } else {
      toast.close(toastIdRef.current);
    }
  }, [loading]);
  return (
    <>
      <Modal
        size={'6xl'}
        isOpen={isEditModal}
        onClose={() => dispatch(setIsEditModal(false))}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('edit_syllabus')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize={'150%'}>{topicName}</Text>
            <Tabs>
              <TabList>
                <Tab>{t('general')}</Tab>
                <Tab>{t('outline')}</Tab>
                <Tab>{t('others')}</Tab>
              </TabList>

              <TabPanels>
                {/*Update General Tab */}
                <TabPanel>
                  <FormControl>
                    <Flex>
                      <Box w={'45%'}>
                        <FormLabel>{t('level')}*</FormLabel>
                        <Select
                          bg={'#FAFAFA'}
                          borderRadius={12}
                          h={12}
                          value={level}
                          onChange={handleLevelInput}
                          title={t('output_standard')}
                        >
                          <option value={'Intermediate'}>
                            {t('Intermediate')}
                          </option>
                          <option value={'Beginner'}>{t('Beginner')}</option>
                          <option value={'Advance'}>{t('Advance')}</option>
                        </Select>
                      </Box>
                      <Box w={'10%'}></Box>
                      <Box w={'45%'}>
                        <FormLabel>{t('attendee_number')}*</FormLabel>
                        <Input
                          type='number'
                          value={attendee}
                          onChange={handleAttendeeInput}
                        />
                      </Box>
                    </Flex>
                    <Box>
                      <Text fontSize='sm' fontWeight={'semibold'} my={2}>
                        {t('technicalRequirement')}(s)*
                      </Text>
                      <Textarea
                        id='tech-req-input'
                        value={technical}
                        rows={6}
                        borderRadius={10}
                        focusBorderColor='Black'
                        borderColor='silver.50'
                        onChange={handleTechReqInputChange}
                      />
                    </Box>
                    <Box>
                      <Text fontSize='sm' fontWeight={'semibold'} my={2}>
                        {t('courseObjects')}
                      </Text>
                      <Box width='100%'>
                        <TextEditor
                          id='course-obj-editor'
                          textEditor={handleCourseObjChange}
                          value={courseObj}
                        />
                      </Box>
                    </Box>
                    <Button
                      borderRadius={12}
                      colorScheme='blue'
                      onClick={() => handleSubmitGeneral()}
                      mt={5}
                    >
                      {t('Edit general')}
                    </Button>
                  </FormControl>
                </TabPanel>
                {/*Update Outlines Tab */}
                <TabPanel>
                  <Box boxShadow='xl' borderRadius='12px' py={3}>
                    {syllabusByDay.map((day) => (
                      <Accordion
                        key={day[0]?.dayNumber}
                        allowToggle
                        borderBottom='0.5px solid #CCC'
                        m={0}
                      >
                        <AccordionItem>
                          <h2>
                            <AccordionButton
                              _hover={{ bg: '#000' }}
                              bg='#474748'
                              p={0}
                              borderTopRadius={12}
                            >
                              <Flex w='100%'>
                                <Flex px={4}>
                                  <Box
                                    textColor={'white'}
                                    textAlign='left'
                                    p='2'
                                    justifyContent={'center'}
                                    my={'auto'}
                                  >
                                    {t('day')} {day[0]?.dayNumber}
                                  </Box>
                                  <Box p='2'>
                                    <Button
                                      onClick={() =>
                                        openDeleteDialog(day[0]?.dayNumber)
                                      }
                                      borderRadius='full'
                                      p='0'
                                      size='sm'
                                      colorScheme='white'
                                      _hover={{ opacity: '0.8' }}
                                    >
                                      <MdDeleteForever
                                        size='30'
                                        color='white'
                                      />
                                    </Button>
                                  </Box>
                                </Flex>
                              </Flex>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel p={0}>
                            {day.map((unit, index) => (
                              <Accordion p={0} key={unit?.unitCode} allowToggle>
                                <AccordionItem>
                                  <h2>
                                    <AccordionButton>
                                      <Flex
                                        w='100%'
                                        justifyContent={'space-between'}
                                      >
                                        <Flex w={'90%'}>
                                          <Box w={'20%'} my={'auto'}>
                                            <Text fontSize={20}>
                                              {t('Unit')} {unit?.unitCode}
                                            </Text>
                                          </Box>
                                          <InputEditName
                                            setLoading={setLoading}
                                            unit={unit}
                                          />
                                        </Flex>
                                        <AccordionIcon my={'auto'} />
                                      </Flex>
                                    </AccordionButton>
                                  </h2>
                                  <AccordionPanel pb={4}>
                                    {unit?.contentList?.map((card) => (
                                      <Box key={card?.contentId} w={'100%'}>
                                        <CardContent
                                          card={card}
                                          setLoading={setLoading}
                                        />
                                      </Box>
                                    ))}
                                    {showAddCardForm[
                                      `${day[0].dayNumber}-${unit?.unitCode}`
                                    ] && (
                                      <CardForm
                                        onCancel={() =>
                                          setShowAddCardForm({
                                            ...showAddCardForm,
                                            [`${day[0]?.dayNumber}-${unit?.unitCode}`]: false,
                                          })
                                        }
                                        setLoading={setLoading}
                                        id={unit?.unitCode}
                                      />
                                    )}
                                    <Button
                                      display='flex'
                                      flex='start'
                                      bg={'#2D3748'}
                                      color={'white'}
                                      p='0'
                                      onClick={() =>
                                        handleAddCard(
                                          day[0]?.dayNumber,
                                          unit?.unitCode
                                        )
                                      }
                                      _hover={{ bg: '#000', color: 'white' }}
                                      borderRadius={'full'}
                                    >
                                      <LuPlus />
                                    </Button>
                                  </AccordionPanel>
                                </AccordionItem>
                              </Accordion>
                            ))}
                            <Button
                              bg='#2D3748'
                              variant='solid'
                              display='flex'
                              mt='1%'
                              fontSize='lg'
                              color='white'
                              m='1%'
                              onClick={handleEdit}
                              leftIcon={<LuPlus />}
                              _hover={{ bgColor: '#000' }}
                              borderRadius={12}
                            >
                              {t('addUnit')}
                            </Button>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    ))}
                    <Button
                      bg='#2D3748'
                      variant='solid'
                      display='flex'
                      mt='1%'
                      fontSize='lg'
                      color='white'
                      m='1%'
                      onClick={handleEdit}
                      leftIcon={<LuPlus />}
                      _hover={{ bgColor: '#000' }}
                      borderRadius={12}
                    >
                      {t('addDay')}
                    </Button>
                  </Box>
                </TabPanel>
                {/*Update Other Tab */}
                <TabPanel>
                  <Card boxShadow='xl'>
                    <Box
                      w='100%'
                      h='35'
                      textAlign={'center'}
                      bgColor='#4A5568'
                      borderTopRadius='xl'
                    >
                      <Text as='b' color='white'>
                        {t('assessment_scheme')}
                      </Text>
                    </Box>
                    <CardBody>
                      <form>
                        <Stack
                          divider={<StackDivider borderColor='black' />}
                          spacing='4'
                        >
                          <Flex direction='column'>
                            <Flex
                              direction='row'
                              justifyContent='space-between'
                            >
                              <FormControl mb={4} w='100'>
                                <Flex justifyContent='flex-start'>
                                  <FormLabel my={'auto'}>
                                    {t('Quiz')}*
                                  </FormLabel>
                                  <Input
                                    boxShadow='lg'
                                    w='50'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={quizPercentage}
                                    onChange={(e) =>
                                      setQuizPercentage(
                                        parseInt(e.target.value)
                                      )
                                    }
                                    onBlur={handleBlur}
                                  />
                                  <Text
                                    position='absolute'
                                    right='5px'
                                    top='50%'
                                    transform='translateY(-50%)'
                                  >
                                    %
                                  </Text>
                                </Flex>
                              </FormControl>
                              <FormControl mb={4} w='100'>
                                <Flex justifyContent='flex-start'>
                                  <FormLabel my={'auto'}>
                                    {t('Assignment')}*
                                  </FormLabel>
                                  <Input
                                    boxShadow='lg'
                                    w='50'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={assignmentPercentage}
                                    onChange={(e) =>
                                      setAssignmentPercentage(
                                        parseInt(e.target.value)
                                      )
                                    }
                                    onBlur={handleBlur}
                                  />
                                  <Text
                                    position='absolute'
                                    right='5px'
                                    top='50%'
                                    transform='translateY(-50%)'
                                  >
                                    %
                                  </Text>
                                </Flex>
                              </FormControl>
                              <FormControl w='100' mb={4}>
                                <Flex justifyContent='flex-start'>
                                  <FormLabel my={'auto'}>
                                    {t('Final')}*
                                  </FormLabel>
                                  <Input
                                    boxShadow='lg'
                                    w='50'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={finalPercentage}
                                    onChange={(e) =>
                                      setFinalPercentage(
                                        parseInt(e.target.value)
                                      )
                                    }
                                    onBlur={handleBlur}
                                  />
                                  <Text
                                    position='absolute'
                                    right='5px'
                                    top='50%'
                                    transform='translateY(-50%)'
                                  >
                                    %
                                  </Text>
                                </Flex>
                              </FormControl>
                            </Flex>
                            <Flex>
                              {totalQuizzAssFinalError && (
                                <Text color='red' fontSize='sm'>
                                  {totalQuizzAssFinalError}
                                </Text>
                              )}
                            </Flex>
                          </Flex>
                          <Flex direction='column'>
                            <Flex justifyContent='space-between'>
                              <FormControl w='100' mb={4}>
                                <Flex justifyContent='flex-start'>
                                  <FormLabel my={'auto'}>
                                    {t('Final theory')}*
                                  </FormLabel>
                                  <Input
                                    boxShadow='lg'
                                    w='50'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={finalTheoryPercentage}
                                    onChange={(e) =>
                                      setFinalTheoryPercentage(
                                        parseInt(e.target.value)
                                      )
                                    }
                                    onBlur={handleBlur}
                                  />
                                  <Text
                                    position='absolute'
                                    right='5px'
                                    top='50%'
                                    transform='translateY(-50%)'
                                  >
                                    %
                                  </Text>
                                </Flex>
                              </FormControl>
                              <FormControl w='100' mb={4}>
                                <Flex justifyContent='flex-start'>
                                  <FormLabel my={'auto'}>
                                    {t('Final practice')}*
                                  </FormLabel>
                                  <Input
                                    boxShadow='lg'
                                    w='50'
                                    type='number'
                                    min={0}
                                    max={100}
                                    value={finalPracticePercentage}
                                    onChange={(e) =>
                                      setFinalPracticePercentage(
                                        parseInt(e.target.value)
                                      )
                                    }
                                    onBlur={handleBlur}
                                  />
                                  <Text
                                    position='absolute'
                                    right='5px'
                                    top='50%'
                                    transform='translateY(-50%)'
                                  >
                                    %
                                  </Text>
                                </Flex>
                              </FormControl>
                            </Flex>
                            <Flex>
                              {totalTheoryPracticeError && (
                                <Text fontSize='sm' color='red'>
                                  {totalTheoryPracticeError}
                                </Text>
                              )}
                            </Flex>
                          </Flex>
                          <Box>
                            <Heading size='xs' textTransform='uppercase'>
                              {t('Passing')}
                            </Heading>
                            <Flex>
                              <Box justifyContent='start'>
                                <FormControl w='100' mb={4}>
                                  <Flex flex='start'>
                                    <FormLabel my={'auto'}>GPA*</FormLabel>
                                    <Input
                                      boxShadow='lg'
                                      w='50'
                                      type='number'
                                      min={0}
                                      max={100}
                                      value={gpaPercentage}
                                      onChange={(e) =>
                                        setGPAPercentage(
                                          parseInt(e.target.value)
                                        )
                                      }
                                      onBlur={handleBlur}
                                    />
                                    <Text
                                      position='absolute'
                                      right='5px'
                                      top='50%'
                                      transform='translateY(-50%)'
                                    >
                                      %
                                    </Text>
                                  </Flex>
                                </FormControl>
                              </Box>
                              <Flex ml='2%' alignItems='center'>
                                {gpaPercentageError && (
                                  <Text fontSize='sm' color='red'>
                                    {gpaPercentageError}
                                  </Text>
                                )}
                              </Flex>
                            </Flex>
                          </Box>
                        </Stack>
                      </form>
                    </CardBody>
                  </Card>
                  <Box mt='2%' boxShadow='xl' bg='white' borderRadius='xl'>
                    <Box
                      textAlign={'center'}
                      w='100%'
                      h='35'
                      bgColor='#4A5568'
                      borderTopRadius='xl'
                    >
                      <Text as='b' color='white'>
                        {t('training_delivery_principle')}*
                      </Text>
                    </Box>
                    <Box h='5'></Box>
                    <Box m='2'>
                      <TextEditor
                        value={trainingPrinciples}
                        textEditor={(e) => setTrainingPrinciples(e)}
                      />
                    </Box>
                    <Box h='2'></Box>
                  </Box>
                  <Button
                    borderRadius={12}
                    colorScheme='blue'
                    onClick={() => handleSubmitOther()}
                    mt={5}
                  >
                    {t('Edit other')}
                  </Button>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
      <UnitAddModal
        isOpen={editMode}
        isClose={() => setEditMode(false)}
        setLoading={setLoading}
      />
      <CheckDeleteDialog
        day={dayNumber}
        isOpen={isCheckDelete}
        isClose={() => setIsCheckDelete(false)}
        setLoading={setLoading}
      />
    </>
  );
};

const CheckDeleteDialog = ({ day, isOpen, isClose, setLoading }) => {
  const syllabusDetail = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const dispatch = useDispatch();
  const toast = useToast();
  const { t } = useTranslation();
  const handleDeleteByDay = async () => {
    setLoading(true);
    try {
      const response = await syllabusDetailController.deleteSyllabusByDay(
        day,
        syllabusDetail?.topicCode
      );
      if (response.success && !response.error) {
        return toast({
          title: t('Delete syllabus by day success'),
          position: 'top-right',
          duration: 3000,
          status: 'success',
        });
      }
      if (!response.success && response.error) {
        return toast({
          title: response.error,
          position: 'top-right',
          duration: 3000,
          status: 'error',
        });
      }
    } catch (error) {
      return toast({
        title: error.message,
        position: 'top-right',
        duration: 3000,
        status: 'success',
      });
    } finally {
      isClose();
      dispatch(setIsRender(true));
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={isClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize='lg' fontWeight='bold'>
          {t('Delete day')} {day}
        </ModalHeader>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={isClose}>
            {t('Cancel')}
          </Button>{' '}
          <Button colorScheme='red' onClick={handleDeleteByDay} ml={3}>
            {t('Yes')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const UnitAddModal = ({ isOpen, isClose, setLoading }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [unit, setUnit] = useState('');
  const [day, setDay] = useState(1);
  const { t } = useTranslation();
  const syllabusData = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const handleAddTrainingUnit = async () => {
    setLoading(true);
    try {
      const data = {
        syllabusCode: syllabusData?.topicCode,
        unitName: unit,
        dayNumber: day,
        saveAsDraft: false,
      };
      const error = [];
      if (unit === '' || day <= 0) {
        if (unit === '') {
          error.push(t('Unit name is required'));
        }
        if (day <= 0) {
          error.push(t('Day must be > 0'));
        }
        return toast({
          title: error.map((e) => <Text key={e}>{e}</Text>),
          position: 'top-right',
          status: 'warning',
          duration: 3000,
        });
      }
      if (unit !== '' && day > 0) {
        const response = await syllabusDetailController?.addTrainingUnit(data);
        if (response.success && !response.error) {
          setUnit('');
          setDay(1);
          dispatch(setIsRender(true));
          isClose();
          return toast({
            title: t('Add training unit success'),
            status: 'success',
            position: 'top-right',
            duration: 3000,
          });
        }
        if (!response.success && response.error) {
          return toast({
            title: response.error,
            status: 'success',
            position: 'top-right',
            duration: 3000,
          });
        }
      }
    } catch (error) {
      return toast({
        title: error.message,
        status: 'success',
        position: 'top-right',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal size='2xl' isOpen={isOpen} onClose={isClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('Add unit and day')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex>
              <Box w={'50%'}>
                <FormLabel>{t('Enter unit')}*:</FormLabel>
                <Input
                  type='text'
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  required
                />
              </Box>
              <Box w={'50%'} ml={2}>
                <FormLabel>{t('Enter day')}*:</FormLabel>
                <Input
                  type='number'
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                  required
                />
              </Box>
            </Flex>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={isClose}>
            {t('Cancel')}
          </Button>
          <Button
            bg={'#4A5568'}
            color={'white'}
            onClick={handleAddTrainingUnit}
          >
            {t('Add')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const TextEditor = ({ textEditor, value }) => {
  const quillRef = useRef(null);
  const [code, setCode] = useState('');

  const handleProcedureContentChange = (content) => {
    setCode(content);
    textEditor(content);
  };

  const handleBack = useCallback(() => {
    const editor = quillRef.current.getEditor();
    editor.history.undo();
  }, []);

  const handleNext = useCallback(() => {
    const editor = quillRef.current.getEditor();
    editor.history.redo();
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ back: '<' }, { next: '>' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ size: [] }],
        [{ font: [] }],
        [{ align: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ color: [] }, { background: [] }],
      ],
      handlers: {
        back: handleBack,
        next: handleNext,
      },
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ];

  useEffect(() => {
    setCode(value);
  }, [value]);

  return (
    <>
      <ReactQuill
        ref={quillRef}
        theme='snow'
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleProcedureContentChange}
      />
    </>
  );
};

const InputEditName = ({ unit, setLoading }) => {
  const [name, setName] = useState('');
  const [day, setDay] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const updateTrainingUnit = async () => {
    setLoading(true);
    try {
      const data = {
        unitCode: unit?.unitCode,
        unitName: name,
        saveAsDraft: false,
        dayNumber: day,
      };
      const error = [];
      if (name === '' || day === 0) {
        if (name === '') {
          error.push(t('Unit name must not be empty'));
        }
        if (day <= 0) {
          error.push(t('Day must be > 0'));
        }
        return toast({
          title: error.map((e) => <Text key={e}>{e}</Text>),
          position: 'top-right',
          status: 'warning',
          duration: 3000,
        });
      } else {
        const response = await syllabusDetailController.updateTrainingUnit(
          data
        );
        if (response.success && !response.error) {
          dispatch(setIsRender(true));
          return toast({
            title: t(response.success),
            status: 'success',
            duration: 3000,
            position: 'top-right',

          });
        }
        if (!response.success && response.error) {
          return toast({
            title: t(response.error),
            status: 'error',
            duration: 3000,
            position: 'top-right',

          });
        }
      }
    } catch (error) {
      return toast({
        title: error.message,
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setName(unit?.unitName);
    setDay(unit?.dayNumber);
  }, [unit?.dayNumber, unit?.unitName]);
  return (
    <FormControl w={'80%'}>
      <Flex>
        <Input
          bg={'#FAFAFA'}
          borderRadius={12}
          h={12}
          p='1'
          px={3}
          placeholder={t('Unit Name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          size='xl'
          w={'100%'}
        ></Input>
        <Flex ml={3}>
          <FormLabel my={'auto'}>{t('day')}</FormLabel>
          <Input
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            p='1'
            px={3}
            placeholder={t('Day')}
            value={day}
            onChange={(e) => setDay(e.target.value)}
            size='xl'
            w={'100%'}
          ></Input>
        </Flex>
        <Box w={'fit-content'} ml={2} justifyContent={'center'}>
          <Button
            p='0'
            onClick={updateTrainingUnit}
            bg={'#FFF'}
            _hover={'none'}
            w={'fit-content'}
            mt={1}
          >
            <TfiSaveAlt size='80%' />
          </Button>
        </Box>
      </Flex>
    </FormControl>
  );
};

const CardContent = ({ card, setLoading }) => {
  const dispatch = useDispatch();
  const [contentName, setContentName] = useState('');
  const [duration, setDuration] = useState(10);
  const [learningObjective, setLearningObjective] = useState(0);
  const [online, setOnline] = useState(false);
  const [deliveryType, setDeliveryType] = useState('');
  const toast = useToast();
  const { t } = useTranslation();
  const learning = useSelector(
    (state) => state.syllabusDetail.learningObjective
  );
  useEffect(() => {
    if (card) {
      setContentName(card?.contentName || '');
      setDuration(card?.duration || 0);
      setLearningObjective(card?.learningObjective?.id || '');
      setOnline(card?.isOnline || false);
      setDeliveryType(card?.deliveryType || '');
    }
  }, [card]);

  const handleEdit = async () => {
    setLoading(true);
    try {
      const data = {
        contentId: card?.contentId,
        contentName: contentName,
        deliveryType: deliveryType,
        duration: duration,
        isOnline: online,
        learningObjective: learningObjective,
        note: 'note',
      };
      if (
        contentName === '' ||
        deliveryType === '' ||
        duration < 10 ||
        learningObjective === 0
      ) {
        const message = [];
        if (contentName === '') {
          message.push(t('empty_contentName'));
        }
        if (deliveryType === '') {
          message.push(t('empty_deliveryType'));
        }
        if (duration < 10) {
          message.push(t('empty_duration'));
        }
        if (learningObjective === 0) {
          message.push(t('empty_learning'));
        }
        return toast({
          title: t('error_input_field'),
          description: message.map((e) => <Text key={e}>{e}</Text>),
          status: 'warning',
          duration: 3000,
          position: 'top-right',
        });
      } else {
        const response = await syllabusDetailController.editTrainingContent(
          data
        );
        if (response?.success && !response?.error) {
          dispatch(setIsRender(true));
          return toast({
            title: t('Edit training content success'),
            status: 'success',
            duration: 3000,
            position: 'top-right',
          });
        }
        if (response?.error && !response?.success) {
          return toast({
            title: response.error.map((e) => <Text key={e}>{e}</Text>),
            status: 'error',
            duration: 3000,
            position: 'top-right',
          });
        }
      }
    } catch (error) {
      return toast({
        title: error.message,
        status: 'success',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box borderRadius='xl' mb='1%'>
      <Flex w={'100%'} justifyContent={'space-between'}>
        <FormControl flex='7' p='1'>
          <Input
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            value={contentName}
            onChange={(e) => setContentName(e.target.value)}
            title={t('content')}
          />
        </FormControl>
        <FormControl flex='3' p='1'>
          <Input
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            type='number'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder={t('Duration')}
            title={t('duration_error')}
          />
        </FormControl>

        <FormControl flex='7' p='1'>
          <Select
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            value={learningObjective}
            onChange={(e) => setLearningObjective(e.target.value)}
            title={t('output_standard')}
          >
            {learning.map((e) => (
              <option key={e.id} value={e.id}>
                {e?.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl flex='1' p='1' justifyContent='center'>
          <Switch
            bg={'#FAFAFA'}
            isChecked={online}
            onChange={(e) => {
              setOnline(e.target.checked);
            }}
            color='black'
            colorScheme='orange'
            title='Online/Offline'
          />
          <FormLabel justifyContent='center' size='sm'>
            Off/On
          </FormLabel>
        </FormControl>

        <FormControl flex='7' p='1'>
          <Select
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            title={t('Delivery type')}
          >
            {!deliveryType && (
              <option value={''}>
                <></>
              </option>
            )}
            <option value='1'>{t('Assignment/Lab')}</option>
            <option value='2'>{t('Concept/Lecture')}</option>
            <option value='3'>{t('Guide/Preview')}</option>
            <option value='4'>{t('Test/Quiz')}</option>
            <option value='5'>{t('Exam')}</option>
            <option value='6'>{t('Seminar/Workshop')}</option>
          </Select>
        </FormControl>

        <Flex direction='row' flex={2} p='1'>
          <Button
            bg='#4DB848'
            variant='solid'
            display='flex'
            color='white'
            borderRadius={12}
            onClick={handleEdit}
            _hover='none'
            h={12}
          >
            {t('Save')}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
const CardForm = ({ onCancel, id, setLoading }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [contentName, setContentName] = useState('');
  const [duration, setDuration] = useState(10);
  const [learningObjective, setLearningObjectives] = useState(0);
  const [online, setOnline] = useState(false);
  const [deliveryType, setDeliveryType] = useState('');
  const { t } = useTranslation();
  const learning = useSelector(
    (state) => state.syllabusDetail.learningObjective
  );
  const handleSave = async () => {
    setLoading(true);
    try {
      const data = [
        {
          contentName: contentName,
          deliveryType: deliveryType,
          duration: duration,
          note: 'note',
          learningObjective: learningObjective,
          online: online,
        },
      ];
      if (
        contentName === '' ||
        deliveryType === '' ||
        duration < 10 ||
        learningObjective === 0
      ) {
        const message = [];
        if (contentName === '') {
          message.push(t('empty_contentName'));
        }
        if (deliveryType === '') {
          message.push(t('empty_deliveryType'));
        }
        if (duration < 10) {
          message.push(t('empty_duration'));
        }
        if (learningObjective === 0) {
          message.push(t('empty_learning'));
        }
        return toast({
          title: t('error_input_field'),
          description: message.map((e) => <Text key={e}>{e}</Text>),
          status: 'warning',
          duration: 3000,
          position: 'top-right',
        });
      } else {
        const response = await syllabusDetailController.addTrainingUnitContent(
          id,
          data
        );
        if (!response.error) {
          setContentName('');
          setDuration(10);
          setLearningObjectives(0);
          setOnline(false);
          setDeliveryType('');
          dispatch(setIsRender(true));
          onCancel();
          return toast({
            title: t('Add training unit success'),
            status: 'success',
            duration: 3000,
            position: 'top-right',
          });
        }
        if (response.error) {
          return toast({
            title: response.error,
            status: 'error',
            duration: 3000,
            position: 'top-right',
          });
        }
      }
    } catch (error) {
      return toast({
        title: error.message,
        status: 'error',
        duration: 3000,
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box borderRadius='xl' mb='1%'>
      <Flex mt='2%' w={'100%'} justifyContent={'space-between'}>
        <FormControl flex='7' p='1'>
          <Input
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            value={contentName}
            onChange={(e) => setContentName(e.target.value)}
            placeholder={t('content')}
          />
        </FormControl>

        <FormControl flex='3' p='1'>
          <Input
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            type='number'
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder={t('Duration')}
            title={t('duration_error')}
          />
        </FormControl>

        <FormControl flex='7' p='1'>
          <Select
            bg={'#FAFAFA'}
            borderRadius={12}
            h={12}
            value={learningObjective}
            onChange={(e) => setLearningObjectives(e.target.value)}
            placeholder={t('output_standard')}
          >
            {learning.map((e) => (
              <option key={e.id} value={e.id}>
                {e?.name}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl flex='1' p='1' justifyContent='center'>
          <Switch
            bg={'#FAFAFA'}
            isChecked={online}
            onChange={(e) => {
              setOnline(e.target.checked);
            }}
            color='black'
            colorScheme='orange'
            title='Online/Offline'
          />
          <FormLabel justifyContent='center' size='sm'>
            Off/On
          </FormLabel>
        </FormControl>

        <FormControl flex='7' p='1'>
          <Select
            bg={'#FAFAFA'}
            h={12}
            borderRadius={12}
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            placeholder={t('Delivery type')}
          >
            <option value='1'>{t('Assignment/Lab')}</option>
            <option value='2'>{t('Concept/Lecture')}</option>
            <option value='3'>{t('Guide/Preview')}</option>
            <option value='4'>{t('Test/Quiz')}</option>
            <option value='5'>{t('Exam')}</option>
            <option value='6'>{t('Seminar/Workshop')}</option>
          </Select>
        </FormControl>

        <Flex direction='row' flex='2' p='1'>
          <Button
            bg='red.500'
            variant='outline'
            display='flex'
            color='white'
            borderRadius={12}
            onClick={onCancel}
            _hover='none'
            h={12}
          >
            {t('cancel')}
          </Button>
          <Button
            bg='#4DB848'
            ml={2}
            variant='solid'
            display='flex'
            color='white'
            borderRadius={12}
            onClick={handleSave}
            _hover='none'
            h={12}
          >
            {t('Save')}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
