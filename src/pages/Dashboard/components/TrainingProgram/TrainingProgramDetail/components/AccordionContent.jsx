import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { BiUserVoice, BiTask } from 'react-icons/bi';
import { RiFileMarkLine } from 'react-icons/ri';
import { FaRegHandPaper } from 'react-icons/fa';
import { BsBroadcastPin } from 'react-icons/bs';
import { PiExam } from 'react-icons/pi';
import { IoIosArrowDropdown, IoIosArrowRoundForward } from 'react-icons/io';
import { MaterialModal } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramDetail/components/MaterialModal.jsx';
import { trainingProgramController } from '@/core/services/TrainingProgram/trainingProgramAPI';
import useAuthorization from '@/hooks/useAuthorization';

export const AccordionContent = () => {
  const programDetail = useSelector(
    (state) => state.trainingProgramDetail.programDetailData
  );
  const [syllabusDataDay, setSyllabusDataDay] = useState([]);
  const { t } = useTranslation();
  const { trainingProgramPermission } = useSelector(
    (state) => state.permissionList.data
  );
  const { isAccessible } = useAuthorization(trainingProgramPermission);

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
            data-testId='status-badge'
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
            fontSize={{ base: '0.5rem', lg: 'xs' }}
            data-testId='status-badge'
          >
            Offline
          </Badge>
        );
      default:
        return <Badge>Error</Badge>;
    }
  };
  const statusSyllabusRender = (status) => {
    switch (status) {
      case 1:
        return (
          <Badge
            py={1}
            px={2}
            w={'fit-content'}
            borderRadius={'20px'}
            variant='solid'
            backgroundColor='#2D3748'
            data-testId='badge-test'
          >
            {t('active')}
          </Badge>
        );
      case 2:
        return (
          <Badge
            py={1}
            px={2}
            w={'fit-content'}
            borderRadius={'20px'}
            variant='solid'
            backgroundColor='#2D3748'
            data-testId='badge-test'
          >
            {t('inactive')}
          </Badge>
        );
      case 3:
        return (
          <Badge
            py={1}
            px={2}
            w={'fit-content'}
            borderRadius={'20px'}
            variant='solid'
            backgroundColor='#2D3748'
            data-testId='badge-test'
          >
            {t('Draft')}
          </Badge>
        );
      default:
        return <Badge>Error</Badge>;
    }
  };

  const convertDateFormat = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };
  const truncateDecimal = (number, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.trunc(number * factor) / factor;
  };

  const groupByDayNumber = (trainingUnit) => {
    const grouped = {};
    Object.values(trainingUnit).forEach((unit) => {
      const dayNumber = unit.dayNumber;
      if (!grouped[dayNumber]) {
        grouped[dayNumber] = [];
      }
      grouped[dayNumber].push(unit);
    });
    return grouped;
  };

  useEffect(() => {
    const fetchDataSyllabus = async (syllabusId) => {
      const response = await trainingProgramController.getSyllabusList(
        syllabusId
      );
      const syllabus = programDetail?.listSyllabus.find(
        (item) => item.topicCode === syllabusId
      );
      return { topicCode: syllabusId, ...syllabus, trainingUnit: response };
    };

    Promise.all(
      programDetail?.listSyllabus?.map((item) =>
        fetchDataSyllabus(item?.topicCode)
      )
    )
      .then((results) => {
        const combinedData = results.reduce((acc, cur) => {
          const existingItemIndex = acc.findIndex(
            (item) => item.topicCode === cur.topicCode
          );
          if (existingItemIndex !== -1) {
            acc[existingItemIndex].data = [
              ...acc[existingItemIndex].data,
              ...cur.data,
            ];
          } else {
            acc.push(cur);
          }
          return acc;
        }, []);
        const groupedData = combinedData.map((item) => ({
          ...item,
          trainingUnit: groupByDayNumber(item.trainingUnit),
        }));
        setSyllabusDataDay(groupedData);
      })
      .catch((error) => {});
  }, [programDetail?.id, programDetail?.listSyllabus]);
  return (
    <>
      {programDetail?.listSyllabus?.length > 0 ? (
        <>
          {syllabusDataDay?.map((e) => (
            <Accordion
              key={e?.topicCode}
              overflowY={'hidden'}
              mt={5}
              background={e?.status === 2 ? 'gray.300' : '#FAFAFA'}
              _hover={{}}
              borderRadius={'20px'}
              w={'98%'}
              allowMultiple
            >
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as='span' flex='1' textAlign='left'>
                      <Heading
                        data-testId='heading-1'
                        my={4}
                        fontSize='20px'
                        fontWeight='semibold'
                      >
                        {e?.topicName}
                        <Badge
                          ml={6}
                          py={1}
                          px={4}
                          borderRadius={'20px'}
                          variant='solid'
                          backgroundColor='#2D3748'
                        >
                          {statusSyllabusRender(e?.status)}
                        </Badge>
                      </Heading>
                      <Box my={4} display={{ base: 'block', lg: 'flex' }}>
                        <Text
                          data-testId='version'
                          w={{ base: '100%', lg: 'fit-content' }}
                          borderRight={{ base: 'none', lg: '1px solid black' }}
                          pr={{ base: 0, lg: 2 }}
                        >
                          {e?.version}
                        </Text>
                        <Text
                          data-testId='duration-1'
                          w={{ base: '100%', lg: 'fit-content' }}
                          px={{ base: 0, lg: 2 }}
                          borderRight={{ base: 'none', lg: '1px solid black' }}
                        >
                          {truncateDecimal(e?.duration / 60 / 24, 2)} {t('day')}{' '}
                          (
                          <span style={{ fontStyle: 'italic' }}>
                            {truncateDecimal(e?.duration / 60, 2)} {t('hour')}
                          </span>
                          )
                        </Text>
                        <Text
                          w={{ base: '100%', lg: 'fit-content' }}
                          pl={{ base: 0, lg: 2 }}
                        >
                          {t('modified_on')}{' '}
                          <span style={{ fontStyle: 'italic' }}>
                            {convertDateFormat(e?.createdDate)}
                          </span>{' '}
                          {t('by')} {e?.createdBy?.name}
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      w={'20%'}
                      display={'flex'}
                      justifyContent={'end'}
                      mt={3}
                      mr={3}
                    >
                      <Box
                        bg='#2D3748'
                        w={{ base: '40%', lg: '20%' }}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        borderRadius={'10px'}
                      >
                        <IoIosArrowRoundForward size={'80%'} color='white' />
                      </Box>
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} w={'100%'} p={0}>
                  {Object.entries(e?.trainingUnit).map(([dayNumber, unit]) => (
                    <Accordion key={dayNumber} allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton
                            data-testId='day-test'
                            fontSize={'lg'}
                            fontWeight={'bold'}
                            backgroundColor={'#2D3748'}
                            _hover={{ bg: 'black' }}
                            color={'white'}
                          >
                            {t('day')} {dayNumber}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel w={'100%'} p={0}>
                          <Accordion background={'white'} allowMultiple>
                            {unit.map((groupElement) => (
                              <AccordionItem key={groupElement?.unitCode}>
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
                                          {t('Unit')} {groupElement?.unitCode}
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
                                          {groupElement?.unitName}
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
                                            groupElement?.duration / 60,
                                            2
                                          )}{' '}
                                          {t('hour')}
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
                                      {groupElement?.contentList?.map(
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
                                              >
                                                {courseDetail?.contentName}
                                              </Text>
                                            </Box>
                                            <Box
                                              w={{ base: '15%', lg: '6%' }}
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
                                                  data-testId='content-learning'
                                                  fontSize={{
                                                    base: 'sm',
                                                    lg: 'base',
                                                  }}
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
                                                  day={groupElement.dayNumber}
                                                  unit={groupElement?.unitCode}
                                                  unitName={
                                                    groupElement?.unitName
                                                  }
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
                            ))}
                          </Accordion>
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
            width='140'
            height='152'
            viewBox='0 0 184 152'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g fill='none' fillRule='evenodd'>
              <g transform='translate(24 31.67)'>
                <ellipse
                  fillOpacity='0.8'
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
            {t('Empty content')}
          </Text>
          <Text color={'gray'} w={'full'} mt={2}>
            {t('There are no item to display')}
          </Text>
        </Flex>
      )}
    </>
  );
};
