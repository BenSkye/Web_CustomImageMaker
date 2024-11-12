import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/accordion';
import { Badge, Box, Flex, Text } from '@chakra-ui/layout';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDropdown } from 'react-icons/io';
import { BiTask, BiUserVoice } from 'react-icons/bi';
import { RiFileMarkLine } from 'react-icons/ri';
import { FaRegHandPaper } from 'react-icons/fa';
import { PiExam } from 'react-icons/pi';
import { BsBroadcastPin } from 'react-icons/bs';
import { ChartSyllabusDetail } from '@/pages/Dashboard/components/Syllabus/components/SyllabusDetail/components/ChartSyllabusDetail.jsx';
import { MaterialModal } from '@/pages/Dashboard/components/Syllabus/components/SyllabusDetail/components/MaterialModal';
import useAuthorization from '@/hooks/useAuthorization';
import { syllabusDetailController } from '@/core/services/SyllabusServices/syllabusDetailController';
import { setTrainingUnit } from '@/core/store/syllabus-management/syllabus-detail/syllabusDetail';

export const OutlineTab = () => {
  const syllabusDetail = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const isEditModal = useSelector((state) => state.syllabusDetail.isEditModal);
  const [syllabusData, setSyllabusData] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { syllabusPermission } = useSelector(
    (state) => state.permissionList.data
  );
  const { isAccessible } = useAuthorization(syllabusPermission);

  const deliveryTypeRender = (deliveryType) => {
    switch (deliveryType) {
      case '1':
        return (
          <RiFileMarkLine
            title={t('Assignment/Lab')}
            size='1.5em'
            color='#2D3748'
            margin='0 auto'
          />
        );

      case '2':
        return (
          <BiUserVoice
            title={t('Concept/Lecture')}
            size='1.5em'
            color='#2D3748'
            margin='0 auto'
          />
        );

      case '3':
        return (
          <FaRegHandPaper
            title={t('Guide/Preview')}
            size='1.5em'
            color='#2D3748'
            margin='0 auto'
          />
        );

      case '4':
        return (
          <BiTask
            title={t('Test/Quiz')}
            size='1.5em'
            color='#2D3748'
            margin='0 auto'
          />
        );

      case '5':
        return (
          <PiExam
            title={t('Exam')}
            size='1.5em'
            color='#2D3748'
            margin='0 auto'
          />
        );

      case '6':
        return (
          <BsBroadcastPin
            title={t('Seminar/Workshop')}
            size='1.5em'
            color='#2D3748'
            margin='0 auto'
          />
        );

      default:
        return <></>;
    }
  };

  const statusRender = (status) => {
    switch (status) {
      case true:
        return (
          <Badge
            borderRadius={'1rem'}
            w={{ base: 'fit-content' }}
            px={3}
            py={1}
            textAlign={'center'}
            variant={'outline'}
            colorScheme='orange'
            fontSize={{ base: '0.5rem', lg: 'xs' }}
          >
            Online
          </Badge>
        );
      case false:
        return (
          <Badge
            borderRadius={'1rem'}
            w={{ base: 'fit-content' }}
            px={3}
            py={1}
            textAlign={'center'}
            variant={'solid'}
            backgroundColor={'#2D3748'}
            colorScheme='orange'
            fontSize={{ base: '0.5rem', lg: 'xs' }}
          >
            Offline
          </Badge>
        );
      default:
        return <Badge>Error</Badge>;
    }
  };
  const truncateDecimal = (number, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.trunc(number * factor) / factor;
  };
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
      setSyllabusData(groupData);
    };
    if (!isEditModal && syllabusDetail?.topicCode) {
      fetchData(syllabusDetail?.topicCode);
    }
  }, [dispatch, isEditModal, syllabusDetail?.topicCode]);
  return (
    <Flex>
      <Box w={'70%'}>
        {syllabusData?.length > 0 ? (
          <>
            {syllabusData
              ?.sort((a, b) => a[0].dayNumber - b[0].dayNumber)
              .map((groupElement) => (
                <Accordion key={groupElement[0]?.dayNumber} allowMultiple p={0}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton
                        data-testId='day-test'
                        fontSize={'lg'}
                        fontWeight={'bold'}
                        backgroundColor={'#2D3748'}
                        _hover={{bg: 'black'}}
                        color={'white'}
                      >
                        {t('day')} {groupElement[0]?.dayNumber}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel w={'100%'} p={0}>
                      {groupElement
                        ?.sort((a, b) => a.unitCode - b.unitCode)
                        .map((dayCourse) => (
                          <Accordion key={dayCourse?.unitCode} allowMultiple>
                            <AccordionItem>
                              <h2>
                                <AccordionButton>
                                  <Flex w={'100%'}>
                                    <Box w={'20%'} textAlign={'left'}>
                                      <Text
                                        data-testId='unit-code'
                                        fontWeight={'bold'}
                                        fontSize={{
                                          base: 'md',
                                          lg: 'xl',
                                        }}
                                      >
                                        {t('Unit')} {dayCourse?.unitCode}
                                      </Text>
                                    </Box>
                                    <Box w={'80%'}>
                                      <Text
                                        data-testId='unit-name'
                                        fontWeight={'bold'}
                                        fontSize={{
                                          base: 'md',
                                          lg: 'xl',
                                        }}
                                        textAlign={'left'}
                                      >
                                        {dayCourse?.unitName}
                                      </Text>
                                      <Text
                                        data-testId='unit-duration'
                                        fontSize={{
                                          base: 'md',
                                          lg: 'lg',
                                        }}
                                        textAlign={'left'}
                                      >
                                        {truncateDecimal(
                                          dayCourse?.duration
                                            ? dayCourse?.duration / 60
                                            : 0,
                                          2
                                        )}{' '}
                                        {t('hours')}
                                      </Text>
                                    </Box>
                                  </Flex>
                                  <IoIosArrowDropdown size={'30px'} />
                                </AccordionButton>
                              </h2>
                              <AccordionPanel p={0}>
                                <Flex w={'100%'}>
                                  <Box w={{ base: '0%', lg: '20%' }}></Box>
                                  <Box w={{ base: '100%', lg: '80%' }}>
                                    {dayCourse?.contentList?.map(
                                      (courseDetail) => (
                                        <Flex
                                          key={courseDetail?.contentId}
                                          borderRadius={'15px'}
                                          my={3}
                                          pl={4}
                                          py={1}
                                          backgroundColor={'#eceaea'}
                                          w={{ base: '100%', lg: '95%' }}
                                        >
                                          <Box
                                            w={{ base: '35%', lg: '50%' }}
                                            display={'flex'}
                                            alignItems={'center'}
                                          >
                                            <Text
                                              data-testId='content-name'
                                              w={'fit-content'}
                                              fontSize={{
                                                base: 'sm',
                                                lg: 'lg',
                                              }}
                                              fontWeight={'bold'}
                                              overflow={'hidden'}
                                            >
                                              {courseDetail?.contentName}
                                            </Text>
                                          </Box>
                                          <Box
                                            w={{ base: '15%', lg: '4%' }}
                                            textAlign={'center'}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                            flex={1}
                                            minWidth={{
                                              base: '3em',
                                              lg: '5em',
                                            }}
                                          >
                                            <Badge
                                              display={'flex'}
                                              justifyContent={'center'}
                                              alignItems={'center'}
                                              fontSize={'1em'}
                                              fontWeight={'none'}
                                              borderRadius={'0.5em'}
                                              w={'fit-content'}
                                              px={2}
                                              h={'2em'}
                                              variant={'solid'}
                                              backgroundColor={'#2D3748'}
                                            >
                                              <Text
                                                fontSize={{
                                                  base: 'sm',
                                                  lg: 'base',
                                                }}
                                                w={'fit-content'}
                                              >
                                                {
                                                  courseDetail
                                                    ?.learningObjective?.name
                                                }
                                              </Text>
                                            </Badge>
                                          </Box>
                                          <Box
                                            minWidth={{
                                              base: '3em',
                                              lg: '3em',
                                            }}
                                            w={{
                                              base: '15%',
                                              lg: '10% ',
                                            }}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                            flex={1}
                                          >
                                            <Text
                                              data-testId='content-duration'
                                              fontSize={{
                                                base: 'sm',
                                                lg: 'md',
                                              }}
                                              w={'fit-content'}
                                            >
                                              {courseDetail?.duration}{' '}
                                              {t('mins')}
                                            </Text>
                                          </Box>
                                          <Box
                                            w={{ base: '15%', lg: '10%' }}
                                            px={{
                                              base: '0px',
                                              lg: '1rem',
                                            }}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                            flex={1}
                                          >
                                            {statusRender(
                                              courseDetail?.isOnline
                                            )}
                                          </Box>
                                          <Box
                                            minW={{
                                              base: '1em',
                                              lg: '3em',
                                            }}
                                            w={{ base: '10%', lg: '7%' }}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                            flex={1}
                                            data-testid={`bi-user-voice-icon-${courseDetail?.id}`}
                                          >
                                            {deliveryTypeRender(
                                              courseDetail?.deliveryType
                                            )}
                                          </Box>
                                          <Box
                                            minW={{
                                              base: '1em',
                                              lg: '3em',
                                            }}
                                            w={{ base: '10%', lg: '7%' }}
                                            display={'flex'}
                                            justifyContent={'center'}
                                            alignItems={'center'}
                                            flex={1}
                                          >
                                            {isAccessible.modify ? (
                                              <MaterialModal
                                                day={groupElement[0].dayNumber}
                                                unit={dayCourse?.unitCode}
                                                unitName={dayCourse?.unitName}
                                                contentList={courseDetail}
                                              />
                                            ) : (
                                              <></>
                                            )}
                                          </Box>
                                        </Flex>
                                      )
                                    )}
                                  </Box>
                                </Flex>
                              </AccordionPanel>
                            </AccordionItem>
                          </Accordion>
                        ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
          </>
        ) : (
          <Flex
            flexDir={'column'}
            w={'full'}
            alignItems={'center'}
            textAlign={'center'}
            p={4}
          >
            <svg
              width={140}
              height={152}
              viewBox='0 0 184 152'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g fill='none' fillRule='evenodd'>
                <g transform='translate(24 31.67)'>
                  <ellipse
                    fillOpacity='.8'
                    fill='#F5F5F7'
                    cx='67.797'
                    cy='106.89'
                    rx='67.797'
                    ry='12.668'
                  />
                  <path
                    d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
                    fill='#AEB8C2'
                  />
                  <path
                    d='M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z'
                    fill='url(#linearGradient-1)'
                    transform='translate(13.56)'
                  />
                  <path
                    d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
                    fill='#F5F5F7'
                  />
                  <path
                    d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
                    fill='#DCE0E6'
                  />
                </g>
                <path
                  d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
                  fill='#DCE0E6'
                />
                <g transform='translate(149.65 15.383)' fill='#FFF'>
                  <ellipse cx='20.654' cy='3.167' rx='2.849' ry='2.815' />
                  <path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z' />
                </g>
              </g>
            </svg>

            <Text color={'gray'} w='full' fontSize='xl'>
              {t('Empty content')}
            </Text>
            <Text color={'gray'} w={'full'} mt={2}>
              {t('There are no item to display')}
            </Text>
          </Flex>
        )}
      </Box>
      <Box mx={'auto'}>
        <ChartSyllabusDetail assignment={() => syllabusDetail} />
      </Box>
    </Flex>
  );
};
