import React, { useEffect, useState } from 'react';
import { Button, Box } from '@chakra-ui/react';
import { AccordionDay } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/outline/AccordionDay';

export const DayList = ({ onPercentageDeliveryType, onDays }) => {
  const [days, setDays] = useState([]);
  const [deliveryTypeCountsByDay, setDeliveryTypeCountsByDay] = useState({});

  useEffect(() => {
    onDays(days);
  }, [days, onDays]);

  const handleCountOptionDeliveryTypeByDay = (dayNumber, counts) => {
    const countsByDay = calculateCountsByDay(counts);
    setDeliveryTypeCountsByDay((prevCounts) => ({
      ...prevCounts,
      [dayNumber]: countsByDay,
    }));
  };

  const calculateCountsByDay = (counts) => {
    let countsByDay = {
      countAssignment: 0,
      countConcept: 0,
      countGuide: 0,
      countTest: 0,
      countExam: 0,
      countSeminar: 0,
    };
    Object.values(counts).forEach((unitCounts) => {
      Object.keys(unitCounts).forEach((key) => {
        countsByDay[key] += unitCounts[key];
      });
    });
    return countsByDay;
  };

  const calculateTotalDeliveryCounts = () => {
    let totalCounts = {
      countAssignment: 0,
      countConcept: 0,
      countGuide: 0,
      countTest: 0,
      countExam: 0,
      countSeminar: 0,
    };
    Object.values(deliveryTypeCountsByDay).forEach((counts) => {
      Object.keys(counts).forEach((key) => {
        totalCounts[key] += counts[key];
      });
    });
    return totalCounts;
  };

  const calculatePercentage = (totalCount, individualCount) => {
    return totalCount === 0 ? 0 : (individualCount / totalCount) * 100;
  };

  const totalDeliveryCounts = calculateTotalDeliveryCounts();

  const totalDeliveryTypeCount = Object.values(totalDeliveryCounts).reduce(
    (total, count) => total + count,
    0
  );

  const percentageCountsByType = {};

  Object.entries(totalDeliveryCounts).forEach(([type, count]) => {
    percentageCountsByType[type] = calculatePercentage(
      totalDeliveryTypeCount,
      count
    );
  });

  onPercentageDeliveryType(percentageCountsByType);

  const handleAddUnitToDay = (dayNumber, unit) => {
    // Kiểm tra xem unit có tồn tại trong ngày hiện tại không
    const existingDay = days.find((day) => day.id === dayNumber);
    if (existingDay) {
      // Kiểm tra xem unit đã tồn tại trong ngày hiện tại không
      const existingUnitIndex = existingDay.units.findIndex(
        (existingUnit) => existingUnit.id === unit.id
      );
      if (existingUnitIndex !== -1) {
        // Nếu unit đã tồn tại, cập nhật thông tin của unit
        const updatedUnits = [...existingDay.units];
        updatedUnits[existingUnitIndex] = unit;

        // Cập nhật lại ngày với unit đã được cập nhật
        const updatedDays = days.map((day) =>
          day.id === dayNumber ? { ...day, units: updatedUnits } : day
        );
        setDays(updatedDays);
      } else {
        // Nếu unit chưa tồn tại, thêm unit mới vào ngày hiện tại
        const updatedUnits = [...existingDay.units, unit];

        // Cập nhật lại ngày với unit mới được thêm vào
        const updatedDays = days.map((day) =>
          day.id === dayNumber ? { ...day, units: updatedUnits } : day
        );
        setDays(updatedDays);
      }
    }
  };

  const handleAddDay = () => {
    const newDayNumber = days.length > 0 ? days[days.length - 1].id + 1 : 1; // Lấy id của ngày cuối cùng và tăng lên 1
    const newDay = {
      id: newDayNumber,
      units: [],
    };
    setDays([...days, newDay]);
  };

  const handleDeleteDay = (dayNumber) => {
    const updatedDays = days.filter((day) => day.id !== dayNumber);

    // Cập nhật lại id của các ngày dựa trên chỉ số index trong mảng gốc days
    const updatedDaysWithNewIds = updatedDays.map((day, index) => ({
      ...day,
      id: index + 1,
    }));

    setDays(updatedDaysWithNewIds);
  };

  return (
    <Box
      boxShadow='xl'
      borderBottomRadius='xl'
      pb='0.5%'
      borderTop='2px solid black'
    >
      {days.map((day) => (
        <AccordionDay
          key={day.id}
          dayNumber={day.id}
          onDelete={handleDeleteDay}
          onCountDeliveryTypeByDay={handleCountOptionDeliveryTypeByDay}
          onAddUnitToDay={handleAddUnitToDay}
        />
      ))}
      <Button
        onClick={handleAddDay}
        bg='#474748'
        variant='solid'
        display='flex'
        mt='1%'
        fontSize='lg'
        color='white'
        m='1%'
        h={8}
      >
        Add Day
      </Button>
    </Box>
  );
};
