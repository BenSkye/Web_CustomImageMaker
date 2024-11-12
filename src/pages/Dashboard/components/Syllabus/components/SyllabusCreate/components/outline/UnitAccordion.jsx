import React, { useState, useEffect, useCallback } from 'react';
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Input,
  Flex,
  Button,
  Text,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { CiCirclePlus } from 'react-icons/ci';
import { AddCardModal } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/outline/ModalAddCard';
import { CardDetails } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/outline/CardContent';

export const UnitAccordion = ({
  unit: { id, name },
  dayNumber,
  handleUnitNameChange,
  isEditing,
  handleEditUnit,
  handleSaveUnit,
  onCountOptionDeliveryType,
  onAddCardToUnit,
}) => {
  const [unitName, setUnitName] = useState(name);
  const [editMode, setEditMode] = useState(name === '');
  const [showAlert, setShowAlert] = useState(false);
  const [cards, setCards] = useState([]);
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardContent, setNewCardContent] = useState({
    nameLession: '',
    hours: '',
    outputStandard: '',
    isStatus: false,
    deliveryType: '',
  });

  const memoizedOnCountOptionDeliveryType = useCallback(
    onCountOptionDeliveryType,
    []
  );

  //Hàm đếm số option trong deliveryType
  useEffect(() => {
    const newCountOption = {
      countAssignment: cards.filter(
        (card) => card.deliveryType === 'Assignment/Lab'
      ).length,
      countConcept: cards.filter(
        (card) => card.deliveryType === 'Concept/Lecture'
      ).length,
      countGuide: cards.filter((card) => card.deliveryType === 'Guide/Review')
        .length,
      countTest: cards.filter((card) => card.deliveryType === 'Test/Quiz')
        .length,
      countExam: cards.filter((card) => card.deliveryType === 'Exam').length,
      countSeminar: cards.filter(
        (card) => card.deliveryType === 'Seminar/Workshop'
      ).length,
    };

    // setCountOption(newCountOption);
    memoizedOnCountOptionDeliveryType(id, newCountOption);
  }, [cards, id, memoizedOnCountOptionDeliveryType]);

  // Hàm tính tổng số giờ của từng unit
  const calculateTotalHours = () => {
    let totalHours = 0;
    cards.forEach((card) => {
      totalHours += parseInt(card.hours) || 0;
    });

    // Tính số phút dư sau khi chia lấy phần dư từ số giờ
    const remainingMinutes = totalHours % 60;
    const totalHoursRoundedDown = Math.floor(totalHours / 60);

    if (totalHoursRoundedDown === 0) {
      return `${remainingMinutes} mins`;
    }
    if (totalHoursRoundedDown !== 0 && remainingMinutes === 0) {
      return `${totalHoursRoundedDown} hrs`;
    }
    if (totalHoursRoundedDown !== 0 && remainingMinutes !== 0) {
      return `${totalHoursRoundedDown} hrs ${remainingMinutes} mins`;
    }
  };

  const handleAddCard = () => {
    openAddCardModal();
  };

  const handleSaveCard = () => {
    const { nameLession, hours, outputStandard, isStatus, deliveryType } =
      newCardContent;
    if (
      nameLession.trim() !== '' &&
      hours.trim() !== '' &&
      outputStandard.trim() !== '' &&
      deliveryType.trim() !== ''
    ) {
      const newCard = {
        id: `${dayNumber}-${id}-${cards.length + 1}`,
        nameLession,
        hours,
        outputStandard,
        isStatus,
        deliveryType,
      };
      setCards([...cards, newCard]);
      onAddCardToUnit(newCard); // Gọi hàm callback để truyền dữ liệu lên cha
      closeAddCardModal();
    }
  };

  const openAddCardModal = () => {
    setShowAddCardModal(true);
  };

  const closeAddCardModal = () => {
    setShowAddCardModal(false);
    setNewCardContent(''); // Đặt lại nội dung card khi đóng modal
  };

  const handleChange = (field, value) => {
    setNewCardContent({
      ...newCardContent,
      [field]: value,
    });
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const trimmedName = unitName.trim();
    if (trimmedName === '') {
      setShowAlert(true);
      return;
    }
    handleUnitNameChange(id, trimmedName);
    handleSaveUnit(id);
    setEditMode(false);
    setShowAlert(false);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditMode(true);
    handleEditUnit(id);
  };

  const handleNameChange = (newValue) => {
    setUnitName(newValue);
    handleUnitNameChange(newValue); // Gọi callback để truyền giá trị lên cha
  };

  return (
    <AccordionItem key={id}>
      <AccordionButton
        _hover={{ opacity: '0.8' }}
        cursor={'context-menu'}
        p={1}
      >
        <Flex w='100%'>
          <Flex direction='column'>
            <Flex>
              <Flex as='b' flex={1} fontSize='md'>
                Unit {id}
              </Flex>
              {editMode || isEditing ? (
                <Input
                  flex={3}
                  placeholder='Unit name'
                  value={unitName}
                  onChange={(e) =>
                    handleNameChange(e.target.value.toUpperCase())
                  }
                />
              ) : (
                <Flex m='0 10px' direction='column'>
                  <Flex as='b' fontSize='md'>
                    {unitName}
                  </Flex>
                  <Flex as='i' h={5} fontSize='sm'>
                    {calculateTotalHours()}
                  </Flex>
                </Flex>
              )}
              {editMode || isEditing ? (
                <Button
                  onClick={handleSave}
                  m='0 4px'
                  p={2}
                  backgroundColor='green'
                  _hover={{ opacity: '0.8' }}
                  color='white'
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={handleEdit}
                  m='0 4px'
                  p={2}
                  borderRadius='full'
                  backgroundColor='inherit'
                  _hover={{ backgroundColor: 'inherit' }}
                >
                  <Icon as={MdOutlineModeEdit} color='#4A5568' boxSize={7} />
                </Button>
              )}
              {showAlert && <Text color='red'>Unit name is not empty!</Text>}
            </Flex>
          </Flex>
          <Spacer />
          <Flex alignItems='center'>
            <AccordionIcon />
          </Flex>
        </Flex>
      </AccordionButton>
      <AccordionPanel>
        {cards.map((card) => (
          <CardDetails
            key={card.id}
            card={card}
            unitName={name}
            dayNumber={dayNumber}
          />
        ))}
        {/* Modal để thêm card */}
        {showAddCardModal && (
          <AddCardModal
            newCardContent={newCardContent}
            handleChange={handleChange}
            handleSaveCard={handleSaveCard}
            closeAddCardModal={closeAddCardModal}
          />
        )}
        <Button
          onClick={handleAddCard}
          colorScheme='red.200'
          p='0'
          backgroundColor='inherit'
          borderRadius='full'
          display='flex'
        >
          <Icon as={CiCirclePlus} color='#4A5568' boxSize={7} />
        </Button>
      </AccordionPanel>
    </AccordionItem>
  );
};
