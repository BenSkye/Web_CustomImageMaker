import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoMdSearch } from 'react-icons/io';
import { fakeData } from '@/pages/Dashboard/components/Calendar/fakeData.js';
import { WeekShow } from '@/pages/Dashboard/components/Calendar/components/WeekShow';
import { DateShow } from '@/pages/Dashboard/components/Calendar/components/DateShow';
import FilterContent from '@/pages/Dashboard/components/Calendar/components/FilterContent';

const schedule = fakeData.schedule;

export const Calendar = () => {
  const { t } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState('');

  return (
    <>
      <Box
        m={{ base: 0, md: 0, lg: 2, sm: 0 }}
        bg='#2D3748'
        w={'100%'}
        textAlign={'left'}
        p={6}
        pb={2}
        color='white'
      >
        <Box w={{ base: '100%', sm: '100%', md: '100%', lg: '40%' }}>
          <Text fontSize={{ base: '2xl', sm: '2xl', md: '2xl', lg: '4xl' }} as='kbd'>
            {t('training_calendar')}
          </Text>
        </Box>
      </Box>
      <Flex m={{ base: 0, md: 0, lg: 2, sm: 0 }} flexDirection='column' rowGap={3} width='100%'>
        <Flex flex={1} flexDirection='row' justifyContent='flex-start' columnGap={3}>
          <InputGroup ml={4} borderRadius='12px' width='300px' height='36px'>
            <InputLeftElement pointerEvents='none'>
              <IoMdSearch color='#2D3748' />
            </InputLeftElement>
            <Input
              borderRadius='12px'
              type='text'
              placeholder={t('search')}
              onChange={(e) => {
                setGlobalFilter(e.target.value);
              }}
            />
          </InputGroup>
          <FilterContent />
        </Flex>
      </Flex>
      <Tabs variant='soft-rounded' colorScheme='facebook' width={'100%'}>
        <TabList marginX={4}>
          <Tab>{t('day')}</Tab>
          <Tab>{t('week')}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <DateShow schedule={schedule} />
          </TabPanel>
          <TabPanel>
            <WeekShow schedule={schedule} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};
