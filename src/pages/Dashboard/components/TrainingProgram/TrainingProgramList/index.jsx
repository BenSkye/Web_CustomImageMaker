import React from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  Box,
  useToast,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/react";
import { TagLabel } from "@chakra-ui/react";
import { TagCloseButton } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { trainingProgramListController } from "@/core/services/TrainingProgram/trainingProgramListAPI";
import {
  setCurrentProgramPage,
  resetInitialState,
  setTrainingProgramList,
  setTotalElement,
  setTotalPage,
  setLastPage,
  setFirstPage,
  setSearchTags
} from '@/core/store/training-program-management/trainingProgramView';
import ProgramList from "@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/ProgramList";
import { BlackAddNewButton, RedImportButton } from "@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/Buttons";
import EditTrainingProgramModal from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/EditTrainingProgramModal';
import {
  setIsUpdating,
  resetInitialStateData,
  setIsAddSyllabus,
  setIsRemoveSyllabus,
  setSyllabusList,
  setTrainingSyllabusList,
  setProgramUpdate
} from '@/core/store/training-program-management/trainingProgramData';
import Header from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramList/components/Header';
import useAuthorization from '@/hooks/useAuthorization';

export const TrainingProgramList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentPage = useSelector((state) => state.trainingProgramView.page);
  const pageSize = useSelector((state) => state.trainingProgramView.size);
  const pageUpdate = useSelector((state) => state.trainingProgramView.update);
  const isUpdating = useSelector((state) => state.trainingProgramData.isUpdating);
  const updateStatus = useSelector((state) => state.trainingProgramView.updateStatus);
  const syllabusSearchString = useSelector((state) => state.trainingProgramView.syllabusSearchString);
  const modalIsOpen = useSelector((state) => state.trainingProgramView.modalIsOpen);
  const [currentSearchValue, setCurrentSearchValue] = React.useState('');
  const searchTags = useSelector((state) => state.trainingProgramView.searchTags);
  const totalPage = useSelector((state) => state.trainingProgramView.totalPage);
  const isAddSyllabus = useSelector((state) => state.trainingProgramData.isAddSyllabus);
  const isRemoveSyllabus = useSelector((state) => state.trainingProgramData.isRemoveSyllabus);
  const updateSyllabusId = useSelector((state) => state.trainingProgramData.updateSyllabusId);
  const trainingProgram = useSelector((state) => state.trainingProgramData.programData);
  const isProgramUpdate = useSelector((state) => state.trainingProgramData.programUpdate);
  const toast = useToast();
  const sortType = useSelector((state) => state.trainingProgramView.sortType);
  const sortAsc = useSelector((state) => state.trainingProgramView.sortAsc);
  const { trainingProgramPermission } = useSelector(
    (state) => state.permissionList.data
  );

  const { isAccessible } = useAuthorization(trainingProgramPermission);

  const handleLoadProgramAfterUpdate = () => {
    if (isProgramUpdate === true) {
      loadTrainingPrograms();
      dispatch(setProgramUpdate(false));
    }
  }

  React.useEffect(() => {
    handleLoadProgramAfterUpdate();
  }, [isProgramUpdate]);

  const handleLoadTrainingSyllabusList = () => {
    trainingProgramListController.getTrainingProgramSyllabus(trainingProgram.id)
      .then((res) => {
        dispatch(setTrainingSyllabusList(res.data.listSyllabus));
      })
      .catch((err) => {
        dispatch(setTrainingSyllabusList([]));
      })
  }

  React.useEffect(() => {
    handleLoadTrainingSyllabusList();
  }, [modalIsOpen]);

  const handleAddSyllabus = () => {
    if (isAddSyllabus === true) {
      try {
        const response = trainingProgramListController.addTrainingProgramSyllabus(trainingProgram.id, updateSyllabusId)
          .then((res) => {
            if (res.trainingProgramInfo) {
              <Wrap>
                <WrapItem>
                  {toast({
                    title: (t('Syllabus added successfully')),
                    position: 'top-right',
                    isClosable: true,
                    duration: 5000,
                    status: 'success'
                  })}
                </WrapItem>
              </Wrap>
            } else {
              <Wrap>
                <WrapItem>
                  {toast({
                    title: (t('An error occurred while adding syllabus.')),
                    description: res.message === 'Duplicate Syllabus'? (t('Duplicate Syllabus')) : res.message,
                    position: 'top-right',
                    isClosable: true,
                    duration: 5000,
                    status: 'error'
                  })}
                </WrapItem>
              </Wrap>
            }
          })
          .catch((err) => {
            throw err
          })

      } catch (error) {
        <Wrap>
          <WrapItem>
            {toast({
              title: (t('An error occurred while adding syllabus.')),
              description: error.message,
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error'
            })}
          </WrapItem>
        </Wrap>
      }
      dispatch(setIsAddSyllabus(false));
    }
  }

  React.useEffect(() => {
    handleAddSyllabus();
    handleLoadTrainingSyllabusList();
    loadTrainingPrograms();
  }, [isAddSyllabus]);

  const handleRemoveSyllabus = () => {
    if (isRemoveSyllabus === true) {
      try {
        const response = trainingProgramListController.removeTrainingProgramSyllabus(trainingProgram.id, updateSyllabusId)
          .then((res) => {
            if (res.data) {
              <Wrap>
                <WrapItem>
                  {toast({
                    title: (t('Syllabus removed successfully')),
                    position: 'top-right',
                    isClosable: true,
                    duration: 5000,
                    status: 'success'
                  })}
                </WrapItem>
              </Wrap>
            } else {
              <Wrap>
                <WrapItem>
                  {toast({
                    title: (t('An error occurred while removing syllabus.')),
                    description: res.message,
                    position: 'top-right',
                    isClosable: true,
                    duration: 5000,
                    status: 'error'
                  })}
                </WrapItem>
              </Wrap>
            }
          })
          .catch((err) => {
            throw err
          })

      } catch (error) {
        <Wrap>
          <WrapItem>
            {toast({
              title: (t('An error occurred while removing syllabus.')),
              description: error.message,
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error'
            })}
          </WrapItem>
        </Wrap>
      }
      dispatch(setIsRemoveSyllabus(false));
    }
  }

  React.useEffect(() => {
    handleRemoveSyllabus();
    handleLoadTrainingSyllabusList();
    loadTrainingPrograms();
  }, [isRemoveSyllabus]);

  const handleUpdateTrainingProgram = () => {
    if (isUpdating === true) {
      if (trainingProgram.generalInformation === '' || trainingProgram.generalInformation === undefined || trainingProgram.generalInformation.trim().length === 0) {
        <>
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('Please enter general information')),
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
              })}
            </WrapItem>
          </Wrap>
        </>
      } else { 
      trainingProgramListController.updateTrainingProgram(trainingProgram.id, trainingProgram.startTime, trainingProgram.topicCode, trainingProgram.generalInformation, trainingProgram.status)
        .then((res) => {
          <>
            <Wrap>
              <WrapItem>
                {toast({
                  title: (t('Training program updated successfully')),
                  position: 'top-right',
                  isClosable: true,
                  duration: 5000,
                  status: 'success'
                })}
              </WrapItem>
            </Wrap>
          </>
        })
        .catch((err) => {
          throw err
        })
    }
    dispatch(setIsUpdating(false));
  }
}

