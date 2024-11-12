import { useTranslation } from 'react-i18next';
import { Button, HStack, Text } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export default function SearchButton({ onOpen }) {
  const { t } = useTranslation();
  return (
    <>
      <Button
        onClick={onOpen}
        flex='1'
        type='button'
        mx='6'
        lineHeight='1.2'
        w='100%'
        bg='white'
        whiteSpace='nowrap'
        display={{ base: 'none', sm: 'flex' }}
        borderRadius={'16px'}
        alignItems='center'
        color='gray.600'
        _dark={{ bg: 'gray.700', color: 'gray.400' }}
        py='3'
        px='4'
        outline='0'
        _focus={{ shadow: 'outline' }}
        shadow='base'
        rounded='md'
      >
        <FaSearch />
        <HStack w='full' ml='3' spacing='4px'>
          <Text textAlign='left' flex='1'>
            {t('Search')} ...
          </Text>
        </HStack>
      </Button>
    </>
  );
}
