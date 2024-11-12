import React, { useEffect, useState } from 'react';

import ReactApexChart from 'react-apexcharts';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const PieChart = ({ onPercentageDeliveryType }) => {
  const { t } = useTranslation();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    // Parse chuỗi JSON từ prop onPercentageDeliveryType và cập nhật giá trị của series
    try {
      const percentageData = JSON.parse(onPercentageDeliveryType);
      const newSeries = Object.values(percentageData);
      setSeries(newSeries);
    } catch (error) {}
  }, [onPercentageDeliveryType]);

  const options = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: [
      'Assigment/Lab',
      'Concept/Lecture',
      'Guide/Preview',
      'Test/Quiz',
      'Exam',
      'Seminar/Workshop',
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
    colors: ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B'],
  };

  const evenlyDistributeData = (data) => {
    const total = data.reduce((acc, value) => acc + value, 0);
    if (total === 0) {
      const equalDistribution = Array(data.length).fill(1);
      return equalDistribution;
    }
    return data;
  };

  const evenlyDistributedSeries = evenlyDistributeData(series);

  return (
    <>
      <Box borderRadius='xl' boxShadow='xl' overflow='hidden'>
        <Box bg='#2D3748'>
          <h6 style={{ fontWeight: 'bold', color: 'white' }}>
            {t('timeAllocation')}
          </h6>
        </Box>
        <ReactApexChart
          options={options}
          series={evenlyDistributedSeries}
          type='pie'
          width={355}
        />
      </Box>
    </>
  );
};