React.useEffect(() => {
  handleUpdateTrainingProgram();
}, [isUpdating]);

React.useEffect(() => {
  resetInitialStateData();
}, [dispatch]);

const loadSearchedSyllabusList = () => {
  if (syllabusSearchString.length > 0 && syllabusSearchString !== ' ' && modalIsOpen) {
    trainingProgramListController.searchSyllabus(syllabusSearchString)
      .then((res) => {
        const data = res.data;
        dispatch(setSyllabusList(data.content));
      })
      .catch((err) => {
        dispatch(setSyllabusList([]));
      });
  }
  else {
    dispatch(setSyllabusList([]));
  }
}

React.useEffect(() => {
  loadSearchedSyllabusList();
}, [syllabusSearchString]);

React.useEffect(() => {
  dispatch(resetInitialState());
  dispatch(resetInitialStateData());
  loadTrainingPrograms();
}, [dispatch]);

React.useEffect(() => {
  loadTrainingPrograms();
}, []);

React.useEffect(() => {
  loadTrainingPrograms();
}, [sortType, sortAsc]);

const loadTrainingPrograms = () => {
  let sortLevel = '';
  if (sortAsc){
    sortLevel = 'asc';
  } else {
    sortLevel = 'desc';
  }
  const field = sortType + ',' + sortLevel;
  if (searchTags.length > 0) {
    trainingProgramListController.searchTrainingProgramList(searchTags, pageSize, currentPage, field)
      .then((res) => {
        const data = res.data;
        dispatch(setTrainingProgramList(data.content));
        dispatch(setTotalElement(data.totalElement));
        dispatch(setTotalPage(data.totalPage));
        dispatch(setLastPage(data.lastPage));
        dispatch(setFirstPage(data.firstPage));
      })
      .catch((err) => {
        dispatch(setTrainingProgramList([]));
      });
  }
  else {
    trainingProgramListController.getTrainingProgramList(pageSize, currentPage, field)
      .then((res) => {
        const data = res.data;
        dispatch(setTrainingProgramList(data.content));
        dispatch(setTotalElement(data.totalElement));
        dispatch(setTotalPage(data.totalPage));
        dispatch(setLastPage(data.lastPage));
        dispatch(setFirstPage(data.firstPage));
      })
      .catch((err) => {
        dispatch(setTrainingProgramList([]));
      });
  }
}

