import {
  Box,
  Stack,
  Text,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  Tooltip,
} from '@chakra-ui/react';
import { IoRadio } from 'react-icons/io5';
import { MdQuiz } from 'react-icons/md';
import { AiTwotoneBook } from 'react-icons/ai';
import { RiUserVoiceLine } from 'react-icons/ri';
import { TbHandThreeFingers } from 'react-icons/tb';
import { PiExam } from 'react-icons/pi';
import { MaterialModal } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/outline/ModalAddFolder.jsx';

export const CardDetails = ({ card, unitName, dayNumber }) => {
  const DeliveryTypeIcon = ({ value, size }) => {
    let icon = null;
    let tooltipLabel = '';

    switch (value) {
      case '1':
        icon = <AiTwotoneBook size={size} />;
        tooltipLabel = 'Assignment/Lab';
        break;
      case '2':
        icon = <RiUserVoiceLine size={size} />;
        tooltipLabel = 'Concept/Lecture';
        break;
      case '3':
        icon = <TbHandThreeFingers size={size} />;
        tooltipLabel = 'Guide/Review';
        break;
      case '4':
        icon = <MdQuiz size={size} />;
        tooltipLabel = 'Test/Quiz';
        break;
      case '5':
        icon = <PiExam size={size} />;
        tooltipLabel = 'Exam';
        break;
      case '6':
        icon = <IoRadio size={size} />;
        tooltipLabel = 'Seminar/Workshop';
        break;
      default:
        break;
    }

    return (
      <Tooltip label={tooltipLabel}>
        <div>{icon}</div>
      </Tooltip>
    );
  };

  const mapOutputStandard = (value) => {
    const outputMap = {
      1: 'H4SD',
      2: 'H3SS',
      3: 'NCC1',
    };
    return outputMap[value] || ''; // Trường hợp không khớp, trả về chuỗi rỗng
  };

  return (
    <Stack spacing='2' key={card.id} my='1%'>
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
                        {mapOutputStandard(card.outputStandard)}
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
                      {card.isStatus ? (
                        <Flex
                          h='100%'
                          color='black'
                          bgColor='yellow.200'
                          borderRadius='3xl'
                          alignItems='center'
                          justifyContent='center'
                          fontSize='xl'
                          as='b'
                        >
                          Online
                        </Flex>
                      ) : (
                        <Flex
                          h='100%'
                          color='black'
                          bgColor='orange.500'
                          borderRadius='3xl'
                          alignItems='center'
                          justifyContent='center'
                          fontSize='xl'
                          as='b'
                        >
                          Offline
                        </Flex>
                      )}
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
                          <MaterialModal
                            contentList={card} // Pass necessary props to MaterialModal
                            day={dayNumber} // Pass necessary props to MaterialModal
                            unitName={unitName} // Pass necessary props to MaterialModal
                          />
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
  );
};
