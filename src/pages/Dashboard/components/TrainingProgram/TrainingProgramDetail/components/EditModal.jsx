import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, IconButton } from '@chakra-ui/button';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Divider, Flex, Text } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import { trainingProgramController } from '@/core/services/TrainingProgram/trainingProgramAPI';
import { useDispatch, useSelector } from 'react-redux';
import {
  setEditModal,
  setIsUpdated,
  setIsUpdating,
} from '@/core/store/training-program-management/trainingProgramDetail';
import { IoClose } from 'react-icons/io5';
import { useToast } from '@chakra-ui/toast';

export const EditModal = () => {
  const isEdit = useSelector(
    (state) => state.trainingProgramDetail.isTriggerModalEdit
  );
  const programDetail = useSelector(
    (state) => state.trainingProgramDetail.programDetailData
  );
  const isUpdating = useSelector(
    (state) => state.trainingProgramDetail.isUpdating
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [startDay, setStartDay] = useState(0);
  const [generalInfor, setGeneralInfor] = useState('');
  const [status, setStatus] = useState(0);
  const [searchResult, setSearchResult] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [trainingProgramSyllabus, setTrainingProgramSyllabus] = useState([]);
  const handleGeneralInfor = (e) => {
    setGeneralInfor(e.target.value);
  };
  const toast = useToast();

  const handleStartDay = (e) => {
    e.preventDefault();
    setStartDay(e.target.value);
  };

  const handleSearchResult = () => {
    if (searchString.length > 0) {
      trainingProgramController
        .searchSyllabus(searchString)
        .then((res) => {
          const data = res.data;
          setSearchResult(data.content);
        })
        .catch((err) => {
          setSearchResult([]);
        });
    }
  };
  const loadTrainingProgramsSyllabus = async () => {
    const response = await trainingProgramController.getProgram(
      programDetail?.id
    );
    setTrainingProgramSyllabus(response?.listSyllabus);
  };

  const handleAddTrainingProgramSyllabus = async (syllabusId) => {
    await trainingProgramController.addTrainingProgramSyllabus(
      programDetail.id,
      syllabusId
    );
    dispatch(setIsUpdating(!isUpdating));
    dispatch(setIsUpdated(true));
    loadTrainingProgramsSyllabus();
  };

  const handleRemoveTrainingProgramSyllabus = async (syllabusId) => {
    await trainingProgramController.removeTrainingProgramSyllabus(
      programDetail.id,
      syllabusId
    );
    dispatch(setIsUpdating(!isUpdating));
    dispatch(setIsUpdated(true));
    loadTrainingProgramsSyllabus();
  };

  const handleUpdateTrainingProgram = async () => {
    try {
      trainingProgramController.updateTrainingProgram(
        programDetail.id,
        startDay,
        programDetail?.topicCode,
        generalInfor,
        status
      );
      if (generalInfor === '' || startDay === '' || startDay === null) {
        const error = [];
        if (generalInfor === '') {
          error.push(t('General information is required'));
        }
        if (startDay === ''|| startDay === null) {
          error.push(t('Start day is required'));
        }
        return toast({
          title: error.map((e) => <Text key={e}>{e}</Text>),
          duration: 5000,
          status: 'warning',
          isClosable: true,
          position: 'top-right',
        });
      } else {
        const response = await trainingProgramController.updateTrainingProgram(
          programDetail.id,
          startDay,
          programDetail?.topicCode,
          generalInfor,
          status
        );
        if (response && response.data) {
          dispatch(setIsUpdated(true));
          dispatch(setEditModal(false));
          return toast({
            title: t('Update program success'),
            duration: 5000,
            isClosable: true,
            status: 'success',
            position: 'top-right',
          });
        }
      }
    } catch (error) {
      return toast({
        title: error.message,
        duration: 5000,
        isClosable: true,
        status: 'error',
        position: 'top-right',
      });
    }
  };

  useEffect(() => {
    setGeneralInfor(programDetail?.generalInformation);
    setStatus(programDetail?.status);
    setStartDay(programDetail?.startTime);
  }, [programDetail]);

  useEffect(() => {
    handleSearchResult();
  }, [searchString]);

  useEffect(() => {
    if (isEdit) {
      loadTrainingProgramsSyllabus();
    }
  }, [isEdit, isUpdating]);

  useEffect(() => {
    if (!isEdit) {
      setGeneralInfor(programDetail?.generalInformation);
      setStatus(programDetail?.status);
      setStartDay(programDetail?.startTime);
      setSearchString('')
      setSearchResult([])
    }
  }, [
    isEdit,
    programDetail?.generalInformation,
    programDetail?.startTime,
    programDetail?.status,
  ]);

  return (
    <>
      <Modal
        size={'5xl'}
        isOpen={isEdit}
        onClose={() => dispatch(setEditModal(false))}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={'#2D3748'} color='#FFF'>
            {t('Edit program')}
          </ModalHeader>
          <ModalCloseButton color={'white'} />
          <ModalBody>
            <FormControl>
              <FormLabel fontSize={'150%'}>
                {programDetail?.topicCode}
              </FormLabel>
              <Flex flexDirection={'column'}>
                <FormLabel>{t('general_information')}*</FormLabel>
                <Textarea
                  width={'100%'}
                  height={'150px'}
                  placeholder=''
                  value={generalInfor}
                  onChange={handleGeneralInfor}
                />
              </Flex>
              <Flex marginTop={'15px'}>
                <FormLabel width='100px' fontSize='md' fontWeight='semibold'>
                  {t('Start time')}*
                </FormLabel>
                <Input type='date' value={startDay} onChange={handleStartDay} />
              </Flex>
              <Divider marginTop={'10px'} marginBottom={'10px'} />
              <Flex>
                <FormLabel width='100px' fontSize='md' fontWeight='semibold'>
                  {t('Add syllabus')}
                </FormLabel>
                <Flex flexDirection={'column'} width={'100%'}>
                  <Input
                    width={'100%'}
                    type='text'
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                  ></Input>
                  <Flex flexDirection={'column'}>
                    {searchResult?.map((item) => (
                      <Box
                        key={item?.topicCode}
                        marginTop={'5px'}
                        bgColor={'#FFFFFF'}
                        _hover={{ backgroundColor: '#ECECEC' }}
                        color={'#000000'}
                        borderRadius={'8px'}
                        padding={'5px'}
                        shadow={'md'}
                        width={'100%'}
                        onClick={() =>
                          handleAddTrainingProgramSyllabus(item?.topicCode)
                        }
                      >
                        <Flex
                          flexDirection={'column'}
                          justifyContent={'space-between'}
                        >
                          <Text alignSelf={'flex-start'}>
                            {item?.topicName}
                          </Text>
                          <Text
                            alignSelf={'flex-end'}
                            as={'i'}
                            fontSize={'small'}
                          >
                            {item?.technicalGroup} | {t('modified_by')}{' '}
                            {item?.modifiedBy}
                          </Text>
                        </Flex>
                      </Box>
                    ))}
                  </Flex>
                </Flex>
              </Flex>
              <Divider marginTop={'10px'} marginBottom={'10px'} />
              <Flex flexDirection={'row'}>
                <FormLabel width='100px' fontSize='md' fontWeight='semibold'>
                  {t('Syllabus list')}
                </FormLabel>
                <Flex flexDirection={'column'} width={'100%'}>
                  {trainingProgramSyllabus?.map((item) => (
                    <Box
                      key={item?.topicCode}
                      marginTop={'10px'}
                      bgColor={'#FFFFFF'}
                      color={'#333333'}
                      borderRadius={'8px'}
                      padding={'10px'}
                      boxShadow={'0px 2px 4px rgba(0, 0, 0, 0.1)'}
                      width={'100%'}
                    >
                      <Flex
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                      >
                        <Flex
                          alignItems={'center'}
                          justifyContent={'space-between'}
                        >
                          <Text fontSize={'18px'} fontWeight={'bold'}>
                            {item.topicName}
                          </Text>
                          <IconButton
                            icon={<IoClose />}
                            size={'sm'}
                            colorScheme={'gray'}
                            variant={'ghost'}
                            onClick={() =>
                              handleRemoveTrainingProgramSyllabus(
                                item?.topicCode
                              )
                            }
                          />
                        </Flex>
                        <Text
                          alignSelf={'flex-end'}
                          fontStyle={'italic'}
                          fontSize={'12px'}
                          mt={2}
                        >
                          {t('Created by')} {item.createdBy.name}
                        </Text>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              variant='ghost'
              mr={3}
              onClick={() => dispatch(setEditModal(false))}
            >
              {t('Cancel')}
            </Button>
            <Button
              colorScheme='blue'
              onClick={() => handleUpdateTrainingProgram()}
            >
              {t('Save')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
