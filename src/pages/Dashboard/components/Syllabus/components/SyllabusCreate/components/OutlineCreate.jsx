import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Switch,
  Input,
  Stack,
  Select,
  Text,
  FormControl,
  FormLabel,
  AccordionIcon,
  Flex,
  Spacer,
  Grid,
  GridItem,
  VStack,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { CiCirclePlus } from 'react-icons/ci';
import { IoSaveOutline, IoRadio } from 'react-icons/io5';
import { MdDeleteForever, MdQuiz } from 'react-icons/md';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegFolderClosed } from 'react-icons/fa6';
import { AiTwotoneBook } from 'react-icons/ai';
import { RiUserVoiceLine } from 'react-icons/ri';
import { TbHandThreeFingers } from 'react-icons/tb';
import { PiExam } from 'react-icons/pi';

export const Outline = () => {
  const { t } = useTranslation();
  const [days, setDays] = useState([]);
  const [unitNames, setUnitNames] = useState({});
  const [cards, setCards] = useState({});
  const [showAddCardForm, setShowAddCardForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const inputRef = useRef(null); // Tạo ref cho input
  const handleEdit = () => {
    setEditMode(true);
  };

  useEffect(() => {
    console.log(days);
    console.log(unitNames);
    console.log(cards);
  }, [days, unitNames, cards]);

  const handleAddDay = () => {
    const newDay = `Day ${days.length + 1}`;
    setDays([...days, newDay]);
    setUnitNames({ ...unitNames, [newDay]: [] });
  };

  const handleAddUnit = (day) => {
    const newUnit = {
      name: `Unit ${unitNames[day].length + 1}`,
      detail: '',
    };
    setUnitNames({ ...unitNames, [day]: [...unitNames[day], newUnit] });

    setCards({
      ...cards,
      [day]: { ...cards[day], [newUnit]: [] },
    });
  };

  const handleAddCard = (day, unit) => {
    setShowAddCardForm({ ...showAddCardForm, [`${day}-${unit}`]: true });
  };

  const handleSaveCard = (day, unit, newCard) => {
    setCards({
      ...cards,
      [day]: {
        ...cards[day],
        [unit]: [...cards[day][unit], newCard],
      },
    });
    setShowAddCardForm({ ...showAddCardForm, [`${day}-${unit}`]: false });
  };

  const handleSaveUnitDetail = (day, unit, detail) => {
    const updatedUnitNames = unitNames[day].map((u) =>
      u === unit ? { ...u, detail } : u
    );
    setUnitNames({ ...unitNames, [day]: updatedUnitNames });
    setEditMode(false); // Ẩn input khi đã lưu chi tiết
    console.log(detail);
  };

  const handleDeleteDay = (dayToDelete) => {
    // Lọc ra danh sách ngày mới mà không bao gồm ngày cần xóa
    const updatedDays = days.filter((day) => day !== dayToDelete);

    setDays(updatedDays);
  };

  return (
    <Box
      boxShadow='xl'
      borderBottomRadius='xl'
      borderBottom='10px solid #2D3748'
      borderTop='4px solid #2D3748'
    >
      {days.map((day) => (
        <Accordion key={day} allowToggle borderBottom='1px solid #2D3748'>
          <AccordionItem>
            <h2>
              <AccordionButton bg='#718096' _hover={{ opacity: '0.8' }}>
                <Flex w='100%'>
                  <Flex>
                    <Box textAlign='left' p='2' as='b'>
                      {day}
                    </Box>
                    <Box p='2'>
                      <Button
                        onClick={() => handleDeleteDay(day)}
                        borderRadius='full'
                        _hover={{ opacity: '0.2' }}
                        p='0'
                        size='sm'
                        colorScheme='red.200'
                        data-testid={`delete-day-button-${day.replace(
                          /\s+/g,
                          '-'
                        )}`}
                      >
                        <MdDeleteForever size='sm' color='red' />
                      </Button>
                    </Box>
                  </Flex>
                  <Spacer />
                  <Box>
                    <AccordionIcon />
                  </Box>
                </Flex>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {unitNames[day]?.map((unit) => (
                <Accordion key={unit} allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Flex w='100%'>
                          <Flex flex='0.5'>
                            <Box as='b' flex='2' textAlign='left'>
                              {unit.name}
                            </Box>
                            {editMode || !unit.detail ? (
                              <Flex flex='8'>
                                <Input
                                  p='1'
                                  boxShadow='xl'
                                  placeholder='Unit Name'
                                  ref={inputRef} // Gán ref vào input
                                  size='xl'
                                  borderRadius='lg'
                                ></Input>
                                <Box ml='1%'>
                                  <Button
                                    onClick={() => {
                                      if (inputRef.current) {
                                        // Kiểm tra xem ref đã được thiết lập hay chưa
                                        const inputValue =
                                          inputRef.current.value;
                                        handleSaveUnitDetail(
                                          day,
                                          unit,
                                          inputValue
                                        );
                                      }
                                    }}
                                    disabled={!unit.detail}
                                    p='0'
                                    size='sm'
                                    borderRadius='full'
                                    data-testid='save-button'
                                  >
                                    <IoSaveOutline size='sm' />
                                  </Button>
                                </Box>
                              </Flex>
                            ) : (
                              <Flex flex='5' justifyContent='start'>
                                <Box
                                  flex='4'
                                  fontSize='xl'
                                  as='i'
                                  textAlign='start'
                                >
                                  <VStack>
                                    <Box>{unit.detail}</Box>
                                    <Box
                                      as='i'
                                      color='silver.200'
                                      fontSize='sm'
                                    >
                                      7hrs
                                    </Box>
                                  </VStack>
                                </Box>
                                <Button
                                  aria-label='Edit Unit Detail'
                                  onClick={
                                    ((e) => e.stopPropagation(), handleEdit)
                                  }
                                  p='0'
                                  borderRadius='full'
                                  size='sm'
                                >
                                  <FaRegEdit size='sm' />
                                </Button>
                              </Flex>
                            )}
                          </Flex>
                          <Spacer />
                          <Box>
                            <AccordionIcon />
                          </Box>
                        </Flex>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {cards[day]?.[unit]?.map((card, index) => (
                        <Box key={index} my='2'>
                          <CardContent card={card} />
                        </Box>
                      ))}

                      {showAddCardForm[`${day}-${unit}`] && (
                        <CardForm
                          onSave={(newCard) =>
                            handleSaveCard(day, unit, newCard)
                          }
                          onCancel={() =>
                            setShowAddCardForm({
                              ...showAddCardForm,
                              [`${day}-${unit}`]: false,
                            })
                          }
                        />
                      )}
                      <Button
                        display='flex'
                        flex='start'
                        p='0'
                        borderRadius='full'
                        onClick={() => handleAddCard(day, unit)}
                        data-testid='add-card-button'
                      >
                        <CiCirclePlus size='2em' />
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              ))}
              <Button
                bg='#474748'
                variant='solid'
                display='flex'
                mt='1%'
                fontSize='lg'
                color='white'
                m='1%'
                onClick={() => handleAddUnit(day)}
              >
                <CiCirclePlus />
                {t('addUnit')}
              </Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
      <Button
        bg='#474748'
        variant='solid'
        display='flex'
        mt='1%'
        fontSize='lg'
        color='white'
        m='1%'
        onClick={handleAddDay}
      >
        <CiCirclePlus />
        {t('addDay')}
      </Button>
    </Box>
  );
};

const CardContent = ({ card }) => {
  return (
    <div>
      <Stack spacing='2'>
        <Flex>
          <Box flex='1'></Box>
          <Box flex='8'>
            <Card size='sm' borderRadius='xl' boxShadow='xl'>
              <CardBody>
                <Flex>
                  <Box flex='2'>
                    <Flex flex='start'>
                      <Text as='b'>{card.nameLession}</Text>
                    </Flex>
                  </Box>
                  <Box flex='4'>
                    <Grid templateColumns='repeat(4, 1fr)' gap={1}>
                      <GridItem w='100%' h='9' bg='#2D3748' borderRadius='3xl'>
                        <Text
                          h='100%'
                          color='white'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          {card.outputStandard}
                        </Text>
                      </GridItem>
                      <GridItem w='100%' h='9'>
                        <Text
                          h='100%'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                          as='i'
                        >
                          {card.hours}mins
                        </Text>
                      </GridItem>
                      <GridItem
                        w='100%'
                        h='9'
                        borderColor='orange'
                        borderWidth='1px'
                        borderStyle='solid'
                        borderRadius='3xl'
                      >
                        <Text
                          h='100%'
                          color='orange'
                          display='flex'
                          alignItems='center'
                          justifyContent='center'
                        >
                          {card.isStatus ? 'Online' : 'Offline'}
                        </Text>
                      </GridItem>
                      <GridItem w='100%' h='9' ml='10%'>
                        <Flex>
                          <Box>
                            <DeliveryTypeIcon
                              value={card.deliveryType}
                              size='2em'
                            />
                          </Box>
                          <Box ml='5%'>
                            <FaRegFolderClosed size='2em' />
                          </Box>
                        </Flex>
                      </GridItem>
                    </Grid>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </Stack>
    </div>
  );
};
const DeliveryTypeIcon = ({ value, size }) => {
  let icon = null;

  switch (value) {
    case '1':
      icon = <AiTwotoneBook size={size} />;
      break;
    case '2':
      icon = <RiUserVoiceLine size={size} />;
      break;
    case '3':
      icon = <TbHandThreeFingers size={size} />;
      break;
    case '4':
      icon = <MdQuiz size={size} />;
      break;
    case '5':
      icon = <PiExam size={size} />;
      break;
    case '6':
      icon = <IoRadio size={size} />;
      break;
    default:
      break;
  }

  return <div>{icon}</div>;
};

const CardForm = ({ onSave, onCancel }) => {
  const [newCard, setNewCard] = useState({
    nameLession: '',
    hours: '',
    outputStandard: '',
    isStatus: false,
    deliveryType: '',
  });

  const handleChange = (key, value) => {
    setNewCard({
      ...newCard,
      [key]: value,
    });
  };

  const handleSave = () => {
    onSave(newCard);
    setNewCard({
      nameLession: '',
      hours: '',
      outputStandard: '',
      isStatus: false,
      deliveryType: '',
    });
  };

  return (
    <Box boxShadow='xl' borderRadius='xl' mb='1%'>
      <Flex mt='2%'>
        <FormControl mt={2} flex='7' p='1'>
          <Input
            boxShadow='xl'
            value={newCard.nameLession}
            onChange={(e) => handleChange('nameLession', e.target.value)}
            placeholder='Name Lession'
          />
        </FormControl>

        <FormControl mt={2} flex='3' p='1'>
          <Input
            boxShadow='xl'
            type='number'
            value={newCard.hours}
            onChange={(e) => handleChange('hours', parseInt(e.target.value))}
            placeholder='Hours'
          />
        </FormControl>

        <FormControl mt={2} flex='7' p='1'>
          <Select
            boxShadow='xl'
            value={newCard.outputStandard}
            onChange={(e) => handleChange('outputStandard', e.target.value)}
            placeholder='Output standard'
          >
            <option value='H4SD'>H4SD</option>
            <option value='H3SS'>H3SS</option>
            <option value='NCC1'>NCC1</option>
          </Select>
        </FormControl>

        <FormControl mt={2} flex='1' p='1' justifyContent='center'>
          <Switch
            boxShadow='xl'
            isChecked={newCard.isStatus}
            onChange={(e) => handleChange('isStatus', e.target.checked)}
            color='black'
            colorScheme='orange'
          />
          <FormLabel justifyContent='center' size='sm'>
            On/Off
          </FormLabel>
        </FormControl>

        <FormControl mt={2} flex='7' p='1'>
          <Select
            boxShadow='xl'
            value={newCard.deliveryType}
            onChange={(e) => handleChange('deliveryType', e.target.value)}
            placeholder='Delivery Type'
          >
            <option value='1'>
              <AiTwotoneBook /> RiAssignment/Lab
            </option>
            <option value='2'>
              <RiUserVoiceLine />
              Concept/Lecture
            </option>
            <option value='3'>
              <TbHandThreeFingers />
              Guide/Review
            </option>
            <option value='4'>
              <MdQuiz />
              Test/Quiz
            </option>
            <option value='5'>
              <PiExam />
              Exam
            </option>
            <option value='6'>
              <IoRadio />
              Seminar/Workshop
            </option>
          </Select>
        </FormControl>

        <Flex direction='column' flex='2' p='1'>
          <Button mt={2} onClick={handleSave} size='xs' bg='#90EE90'>
            Save
          </Button>
          <Button
            mt={2}
            variant='outline'
            onClick={onCancel}
            size='xs'
            bg='#606060'
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
