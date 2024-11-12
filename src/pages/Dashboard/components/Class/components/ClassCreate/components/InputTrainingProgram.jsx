import { useTranslation } from 'react-i18next';
import { Center, Flex, Input } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

export default function InputTrainingProgram({ handleTrainingProgramSearch }) {
  const { t } = useTranslation();

  return (
    <Flex pos='relative' align='stretch'>
      <Input
        aria-autocomplete='list'
        autoComplete='off'
        autoCorrect='off'
        spellCheck='false'
        onChange={handleTrainingProgramSearch}
        maxLength={64}
        sx={{
          w: '100%',
          h: '68px',
          pl: '68px',
          fontWeight: 'medium',
          outline: 0,
          bg: 'white',
          '.chakra-ui-dark &': { bg: 'gray.700' },
        }}
        placeholder={t('Search Training Program')}
      />
      <Center pos='absolute' left={7} h='68px' zIndex={1000}>
        <FaSearch color='teal.500' boxSize='20px' />
      </Center>
    </Flex>
  );
}
