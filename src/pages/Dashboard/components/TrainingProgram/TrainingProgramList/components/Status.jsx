import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Flex
} from '@chakra-ui/react';

const ActiveStatus = () => {
  const { t } = useTranslation();
  return (
    <>
      <Flex as='b' background='#385898' width={'-webkit-fit-content'} color='#FFF' paddingX={2} paddingY={1} borderRadius={8}>{t('Active')}</Flex>
    </>
  )
}

const InactiveStatus = () => {
  const { t } = useTranslation();
  return (
    <>
      <Flex as='b' background='#edf2f7' width={'-webkit-fit-content'} color='#000000' paddingX={2} paddingY={1} borderRadius={8}>{t('Inactive')}</Flex>
    </>
  )
}

const DraftStatus = () => {
  const { t } = useTranslation();
  return (
    <>
      <Flex as='b' background='#3182ce' width={'-webkit-fit-content'} color='#000000' paddingX={2} paddingY={1} borderRadius={8}>{t('Draft')}</Flex>
    </>
  )
}

export { ActiveStatus, InactiveStatus, DraftStatus }