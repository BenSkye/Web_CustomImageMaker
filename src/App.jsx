import React, { useEffect } from 'react';
import AppRouting from '@/config/router/AppRouting';
import { mode } from '@chakra-ui/theme-tools';
import { ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
import useAuth from '@/hooks/useAuth';
import usePermission from '@/hooks/usePermission';
import '@/config/theme/css/default.css';
import { useTranslation } from 'react-i18next';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#F5F5F5')(props),
      },
    }),
  },
  components: {
    Alert: {
      baseStyle: {
        borderRadius: '12px',
      },
    },
  },
});

function App() {
  useAuth();

  usePermission();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const language = localStorage.getItem('language');
    i18n.changeLanguage(language);
  }, [i18n]);
  return (
    <ChakraProvider theme={theme}>
      <Flex
        justifyContent='center'
        alignItems='center'
        width='100%'
        height='100vh'
        overflow='hidden'
        textAlign='center'
        fontSize='xl'
      >
        <AppRouting />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
