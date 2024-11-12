import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { Button } from '@chakra-ui/button'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Flex, Select, Box, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { FaSearch } from "react-icons/fa";
import { classDetailController } from "@/core/services/ClassDetail/classDetailAPI.js";

export const UpdateSyllabus = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const toast = useToast();
  const [classDetail, setClassDetail] = useState({});
  const [userData, setUserData] = useState([]);
  const [syllabusList, setSyllabusList] = useState([]);
  const [updateSyllabus, setUpdateSyllabus] = useState(true);
  const [keyword, setKeyword] = useState('');

  const [updatedClassSyllabus, setUpdatedClassSyllabus] = useState({
    classId: 0,
    trainerId: 0,
    syllabusId: 0,
    trainingProgramId: 0,
    location: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await classDetailController.getAllUser();
        console.log('Fetched User Data:', userData);
        setUserData(userData.content);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (updateSyllabus) {
      console.log(keyword, 'keyword');
      classDetailController
        .searchSyllabus(keyword)
        .then((res) => {
          setSyllabusList(res.content);
          setUpdateSyllabus(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [updateSyllabus, setUpdateSyllabus, keyword]);

  useEffect(() => {
    const fetchData = async (classId) => {
      try {
        const response = await classDetailController.getClassDetail(classId);
        if (response) {
          setClassDetail(response);
          const trainingProgramID = response.trainingProgramDto.id;
          const trainingProgramDetailResponse = await classDetailController.trainingProgramDetail(trainingProgramID);
          if (trainingProgramDetailResponse) {
            setUpdatedClassSyllabus(prevState => ({
              ...prevState,
              classId: response.id,
              trainerId: response.trainer && response.trainer.length > 0 ? response.trainer[0].id : null,
              syllabusId: trainingProgramDetailResponse.listSyllabus && trainingProgramDetailResponse.listSyllabus.length > 0 ? trainingProgramDetailResponse.listSyllabus[0].topicCode : null,
              location: response.location,
              trainingProgramId: response.trainingProgramDto.id,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(id);
  }, [id]);

  const handleSearchSyllabus = (e) => {
    console.log(e.target.value);
    setUpdateSyllabus(true);
    setKeyword(e.target.value);
  };
  
  const handleSelectSyllabus = (syllabusId) => {
    setUpdatedClassSyllabus(prevState => ({
      ...prevState,
      syllabusId: syllabusId,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedClassSyllabus(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!updatedClassSyllabus.location) {
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
      const syllabusDetailResponse = await classDetailController.getSyllabusDetail(updatedClassSyllabus.syllabusId);
      if (syllabusDetailResponse) {
        if (syllabusDetailResponse.status !== 1) {
          throw new Error(t('Syllabus must be active!'));
        }
      }
      await classDetailController.UpdateClassSyllabus(updatedClassSyllabus);
      toast({
        title: t('Class Syllabus Updated!'),
        description: t('Class syllabus have been updated successfully.'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });    
      window.location.reload(); 
      onClose();
    } catch (error) {
      console.error(t('Error updating class syllabus:'), error);
      let errorMessage = t('An error occurred while updating class syllabus.');
      if (error.message === t('Syllabus must be active!')) {
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

  const ActiveBar = (status) => {
    switch (status) {
      case 1:
        return (
          <Box bg='#2D3748' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
            <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
              {t('Active')}
            </Text>
          </Box>
        )
      case 2:
        return (
          <Box bg='#95D1CE' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
            <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
              {t('Inactive')}
            </Text>
          </Box>
        )
      case 3:
        return (
          <Box bg='#65A8BD' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
            <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
              {t('Draft')}
            </Text>
          </Box>
        )
      default:
        return (
          <Box bg='#F4E1EF' h='25px' minW='70px' mr='6' borderRadius='30' position='relative'>
            <Text fontSize='15px' color='white' textAlign='center' lineHeight='25px' px='2'>
              {t('Disabled')}
            </Text>
          </Box>
        )
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('Update Class Syllabus')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <InputGroup>
              <InputLeftElement> {/* This element will be positioned on the right */}
                <FaSearch />
              </InputLeftElement>
              <Input
                type="text"
                placeholder={t('Search syllabus')}
                value={keyword}
                onChange={handleSearchSyllabus}
              />
            </InputGroup>
          </FormControl>
          {syllabusList.map((syllabus) => (
            <Box key={syllabus.topicCode}
              p='4'
              flex='1'
              borderRadius="md"
              cursor="pointer"
              bg={syllabus.topicCode === updatedClassSyllabus.syllabusId ? 'blue.100' : 'white'}
              onClick={() => handleSelectSyllabus(syllabus.topicCode)}>
              <Flex justifyContent="space-between" alignItems="flex-start">
                <Text textAlign="left">ID: {syllabus.topicCode}</Text>
                <Text textAlign='center'>{syllabus.topicName}</Text>
                <Box>
                  {ActiveBar(syllabus.status)}
                </Box>
              </Flex>
            </Box>
          ))}
          <FormControl>
            <FormLabel>{t('Location')}</FormLabel>
            <Input type="text" name="location" value={updatedClassSyllabus.location} onChange={handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>{t('Trainer')}</FormLabel>
            <Select name="trainerId" value={updatedClassSyllabus.trainerId} onChange={handleChange}>
              {userData
                .filter(user => user.roleName === "TRAINER")
                .map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            {t('Cancel')}
          </Button>
          <Button bg="#2D3748" color='white' onClick={handleSubmit}>
            {t('Save')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

