import React from 'react';
import { Center, Box, Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const {t} = useTranslation();

  return (
    <>
      <Center py={10}>
        <Box textAlign="center" fontSize="xl">
          <Heading>Oops!</Heading>
          <Text mt={4}>
            {t("This page haven't completed yet, please go back later.")}
          </Text>
        </Box>
      </Center>
    </>
  )
}
