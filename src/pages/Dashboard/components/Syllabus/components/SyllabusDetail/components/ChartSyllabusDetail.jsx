import ReactApexChart from 'react-apexcharts';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export const ChartSyllabusDetail = () => {
  const { t } = useTranslation();
  const trainingUnit = useSelector(
    (state) => state.syllabusDetail.trainingUnitData
  );
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

  const series = [
    assignmentCount['1'],
    assignmentCount['2'],
    assignmentCount['3'],
    assignmentCount['4'],
    assignmentCount['5'],
    assignmentCount['6'],
  ];
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
        percentageMap[key] = percentage.toFixed(2);
      }
    }

    return percentageMap;
  };

  const percentageMap = calculatePercentage(assignmentCount);

  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    legend: {
      position: 'bottom',
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
      `${t('Seminar/Workshop')} (${
        percentageMap[6] !== 'NaN' ? percentageMap[6] : 0
      })%`,
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
      <Box
        borderWidth='1px'
        borderRadius='xl'
        borderColor='black'
        overflow='hidden'
        w={'full'}
      >
        <Box bg='#2D3748'>
          <h6
            style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
          >
            {t('timeAllocation')}
          </h6>
        </Box>
        <Box display={'flex'} justifyContent={'center'} w={'100%'}>
          <ReactApexChart
            options={options}
            series={series}
            type='pie'
            width={'355'}
          />
        </Box>
      </Box>
    </>
  );
};
