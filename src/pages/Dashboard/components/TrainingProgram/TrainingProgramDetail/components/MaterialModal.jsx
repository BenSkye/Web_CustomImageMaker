import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { MdOutlineSnippetFolder, MdOutlineEdit } from 'react-icons/md';
import { TbTrashX } from 'react-icons/tb';
import { trainingProgramController } from '@/core/services/TrainingProgram/trainingProgramAPI';
import { useTranslation } from 'react-i18next';

export const MaterialModal = ({ contentList, day, unit, unitName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const id = contentList?.contentId;
  const [material, setMaterial] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReRender, setIsReRender] = useState(false);
  const fileInputRef = useRef();
  const fileUpdateRef = useRef({});
  const { t } = useTranslation();
  const uploadFileToServer = async (contentId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await trainingProgramController.uploadFile(
        contentId,
        formData
      );
      return response;
    } catch (error) {
      return toast({
        title: error.message,
        position: 'top-right',
        isClosable: true,
        duration: 5000,
        status: `error`,
      });
    }
  };
  const updateFileToServer = async (materialId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response =
        await trainingProgramController.updateFileTrainingMaterial(
          materialId,
          formData
        );
      return response;
    } catch (error) {
      return toast({
        title: error.message,
        position: 'top-right',
        isClosable: true,
        duration: 5000,
        status: `error`,
      });
    }
  };
  const handleUploadFile = async (event) => {
    const file = event.target.files[0];
    try {
      setUploading(true);
      const response = await uploadFileToServer(id, file);
      if (response) {
        setIsReRender((reRender) => !reRender);
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: `${
                  response.message ? t('File Invalid') : t('Upload file success')
                }`,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: `${response.message ? 'error' : 'success'}`,
              })}
            </WrapItem>
          </Wrap>
        );
      }
      if (!response) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: t('File Invalid'),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'warning',
              })}
            </WrapItem>
          </Wrap>
        );
      }
    } catch (error) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: t('File Invalid'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            })}
          </WrapItem>
        </Wrap>
      );
    } finally {
      setUploading(false);
    }
  };
  const handleUpdateFile = async (materialId, file) => {
    try {
      setUploading(true);
      const response = await updateFileToServer(materialId, file);
      if (response) {
        setIsReRender((reRender) => !reRender);
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: `${
                  response.message ? t('File Invalid') : t('Upload file success')
                }`,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: `${response.message ? 'error' : 'success'}`,
              })}
            </WrapItem>
          </Wrap>
        );
      }
      if (!response) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: t('File Invalid'),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'warning',
              })}
            </WrapItem>
          </Wrap>
        );
      }
    } catch (error) {
      return (
        <Wrap>
          <WrapItem>
            {toast({
              title: t('File Invalid'),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error',
            })}
          </WrapItem>
        </Wrap>
      );
    } finally {
      setUploading(false);
    }
  };
  const handleDownloadFile = async (materialId, materialName) => {
    try {
      const blob = await trainingProgramController.downloadFile(materialId);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', materialName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      <Wrap>
        <WrapItem>
          {toast({
            title: `${error.message}`,
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'error',
          })}
        </WrapItem>
      </Wrap>;
    }
  };
  const deleteMaterial = async (materialId) => {
    setLoading(true);
    try {
      const response = await trainingProgramController.deleteTrainingMaterial(
        materialId
      );
      if (response) {
        setLoading(false);
        setIsReRender((reRender) => !reRender);
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: `${
                  response.message ? response.message : t('Delete file success')
                }`,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: `${response.message ? 'error' : 'success'}`,
              })}
            </WrapItem>
          </Wrap>
        );
      }
      if (!response) {
        setLoading(false);
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: `${response.message}`,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'warning',
              })}
            </WrapItem>
          </Wrap>
        );
      }
    } catch (error) {
      <Wrap>
        <WrapItem>
          {toast({
            title: `${error.message}`,
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'error',
          })}
        </WrapItem>
      </Wrap>;
    }
  };
  const convertDateFormat = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };
  useEffect(() => {
    if (isOpen) {
      const fetchMaterialData = async (contentId) => {
        const response =
          await trainingProgramController.getListOfTrainingMaterail(contentId);
        setMaterial(response);
      };
      if (id) {
        fetchMaterialData(id);
      }
      const forReRender = async () => {
        const reRender =
          await trainingProgramController.getListOfTrainingMaterail(id);
        setMaterial(reRender);
      };
      if (!isReRender && id) {
        forReRender();
      }
    }
  }, [id, isOpen, isReRender]);

  return (
    <>
      <Button
        onClick={onOpen}
        p={0}
        _hover={'none'}
        h={'full'}
        bg={'none'}
        mx={'auto'}
        color='#2D3748'
      >
        <MdOutlineSnippetFolder name='icon' size={'2em'} />
      </Button>
      <Modal size={'3xl'} isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderBottomRadius={'20px'}>
          <ModalHeader textColor={'white'} bgColor={'#2D3748'}>
            {t('day')} {day}
          </ModalHeader>
          <ModalCloseButton
            border={'solid 2px white'}
            borderRadius={'50%'}
            textColor={'white'}
          />
          <ModalBody>
            <Flex fontSize={'xl'}>
              <Box w={'20%'}>
                <Text fontWeight={'bold'}>
                  {t('Unit')} {unit}
                </Text>
              </Box>
              <Box w={'80%'}>
                <Text fontWeight={'bold'}>{unitName}</Text>
              </Box>
            </Flex>
            <Stack mt={5} p={2} bgColor={'#f3f3f3'} textAlign={'left'}>
              <Text fontWeight={'bold'} fontSize={'md'}>
                {contentList?.contentName}
              </Text>
              {material?.map((e) => (
                <Flex key={e?.trainingMaterialId} w={'100%'} fontSize={'md'}>
                  <Box w={'45%'}>
                    <Text
                      onClick={() =>
                        handleDownloadFile(e?.trainingMaterialId, e?.fileName)
                      }
                      textDecoration={'underline'}
                      p={0}
                      color={'blue'}
                      fontStyle={''}
                      cursor='pointer'
                      _hover={{ cursor: 'pointer' }}
                    >
                      {e?.fileName}
                    </Text>
                  </Box>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'right'}
                    textAlign={'right'}
                    w={'41%'}
                  >
                    <Text width={'fit-content'} fontStyle={'italic'}>
                      {t('by')} {e?.createBy} {t('in')}{' '}
                      {convertDateFormat(e?.createdDate)}
                    </Text>
                  </Box>
                  <Box textAlign={'center'} w={'7%'}>
                    <Input
                      type='file'
                      onChange={(event) =>
                        handleUpdateFile(
                          e?.trainingMaterialId,
                          event.target.files[0]
                        )
                      }
                      ref={(ref) =>
                        (fileUpdateRef.current[e?.trainingMaterialId] = ref)
                      }
                      hidden
                    />
                    <Button
                      p={0}
                      _hover={'none'}
                      color={'#265b97'}
                      h={'full'}
                      bg={'none'}
                      onClick={() =>
                        fileUpdateRef.current[e?.trainingMaterialId].click()
                      }
                    >
                      <MdOutlineEdit size={'30px'} />
                    </Button>
                  </Box>
                  <Box textAlign={'center'} w={'7%'}>
                    <Button
                      onClick={() => deleteMaterial(e?.trainingMaterialId)}
                      p={0}
                      _hover={'none'}
                      color={'#265b97'}
                      h={'full'}
                      bg={'none'}
                    >
                      <TbTrashX size={'30px'} />
                    </Button>
                  </Box>
                </Flex>
              ))}
              {uploading && (
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='lg'
                />
              )}
              {loading && (
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='lg'
                />
              )}
            </Stack>
            <Flex>
              <Input
                type='file'
                onChange={handleUploadFile}
                ref={fileInputRef}
                hidden
              />
              <Button
                bgColor={'#323232'}
                color={'white'}
                my={3}
                mx={'auto'}
                onClick={() => fileInputRef.current.click()}
                _hover={'none'}
              >
                {t('Upload')}
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
