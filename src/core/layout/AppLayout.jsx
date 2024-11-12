
import { Flex, VStack } from '@chakra-ui/react';
import { AppHeader } from '@/core/layout/AppHeader';
import { AppFooter } from '@/core/layout/AppFooter';

export const AppLayout = ({ components = [] }) => {
  return (
    <VStack width='100%' height='100%' >
      <Flex
        flexDirection='column'
        width='100%'
        height='100vh'
        overflowX='hidden'
        overflowY={{base: 'scroll', md: 'hidden'}}
        position='fixed'
        top={0}
        left={0}
      >
        <AppHeader />
        {components}
        <AppFooter />
      </Flex>
    </VStack>
  );
}