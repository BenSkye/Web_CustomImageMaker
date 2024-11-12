import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  VStack,
  Text,
  Box,
  Flex,
  Select,
  Input,
  Textarea,
  Grid,
} from '@chakra-ui/react';
import { TextEditor } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/TextEditorQuill.jsx';

export const General = ({
  onLevelChange,
  onAttendeeNumberChange,
  onTechReqChange,
  onCourseObjChange,
}) => {
  const { t } = useTranslation();
  const handleLevelInputChange = (event) => {
    const value = event.target.value;
    // Handle level input change here
    onLevelChange(value);
  };

  const handleAttendeeNumberInputChange = (event) => {
    const value = event.target.value;
    // Handle attendee number input change here
    onAttendeeNumberChange(value);
  };

  const handleTechReqInputChange = (event) => {
    const value = event.target.value;
    // Handle technical requirement input change here
    onTechReqChange(value);
  };

  const handleCourseObjChange = (content) => {
    onCourseObjChange(content);
  };

  return (
    <>
      <form>
        <VStack spacing={4} align='stretch' boxShadow='xl' p='2%' borderRadius='lg'>
          <Box>
            <Grid
              templateColumns='max-content 1fr'
              columnGap='15px'
              alignItems='center'
            >
              <label htmlFor='level-select'>
                <Text fontSize='sm' as='b'>
                  {t('level')}
                </Text>
              </label>

              <Select
                id='level-select'
                boxShadow='md'
                placeholder={t('allLevels')}
                focusBorderColor='Black'
                onChange={handleLevelInputChange}
                w='30%'
              >
                <option value='Beginner'>Beginner</option>
                <option value='Intermediate'>Intermediate</option>
                <option value='Advance'>Advance</option>
              </Select>
            </Grid>
          </Box>
          <Box>
            <Grid
              templateColumns='max-content 1fr'
              columnGap='15px'
              alignItems='center'
            >
              <label htmlFor='attendee-number-input'>
                <Text fontSize='sm' as='b'>
                  {t('attendeeNumber')}
                </Text>
              </label>
              <Input
                id='attendee-number-input'
                type='number'
                size='sm'
                borderRadius='10'
                borderColor='silver.50'
                onChange={handleAttendeeNumberInputChange}
                w='30%'
              />
            </Grid>
          </Box>
          <Box>
            <Flex pb={2} alignItems='center'>
              <label htmlFor='tech-req-input'>
                <Text fontSize='sm' as='b'>
                  {t('technicalRequirement')}(s)
                </Text>
              </label>
            </Flex>
            <Textarea
              id='tech-req-input'
              rows={6}
              borderRadius={10}
              focusBorderColor='Black'
              borderColor='silver.50'
              onChange={handleTechReqInputChange}
            />
          </Box>
          <Box>
            <Flex pb={2} alignItems='center'>
              <label htmlFor='course-obj-editor'>
                <Text fontSize='sm' as='b'>
                  {t('courseObjects')}
                </Text>
              </label>
            </Flex>
            <Box width='100%'>
              <TextEditor
                id='course-obj-editor'
                textEditor={handleCourseObjChange}
              />
            </Box>
          </Box>
        </VStack>
      </form>
    </>
  );
};
