import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IoFilter } from 'react-icons/io5';
import Select from 'react-select';
import MiniCalendar from '@/pages/Dashboard/components/Calendar/components/MiniCalendar';
import { colourOptions } from '@/mocks/fakeDataClassList';
import { useTranslation } from 'react-i18next';

export const MPFilter = () => {
  const { t } = useTranslation();
  const [classTimeFromPicker, setClassTimeFromPicker] = useState('');
  const [classTimeToPicker, setClassTimeToPicker] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        borderRadius='12px'
        leftIcon={<IoFilter />}
        backgroundColor='#2D3748'
        color='#FFF'
        _hover={{ backgroundColor: '#2D3748', color: '#FFF' }}
        variant='solid'
        onClick={onOpen}
      >
        {t('filter')}
      </Button>
      
      <Modal isCentered onClose={onClose} size={'3xl'} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent borderTopRadius={'10px'}>
          <ModalHeader
            textAlign={'center'}
            color={'white'}
            borderTopRadius={'10px'}
            size='2xl'
            bg={'#2D3748'}
          >
            {t('custom') + ' ' + t('filter').toLowerCase()}
          </ModalHeader>
          <ModalBody>
            <Grid templateColumns={{ base: '1fr' }} gap={10}>
              <GridItem colSpan={1}>
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={10}>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex
                      spacing={4}
                      flexDirection={'column'}
                      gap={3}
                      flex={1}
                      alignItems={'flex-start'}
                    >
                      <Text fontWeight={700}>Class location</Text>
                      <div style={{ width: '100%' }}>
                        <Select
                          isMulti
                          name='colors'
                          options={colourOptions}
                          classNamePrefix='select'
                        />
                      </div>
                    </Flex>
                  </GridItem>

                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex flexDirection={'column'} gap={3} alignItems={'flex-start'}>
                      <Text fontWeight={700}>Class time frame</Text>
                      <Flex gap={3} alignItems='center'>
                        <Text fontWeight={600}>from</Text>
                        <MiniCalendar
                          datePicked={classTimeFromPicker}
                          setDatePicked={setClassTimeFromPicker}
                        />
                        <Text fontWeight={600}>to</Text>
                        <MiniCalendar
                          datePicked={classTimeToPicker}
                          setDatePicked={setClassTimeToPicker}
                        />
                      </Flex>
                    </Flex>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem colSpan={1}>
                <Grid gap={2} templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}>
                  <GridItem>
                    <Flex gap={4}>
                      <Text fontWeight={700}>Class time</Text>
                      <Flex flexDirection={'column'} gap={4}>
                        <Checkbox defaultChecked>Morning</Checkbox>
                        <Checkbox defaultChecked>Noon</Checkbox>
                        <Checkbox defaultChecked>Night</Checkbox>
                        <Checkbox defaultChecked>Online</Checkbox>
                      </Flex>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex gap={4}>
                      <Text fontWeight={700}>Status</Text>
                      <Flex flexDirection={'column'} gap={4}>
                        <Checkbox defaultChecked>Planning</Checkbox>
                        <Checkbox defaultChecked>Openning</Checkbox>
                        <Checkbox defaultChecked>Closed</Checkbox>
                      </Flex>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex gap={4}>
                      <Text fontWeight={700}>Attendee</Text>
                      <Flex flexDirection={'column'} gap={4}>
                        <Checkbox defaultChecked>Intern</Checkbox>
                        <Checkbox defaultChecked>Fresher</Checkbox>
                        <Checkbox defaultChecked>Online fee-fresher</Checkbox>
                        <Checkbox defaultChecked>Offline fee-fresher</Checkbox>
                      </Flex>
                    </Flex>
                  </GridItem>
                </Grid>
              </GridItem>
              <GridItem>
                <Grid gap={10} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
                  <GridItem>
                    <Flex gap={3} alignItems='center'>
                      <Text fontWeight={700}>FSU</Text>
                      <div style={{ width: '100%' }}>
                        <Select
                          isMulti
                          styles={{ minWidth: '30px' }}
                          name='colors'
                          options={colourOptions}
                          classNamePrefix='select'
                        />
                      </div>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex gap={3} alignItems='center' minWidth={'max-content'}>
                      <Text fontWeight={700}>Trainer</Text>
                      <div style={{ width: '100%' }}>
                        <Select
                          isMulti
                          name='colors'
                          options={colourOptions}
                          classNamePrefix='select'
                        />
                      </div>
                    </Flex>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button
              borderRadius={'10px'}
              p={'0.5rem 1.5rem'}
              color={'white'}
              bg={'#2D3748'}
              onClick={onClose}
              mr={6}
            >
              Reset
            </Button>
            <Button borderRadius={'10px'} p={'0.5rem 1.5rem'} color={'white'} bg={'#2D3748'}>
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
