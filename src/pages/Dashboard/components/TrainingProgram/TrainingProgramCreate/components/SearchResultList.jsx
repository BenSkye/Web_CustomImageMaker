import { React } from 'react';
import { Box, Flex, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { setAddSyllabus, setUpdateSyllabusId } from '@/core/store/training-program-management/trainingProgramCreate';
import { useTranslation } from 'react-i18next';



const SearchResultList = () => {
  const searchSyllabusList = useSelector((state) => state.trainingProgramCreate.searchSyllabusList);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSuggestionClick = (id) => {
    dispatch(setAddSyllabus(true));
    dispatch(setUpdateSyllabusId(id));
  }

  return (
    <Box
      width="100%"
      bg="#ffffff"
      border={searchSyllabusList?.length === 0 ? "none" : "1px solid #dfe1e5"}
      borderRadius="8px"
      boxShadow = {searchSyllabusList?.length === 0 ? "none" : "md"}
    >
      {searchSyllabusList?.map((suggestion, index) => (
        <Box
          key={index}
          px={4}
          py={3}
          cursor="pointer"
          _hover={{ bgColor: '#f5f5f5' }}
          onClick={() => handleSuggestionClick(suggestion.topicCode)}
          borderBottom="1px solid #dfe1e5" // Add a bottom border for separation
        >
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="bold">{suggestion.topicName}</Text>
            <Flex direction="column" alignItems="flex-end"> {/* Align metadata to the right */}
              <Text fontSize="sm" color="gray.500">{suggestion.modifiedDate}</Text>
              <Text fontSize="sm" color="gray.500">{t('Modified by')} {suggestion.modifiedBy}</Text>
            </Flex>
          </Flex>
        </Box>
      ))}
    </Box>

  )
};

export default SearchResultList;