const handleRemoveSearchTags = (tagName) => {
  let tags = searchTags.filter((tag) => tag !== tagName);
  dispatch(setSearchTags(tags));
}

const handleAddSearchTags = (val) => {
  if (!searchTags.includes(val) && val !== '') {
    dispatch(setSearchTags(
      [...searchTags, val]
    ));
    setCurrentSearchValue('');
  } else {
    setCurrentSearchValue('');
  }
}

const handleSearchKeyDown = (key) => {
  if (key === 'Enter') {
    handleAddSearchTags(currentSearchValue);
  }
}

React.useEffect(() => {
  loadTrainingPrograms();
  if (currentPage < 0 || currentPage > totalPage) {
    dispatch(setCurrentProgramPage(0));
  }
}, [searchTags, isUpdating, updateStatus, pageUpdate, currentPage, pageSize]);

React.useEffect(() => {
  dispatch(setCurrentProgramPage(0));
}, [searchTags]);

return (
  <>
    {isAccessible.view === false ? (
        <Text
          aria-label='Access Denied'
          m={2}
          textAlign='left'
          mt={3}
          fontWeight='semibold'
          color={'red.400'}
        >
          {t('access_denied')}
        </Text>
      ) : (
        <>
    <Flex flexDirection='column' rowGap={3} width='100%'>
      <Header />
      <Flex width={'full'} flexDirection={'column'}>
        <Box width={'20rem'} textAlign={'left'}>
          <InputGroup borderRadius={5} size="sm">
            <InputLeftElement
              pointerEvents="none"
              children={<BsSearch color="gray.600" />}
            />
            <Input
              borderRadius={5}
              type="text"
              placeholder={t("Search by name and creator...")}
              border="1px solid #949494"
              value={currentSearchValue}
              onKeyDown={(e) => handleSearchKeyDown(e.key)}
              onChange={(e) => setCurrentSearchValue(e.target.value)}
            />
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

      {isAccessible.create  ? (
        <>
        <Flex justifyContent={'flex-end'} width={'full'}>
        <RedImportButton />
        <BlackAddNewButton />
      </Flex>
      </>
      )
      : (<></>)
      }
      
      <ProgramList />
      <EditTrainingProgramModal />
    </Flex>
    </>
    )}
  </>
);

}
