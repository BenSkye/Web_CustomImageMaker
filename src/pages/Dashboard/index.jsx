import { Outlet } from 'react-router-dom';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, VStack } from '@chakra-ui/react';
import { AppLayout } from '@/core/layout/AppLayout';
import { AppSidebar } from '@/core/layout/AppSidebar';

export const Dashboard = () => {
  return (
    <AppLayout components={
      <Flex flex={1} flexDirection={{base: 'column', md: 'row'}} columnGap={{ base: 0, lg: 3 }} >
        <Accordion
          allowToggle
          display={{ base: 'block', md: 'none' }}
        >
          <AccordionItem>
            <h2>
              <AccordionButton display='flex' flexDirection='column'>
                <Box as="span" flex='1' textAlign='left'>
                  Menu
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <AppSidebar width={'100%'}/>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <VStack
          style={{
            height: 'calc(100vh - 160px)',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
          display={{ base: 'none', md: 'block' }}
          className='scrollbar-hide'
          backgroundColor='#EDF2F7'
        >
          <AppSidebar />
        </VStack>

        <VStack
          flex={1}
          style={{
            height: 'calc(100vh - 160px)',
            overflowY: 'scroll',
            overflowX: 'hidden'
          }}
          className='scrollbar-hide'
        >
          <Outlet />
        </VStack>
      </Flex>
    } />
  );
}