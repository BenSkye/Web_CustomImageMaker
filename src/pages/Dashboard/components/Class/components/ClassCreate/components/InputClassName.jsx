import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Input, Text, useToast } from '@chakra-ui/react';

export default function InputClassName({ setClassName }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [error, setError] = useState('');
  const toast = useToast();

  const toastCus = (status, title, description, id) =>
    toast({
      id: id ? id : 'NOID',
      title: title,
      description: description,
      status: status,
      position: 'top-right',
      duration: 3000,
      isClosable: true,
    });

  const createClass = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) {
      setError(t('Please enter class name!'));
      toastCus('error', t('Error'), t('Class name is required.'), '');
      return;
    }
    setClassName(inputRef.current.value);
    if (localStorage.getItem('tooltip') !== 'false')
      localStorage.setItem('tooltip', 'true');

    sessionStorage.setItem('className', inputRef.current.value);
  };

  return (
    <>
      <Flex flexDirection='column' rowGap={3} width='100%' p={3}>
        <Text textAlign='left' fontWeight='semibold'>
          {t('Class Name')}
        </Text>
        <form onSubmit={(e) => createClass(e)}>
          <Flex>
            <Input
              isInvalid={error}
              type='text'
              placeholder={t('Type class name')}
              ref={inputRef}
              name='className'
              style={{
                width: '50%',
                padding: '10px',
                borderRadius: '12px',
                border: '1px solid #d2d6dc',
              }}
            />
            <Button
              ml={4}
              variant={'solid'}
              backgroundColor={'#2d3748'}
              borderRadius='12px'
              color={'white'}
              type='submit'
              _hover={{ opacity: '0.8' }}
            >
              {t('Create')}
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
}
