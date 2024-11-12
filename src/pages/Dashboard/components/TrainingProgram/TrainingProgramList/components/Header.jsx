import React from "react";
import { useTranslation } from "react-i18next";
import { Box } from '@chakra-ui/react';

const Header = () => {
  const { t } = useTranslation();
  return (
    <Box
      width="100%"
      bg="#2D3748"
      color="white"
      borderRadius="8px"
      p="4"
      textAlign="center"
      boxShadow="md"
      marginTop={'1rem'}
    >
      <h2>{t('TRAINING PROGRAM')}</h2>
    </Box>
  )

}

export default Header