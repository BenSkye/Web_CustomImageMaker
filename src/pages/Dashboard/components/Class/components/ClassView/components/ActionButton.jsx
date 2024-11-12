import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { CiWarning } from 'react-icons/ci';
import { HiOutlineDuplicate } from 'react-icons/hi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { classAPIController } from '@/core/services/ClassAPI/classAPIController';
import { use } from 'i18next';
import { useNavigate } from 'react-router-dom';

export function FeatureButton({ feature, data, setUpdate }) {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteSubmit = (data) => {
    toast({
      id: 'delete-class',
      title: t('Delete class'),
      description: t('Pending...'),
      status: 'loading',
      position: 'top-right',
      duration: 9000,
      isClosable: true,
    });

    classAPIController
      .deleteClass(data.classId)
      .then((res) => {
        if (res.message) {
          toast.close('delete-class');
          toast({
            title: t('Delete class'),
            description: `Error: ${res.message}`,
            status: 'error',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        } else {
          setUpdate(true);
          toast.close('delete-class');
          toast({
            title: t('Delete class'),
            description: t('Delete class successfully!'),
            status: 'success',
            position: 'top-right',
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          id: 'delete-class',
          title: t('Delete class'),
          description: `Error: ${err}`,
          status: 'error',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      {data && data.classCode ? (
        <>
          <Button
            color='#2C5282'
            background='none'
            display='flex'
            justifyContent='start'
            alignItems='center'
            p='5px'
            onClick={() => {
              console.log(feature.name);
              if (feature.name === 'Edit class') {
                console.log(data.classId);
                navigate(`/dashboard/class/edit/${data.classId}`);
              } else {
                console.log('open');
                onOpen();
              }
            }}
            gap='10px'
            w='100%'
          >
            {feature.ic}
            <Text fontSize='1rem' ml='0.2rem'>
              {t(feature.name)}
            </Text>
          </Button>

          {feature.name === 'Delete class' && (
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    <Flex alignItems={'center'} gap={4}>
                      <CiWarning color='red' />
                      {t('Delete class')}
                    </Flex>
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    {t('Do you want to delete class')} "
                    {data.classCode ? data.classCode : ''}"?
                    <br />
                    {t('This class cannot be recovered after deletion!')}
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      {t('Cancel')}
                    </Button>
                    <Button
                      colorScheme='red'
                      onClick={() => {
                        handleDeleteSubmit(data);
                        onClose();
                      }}
                      ml={3}
                    >
                      {t('Delete')}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          )}

          {feature.name === 'Duplicate class' && (
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isCentered
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {t('Duplicate class')}
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    {t(
                      'Are you sure? You can not undo this action afterwards.'
                    )}
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      {t('Cancel')}
                    </Button>
                    <Button colorScheme='green' onClick={onClose} ml={3}>
                      {t('Done')}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default function ActionButton({ data, setUpdate }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const { t } = useTranslation();
  const features = [
    { name: 'Edit class', ic: <IoIosAddCircleOutline /> },
    { name: 'Delete class', ic: <HiOutlineDuplicate /> },
  ];
  return (
    <>
      <Popover
        size='md'
        isOpen={isOpen}
        onOpen={handleOpen}
        onClose={handleClose}
        placement='bottom-end'
      >
        <PopoverTrigger>
          <Button variant='outlined' name='MoreOptions'>
            <IoEllipsisHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            {features.map((feature, index) => (
              <FeatureButton
                key={`feature-${index}`}
                data={data}
                feature={feature}
                setUpdate={setUpdate}
              />
            ))}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}
