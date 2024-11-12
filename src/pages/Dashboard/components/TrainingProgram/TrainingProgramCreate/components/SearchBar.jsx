import React from 'react';
import { useState } from 'react';
import {
  Text,
  Flex,
  Menu,
  InputGroup,
  Input,
  InputLeftElement,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Spacer,
  ButtonGroup
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '@/core/store/training-program-management/trainingProgramCreate';


const SearchBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.trainingProgramCreate.searchTerm);

  return (
    <>
      <Flex flexDirection="row" 
      width={'-webkit-fill-available'}
      marginRight={'20px'}>
        <Text fontWeight={600} marginRight="2rem">
          {t('Select Syllabus')}
        </Text>
        <Flex flexGrow={1} width="100%">
          <InputGroup width={"100%"} borderRadius="12px">
            <InputLeftElement pointerEvents="none">
              <IoMdSearch color="#2D3748" />
            </InputLeftElement>
            <Input
              borderRadius="12px"
              type="text"
              placeholder={t('Search by name...')}
              width="100%"
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
          </InputGroup>
        </Flex>
      </Flex>

    </>
  )
}

export default SearchBar;