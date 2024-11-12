import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Flex,
  Spacer,
  Icon,
} from '@chakra-ui/react';
import { TiDeleteOutline } from 'react-icons/ti';
import { UnitAccordion } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/outline/UnitAccordion';

export const AccordionDay = ({
  dayNumber,
  onDelete,
  onCountDeliveryTypeByDay,
  onAddUnitToDay,
}) => {
  const [units, setUnits] = useState([]);
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [deliveryTypeCounts, setDeliveryTypeCounts] = useState({});

  const handleAddCardToUnit = (unitId, newCard) => {
    // Tìm index của unit trong danh sách units
    const unitIndex = units.findIndex((unit) => unit.id === unitId);

    if (unitIndex !== -1) {
      // Tìm unit cần cập nhật trong danh sách units
      const updatedUnits = [...units];
      const unitToUpdate = updatedUnits[unitIndex];

      // Kiểm tra xem card mới đã tồn tại trong unit chưa
      const existingCardIndex = unitToUpdate.cards.findIndex(
        (card) => card.id === newCard.id
      );

      if (existingCardIndex !== -1) {
        // Card đã tồn tại, cập nhật thông tin của card
        unitToUpdate.cards[existingCardIndex] = newCard;
      } else {
        // Card mới, thêm vào danh sách cards của unit
        unitToUpdate.cards.push(newCard);
      }

      // Cập nhật lại danh sách units
      updatedUnits[unitIndex] = unitToUpdate;

      // Cập nhật mảng units với các unit duy nhất
      const uniqueUnits = updatedUnits.filter(
        (unit, index) =>
          updatedUnits.findIndex((u) => u.id === unit.id) === index
      );

      // Cập nhật mảng units với các unit duy nhất
      setUnits(uniqueUnits);

      // Gọi hàm callback để truyền dữ liệu lên component cha nếu cần
      onAddUnitToDay(dayNumber, unitToUpdate);
    }
  };

  const handleCountOptionDeliveryType = (unitId, countOption) => {
    setDeliveryTypeCounts((prevState) => ({
      ...prevState,
      [unitId]: countOption,
    }));
  };

  useEffect(() => {
    onCountDeliveryTypeByDay(dayNumber, deliveryTypeCounts);
  }, [dayNumber, deliveryTypeCounts]);

  const handleUnitNameChange = (id, newName) => {
    const updatedUnits = units.map((unit) =>
      unit.id === id ? { ...unit, name: newName } : unit
    );
    setUnits(updatedUnits);
  };

  const handleAddUnit = () => {
    const newUnit = {
      id: `${dayNumber}-${units.length + 1}`,
      name: '',
      cards: [],
    };
    setUnits([...units, newUnit]);
  };

  const handleEditUnit = (id) => {
    setEditingUnitId(id);
  };

  const handleSaveUnit = (id) => {
    const updatedUnits = units.map((unit) =>
      unit.id === id ? { ...unit, isEditing: false } : unit
    );
    setUnits(updatedUnits);
    setEditingUnitId(null);
  };

  return (
    <Accordion allowToggle borderBottom='1px solid #2D3748'>
      <AccordionItem>
        <h2>
          <AccordionButton
            bg='#718096'
            _hover={{ opacity: '0.6' }}
            cursor={'context-menu'}
            h='10'
          >
            <Flex w='100%'>
              <Flex>
                <Flex align='center' as='b'>
                  Day {dayNumber}
                </Flex>
                <Button
                  colorScheme='red.200'
                  p='0'
                  backgroundColor='inherit'
                  borderRadius='full'
                >
                  <Icon
                    as={TiDeleteOutline}
                    onClick={() => onDelete(dayNumber)}
                    color='red'
                    boxSize={7}
                  />
                </Button>
              </Flex>
              <Spacer />
              <Flex alignItems='center'>
                <AccordionIcon />
              </Flex>
            </Flex>
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Accordion allowToggle>
            {units?.map((unit) => (
              <UnitAccordion
                key={unit.id}
                unit={unit}
                dayNumber={dayNumber}
                isEditing={editingUnitId === unit.id}
                handleUnitNameChange={(newName) =>
                  handleUnitNameChange(unit.id, newName)
                }
                handleEditUnit={handleEditUnit}
                handleSaveUnit={handleSaveUnit}
                onCountOptionDeliveryType={handleCountOptionDeliveryType}
                onAddCardToUnit={(newCard) =>
                  handleAddCardToUnit(unit.id, newCard)
                }
              />
            ))}
          </Accordion>
          <Button
            onClick={handleAddUnit}
            bg='#4A5568'
            variant='solid'
            display='flex'
            fontSize='sm'
            color='white'
            h={7}
            mt='1%'
          >
            Add Unit
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
