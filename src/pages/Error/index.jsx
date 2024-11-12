import { Link } from 'react-router-dom';
import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Error = () => {
  const {t} = useTranslation();

  return (
    <Flex flexDirection='column' rowGap={3}>
      <Text fontSize='x-large' fontWeight='semibold'>😟 {t('Page Not Found')}</Text>
      <Link to='/dashboard'>
        <Text fontSize='small'>{t('Click here to go to dashboard!')}</Text>
      </Link>
    </Flex>
  );
}