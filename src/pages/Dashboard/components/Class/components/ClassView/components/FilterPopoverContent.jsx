import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import MiniCalendar from '@/pages/Dashboard/components/Class/components/ClassView/components/MiniCalendar';
import { classAPIController } from '@/core/services/ClassAPI/classAPIController';
import { colourOptions } from '@/mocks/fakeDataClassList';

export default function FilterPopoverContent() {
  const { t } = useTranslation();

  const [classTimeFromPicker, setClassTimeFromPicker] = useState('');
  const [classTimeToPicker, setClassTimeToPicker] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [updateFSU, setUpdateFSU] = useState(true);
  const [dataFSU, setDataFSU] = useState([]);

  useEffect(() => {
    if (updateFSU) {
      classAPIController
        .getFSU()
        .then((res) => {
          setDataFSU(res);
          setUpdateFSU(false);
        })
        .catch(() => {});
    }
  }, [updateFSU, setUpdateFSU, dataFSU, setDataFSU]);
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
        {t('Filter')}
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        size={'3xl'}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent borderTopRadius={'10px'}>
          <ModalHeader
            textAlign={'center'}
            color={'white'}
            borderTopRadius={'10px'}
            size='2xl'
            bg={'#2D3748'}
          >
            {t('Customize Filter')}
          </ModalHeader>
          <ModalBody>
            <Grid templateColumns={{ base: '1fr' }} gap={10}>
              <GridItem colSpan={1}>
                <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                  gap={10}
                >
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex
                      spacing={4}
                      flexDirection={'column'}
                      gap={3}
                      flex={1}
                      alignItems={'flex-start'}
                    >
                      <Text fontWeight={700}>{t('Class location')}</Text>
                      <div style={{ width: '100%' }}>
                        <Select
                          isMulti
                          name='colors'
                          placeholder={t('Select location')}
                          options={colourOptions}
                          classNamePrefix='select'
                        />
                      </div>
                    </Flex>
                  </GridItem>

                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Flex
                      flexDirection={'column'}
                      gap={3}
                      alignItems={'flex-start'}
                    >
                      <Text fontWeight={700}>{t('Class time frame')}</Text>
                      <Flex gap={3} alignItems='center'>
                        <Text fontWeight={600}>{t('from')}</Text>
                        <MiniCalendar
                          datePicked={classTimeFromPicker}
                          setDatePicked={setClassTimeFromPicker}
                        />
                        <Text fontWeight={600}>{t('to')}</Text>
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
                <Grid
                  gap={2}
                  templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
                >
                  <GridItem>
                    <Flex gap={4}>
                      <Text fontWeight={700}>{t('Class time')}</Text>
                      <Flex flexDirection={'column'} gap={4}>
                        <Checkbox defaultChecked>{t('Morning')}</Checkbox>
                        <Checkbox defaultChecked>{t('Noon')}</Checkbox>
                        <Checkbox defaultChecked>{t('Night')}</Checkbox>
                        <Checkbox defaultChecked>{t('Online')}</Checkbox>
                      </Flex>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex gap={4}>
                      <Text fontWeight={700}>{t('Status')}</Text>
                      <Flex flexDirection={'column'} gap={4}>
                        <Checkbox defaultChecked>{t('Planning')}</Checkbox>
                        <Checkbox defaultChecked>{t('Openning')}</Checkbox>
                        <Checkbox defaultChecked>{t('Closed')}</Checkbox>
                      </Flex>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex gap={4}>
                      <Text fontWeight={700}>{t('Attendee')}</Text>
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
                <Grid gap={10} templateColumns={{ base: '1fr', md: '1fr' }}>
                  <GridItem>
                    <Flex gap={3} alignItems='center'>
                      <Text fontWeight={700}>FSU</Text>
                      <div style={{ width: '100%' }}>
                        <Select
                          placeholder={t('Select FSU')}
                          styles={{
                            menuList: (provided) => ({
                              ...provided,

                              fontSize: '16px',
                            }),

                            control: (provided) => ({
                              ...provided,
                              fontSize: '16px',
                            }),
                          }}
                          options={dataFSU.map((option) => ({
                            value: option.id,
                            label: option.fsuName,
                          }))}
                        ></Select>
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
              _hover={{ opacity: '0.8' }}
              onClick={onClose}
              mr={6}
            >
              {t('Reset')}
            </Button>
            <Button
              borderRadius={'10px'}
              p={'0.5rem 1.5rem'}
              _hover={{ opacity: '0.8' }}
              color={'white'}
              bg={'#2D3748'}
              onClick={onClose}
            >
              {t('Apply')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
