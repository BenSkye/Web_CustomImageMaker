import React from 'react';
import { Table, Thead, Tbody, Tr, Td, Flex, Text } from '@chakra-ui/react';
import { Task } from './Task';
import { useTranslation } from 'react-i18next';

const SectionTable = ({ section, sectionSchedule }) => {
  const timeSlots = Array.from(new Set(sectionSchedule.map((item) => item.time)));

  const allTasks = sectionSchedule.reduce((tasks, task) => {
    if (!tasks[task.time]) {
      tasks[task.time] = [];
    }
    tasks[task.time].push(task);
    return tasks;
  }, {});

  return (
    <Table display={'flex'} flexDir={'column'} align='start' variant='simple' mt={2} size={'sm'}>
      <Thead borderRadius={'12px'} bg={'#2D3748'}>
        <Text
          margin={'0.5rem'}
          textAlign={'left'}
          borderRadius={'12px'}
          bg={'#2D3748'}
          color={'white'}
        >
          {section}
        </Text>
      </Thead>
      <Tbody>
        {timeSlots.map((timeSlot) => (
          <Tr
            borderBottom={'1px solid #333'}
            display={'flex'}
            justifyContent={'space-between'}
            key={timeSlot}
          >
            <Td marginRight={'4rem'}>{timeSlot}</Td>
            <Td flex={0.8}>
              {allTasks[timeSlot] &&
                allTasks[timeSlot].map((task, index) => <Task key={index} task={task.task} />)}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

const DailySchedule = ({ data }) => {
  const { t } = useTranslation();

  const categorizeTasks = (tasks) => {
    const categorized = {
      morning: [],
      noon: [],
      night: [],
    };

    tasks.forEach((task) => {
      const taskTime = parseInt(task.time.split(':')[0]); // Extract the hour from the time

      if (taskTime >= 8 && taskTime < 12) {
        categorized.morning.push(task);
      } else if (taskTime >= 12 && taskTime < 17) {
        categorized.noon.push(task);
      } else {
        categorized.night.push(task);
      }
    });

    return categorized;
  };

  const schedule = categorizeTasks(data);

  return (
    <Flex width={'100%'} alignSelf={'start'} flexDir='column' p={4}>
      <SectionTable section={t('morning')} sectionSchedule={schedule.morning} />
      <SectionTable section={t('noon')} sectionSchedule={schedule.noon} />
      <SectionTable section={t('night')} sectionSchedule={schedule.night} />
    </Flex>
  );
};

export default DailySchedule;
