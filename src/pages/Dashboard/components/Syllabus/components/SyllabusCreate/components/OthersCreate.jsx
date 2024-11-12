import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Flex,
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Text,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from '@chakra-ui/react';
import { TextEditor } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/TextEditorQuill.jsx';

export const Others = ({ onOthersDataChange }) => {
  const { t } = useTranslation();
  const [quizPercentage, setQuizPercentage] = useState();
  const [assignmentPercentage, setAssignmentPercentage] = useState();
  const [finalPercentage, setFinalPercentage] = useState();
  const [finalTheoryPercentage, setFinalTheoryPercentage] = useState();
  const [finalPracticePercentage, setFinalPracticePercentage] = useState();
  const [gpaPercentage, setGPAPercentage] = useState();
  const [editorContent, setEditorContent] = useState('');
  const [totalQuizzAssFinalError, setTotalQuizzAssFinalError] = useState('');
  const [totalTheoryPracticeError, setTotalTheoryPracticeError] = useState('');
  const [gpaPercentageError, setGpaPercentageError] = useState('');

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  useEffect(() => {
    const data = {
      quizPercentage,
      assignmentPercentage,
      finalPercentage,
      finalTheoryPercentage,
      finalPracticePercentage,
      gpaPercentage,
      editorContent,
    };
    onOthersDataChange(data);
  }, [
    quizPercentage,
    assignmentPercentage,
    finalPercentage,
    finalTheoryPercentage,
    finalPracticePercentage,
    gpaPercentage,
    editorContent,
    onOthersDataChange,
  ]);

  const handleBlur = () => {
    const totalQuizzAssFinal =
      parseInt(quizPercentage) +
      parseInt(assignmentPercentage) +
      parseInt(finalPercentage);
    const totalTheoryPractice =
      parseInt(finalTheoryPercentage) + parseInt(finalPracticePercentage);

    const isQuizzAssFinalFilled =
      quizPercentage !== '' &&
      assignmentPercentage !== '' &&
      finalPercentage !== '';
    const isTheoryPracticeFilled =
      finalTheoryPercentage !== '' && finalPracticePercentage !== '';
    const isGpaPercentageFilled = gpaPercentage !== '';

    if (isQuizzAssFinalFilled && totalQuizzAssFinal !== 100) {
      setTotalQuizzAssFinalError(
        'Total percentage of Quiz, Assignment, and Final should be 100%'
      );
    } else {
      setTotalQuizzAssFinalError('');
    }

    if (isTheoryPracticeFilled && totalTheoryPractice !== 100) {
      setTotalTheoryPracticeError(
        'Total percentage of Final Theory and Final Practice should be 100%'
      );
    } else {
      setTotalTheoryPracticeError('');
    }

    if (isGpaPercentageFilled && parseInt(gpaPercentage) > 100) {
      setGpaPercentageError('Percentage for GPA cannot exceed 100%');
    } else {
      setGpaPercentageError('');
    }
  };

  return (
    <Box>
      <Card boxShadow='xl'>
        <Box w='100%' h='35' bgColor='#4A5568' borderTopRadius='xl'>
          <Text as='b' color='white'>
            Assessment scheme
          </Text>
        </Box>
        <CardBody>
          <form>
            <Stack divider={<StackDivider borderColor='black' />} spacing='4'>
              <Flex direction='column'>
                <Flex
                  direction='row'
                  justifyContent='space-between'
                  flexWrap={{ base: 'wrap', md: 'nowrap' }}
                >
                  <FormControl mb={4} w='100' mr='10%'>
                    <Flex>
                      <FormLabel>
                        {t('quiz')}
                        <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Spacer w={14} />
                      <Input
                        boxShadow='lg'
                        w='50'
                        type='number'
                        min={0}
                        max={100}
                        value={quizPercentage}
                        onChange={(e) =>
                          setQuizPercentage(parseInt(e.target.value))
                        }
                        onBlur={handleBlur}
                      />
                      <Text
                        position='absolute'
                        right='5px'
                        top='50%'
                        transform='translateY(-50%)'
                      >
                        %
                      </Text>
                    </Flex>
                  </FormControl>
                  <FormControl mb={4} w='100' mr='10%'>
                    <Flex>
                      <FormLabel>
                        {t('assignment')}
                        <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Spacer w={14} />
                      <Input
                        boxShadow='lg'
                        w='50'
                        type='number'
                        min={0}
                        max={100}
                        value={assignmentPercentage}
                        onChange={(e) =>
                          setAssignmentPercentage(parseInt(e.target.value))
                        }
                        onBlur={handleBlur}
                      />
                      <Text
                        position='absolute'
                        right='5px'
                        top='50%'
                        transform='translateY(-50%)'
                      >
                        %
                      </Text>
                    </Flex>
                  </FormControl>
                  <FormControl w='100' mb={4} mr='10%'>
                    <Flex>
                      <FormLabel>
                        {t('final_exam')}
                        <span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Spacer w={14} />
                      <Input
                        boxShadow='lg'
                        w='50'
                        type='number'
                        min={0}
                        max={100}
                        value={finalPercentage}
                        onChange={(e) =>
                          setFinalPercentage(parseInt(e.target.value))
                        }
                        onBlur={handleBlur}
                      />
                      <Text
                        position='absolute'
                        right='5px'
                        top='50%'
                        transform='translateY(-50%)'
                      >
                        %
                      </Text>
                    </Flex>
                  </FormControl>
                </Flex>
                <Flex>
                  {totalQuizzAssFinalError && (
                    <Text color='red' fontSize='sm'>
                      {totalQuizzAssFinalError}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Flex direction='column'>
                <Flex justifyContent='space-between'>
                  <FormControl w='100' mb={4}>
                    <Flex>
                      <FormLabel>
                      {t('final_theory')}<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input
                        boxShadow='lg'
                        w='50'
                        type='number'
                        min={0}
                        max={100}
                        value={finalTheoryPercentage}
                        onChange={(e) =>
                          setFinalTheoryPercentage(parseInt(e.target.value))
                        }
                        onBlur={handleBlur}
                      />
                      <Text
                        position='absolute'
                        right='5px'
                        top='50%'
                        transform='translateY(-50%)'
                      >
                        %
                      </Text>
                    </Flex>
                  </FormControl>
                  <FormControl w='100' mb={4}>
                    <Flex>
                      <FormLabel>
                      {t('final_practice')}<span style={{ color: 'red' }}>*</span>
                      </FormLabel>
                      <Input
                        boxShadow='lg'
                        w='50'
                        type='number'
                        min={0}
                        max={100}
                        value={finalPracticePercentage}
                        onChange={(e) =>
                          setFinalPracticePercentage(parseInt(e.target.value))
                        }
                        onBlur={handleBlur}
                      />
                      <Text
                        position='absolute'
                        right='5px'
                        top='50%'
                        transform='translateY(-50%)'
                      >
                        %
                      </Text>
                    </Flex>
                  </FormControl>
                </Flex>
                <Flex>
                  {totalTheoryPracticeError && (
                    <Text fontSize='sm' color='red'>
                      {totalTheoryPracticeError}
                    </Text>
                  )}
                </Flex>
              </Flex>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Passing
                </Heading>
                <Flex>
                  <Box justifyContent='start'>
                    <FormControl w='100' mb={4}>
                      <Flex flex='start'>
                        <FormLabel>
                          GPA<span style={{ color: 'red' }}>*</span>
                        </FormLabel>
                        <Spacer w={14} />
                        <Input
                          boxShadow='lg'
                          w='50'
                          type='number'
                          min={0}
                          max={100}
                          value={gpaPercentage}
                          onChange={(e) =>
                            setGPAPercentage(parseInt(e.target.value))
                          }
                          onBlur={handleBlur}
                        />
                        <Text
                          position='absolute'
                          right='5px'
                          top='50%'
                          transform='translateY(-50%)'
                        >
                          %
                        </Text>
                      </Flex>
                    </FormControl>
                  </Box>
                  <Flex ml='2%' alignItems='center'>
                    {gpaPercentageError && (
                      <Text fontSize='sm' color='red'>
                        {gpaPercentageError}
                      </Text>
                    )}
                  </Flex>
                </Flex>
              </Box>
            </Stack>
          </form>
        </CardBody>
      </Card>
      <Box mt='2%' boxShadow='xl' bg='white' borderRadius='xl'>
        <Box w='100%' h='35' bgColor='#4A5568' borderTopRadius='xl'>
          <Text as='b' color='white'>
          {t('training_deleliver_principle')}
          </Text>
        </Box>
        <Box h='5'></Box>
        <Box m='2'>
          <TextEditor textEditor={handleEditorChange} />
        </Box>
        <Box h='2'></Box>
      </Box>
    </Box>
  );
};
