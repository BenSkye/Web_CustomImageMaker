import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { useTranslation } from 'react-i18next';

export const OtherTab = () => {
  const syllabusDetail = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const trainingUnit = useSelector(
    (state) => state.syllabusDetail.trainingUnitData
  );
  const { t } = useTranslation();
  const [assignmentCount, setAssignmentCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  });

  useEffect(() => {
    const countMap = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0
    };

    trainingUnit?.forEach((e) => {
      e?.contentList?.forEach((item) => {
        if (item.deliveryType in countMap) {
          countMap[item.deliveryType]++;
        }
      });
    });

    setAssignmentCount(countMap);
  }, [trainingUnit]);

  const calculatePercentage = (countMap) => {
    const totalCount = Object.values(countMap).reduce(
      (acc, val) => acc + val,
      0
    );
    const percentageMap = {};

    for (const key in countMap) {
      if (Object.hasOwnProperty.call(countMap, key)) {
        const count = countMap[key];
        const percentage = (count / totalCount) * 100;
        percentageMap[key] = percentage.toFixed(2); // Round to 2 decimal places
      }
    }

    return percentageMap;
  };

  const percentageMap = calculatePercentage(assignmentCount);

  const series = [
    assignmentCount['1'],
    assignmentCount['2'],
    assignmentCount['3'],
    assignmentCount['4'],
    assignmentCount['5'],
    assignmentCount['6']
  ];
  const options = {
    chart: {
      width: 500,
      type: 'pie',
    },
    labels: [
      `${t('Assignment/Lab')} (${
        percentageMap[1] !== 'NaN' ? percentageMap[1] : 0
      })%`,
      `${t('Concept/Lecture')} (${
        percentageMap[2] !== 'NaN' ? percentageMap[2] : 0
      })%`,
      `${t('Guide/Preview')} (${
        percentageMap[3] !== 'NaN' ? percentageMap[3] : 0
      })%`,
      `${t('Test/Quiz')} (${
        percentageMap[4] !== 'NaN' ? percentageMap[4] : 0
      })%`,
      `${t('Exam')} (${percentageMap[5] !== 'NaN' ? percentageMap[5] : 0})%`,
      `${t('Seminar/Workshop')} (${percentageMap[6] !== 'NaN' ? percentageMap[6] : 0})%`,
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };
  return (
    <>
      <Flex>
        <Flex w={'45%'} justify='center' align='flex-start'>
          <Box
            borderWidth='1px'
            borderRadius='xl'
            borderColor='black'
            overflow='hidden'
            h={'100%'}
            w={'100%'}
            flex={'1'}
          >
            <Box w={'100%'} bg='#2D3748'>
              <h6
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                {t('timeAllocation')}
              </h6>
            </Box>
            <Box display={'flex'} justifyContent={'center'} w={'100%'} py={5}>
              <ReactApexChart
                options={options}
                series={series}
                type='pie'
                width={450}
              />
            </Box>
          </Box>
        </Flex>

        <Box
          flex={'1'}
          w={'45%'}
          ml={5}
          borderWidth='1px'
          borderRadius='xl'
          borderColor='black'
          overflow='hidden'
        >
          <Box bg='#2D3748'>
            <h6
              style={{
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              {t('assessment_scheme')}
            </h6>
            <Flex bg={'white'} direction={'column'}>
              <Box py={5} px={6}>
                <Grid
                  py={5}
                  px={6}
                  borderRadius={'10px'}
                  border={'1px solid black'}
                  templateColumns='repeat(2, 1fr)'
                  gap={6}
                >
                  <GridItem w='100%'>
                    <Text>
                      <span style={{ fontWeight: 'bolder' }}>{t('Quiz')}</span>
                      <span style={{ fontStyle: 'italic', marginLeft: 15 }}>
                        {syllabusDetail?.assessmentScheme?.quiz}%
                      </span>
                    </Text>
                  </GridItem>
                  <GridItem w='100%'>
                    <Text>
                      <span style={{ fontWeight: 'bolder' }}>
                        {t('Assignment')}
                      </span>
                      <span style={{ fontStyle: 'italic', marginLeft: 15 }}>
                        {syllabusDetail?.assessmentScheme?.assignment}%
                      </span>
                    </Text>
                  </GridItem>
                  <GridItem w={'100%'}>
                    <Text>
                      <span style={{ fontWeight: 'bolder' }}>{t('Final')}</span>
                      <span style={{ fontStyle: 'italic', marginLeft: 15 }}>
                        {syllabusDetail?.assessmentScheme?.finalPoint}%
                      </span>
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
              <Box py={5} px={6}>
                <Grid
                  py={5}
                  px={6}
                  borderRadius={'10px'}
                  border={'1px solid black'}
                  templateColumns='repeat(1, 1fr)'
                  gap={6}
                >
                  <GridItem w='100%'>
                    <Text>{t('passing_criteria')}</Text>
                  </GridItem>
                  <GridItem w='100%'>
                    <Text>
                      <span style={{ fontWeight: 'bolder' }}>GPA*</span>
                      <span style={{ fontStyle: 'italic', marginLeft: 15 }}>
                        {syllabusDetail?.assessmentScheme?.gpa}%
                      </span>
                    </Text>
                  </GridItem>
                </Grid>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box w={'10%'}></Box>
      </Flex>
      <Box
        flex={'1'}
        w={'90%'}
        mt={5}
        borderWidth='1px'
        borderRadius='xl'
        borderColor='black'
        overflow='hidden'
      >
        <Box bg='#2D3748'>
          <h6
            style={{
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {t('training_delivery_principle')}
          </h6>
        </Box>
        <Box w={'100%'} py={5} px={5}>
          <div
            style={{ padding: '0 15px' }}
            dangerouslySetInnerHTML={{
              __html: syllabusDetail?.trainingPrinciples,
            }}
          ></div>
        </Box>
      </Box>
    </>
  );
};
