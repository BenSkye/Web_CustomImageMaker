import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Flex,
  Button,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  Text,
  Divider,
} from '@chakra-ui/react';
import { FiPlusCircle } from "react-icons/fi";
import { classDetailController } from "@/core/services/ClassDetail/classDetailAPI.js";
import { UpdateSyllabus } from './UpdateSyllabus';

export const ClassSyllabus = () => {
  const [classDetail, setClassDetail] = useState([]);
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const [trainingProgramDetail, setTrainingProgramDetail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenUpdateSyllabus = () => {
    setIsModalOpen(true);
  };

  const handleCloseUpdateSyllabus = async () => {
    setIsModalOpen(false);
  }

  useEffect(() => {
    const fetchData = async (classId) => {
      try {
        // Fetch class detail
        const response = await classDetailController.getClassDetail(classId);
        if (response) {
          setClassDetail(response)
          // Extract trainingProgramID from classDetailResponse
          const trainingProgramID = response.trainingProgramDto.id;
          // Fetch training program detail using trainingProgramID
          const trainingProgramDetailResponse = await classDetailController.trainingProgramDetail(trainingProgramID);
          if (trainingProgramDetailResponse) {
            // Set training program detail to state
            setTrainingProgramDetail(trainingProgramDetailResponse);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(id);
  }, [id]);

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

  return (
    <Card w='100%' mt='3px'>
      <CardHeader textAlign='left' color='#2D3748' >
        <Heading fontSize={{ base: '20px', md: '35px' }} fontWeight='normal' fontFamily='Arial' letterSpacing='8px'>
          {t('Training Program of')} {classDetail.className}
        </Heading>
      </CardHeader>
      {trainingProgramDetail && (
        <CardBody textAlign='left' color='#2D3748' pt='0px'>
          <Flex align='center' >
            <Box>
              <Flex align='center'>
                <Heading fontSize={{ base: '20px', md: '40px' }} letterSpacing='7px' data-testid='class-name'>
                  {trainingProgramDetail.topicCode}
                </Heading>
                {ActiveBar(trainingProgramDetail.status)}
              </Flex>
            </Box>
          </Flex>
          <Divider orientation='horizontal' borderColor='black' w='100%' mt='25px' />
          <Flex direction='row' align='center' color='#2D3748'>
            <Box data-testid='duration-heading' mt='17px'>
              <Text as="span" fontSize={{ base: '17px', sm: '25px' }} fontWeight='bold' >
                {classDetail.duration} </Text>
              <Text as="span" pt='2' fontSize='17px'>
                {t('minutes')}
              </Text>
            </Box>
          </Flex>
          <Box fontSize='16px' color='#2D3748' data-testid="training-program-modify">
            <Text as='span'>{t('modified_on')} </Text>
            <Text as='span' fontStyle='italic'>{trainingProgramDetail.modifyDate} </Text>
            <Text as='span'>{t('by')} </Text>
            <Text as='span' fontWeight='bold'>{trainingProgramDetail.modifyBy}</Text>
          </Box>

          <Divider orientation='horizontal' borderColor='black' w='100%' mt='25px' />
          <Text fontSize='18px' fontWeight='bold' color='#2D3748' mt='15px'>
            {t('content')}
          </Text>
          {trainingProgramDetail.listSyllabus.map((syllabus, index) => (
            <Flex direction='row' key={index}>
              <Card h={{ base: '160px', sm: '113px' }}
                w='300px'
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
                  <Avatar size={{ base: 'sm', lg: 'lg' }} src='https://bit.ly/broken-link' />
                  <Avatar size={{ base: 'sm', lg: 'lg' }} src='https://bit.ly/broken-link' />
                  <Avatar size={{ base: 'sm', lg: 'lg' }} src='https://bit.ly/broken-link' />
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
                boxShadow='xl'
              >
                <CardHeader textAlign='left' textColor='black' marginTop='-7px' marginLeft='20px'>
                  <Flex align='center'>
                    <Heading size='md' fontSize={{ base: '20px', md: '30px', xl: '40px' }} fontWeight='bold' fontFamily='Arial' letterSpacing='5px' data-testid="syllabus-code">
                      {console.log("syllabus:", syllabus.topicCode)}
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
          <Button
            leftIcon={<FiPlusCircle />}
            mt='60px'
            color='white'
            bgColor='#2D3748'
            _hover={{ opacity: '0.8' }}
            onClick={handleOpenUpdateSyllabus}
          >
            {t('Add new')}
          </Button>
          <UpdateSyllabus
            isOpen={isModalOpen}
            onClose={handleCloseUpdateSyllabus}
          />
        </CardBody>
      )}
    </Card>
  )
}