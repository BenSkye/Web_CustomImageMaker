import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { trainingProgramController } from "@/core/services/TrainingProgram/trainingProgramAPI";
import { setDuplicateModal } from "@/core/store/training-program-management/trainingProgramDetail";

export const DuplicateButton = () => {
  const isDuplicate = useSelector(
    (state) => state.trainingProgramDetail.isTriggerModalDuplicate
  );
  const programDetail = useSelector(
    (state) => state.trainingProgramDetail.programDetailData
  );
  const dispatch = useDispatch();
  const cancelRef = React.useRef();
  const toast = useToast();
  const { t } = useTranslation();
  const handleDuplicateProgram = async (id) => {
    try {
      const response = await trainingProgramController.duplicateProgram(id);
      if (!response.data.message) {
        return (
          <Wrap>
            <WrapItem data-testId="toast-test">
              {toast({
                title: t('Duplicate successfully'),
                position: "top-right",
                isClosable: true,
                duration: 5000,
                status: "success",
              })}
            </WrapItem>
          </Wrap>
        );
      }
      if (response.data.message) {
        return (
          <Wrap>
            <WrapItem>
              {toast({
                title: t(response.data.message),
                position: "top-right",
                isClosable: true,
                duration: 5000,
                status: "error",
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
              title: t('Duplicate is failed'),
              position: "top-right",
              isClosable: true,
              duration: 5000,
              status: "error",
            })}
          </WrapItem>
        </Wrap>
      );
    } finally {
      dispatch(setDuplicateModal(false));
    }
  };
  return (
    <>
      <AlertDialog
        isOpen={isDuplicate}
        leastDestructiveRef={cancelRef}
        onClose={isDuplicate}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {t("duplicate_program")}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => dispatch(setDuplicateModal(false))}
              >
                {t('Cancel')}
              </Button>
              <Button
                colorScheme="green"
                onClick={() => handleDuplicateProgram(programDetail?.id)}
                ml={3}
              >
                {t('Yes')}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
