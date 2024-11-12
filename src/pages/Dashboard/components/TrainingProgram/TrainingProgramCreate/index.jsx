import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  useToast,
  Wrap,
  WrapItem,
  Flex,
  Divider,
  Text
} from '@chakra-ui/react';
import Header from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/Header';
import ProgramNameInput from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/ProgramNameInput';
import { SelectedOptions } from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SelectedOption';
import SearchBar from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SearchBar';
import { trainingProgramCreateController } from '@/core/services/TrainingProgram/trainingProgramCreateAPI';
import SearchResultList from '@/pages/Dashboard/components/TrainingProgram/TrainingProgramCreate/components/SearchResultList';
import {
  setTrainingProgramData,
  setTrainingSyllabusList,
  setSearchSyllabusList,
  setAddSyllabus,
  setUpdateSyllabusId,
  setRemoveSyllabus,
  resetInitialState,
  setTrainingProgramCreate,
  setTrainingProgramCreated,
  setUpdateProgram
} from '@/core/store/training-program-management/trainingProgramCreate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuthorization from '@/hooks/useAuthorization';

const TrainingProgramCreate = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const trainingProgramName = useSelector((state) => state.trainingProgramCreate.trainingProgramName);
  const searchTerm = useSelector((state) => state.trainingProgramCreate.searchTerm);
  const isAddSyllabus = useSelector((state) => state.trainingProgramCreate.isAddSyllabus);
  const updateSyllabusId = useSelector((state) => state.trainingProgramCreate.updateSyllabusId);
  const trainingProgramData = useSelector((state) => state.trainingProgramCreate.trainingProgramData);
  const isCreating = useSelector((state) => state.trainingProgramCreate.isCreating);
  const isRemoveSyllabus = useSelector((state) => state.trainingProgramCreate.isRemoveSyllabus);
  const isCreateClicked = useSelector((state) => state.trainingProgramCreate.isCreated);
  const toast = useToast();
  const isUpdateProgram = useSelector((state) => state.trainingProgramCreate.isUpdateProgram);

  const { trainingProgramPermission } = useSelector(
    (state) => state.permissionList.data
  );

  const { isAccessible } = useAuthorization(trainingProgramPermission);

  const addSyllabus = () => {
    if (isAddSyllabus === true) {
      try {
        const response = trainingProgramCreateController.addTrainingProgramSyllabus(trainingProgramData.id, updateSyllabusId)
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
      dispatch(setAddSyllabus(false));
    }
  }

  const loadTrainingProgramData = () => {
    trainingProgramCreateController.getTrainingProgramById(trainingProgramData.id)
      .then((res) => {
        dispatch(setTrainingProgramData(res));
      })
      .catch((err) => {
      })
  }

  const loadProgramAfterUpdate = () => {
    if (isUpdateProgram === true) {
      loadTrainingProgramData();
      dispatch(setUpdateProgram(false));
    }
  }

  React.useEffect(() => {
    loadProgramAfterUpdate();
  }, [isUpdateProgram]);

  React.useEffect(() => {
    loadTrainingProgramData();
  }, [isCreateClicked]);

  React.useEffect(() => {
    loadTrainingProgramData();
  }, [isAddSyllabus, isRemoveSyllabus]);

  const removeSyllabus = () => {
    if (isRemoveSyllabus === true) {
      try {
        const response = trainingProgramCreateController.removeTrainingProgramSyllabus(trainingProgramData.id, updateSyllabusId)
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
          })

      } catch (error) {
        <Wrap>
          <WrapItem>
            {toast({
              title:  (t('An error occurred while removing syllabus.')),
              description: error.message,
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error'
            })}
          </WrapItem>
        </Wrap>
      }
      dispatch(setRemoveSyllabus(false));
    }
  }

  const getSyllabusList = () => {
    if (trainingProgramData.id !== -1) {
      trainingProgramCreateController.getTrainingProgramSyllabus(trainingProgramData.id)
        .then((res) => {
          const data = res.data.listSyllabus;
          dispatch(setTrainingSyllabusList(data));
        })
        .catch(() => {
          alert('Failure when get syllabus list');
          dispatch(setTrainingSyllabusList([]));
        });
    }
  }

  React.useEffect(() => {
    getSyllabusList();
  }, [isAddSyllabus, isRemoveSyllabus, trainingProgramData]);

  React.useEffect(() => {
    dispatch(resetInitialState());
  }, [dispatch]);

  const handlaAddAndRemoveSyllabus = () => {
    if (isAddSyllabus || isRemoveSyllabus) {
      getSyllabusList();
      dispatch(setAddSyllabus(false));
      dispatch(setRemoveSyllabus(false));
      dispatch(setUpdateSyllabusId(-1));
    }
  }

  React.useEffect(() => {
    if (searchTerm.length > 0) {
      handleSearchResult();
    } else {
      dispatch(setSearchSyllabusList([]));
    }
  }, [searchTerm]);

  const handleSearchResult = () => {
    trainingProgramCreateController.searchSyllabus(searchTerm)
      .then((res) => {
        const data = res.data;
        dispatch(setSearchSyllabusList(data.content));
      })
      .catch(() => {
        alert('Failure when search syllabus')
      });
  };

  const handleCreateTrainingProgram = () => {
    if (isCreating) {
      if (trainingProgramName.trim().length !== 0) {
        try {
          trainingProgramCreateController.createTrainingProgram(trainingProgramName)
            .then((res) => {
              if (res.id) {
                <Wrap>
                  <WrapItem>
                    {toast({
                      title: (t('Training program created successfully.')),
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
                      title: (t('An error occurred while creating program.')),
                      description: res.message,
                      position: 'top-right',
                      isClosable: true,
                      duration: 5000,
                      status: 'error'
                    })}
                  </WrapItem>
                </Wrap>
              }
              dispatch(setTrainingProgramData(res));
              dispatch(setTrainingProgramCreated(true));
            })
            .catch(() => {
              alert('Failure when create program')
            });
        } catch (error) {
          <Wrap>
            <WrapItem>
              {toast({
                title: (t('An error occurred while creating program.')),
                description: error.message,
                position: 'top-right',
                isClosable: true,
                duration: 5000,
                status: 'error'
              })}
            </WrapItem>
          </Wrap>
        }
      } else {
        <Wrap>
          <WrapItem>
            {toast({
              title: (t('Please enter training program name.')),
              position: 'top-right',
              isClosable: true,
              duration: 5000,
              status: 'error'
            })}
          </WrapItem>
        </Wrap>
      }
    }
    dispatch(setTrainingProgramCreate(false));
  };

  const handleSaveButton = () => {
    dispatch(resetInitialState());
    dispatch(setTrainingProgramCreated(false));
    navigate(`/dashboard/training-program/${trainingProgramData.id}`);
    return (
      <Wrap>
        <WrapItem>
          {toast({
            title: (t('Training program saved.')),
            position: 'top-right',
            isClosable: true,
            duration: 5000,
            status: 'success'
          })}
        </WrapItem>
      </Wrap>
    )
  };

  React.useEffect(() => {
    if (isAddSyllabus) {
      addSyllabus();
      handlaAddAndRemoveSyllabus();
    }
  }, [isAddSyllabus]);

  React.useEffect(() => {
    if (isRemoveSyllabus) {
      removeSyllabus();
      handlaAddAndRemoveSyllabus();
    }
  }, [isRemoveSyllabus]);

  React.useEffect(() => {
    handleCreateTrainingProgram();
  }, [isCreating]);


  return (
    <>
      {isAccessible.create === false ? (
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
      ) : (<>

      <Header />
      <ProgramNameInput />
      {isCreateClicked ?
        <>
          <Flex direction={'row'} width={'100%'} justifyItems={'stretch'}>
            <Flex direction={'row'} width={'50%'} justifyItems={'stretch'}>
              <SelectedOptions />
            </Flex>
            <Divider orientation='vertical'
              marginLeft={'10px'}
              marginRight={'10px'}
              borderWidth={'3px'}
              borderStyle={'solid'}
              borderColor={'#000000'}
            />
            <Flex direction={'row'} width={'50%'} justifyItems={'stretch'}>
              <Flex direction={'column'} width={'100%'}>
                <SearchBar />
                <SearchResultList />
              </Flex>
            </Flex>
          </Flex>

          <Button
            alignSelf={'flex-end'}
            marginRight={'20px'}
            marginTop={'20px'}
            bg={'green.500'}
            color={'white'}
            onClick={handleSaveButton}
          >{t('Save')}</Button>
        </>
        :
        <></>
      }

      </>)}
    </>
  );
};

export default TrainingProgramCreate;
