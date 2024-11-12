import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Input,
  Select,
  Switch,
  FormLabel,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';

export const AddCardModal = ({
  newCardContent,
  handleChange,
  handleSaveCard,
  closeAddCardModal,
}) => {
  const [formErrors, setFormErrors] = useState({
    nameLession: false,
    hours: false,
    outputStandard: false,
    deliveryType: false,
  });

  const validateField = (fieldName) => {
    let isValid = true;

    switch (fieldName) {
      case 'nameLession':
        isValid =
          newCardContent.nameLession &&
          newCardContent.nameLession.trim() !== '';
        break;
      case 'hours':
        isValid = newCardContent.hours && newCardContent.hours.trim() !== '';
        break;
      case 'outputStandard':
        isValid =
          newCardContent.outputStandard &&
          newCardContent.outputStandard.trim() !== '';
        break;
      case 'deliveryType':
        isValid =
          newCardContent.deliveryType &&
          newCardContent.deliveryType.trim() !== '';
        break;
      default:
        break;
    }

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: !isValid,
    }));

    return isValid;
  };

  const handleSave = () => {
    let isValid = true;

    Object.keys(newCardContent).forEach((key) => {
      if (!validateField(key)) {
        isValid = false;
      }
    });

    if (isValid) {
      handleSaveCard();
      closeAddCardModal();
    }
  };

  return (
    <Modal isOpen onClose={closeAddCardModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Card</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mt={2} flex='7' p='1' isInvalid={formErrors.nameLession}>
            <Input
              boxShadow='xl'
              value={newCardContent.nameLession}
              onChange={(e) => handleChange('nameLession', e.target.value)}
              onBlur={() => validateField('nameLession')}
              placeholder='Name Lession'
            />
            {formErrors.nameLession && (
              <FormErrorMessage>Name Lession is required</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={2} flex='3' p='1' isInvalid={formErrors.hours}>
            <Input
              boxShadow='xl'
              type='number'
              value={newCardContent.hours}
              onChange={(e) => handleChange('hours', e.target.value)}
              placeholder='Hours'
              onBlur={() => validateField('hours')}
            />
            {formErrors.hours && (
              <FormErrorMessage>Hours is required</FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            mt={2}
            flex='7'
            p='1'
            isInvalid={formErrors.outputStandard}
          >
            <Select
              boxShadow='xl'
              value={newCardContent.outputStandard}
              onChange={(e) => handleChange('outputStandard', e.target.value)}
              placeholder='Output standard'
              onBlur={() => validateField('outputStandard')}
            >
              <option value='1'>H4SD</option>
              <option value='2'>H3SS</option>
              <option value='3'>NCC1</option>
            </Select>
            {formErrors.outputStandard && (
              <FormErrorMessage>Output standard is required</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={2} flex='1' p='1' justifyContent='center'>
            <Switch
              boxShadow='xl'
              isChecked={newCardContent.isStatus}
              onChange={(e) => handleChange('isStatus', e.target.checked)}
              color='black'
              colorScheme='orange'
            />
            <FormLabel justifyContent='center' size='sm'>
              On/Off
            </FormLabel>
          </FormControl>

          <FormControl
            mt={2}
            flex='7'
            p='1'
            isInvalid={formErrors.deliveryType}
          >
            <Select
              boxShadow='xl'
              value={newCardContent.deliveryType}
              onChange={(e) => handleChange('deliveryType', e.target.value)}
              placeholder='Delivery Type'
              onBlur={() => validateField('deliveryType')}
            >
              <option value='1'> Assignment/Lab</option>
              <option value='2'> Concept/Lecture</option>
              <option value='3'> Guide/Review</option>
              <option value='4'> Test/Quiz</option>
              <option value='5'> Exam</option>
              <option value='6'> Seminar/Workshop</option>
            </Select>
            {formErrors.deliveryType && (
              <FormErrorMessage>Delivery Type is required</FormErrorMessage>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            _disabled={!Object.values(formErrors).every((error) => !error)}
            colorScheme='blue'
            mr={3}
            onClick={handleSave}
            cursor={
              Object.values(formErrors).every((error) => !error)
                ? 'pointer'
                : 'not-allowed'
            }
          >
            Save
          </Button>
          <Button onClick={closeAddCardModal}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
