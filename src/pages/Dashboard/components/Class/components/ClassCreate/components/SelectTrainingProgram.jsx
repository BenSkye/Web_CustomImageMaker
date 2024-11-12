import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Text } from '@chakra-ui/react';

export default function SelectTrainingProgram({
  trainingProgramList,
  modal,
  setTrainingProgramSelect,
  shouldCloseModal,
  active,
  setActive,
}) {
  const { t } = useTranslation();

  return (
    <>
      {trainingProgramList.length > 0 &&
        trainingProgramList.map((item, index) => {
          const selected = index === active;
          return (
            <a>
              <Box
                id={`search-item-${index}`}
                as='li'
                aria-selected={selected ? true : undefined}
                onMouseEnter={() => {
                  setActive(index);
                }}
                onClick={() => {
                  if (shouldCloseModal) {
                    modal.onClose();
                  }
                  setTrainingProgramSelect(item);
                }}
                role='option'
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minH: 16,
                  mt: 2,
                  px: 4,
                  py: 2,

                  rounded: 'lg',
                  bg: 'gray.100',
                  '.chakra-ui-dark &': {
                    bg: 'gray.600',
                  },
                  _selected: {
                    bg: '#242c3a',
                    color: 'white',
                    mark: {
                      color: 'white',
                      textDecoration: 'underline',
                    },
                  },
                }}
              >
                <Box flex='1' ml='4'>
                  <Text fontWeight='bold' fontSize='md' opacity={0.7}>
                    {item.topicCode}
                  </Text>

                  <Text>
                    {item.duration} {t('days')} {item.createOn} {t('by')}{' '}
                    {item.createBy}
                  </Text>
                </Box>
              </Box>
            </a>
          );
        })}
    </>
  );
}
