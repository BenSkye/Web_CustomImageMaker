import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button
} from '@chakra-ui/react';
import { IoMdSearch } from 'react-icons/io';
import { setTrainingProgramName, setTrainingProgramCreate } from '@/core/store/training-program-management/trainingProgramCreate';

const ProgramNameInput = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isCreating = useSelector((state) => state.trainingProgramCreate.isCreated);

  return (
    <Flex alignSelf={'start'} justifyContent={'start'} mt={4}>
      {isCreating ? <></> :
        <>
          <Text fontWeight={600} marginRight={'2rem'}>
            {t('Program name')}
          </Text>
          <InputGroup marginRight='1rem' borderRadius='1rem' width='300px' height='36px'>
            <Input borderRadius='12px' type='text' placeholder={t('Program name')} onChange={(e) => dispatch(setTrainingProgramName(e.target.value))} />
          </InputGroup>
          <Button onClick={ () => dispatch(setTrainingProgramCreate(true))} padding={'0 1.5rem'} bg='#2D3748' color={'white'}>
            {t('Create')}
          </Button>
        </>}

    </Flex>
  );
};

export default ProgramNameInput;