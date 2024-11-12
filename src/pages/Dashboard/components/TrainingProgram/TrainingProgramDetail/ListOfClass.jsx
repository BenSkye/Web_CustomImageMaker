import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export const ListOfClass = ({ listOfClass = [] }) => {
  const { t } = useTranslation();
  const getStatus = (status) => {
    switch (status) {
      case 0:
        return { color: 'blue', name: t('Planning') };
      case 1:
        return { color: 'green', name: t('Opening') };
      case 2:
        return { color: 'gray', name: t('Completed') };
      case 3:
        return { color: 'orange', name: t('Scheduled') };
      default:
        return '';
    }
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <>
      <TableContainer borderTopRadius={'15px'} background='#FAFAFA'>
        <Table variant='simple' fontSize='small'>
          <Thead>
            <Tr bgColor={'#2D3748'}>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                {t('class')}
              </Th>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                {t('class_code')}
              </Th>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                {t('created_on')}
              </Th>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                {t('created_by')}
              </Th>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                {t('duration')}
              </Th>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                {t('status')}
              </Th>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                {t('location')}
              </Th>
              <Th
                fontSize='medium'
                fontWeight='semibold'
                textTransform='none'
                color='#FFF'
              >
                FSU
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {listOfClass.length ? (
              listOfClass?.map((e) => (
                <Tr key={e?.id}>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                    data-testId='class-name'
                  >
                    <Link
                      to={`/dashboard/class/${e?.id}`}
                      style={{ borderBottom: '1px solid blue', color: 'blue' }}
                    >
                      {e?.className}
                    </Link>
                  </Td>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                    data-testId='class-code'
                  >
                    {e?.classCode}
                  </Td>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                    data-testId='class-create'
                  >
                    {e?.createDate}
                  </Td>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                    data-testId='class-by'
                  >
                    {e?.createBy?.name}
                  </Td>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                    data-testId='class-duration'
                  >
                    {e?.duration}
                  </Td>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                  >
                    <Badge
                      data-testid='custom-badge'
                      fontSize='small'
                      fontWeight='semibold'
                      textTransform='none'
                      minWidth='100px'
                      textAlign='center'
                      variant='solid'
                      px={3}
                      py={1}
                      borderRadius={'15px'}
                      colorScheme={getStatus(e.status).color}
                    >
                      {capitalizeFirstLetter(getStatus(e.status).name)}
                    </Badge>
                  </Td>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                    data-testId='class-location'
                  >
                    {e?.location}
                  </Td>
                  <Td
                    fontSize='medium'
                    fontWeight='semibold'
                    textTransform='none'
                    data-testId='class-fsu'
                  >
                    {e?.fsuEntity?.fsuName}
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={8}>
                  <Flex
                    flexDir={'column'}
                    w={'full'}
                    alignItems={'center'}
                    textAlign={'center'}
                    p={4}
                  >
                    <svg
                      width='140'
                      height='152'
                      viewBox='0 0 184 152'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <g fill='none' fillRule='evenodd'>
                        <g transform='translate(24 31.67)'>
                          <ellipse
                            fillOpacity='.8'
                            fill='#F5F5F7'
                            cx='67.797'
                            cy='106.89'
                            rx='67.797'
                            ry='12.668'
                          ></ellipse>
                          <path
                            d='M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z'
                            fill='#AEB8C2'
                          ></path>
                          <path
                            d='M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z'
                            fill='url(#linearGradient-1)'
                            transform='translate(13.56)'
                          ></path>
                          <path
                            d='M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z'
                            fill='#F5F5F7'
                          ></path>
                          <path
                            d='M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z'
                            fill='#DCE0E6'
                          ></path>
                        </g>
                        <path
                          d='M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z'
                          fill='#DCE0E6'
                        ></path>
                        <g transform='translate(149.65 15.383)' fill='#FFF'>
                          <ellipse
                            cx='20.654'
                            cy='3.167'
                            rx='2.849'
                            ry='2.815'
                          ></ellipse>
                          <path d='M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z'></path>
                        </g>
                      </g>
                    </svg>
                    <Text color={'gray'} w='full' fontSize='xl'>
                      {t('Empty content')}
                    </Text>
                    <Text color={'gray'} w={'full'} mt={2}>
                      {t('There are no item to display')}
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
