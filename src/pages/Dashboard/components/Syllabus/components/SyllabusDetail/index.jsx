import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { syllabusDetailController } from '@/core/services/SyllabusServices/syllabusDetailController';
import {
  Badge,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MenuOfButton } from '@/pages/Dashboard/components/Syllabus/components/SyllabusDetail/components/MenuButton';
import { GeneralTab } from '@/pages/Dashboard/components/Syllabus/components/SyllabusDetail/components/GeneralTab';
import { OutlineTab } from '@/pages/Dashboard/components/Syllabus/components/SyllabusDetail/components/OutlineTab';
import { OtherTab } from '@/pages/Dashboard/components/Syllabus/components/SyllabusDetail/components/OtherTab';
import {
  resetState,
  setLearningObjective,
  setSyllabusDetail,
} from '@/core/store/syllabus-management/syllabus-detail/syllabusDetail';
import useAuthorization from '@/hooks/useAuthorization';

export const SyllabusDetail = () => {
  const { id } = useParams();
  const decodedId = parseInt(id, 10);
  const { t } = useTranslation();
  const syllabusDetail = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const isRender = useSelector((state) => state.syllabusDetail.isRender);
  const isEditModal = useSelector((state) => state.syllabusDetail.isEditModal);
  const dispatch = useDispatch();
  const statusRender = (status) => {
    switch (status) {
      case 1:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            variant='solid'
            mb={2}
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
          >
            {t('active')}
          </Badge>
        );
      case 2:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            mb={2}
            variant='solid'
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
          >
            {t('inactive')}
          </Badge>
        );
      case 3:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            variant='solid'
            mb={2}
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
          >
            {t('Draft')}
          </Badge>
        );
      default:
        return (
          <Badge
            ml={{ base: 0, md: 2, sm: 2, lg: 4 }}
            variant='outline'
            mb={2}
            color='black'
            px={3}
            py={1}
            borderRadius={'30px'}
            border={'solid 2px'}
          >
            Invalid Status
          </Badge>
        );
    }
  };

  const { syllabusPermission } = useSelector(
    (state) => state.permissionList.data
  );
  const { isAccessible } = useAuthorization(syllabusPermission);
  const truncateDecimal = (number, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.trunc(number * factor) / factor;
  };

  useEffect(() => {
    const fetchData = async (id) => {
      const response = await syllabusDetailController.getSyllabusDetail(id);
      const responseLearningObjective =
        await syllabusDetailController.getLearningObjectives();
      dispatch(setSyllabusDetail(response));
      dispatch(setLearningObjective(responseLearningObjective));
    };
    if (!isEditModal && id) {
      fetchData(decodedId);
    }
  }, [decodedId, dispatch, id, isEditModal, isRender]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);
  return (
    <Box w={'100%'} ml={3}>
      {isAccessible.denied ? (
        <>
          <Box
            mt={{ base: 0, md: 0, lg: 1, sm: 0 }}
            w={'100%'}
            textAlign={'left'}
            pb={2}
          >
            <Text
              data-testId='heading'
              textAlign='left'
              mt={3}
              fontWeight='semibold'
              color={'black'}
            >
              {t('syllabus')}
            </Text>
            <Text
              aria-label='Access Denied'
              textAlign='left'
              mt={3}
              fontWeight='semibold'
              color={'red.400'}
            >
              {t('access_denied')}
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Box
            mt={{ base: 0, md: 0, lg: 1, sm: 0 }}
            w={'100%'}
            textAlign={'left'}
            pb={2}
            borderBottom={'2px solid black'}
          >
            <Text
              data-testId='heading'
              textAlign='left'
              mt={3}
              fontWeight='semibold'
              color={'black'}
            >
              {t('syllabus')}
            </Text>
            <Flex mt={2}>
              <Box w={{ base: '100%', sm: '100%', md: '100%', lg: '80%' }}>
                <Text
                  data-testId='topic-code'
                  fontSize={{ base: '2xl', sm: '2xl', md: '2xl', lg: '4xl' }}
                  as='kbd'
                  color='black'
                >
                  {syllabusDetail?.topicName}
                </Text>
                {statusRender(syllabusDetail?.status)}
              </Box>
              <Box w={'20%'} textAlign={'right'}>
                {isAccessible.create || isAccessible.modify ? (
                  <MenuOfButton isAccessible={isAccessible} />
                ) : (
                  <></>
                )}
              </Box>
            </Flex>
            <Text
              data-testId='heading'
              textAlign='left'
              fontWeight='semibold'
              color={'black'}
            >
              {syllabusDetail?.codeName}
            </Text>
          </Box>
          <Box pl={3} py={3} w={'100%'} textAlign={'left'} fontSize={'lg'}>
            <Text>
              <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                {truncateDecimal(
                  syllabusDetail?.duration
                    ? syllabusDetail?.duration / 60 / 24
                    : 0,
                  2
                )}
              </span>{' '}
              {t('day')}{' '}
              <span style={{ fontStyle: 'italic' }}>
                (
                {truncateDecimal(
                  syllabusDetail?.duration ? syllabusDetail?.duration / 60 : 0,
                  2
                )}{' '}
                {t('hour')})
              </span>
            </Text>
            {syllabusDetail?.modifiedOn && (
              <Text>
                {t('modified_on')}{' '}
                <span style={{ fontStyle: 'italic' }}>
                  {syllabusDetail?.modifiedOn}
                </span>{' '}
                {t('by')}{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {syllabusDetail?.modifiedBy}
                </span>
              </Text>
            )}
            {!syllabusDetail?.modifiedOn && (
              <Text>
                {t('created_on')}{' '}
                <span style={{ fontStyle: 'italic' }}>
                  {syllabusDetail?.createdDate}
                </span>{' '}
                {t('by')}{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {syllabusDetail?.createdBy?.username}
                </span>
              </Text>
            )}
          </Box>
          <Box w={'100%'} textAlign={'left'}>
            <Tabs variant='enclosed'>
              <TabList>
                <Tab
                  _selected={{ color: 'white', bg: '#2D3748' }}
                  color={'gray.500'}
                  bg='gray.200'
                  px={'5%'}
                  borderTopLeftRadius={'1.5em'}
                  borderTopRightRadius={'1.5em'}
                >
                  {t('general')}
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: '#2D3748' }}
                  color={'gray.500'}
                  bg='gray.200'
                  px={'5%'}
                  ml={1}
                  borderTopLeftRadius={'1.5em'}
                  borderTopRightRadius={'1.5em'}
                >
                  {t('outline')}
                </Tab>
                <Tab
                  _selected={{ color: 'white', bg: '#2D3748' }}
                  color={'gray.500'}
                  bg='gray.200'
                  px={'5%'}
                  ml={1}
                  borderTopLeftRadius={'1.5em'}
                  borderTopRightRadius={'1.5em'}
                >
                  {t('others')}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel p={0}>
                  <GeneralTab />
                </TabPanel>
                <TabPanel p={0}>
                  <OutlineTab />
                </TabPanel>
                <TabPanel px={0}>
                  <OtherTab />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </>
      )}
    </Box>
  );
};
