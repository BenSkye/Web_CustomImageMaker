import React, { useState, useEffect, useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Box,
} from '@chakra-ui/react';

export const MPAlert = ({ type, message, isOpen, triggerClose }) => {
  const cancelRef = useRef();
  const [showAlert, setShowAlert] = useState(false);

  const onClose = () => {
    triggerClose()
  }

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert, onClose]);

  const alertColorScheme = {
    success: 'green',
    warning: 'orange',
    danger: 'red',
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay />
        
        <AlertDialogContent borderRadius='14px'>
          <AlertDialogHeader fontSize="x-large" fontWeight="semibold" color={alertColorScheme[type]}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Alert
          </AlertDialogHeader>
          <AlertDialogBody paddingTop={0} marginBottom={3}>
            <Box fontWeight="semibold">{message}</Box>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}