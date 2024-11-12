import React from "react";
import { useTranslation } from 'react-i18next'; // import useTranslation
import { BsSearch } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Button,
  Box,
  HStack,
  Tag,  
  TagLabel,
  TagCloseButton
 } from "@chakra-ui/react";

const SearchBar = () => {
  const { t } = useTranslation();

  return (
    <Flex width={'full'} flexDirection={'column'}>
      <Box width={'20rem'} textAlign={'left'}>
        <InputGroup borderRadius={5} size="sm">
          <InputLeftElement
            pointerEvents="none"
            children={<BsSearch color="gray.600" />}
          />
          <Input
            type="text"
            placeholder={t("Search by...")}
            border="1px solid #949494"
            value={currentSearchValue}
            onKeyDown={(e) => handleSearchKeyDown(e.key)}
            onChange={(e) => setCurrentSearchValue(e.target.value)}
          />
          <InputRightAddon
            p={0}
            border="none"
          >
            <Button
              name='Filter'
              data-testid='filter-button'
              type='button'
              borderRadius='12px'
              leftIcon={<IoFilter />}
              backgroundColor='#2D3748'
              color='#FFF'
              _hover={{ backgroundColor: '#2D3748', color: '#FFF' }}
              variant='solid'
            >
              {t('filter')}
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
      <Flex flex={1} mx={3} marginTop={3} flexDirection='row' alignItems='center' justifyContent='flex-start'>
        <HStack spacing={4}>
          {
            searchTags.map((tagName) => (
              <Tag
                size='md'
                key={tagName}
                borderRadius='full'
                variant='solid'
                backgroundColor='#474747'
                color='#FFF'
                height='32px'
              >
                <TagLabel>{tagName}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveSearchTags(tagName)} />
              </Tag>
            ))
          }
        </HStack>
      </Flex>
    </Flex>
  )
}

export default SearchBar