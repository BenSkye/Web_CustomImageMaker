import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  useDisclosure,
  useToast, // Import the useToast hook
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineUpload } from 'react-icons/md';
import syllabusController from '@/core/services/SyllabusServices/syllabusController';

const linkStyle = {
  textDecoration: 'underline',
  color: '#285D9A',
};

export const PopupModal = ({ isAccessible }) => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const toast = useToast(); // Initialize the useToast hook

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Check if the selected file is an Excel file
    if (file && file.name.endsWith('.xlsx')) {
      setSelectedFile(file);
    } else {
      // Handle invalid file type with a toast notification
      setSelectedFile(null);
      toast({
        title: t('invalid_file'),
        description: t('file_type_not_supported'),
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSelectButtonClick = () => {
    // Trigger the hidden file input
    document.getElementById('fileInput').click();
  };

  const handleSubmit = async () => {
    // Gather all input values
    const encodingType = document.getElementById('encodingType').value;
    const columnSeparator = document.getElementById('columnSeparator').value;
    const syllabusCodeCheckbox = document.getElementById('syllabusCodeCheckbox').checked;
    const syllabusNameCheckbox = document.getElementById('syllabusNameCheckbox').checked;
    const duplicateHandle = document.querySelector('input[name="duplicateHandle"]:checked').value;
    if (isAccessible.create) {
      if (selectedFile === null) {
        // Log gathered values to the console
        toast({
          title: t('file_is_not_selected'),
          description: t('file_is_not_selected_descr'),
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      await syllabusController
        .importSyllabusFile({ file: selectedFile })
        .then((res) => {
          toast({
            title: t('file_import_success'),
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          setSelectedFile(null);
        })
        .catch((err) => {
          toast({
            title: t('file_import_failed'),
            status: 'error',
            description: `${err.message}`,
            duration: 5000,
            isClosable: true,
            position: 'top-right',
          });
          setSelectedFile(null);
        });
    } else {
      toast({
        title: t('file_import_denied'),
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setSelectedFile(null);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        borderRadius='12px'
        onClick={onOpen}
        color={'white'}
        backgroundColor={'#D45B13'}
        _hover={{ backgroundColor: '#D45B13' }}
        aria-label='Import Button'
        mr={'0.5rem'}
      >
        {' '}
        <MdOutlineUpload fontSize={'1.2rem'} />
        <Text ml='0.4rem'>{t('import')}</Text>
      </Button>
      <Modal isCentered onClose={onClose} size={'xl'} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent borderTopRadius={'10px'}>
          <ModalHeader
            textAlign={'center'}
            color={'white'}
            borderTopRadius={'10px'}
            size='xl'
            bg={'#2D3748'}
          >
            <Text aria-label='Import Syllabus'>{t('import syllabus')}</Text>
          </ModalHeader>
          <ModalBody>
            <form style={{ display: 'flex', flexDirection: 'column' }}>
              <Flex justifyContent={'space-between'}>
                <Text fontWeight={630}>{t('import') + ' ' + t('settings')}</Text>
                <Flex flex={0.8}>
                  <FormControl>
                    <Flex gap={'1.6rem'} flexDir={'column'} alignItems='start'>
                      <Text fontWeight={'450'}>{t('file')} (xlsx)*</Text>
                      <Text fontWeight={'450'}>{t('encodingType')}</Text>
                      <Text fontWeight={'450'}>{t('columnSeparator')}</Text>
                      <Text fontWeight={'450'}>{t('importTemplate')}</Text>
                    </Flex>
                    <input
                      id='fileInput'
                      type='file'
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept='.xlsx'
                    />
                  </FormControl>
                  <FormControl>
                    <Flex flexDir={'column'} gap={'1.1rem'} alignItems='start'>
                      <Button
                        size={'sm'}
                        px='1.6rem'
                        bg={'#2D3748'}
                        color={'white'}
                        borderRadius={'10px'}
                        onClick={handleSelectButtonClick}
                      >
                        {selectedFile
                          ? selectedFile.name.length > 20
                            ? selectedFile.name.slice(0, 20) + '...'
                            : selectedFile.name
                          : t('select')}
                      </Button>
                      <Select
                        id='encodingType'
                        borderRadius={'5px'}
                        placeholder='Auto detect'
                        width={120}
                        size='sm'
                      />
                      <Select
                        id='columnSeparator'
                        borderRadius={'5px'}
                        placeholder='Comma'
                        width={120}
                        size='sm'
                      />
                      <Link
                        to='https://drive.google.com/drive/folders/1dwe0Xa0herUOlDqhNF3-pkvE7lm3gmGI?usp=sharing'
                        style={linkStyle}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        {t('download')}
                      </Link>
                    </Flex>
                  </FormControl>
                </Flex>
              </Flex>
              <hr style={{ margin: '10px' }} />
              <Flex justifyContent={'space-between'}>
                <Text fontWeight={630}>{t('duplicateControl')}</Text>
                <Flex flex={0.845} flexDir={'column'} gap={'1rem'}>
                  <FormControl>
                    <Flex gap={'1rem'} flexDir={'column'} alignItems='start'>
                      <Text fontWeight={'450'}>{t('scanning')}</Text>
                      <Stack gap={'1.5rem'} direction={'row'}>
                        <Checkbox id='syllabusCodeCheckbox' defaultChecked colorScheme='facebook'>
                          {t('syllabusCode')}
                        </Checkbox>
                        <Checkbox id='syllabusNameCheckbox'>{t('syllabusName')}</Checkbox>
                      </Stack>
                    </Flex>
                  </FormControl>
                  <FormControl>
                    <Flex gap={'1rem'} flexDir={'column'} alignItems='start'>
                      <Text fontWeight={'450'}>{t('duplicateHandle')}</Text>
                      <RadioGroup defaultValue='2'>
                        <Stack spacing={5} direction='row'>
                          <Radio colorScheme='facebook' value='1' name='duplicateHandle'>
                            {t('allow')}
                          </Radio>
                          <Radio colorScheme='facebook' value='2' name='duplicateHandle'>
                            {t('replace')}
                          </Radio>
                          <Radio colorScheme='facebook' value='3' name='duplicateHandle'>
                            {t('skip')}
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    </Flex>
                  </FormControl>
                </Flex>
              </Flex>
              <hr style={{ margin: '10px' }} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              textDecorationLine={'underline'}
              color='#E74A3B'
              variant={'link'}
              mr={6}
              onClick={onClose}
              borderRadius={'10px'}
              _hover={{ opacity: '0.2' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              borderRadius={'10px'}
              p={'0.5rem 1.5rem'}
              color={'white'}
              bg={'#2D3748'}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
