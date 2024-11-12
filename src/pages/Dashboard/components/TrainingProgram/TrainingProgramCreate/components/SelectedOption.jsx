import { React } from 'react';
import { Box, Flex, Button, Badge, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import { MdDelete } from "react-icons/md";
import { setRemoveSyllabus, setUpdateSyllabusId } from '@/core/store/training-program-management/trainingProgramCreate';
import { useTranslation } from 'react-i18next';

export const SelectedOptions = () => {
  const dispatch = useDispatch();
  const trainingSyllabusList = useSelector((state) => state.trainingProgramCreate.trainingSyllabusList);
  const { t } = useTranslation();

  const handRemoveSyllabusClick = (id) => {
    dispatch(setRemoveSyllabus(true));
    dispatch(setUpdateSyllabusId(id));
  }

  return (
    <>
      <Flex flexDirection={'column'} mb={2} width={'100%'}>
        <Flex >
          <Text fontWeight={600} as='b' >
            {t('Content')}
          </Text>
        </Flex>
        {trainingSyllabusList?.length === 0 ?
          <Flex
            width={'-webkit-fill-available'}
            height={'-webkit-fill-available'}
            alignContent={'center'}
            justifyContent={'center'}
            fontWeight={'250'}
            color={'#2D3748'}
            ml={'auto'}
            mt={2}
          >
            <Text alignSelf={'center'}>{t('Empty')}</Text>
          </Flex>
          :
          <></>}
        {trainingSyllabusList?.map((suggestion, index) => (
          <Box
            key={index}
            bgColor={'#FFFFFF'}
            _hover={{ backgroundColor: '#ECECEC' }}
            color={'#000000'}
            borderRadius={'8px'}
            padding={'15px'}
            shadow={'md'}
            mb={4}
            width={'100%'}
          >
            <Flex justify="space-between" alignItems="center" mb={2}>
              <Box>
                <Text as='b' fontSize='xl'>{suggestion.topicName}</Text>
                <Badge
                  colorScheme={suggestion.status === 1 ? "green" : suggestion.status === 2 ? "red" : "yellow"}
                  size="sm"
                  borderRadius="full"
                  mt={1}
                  marginLeft={'10px'}
                  marginBottom={'5px'}
                >
                  {suggestion.status === 1 ? 'Active' : suggestion.status === 2 ? 'Inactive' : 'Draft'}
                </Badge>
              </Box>
              <Button
                variant="ghost"
                colorScheme="red"
                size="sm"
                borderRadius="full"
                onClick={() => handRemoveSyllabusClick(suggestion.topicCode)}
              >
                <MdDelete />
              </Button>
            </Flex>
            <Text fontStyle={'italic'} fontSize={'sm'} mb={2}>
              {t('Version')} {suggestion.version} | {t('Duration')}: {suggestion.duration} | {t('Created on')} {suggestion.createdDate} {t('by')} {suggestion.createdBy.name}
            </Text>
          </Box>
        ))}
      </Flex>
    </>
  )
}