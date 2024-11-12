import { useTranslation } from 'react-i18next';
import { Badge, Card, CardBody, Heading, Image, Text } from '@chakra-ui/react';

export default function ProgramCard({ item, index, trainingProgramSelect }) {
  const { t } = useTranslation();

  return (
    <>
      <Card
        shadow={'md'}
        key={index}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        h={'100px'}
        mt={5}
      >
        <Image
          objectFit='cover'
          maxW={{ base: '100%', sm: '200px' }}
          src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
          alt='Caffe Latte'
        />

        <CardBody
          display={'flex'}
          justifyContent={'space-evenly'}
          alignItems={'start'}
          flexDirection={'column'}
        >
          <Heading
            size='md'
            textAlign={'left'}
            display={'flex'}
            color={item.status === 1 ? '#2d3748' : '#b9b9b9'}
          >
            {item.topicName}
            <Badge
              ml={3}
              h={'100%'}
              px={4}
              variant='solid'
              bg={item.status === 1 ? '#2d3748' : '#b9b9b9'}
              display={'flex'}
              flexDir={'row'}
              alignItems={'center'}
            >
              {item.status === 1
                ? 'Active'
                : item.status === 2
                ? 'Inactive'
                : 'Draft'}
            </Badge>
          </Heading>
          <Text
            textAlign={'left'}
            fontSize={15}
            mt={4}
            fontWeight={'semibold'}
            color={item.status === 1 ? '#2d3748' : '#b9b9b9'}
          >
            v{item.version} |{' '}
            <strong>
              31 {t('days')} ( 91 {t('hrs')}) | {t('Modified on')}{' '}
            </strong>{' '}
            {trainingProgramSelect.modifyDate} {t('by')}{' '}
            {trainingProgramSelect.createBy}
          </Text>
        </CardBody>
      </Card>
    </>
  );
}
