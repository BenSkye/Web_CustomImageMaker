import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import Select from 'react-select';
import { CiCalendar } from 'react-icons/ci';
import { MdOutlineAccessTime } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { MdOutlineRecordVoiceOver } from 'react-icons/md';
import { FaRegStar } from 'react-icons/fa6';
import { MdOutlineStars } from 'react-icons/md';
import { classAPIController } from '@/core/services/ClassAPI/classAPIController';

export default function GeneralAccordion({
  dataFSU,
  setDataFSU,
  setLocation,
  timeStart,
  setTimeStart,
  timeEnd,
  setTimeEnd,
  location,
  trainer,
  setTrainer,
  admin,
  setAdmin,
  fsuId,
  setFsuId,
}) {
  const toast = useToast();
  const [user, setUser] = useState([]);
  const [updateUser, setUpdateUser] = useState(true);

  const { t } = useTranslation();

  function compareTimes(time1, time2) {
    const [hour1, minute1] = time1.split(':').map(Number);
    const [hour2, minute2] = time2.split(':').map(Number);

    if (hour1 > hour2) {
      return false;
    } else if (hour1 < hour2) {
      return true;
    } else {
      if (minute1 >= minute2) {
        return false;
      } else {
        return true;
      }
    }
  }

  const handleChangeTimeStart = (e) => {
    setTimeStart(e.target.value);
  };

  const handleChangeTimeEnd = (e) => {
    if (!compareTimes(timeStart, e.target.value)) {
      if (toast.isActive('end-time-must-be-greater-than-start-time')) return;
      toast({
        id: 'end-time-must-be-greater-than-start-time',
        title: `${t('End time must be greater than start time')}`,
        position: 'top-right',
        isClosable: true,
        status: 'error',
      });
    } else {
      setTimeEnd(e.target.value);
    }
  };

  useEffect(() => {
    if (!updateUser) return;
    classAPIController
      .getAllUser()
      .then((res) => {
        if (!res.message) {
          setUser(res.content);
          setUpdateUser(false);
        }
      })
      .catch(() => {});
  }, [updateUser, setUpdateUser]);

  return (
    <>
      <Accordion allowToggle className='first-step'>
        <AccordionItem>
          <AccordionButton
            bg='#2D3748'
            color='white'
            _hover={{ opacity: '0.8' }}
            borderRadius={'12px'}
          >
            <Flex flex='1' textAlign='left' alignItems={'center'}>
              <CiCalendar />
              <Text ml={2} fontWeight={'bold'}>
                {t('General')}
              </Text>
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel shadow='md' p='4' rounded='xl' bg='white'>
            <Stack w={'100%'} justifyContent={'start'} overflow={'visible'}>
              <Flex
                w={'100%'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={2}
              >
                <Flex alignItems={'center'} my={'auto'} gap={2}>
                  <MdOutlineAccessTime size={18} />
                  <FormControl isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={18}>
                      {t('Time')}
                    </FormLabel>
                  </FormControl>
                </Flex>

                <Flex alignItems={'center'} gap={2}>
                  <Input
                    type='time'
                    name='timeStart'
                    id='timeStart'
                    onChange={handleChangeTimeStart}
                  />
                  <Text fontSize={18}>{t('to')}</Text>
                  <Input
                    type='time'
                    name='timeEnd'
                    fontSize={18}
                    id='timeEnd'
                    onChange={handleChangeTimeEnd}
                  />
                </Flex>
              </Flex>
              <Flex
                w={'100%'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={9}
              >
                <Flex alignItems={'center'} gap={2}>
                  <GrMapLocation size={16} />
                  <FormControl isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={18}>
                      {t('Location')}
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Flex w={'60%'}>
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      fontSize: '10px!important',
                    }}
                  >
                    <Select
                      placeholder={t('Select location')}
                      styles={{
                        menuList: (provided) => ({
                          ...provided,
                          fontSize: '18px',
                        }),
                        control: (provided) => ({
                          ...provided,
                          fontSize: '18px',
                        }),
                      }}
                      onChange={(e) => setLocation(e.value)}
                      options={[
                        { value: 'Ha Noi', label: 'Ha Noi' },
                        { value: 'Ho Chi Minh', label: 'Ho Chi Minh' },
                        { value: 'Can Tho', label: 'Can Tho' },
                        { value: 'Da Nang', label: 'Da Nang' },
                        { value: 'Hai Phong', label: 'Hai Phong' },
                        { value: 'Hue', label: 'Hue' },
                        { value: 'Nha Trang', label: 'Nha Trang' },
                        { value: 'Vung Tau', label: 'Vung Tau' },
                      ]}
                    />
                  </div>
                </Flex>
              </Flex>
              <Flex
                w={'100%'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={9}
              >
                <Flex alignItems={'center'} gap={2}>
                  <MdOutlineRecordVoiceOver size={18} />
                  <FormControl isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={18}>
                      {t('Trainer')}
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Flex w={'60%'}>
                  <div
                    style={{
                      width: '100%',
                      textAlign: 'left',
                    }}
                  >
                    <Select
                      placeholder={t('Select trainer')}
                      isMulti
                      onChange={(e) => setTrainer(e)}
                      styles={{
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight: '200px',
                          fontSize: '18px',
                        }),
                        control: (provided) => ({
                          ...provided,
                          fontSize: '18px',
                        }),
                      }}
                      options={user
                        .filter((option) => option.roleName === 'TRAINER')
                        .map((option) => ({
                          value: option.id,
                          label: `${option.name} ( ${option.email} )`,
                        }))}
                      name='trainer'
                      classNamePrefix='select'
                    ></Select>
                  </div>
                </Flex>
              </Flex>
              <Flex
                w={'100%'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={9}
              >
                <Flex alignItems={'center'} gap={2}>
                  <FaRegStar size={18} />
                  <FormControl isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={18}>
                      {t('Admin')}
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Flex w={'60%'}>
                  <div style={{ width: '100%', textAlign: 'left' }}>
                    <Select
                      isMulti
                      placeholder={t('Select admin')}
                      onChange={(e) => setAdmin(e)}
                      styles={{
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight: '150px',
                          fontSize: '18px',
                        }),
                        control: (provided) => ({
                          ...provided,
                          fontSize: '18px',
                        }),
                      }}
                      options={user
                        .filter((option) => option.roleName === 'ADMIN')
                        .map((option) => ({
                          value: option.id,
                          label: `${option.name} ( ${option.email} )`,
                        }))}
                      name='Admin'
                      classNamePrefix='select'
                    />
                  </div>
                </Flex>
              </Flex>
              <Flex
                w={'100%'}
                alignItems={'center'}
                justifyContent={'space-between'}
                gap={9}
              >
                <Flex alignItems={'center'} gap={2}>
                  <MdOutlineStars size={20} />
                  <FormControl isRequired>
                    <FormLabel fontWeight={'bold'} fontSize={18}>
                      {t('FSU')}
                    </FormLabel>
                  </FormControl>
                </Flex>
                <Flex w={'60%'}>
                  <div style={{ width: '100%', textAlign: 'left' }}>
                    <Select
                      placeholder={t('Select FSU')}
                      styles={{
                        menuList: (provided) => ({
                          ...provided,
                          maxHeight: '100px',
                          fontSize: '18px',
                        }),

                        control: (provided) => ({
                          ...provided,
                          fontSize: '18px',
                        }),
                      }}
                      onChange={(e) => setFsuId(e.value)}
                      options={dataFSU.map((option) => ({
                        value: option.id,
                        label: option.fsuName,
                      }))}
                    ></Select>
                  </div>
                </Flex>
              </Flex>
              <Divider colorScheme='gray' />
              <Flex direction={'column'} gap={2}>
                <Text textAlign={'left'} fontWeight={'bold'} fontSize={15}>
                  {t('Created')}
                </Text>
                <Text textAlign={'left'} fontWeight={'bold'} fontSize={15}>
                  {t('Review')}
                </Text>
                <Text textAlign={'left'} fontWeight={'bold'} fontSize={15}>
                  {t('Approve')}
                </Text>
              </Flex>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
