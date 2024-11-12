import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Flex,
    Box,
    Divider,
    Text,
    IconButton
} from '@chakra-ui/react';
import { IoClose } from 'react-icons/io5';
import {
    setTrainingProgramData,
    setIsUpdating,
    setIsAddSyllabus,
    setIsRemoveSyllabus,
    setUpdateSyllabusId
} from '@/core/store/training-program-management/trainingProgramData';
import { useDisclosure } from '@chakra-ui/react';
import { setModalIsOpen, setSyllabusSearchString } from '@/core/store/training-program-management/trainingProgramView';

const EditTrainingProgramModal = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalIsOpen = useSelector((state) => state.trainingProgramView.modalIsOpen);
    const trainingProgram = useSelector((state) => state.trainingProgramData.programData);
    const trainingSyllabusList = useSelector((state) => state.trainingProgramData.trainingSyllabusList);
    const syllabusList = useSelector((state) => state.trainingProgramData.syllabusList);

    const handleOpenModal = () => {
        if (modalIsOpen === true) {
            onOpen();
        }
    }

    React.useEffect(() => {
        handleOpenModal();
    }, [modalIsOpen]);

    const handleCloseModal = () => {
        onClose();
        dispatch(setModalIsOpen(false));
    }

    const handleSaveButton = () => {
        dispatch(setIsUpdating(true));
        dispatch(setModalIsOpen(false));
        onClose();
    }

    const handleAddSyllabus = (topicCode) => {
        dispatch(setIsAddSyllabus(true));
        dispatch(setUpdateSyllabusId(topicCode));
    }

    const handleRemoveSyllabus = (topicCode) => {
        dispatch(setIsRemoveSyllabus(true));
        dispatch(setUpdateSyllabusId(topicCode));
    }

    return (
        <Modal isOpen={isOpen} onClose={handleCloseModal} size={'2xl'}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg={'#2D3748'} color='#FFF'>{t('Edit program')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel fontSize={'150%'}>{trainingProgram.topicCode}</FormLabel>
                        <Flex flexDirection={'column'}>
                            <FormLabel>* {t('General information')}</FormLabel>
                            <Textarea width={'100%'}
                                height={'150px'}
                                placeholder=''
                                value={trainingProgram?.generalInformation}
                                onChange={(e) => dispatch(setTrainingProgramData({ ...trainingProgram, generalInformation: e.target.value }))}
                            />
                        </Flex>
                        <Flex marginTop={'15px'}>
                            <FormLabel width='100px' fontSize='md' fontWeight='semibold'>{t('Start time')}</FormLabel>
                            <Input
                                type="date"
                                value={trainingProgram?.startTime}
                                onChange={(e) => dispatch(setTrainingProgramData({ ...trainingProgram, startTime: e.target.value }))}
                            />
                        </Flex>
                        <Divider marginTop={'10px'} marginBottom={'10px'} />
                        <Flex>
                            <FormLabel width='100px' fontSize='md' fontWeight='semibold'>{t('Add Syllabus')}</FormLabel>
                            <Flex flexDirection={'column'}
                                width={'100%'}
                            >
                                <Input
                                    width={'100%'}
                                    type='text'
                                    onChange={(e) => dispatch(setSyllabusSearchString(e.target.value))}
                                ></Input>
                                {syllabusList.length > 0 ?
                                    <Flex flexDirection={'column'}>
                                        {syllabusList.map((item) => (
                                            <Box marginTop={'5px'}
                                                bgColor={'#FFFFFF'}
                                                _hover={{ backgroundColor: '#ECECEC' }}
                                                color={'#000000'}
                                                borderRadius={'8px'}
                                                padding={'5px'}
                                                shadow={'md'}
                                                width={'100%'}
                                                value={item.topicCode}
                                                onClick={() => handleAddSyllabus(item.topicCode)}>
                                                <Flex flexDirection={'column'} justifyContent={'space-between'}>
                                                    <Text alignSelf={'flex-start'}>{item.topicName}</Text>
                                                    <Text alignSelf={'flex-end'} as={'i'} fontSize={'small'} >{item.technicalGroup} | {t('Modified by')} {item.modifiedBy}</Text>
                                                </Flex>
                                            </Box>
                                        ))}
                                    </Flex>
                                    : <></>
                                }

                            </Flex>
                        </Flex>
                        <Divider marginTop={'10px'} marginBottom={'10px'} />
                        <Flex flexDirection={'row'}>
                            <FormLabel width='100px' fontSize='md' fontWeight='semibold'>{t('Syllabus List')}</FormLabel>
                            <Flex flexDirection={'column'} width={'100%'}>
                                {trainingSyllabusList?.map((item) => (
                                    <Box
                                        marginTop={'10px'}
                                        bgColor={'#FFFFFF'}
                                        color={'#333333'}
                                        borderRadius={'8px'}
                                        padding={'10px'}
                                        boxShadow={'0px 2px 4px rgba(0, 0, 0, 0.1)'}
                                        width={'100%'}
                                    >
                                        <Flex flexDirection={'column'} justifyContent={'space-between'}>
                                            <Flex alignItems={'center'} justifyContent={'space-between'}>
                                                <Text fontSize={'18px'} fontWeight={'bold'}>{item.topicName}</Text>
                                                <IconButton
                                                    icon={<IoClose />}
                                                    size={'sm'}
                                                    colorScheme={'gray'}
                                                    variant={'ghost'}
                                                    onClick={() => handleRemoveSyllabus(item.topicCode)}
                                                />
                                            </Flex>
                                            <Text alignSelf={'flex-end'} fontStyle={'italic'} fontSize={'12px'} mt={2}>
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
                    <Button colorScheme="blue" mr={3} onClick={() => handleCloseModal()}>
                        {t('Cancel')}
                    </Button>
                    <Button variant="ghost" onClick={() => handleSaveButton()}>
                        {t('Save')}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default EditTrainingProgramModal