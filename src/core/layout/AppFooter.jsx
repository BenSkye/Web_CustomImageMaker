import { useTranslation } from 'react-i18next';
import { Flex, Text } from '@chakra-ui/react';

export const AppFooter = () => {
  const {t} = useTranslation();

  return (
    <>
      <Flex height='80px' justifyContent='center' alignItems='center' backgroundColor='#2D3748'>
        <Text color='white' fontSize='small'>{t('copyright')}</Text>
      </Flex>
    </>
  );
}