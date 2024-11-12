import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Text } from '@chakra-ui/react';
import { IoIosAddCircleOutline } from 'react-icons/io';

const AddButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Button
      borderRadius='12px'
      _hover={{ backgroundColor: '#2D3748' }}
      backgroundColor='#2D3748'
      color='white'
      onClick={() => navigate('/dashboard/syllabus/create')}
    >
      <IoIosAddCircleOutline fontSize='1.2rem' />
      <Text aria-label='Add Button' ml='0.4rem'>
        {t('add') + ' ' + t('syllabus').toLowerCase()}
      </Text>
    </Button>
  );
};

export default AddButton;
