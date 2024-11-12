import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  Divider,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react';
import { VscVmActive } from 'react-icons/vsc';
import { MdOutlineNavigateNext } from 'react-icons/md';
import { IoTrashBinOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { MdOutlineEdit } from 'react-icons/md';
import { trainingProgramCreateController } from '@/core/services/TrainingProgram/trainingProgramCreateAPI';
import { setUpdateProgram } from '@/core/store/training-program-management/trainingProgramCreate';

const Header = () => {
  const { t } = useTranslation();
  const isCreating = useSelector((state) => state.trainingProgramCreate.isCreated);
  const trainingProgramName = useSelector((state) => state.trainingProgramCreate.trainingProgramName);
  const trainingProgramData = useSelector((state) => state.trainingProgramCreate.trainingProgramData);
  const toast = useToast();
  const dispatch = useDispatch();
  const [showAdditionalInfoActive, setShowAdditionalInfoActive] = useState(false);

  const handleMouseEnterActive = () => {
    setShowAdditionalInfoActive(true);
  };

  const handleMouseLeaveActive = () => {
    setShowAdditionalInfoActive(false);
  };


  const handleUpdateTrainingProgramStatus = () => {
    if (trainingProgramData.status === 1) {
      try {
      const response = trainingProgramCreateController.deactivateTrainingProgram(trainingProgramData.id, trainingProgramData.startTime, trainingProgramData.topicCode, trainingProgramData.generalInformation);
        dispatch(setUpdateProgram(true));
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Training program deactivated successfully')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'success'
              })}
            </WrapItem>
          </Wrap>
        )

    } catch (err) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: `${err.message}`,
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error'
            })}
          </WrapItem>
        </Wrap>
      )
    }
    } else {
      try {
        const response = trainingProgramCreateController.activateTrainingProgram(trainingProgramData.id, trainingProgramData.startTime, trainingProgramData.topicCode, trainingProgramData.generalInformation);
          dispatch(setUpdateProgram(true));
          return (
            <Wrap>
              <WrapItem>
                {toast({
                  title: (t('Training program activated successfully')),
                  position: 'top-right',
                  isClosable: true,
                  duration: 5000,
                  status: 'success'
                })}
              </WrapItem>
            </Wrap>
          )
      } catch (err) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: `${err.message}`,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
              })}
            </WrapItem>
          </Wrap>
        )
      }
    }
  }

  const handleDuplicateProgram = async () => {
    try {
      const response = await trainingProgramCreateController.duplicateProgram(trainingProgramData.id);
      if (response.success && !response.error) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Program duplicated successfully')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'success'
              })}
            </WrapItem>
          </Wrap>
        )
      }
      if (!response.success && response.error) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: `${response.error}`,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
              })}
            </WrapItem>
          </Wrap>
        )
      }
    } catch (error) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: (t('Failed to duplicate program')),
              description: error.message,
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error'
            })}
          </WrapItem>
        </Wrap>
      );
    }
  };

  return (
    <>
      <Box mt={{ base: 0, md: 0, lg: 1, sm: 0 }} bg='#2D3748' w={'100%'} textAlign={'left'} p={6} pb={2} color='black'>
        <Flex justify="space-between">
          <Text fontSize={{ base: '2xl', sm: '2xl', md: '2xl', lg: '4xl' }} as='kbd' color={'white'}>
            {isCreating ? <>
              <Flex>
                <Text fontSize={'0.5em'}>{t('Training Program')}</Text>
              </Flex>
              <Flex>
                <Text>{t(trainingProgramName)}</Text>
                <Box
                  fontSize={'0.5em'}
                  colorScheme={trainingProgramData.status === 1 ? "green" : trainingProgramData.status === 2 ? "red" : "yellow"}
                  size="sm"
                  borderRadius="10"
                  mt={1}
                  height={'30px'}
                  marginLeft={'10px'}
                  marginBottom={'5px'}
                  borderColor={'white'}
                  borderWidth={'2px'}
                >
                  {trainingProgramData.status === 1 ? (t('Active')) : trainingProgramData.status === 2 ? (t('Inactive')) : (t('Draft'))}
                </Box>
              </Flex>
            </>
              :
              t('New Training Program')
            }
          </Text>
          {isCreating ?
            <Menu>
              <MenuButton fontSize={{ base: '3xl', lg: '5xl', sm: '3xl', md: '3xl' }} as={Button} colorScheme='#2D3748'>
                <Text mb={'50%'}>...</Text>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleDuplicateProgram} icon={<HiOutlineDuplicate size={'20px'} />}>{t('Duplicate program')}</MenuItem>
                {trainingProgramData.duration === 0 ?
                  <>
                    <MenuItem borderRadius='8px'
                      flexDirection={'column'}
                      color={'#808080'}
                      onMouseEnter={handleMouseEnterActive}
                      onMouseLeave={handleMouseLeaveActive}
                    >
                      <Flex alignItems='center' width='100%' justifyContent='space-between'>
                        <Flex flex={1} columnGap={3}>
                          <VscVmActive size={'20px'} />
                          <Text fontWeight='semibold'>{t('Activate Program')}</Text>
                        </Flex>
                        <MdOutlineNavigateNext color='transparent' />
                      </Flex>
                      {showAdditionalInfoActive && (
                        <Flex alignItems='center' justifyContent='center' width={'100%'}>
                          <Text fontSize={'10px'}>{t('Duration must be longer than 0 to activate.')}</Text>
                        </Flex>
                      )}
                    </MenuItem>
                  </>
                  :
                  <>
                    {
                      trainingProgramData.status === 1 ?
                        <MenuItem borderRadius='8px'
                          onClick={handleUpdateTrainingProgramStatus}
                        >
                          <Flex alignItems='center' width='100%' justifyContent='space-between'>
                            <Flex flex={1} columnGap={3}>
                              <VscVmActive size={'20px'} />
                              <Text fontWeight='semibold'>{t('De-activate Program')}</Text>
                            </Flex>
                            <MdOutlineNavigateNext color='transparent' />
                          </Flex>
                        </MenuItem>
                        :
                        <MenuItem borderRadius='8px'
                          onClick={handleUpdateTrainingProgramStatus}
                        >
                          <Flex alignItems='center' width='100%' justifyContent='space-between'>
                            <Flex flex={1} columnGap={3}>
                              <VscVmActive size={'20px'} />
                              <Text fontWeight='semibold'>{t('Activate Program')}</Text>
                            </Flex>
                            <MdOutlineNavigateNext color='transparent' />
                          </Flex>
                        </MenuItem>
                    }
                  </>
                }
              </MenuList>
            </Menu>
            :
            <></>
          }

        </Flex>
      </Box>


      {isCreating ? <>
        <Box width={'100%'}>
          <Flex>
            <Text fontSize={'0.6em'}>{t('Duration:')} {(trainingProgramData?.duration / 60).toFixed(2)} {t('hours')}</Text>
          </Flex>
          {trainingProgramData?.modifyBy === 'NONE' ? <></> :
            <Flex>
              <Text fontSize={'0.6em'}>{t('Modified on')} {trainingProgramData?.modifyDate} {t('by')} {trainingProgramData?.modifyBy}</Text>
            </Flex>}
          <Divider />
        </Box>
      </> :
        <></>
      }

    </>
  );
};

export default Header;