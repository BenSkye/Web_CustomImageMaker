import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
  Text,
  VStack,
  Spacer,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Divider,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { General } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/GeneralCreate.jsx';
import { Others } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/OthersCreate.jsx';
import { PieChart } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/Chart.jsx';
import { createSyllabusAPI } from '@/core/services/SyllabusServices/CreateSyllabusAPI.js';
import { createOthers } from '@/core/services/SyllabusServices/CreateSyllabusAPI.js';
import { createSyllabusUnitDetailAPI } from '@/core/services/SyllabusServices/UnitContentSyllabus.js';
import { DayList } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/outline/DayList';
import { PublishStatus } from '@/pages/Dashboard/components/Syllabus/components/SyllabusCreate/components/Constant.jsx';

export const SyllabusCreate = () => {
  const { t } = useTranslation();
  const [sliderValue, setSliderValue] = useState(25);
  const [syllabusName, setSyllabusName] = useState('');
  const [level, setLevel] = useState(1);
  const [attendeeNumber, setAttendeeNumber] = useState('');
  const [techReq, setTechReq] = useState('');
  const [courseObj, setCourseObj] = useState('');
  const [currentTab, setCurrentTab] = useState(0); // State lưu trữ tab hiện tại
  const [topicCode, setTopicCode] = useState(null);
  const [percentageDeliveryType, setPercentageDeliveryType] = useState([]);
  const [dataDays, setDataDays] = useState([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [isAllTabsFilled, setIsAllTabsFilled] = useState(true);
  const [clearGeneral, setClearGeneral] = useState(false); // State để quản lý việc clear trong lớp con

  const checkAllTabsFilled = () => {
    // Kiểm tra điều kiện tất cả các tab đều đã được điền đầy đủ
    // Đây chỉ là một ví dụ, bạn cần thay đổi điều kiện kiểm tra phù hợp với mã của bạn
    if (
      (syllabusName &&
        level &&
        attendeeNumber &&
        techReq &&
        courseObj &&
        dataDays.length > 0 &&
        othersData.editorContent) ||
      othersData.quizPercentage ||
      othersData.assignmentPercentage ||
      othersData.finalPercentage ||
      othersData.finalTheoryPercentage ||
      othersData.finalPracticePercentage ||
      othersData.gpaPercentage
    ) {
      setIsAllTabsFilled(true);
    } else {
      setIsAllTabsFilled(false);
    }
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 3000, // Thời gian hiển thị toast (ms)
      isClosable: true, // Cho phép đóng toast bằng cách nhấn nút hoặc click bên ngoài
    });
  };

  const handleDays = (days) => {
    setDataDays(days);
  };

  const handlePercentageDeliveryType = (percentage) => {
    const percentageString = JSON.stringify(percentage);
    const deliveryTypeString = JSON.stringify(percentageDeliveryType);
    if (percentageString !== deliveryTypeString) {
      setPercentageDeliveryType(percentageString);
    }
  };

  const [othersData, setOthersData] = useState({
    quizPercentage: '',
    assignmentPercentage: '',
    finalPercentage: '',
    finalTheoryPercentage: '',
    finalPracticePercentage: '',
    gpaPercentage: '',
    editorContent: '',
  });

  // Hàm để nhận dữ liệu từ Others và cập nhật state của component cha
  const handleOthersDataChange = useCallback((data) => {
    setOthersData(data);
  }, []);

  const handleCancel = () => {
    // Đặt lại tất cả các state về giá trị ban đầu
    setSyllabusName('');
    setLevel(1);
    setAttendeeNumber('');
    setTechReq('');
    setCourseObj('');
    setCurrentTab(0);
    setTopicCode(null);
    setPercentageDeliveryType([]);
    setDataDays([]);
    setIsAllTabsFilled(true);
  };

  const handleNext = (e) => {
    checkAllTabsFilled();

    // Kiểm tra nếu tab hiện tại không phải là tab cuối cùng
    if (currentTab < 2) {
      setCurrentTab(currentTab + 1);
      if (currentTab === 0) {
        setSliderValue(50);
      } else if (currentTab === 1) {
        setSliderValue(75);
      }
    } else {
      // Nếu đang ở tab cuối cùng và đã điền đầy đủ thông tin

      if (isAllTabsFilled) {
        handleSubmitPublish(e); // Gọi hàm gửi form với publishStatus là PUBLISHED
      } else {
        showToast('Please fill all fields before submitting', 'error');
      }
    }
  };

  const handleTabSelect = (index) => {
    setCurrentTab(index); // Cập nhật tab hiện tại
    // Cập nhật giá trị của slider dựa trên tab được chọn
    if (index === 0) {
      setSliderValue(25);
    } else if (index === 1) {
      setSliderValue(50);
    } else if (index === 2) {
      setSliderValue(75);
    }
  };

  const handleSyllabusNameChange = (event) => {
    setSyllabusName(event.target.value);
  };

  const handleLevelChange = (value) => {
    setLevel(value);
  };

  const handleAttendeeNumberChange = (value) => {
    setAttendeeNumber(value);
  };

  const handleTechReqChange = (value) => {
    setTechReq(value);
  };

  const handleCourseObjChange = (value) => {
    setCourseObj(value);
  };

  const handleSubmitPublish = async (event) => {
    event.preventDefault();

    if (!syllabusName.trim()) {
      showToast('Syllabus name is required', 'error');
      return; // Ngăn chặn việc submit nếu dữ liệu không hợp lệ
    }

    if (!level || !attendeeNumber || !techReq || !courseObj) {
      showToast(
        'Please fill all fields in General tab before saving as draft',
        'error'
      );
      return; // Ngăn chặn việc submit nếu có trường đang trống
    }

    if (syllabusName.length > 60) {
      showToast('Syllabus name must be less than 60 characters', 'error');
      return; // Ngăn chặn việc submit nếu dữ liệu không hợp lệ
    }

    try {
      // Tạo object chứa các giá trị cần gửi đến backend
      const syllabusData = {
        topicName: syllabusName,
        level: level,
        technicalGroup: techReq,
        trainingAudience: attendeeNumber,
        topicOutline: courseObj,
        publishStatus: PublishStatus.PUBLISHED,
      };

      // Gọi hàm createSyllabus với object chứa dữ liệu syllabusData
      const createSyllabus = await createSyllabusAPI(syllabusData);
      // Xử lý kết quả từ backend nếu cần
      console.log('Syllabus created:', createSyllabus);

      // Kiểm tra nếu phản hồi thành công (status code 200) và có chứa topicCode
      if (createSyllabus && createSyllabus.topicCode) {
        showToast('Save all success', 'success');
        const receivedTopicCode = createSyllabus.topicCode;
        console.log('Topic code:', receivedTopicCode);
        setTopicCode(receivedTopicCode);

        if (dataDays.length > 0) {
          const convertDataDaysToBackendFormat = async (dataDays) => {
            const transformedData = [];

            for (const day of dataDays) {
              for (const unit of day.units) {
                const trainingUnit = {
                  trainingUnit: {
                    syllabusCode: receivedTopicCode, // Đặt giá trị tương ứng với mã chủ đề bạn nhận được từ backend
                    unitName: unit.name, // Tên unit
                    dayNumber: day.id, // Số thứ tự ngày
                    saveAsDraft: false, // Lưu dữ liệu như bản nháp (hoặc theo giá trị cần thiết)
                  },
                  trainingContentList: [], // Khởi tạo trainingContentList trong trainingUnit
                };

                unit.cards.forEach((card) => {
                  const trainingContent = {
                    contentName: card.nameLession, // Tên bài học
                    deliveryType: card.deliveryType, // Loại giao hàng (thay 'string' bằng giá trị thực tế)
                    duration: parseInt(card.hours), // Thời lượng (chuyển đổi sang số nguyên)
                    note: '',
                    learningObjective: parseInt(card.outputStandard), // Mục tiêu học tập (có thể thay bằng giá trị thực tế)
                    online: card.isStatus, // Trạng thái online (hoặc theo giá trị cần thiết)
                  };
                  trainingUnit.trainingContentList.push(trainingContent);
                });

                transformedData.push(trainingUnit);
              }
            }

            return transformedData;
          };

          const transformedDataToSend = await convertDataDaysToBackendFormat(
            dataDays
          );

          for (const day of transformedDataToSend) {
            try {
              const createSyllabusUnitData = await createSyllabusUnitDetailAPI(
                day
              );
              console.log('Syllabus unit created:', createSyllabusUnitData);
            } catch (error) {
              console.error('Error creating syllabus unit:', error);
              showToast('Error creating syllabus unit', 'error');
            }
          }
        }

        if (
          othersData.editorContent ||
          othersData.quizPercentage ||
          othersData.assignmentPercentage ||
          othersData.finalPercentage ||
          othersData.finalTheoryPercentage ||
          othersData.finalPracticePercentage ||
          othersData.gpaPercentage
        ) {
          const createOthersData = {
            topicCode: receivedTopicCode,
            trainingPrinciples: othersData.editorContent,
            assessmentScheme: {
              quiz: othersData.quizPercentage,
              assignment: othersData.assignmentPercentage,
              finalPoint: othersData.finalPercentage,
              finalTheory: othersData.finalTheoryPercentage,
              finalPractical: othersData.finalPracticePercentage,
              gpa: othersData.gpaPercentage,
            },
            saveAsDraft: false,
          };

          // Gửi request để tạo Others
          const createOthersRes = await createOthers(createOthersData);
          console.log('Others created:', createOthersRes);
        } else {
          console.error('Error: Missing topicCode in response');
        }

        // Chuyển hướng đến trang detail sau khi saveAsDraf thành công
        navigate(`/dashboard/syllabus/detail`);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log((error, 'error'));
    }
  };

  const handleSubmitSaveAsDraf = async (event) => {
    event.preventDefault();

    if (!syllabusName.trim()) {
      showToast('Syllabus name is required', 'error');
      return; // Ngăn chặn việc submit nếu dữ liệu không hợp lệ
    }

    if (!level || !attendeeNumber || !techReq || !courseObj) {
      showToast(
        'Please fill all fields in General tab before saving as draft',
        'error'
      );
      return; // Ngăn chặn việc submit nếu có trường đang trống
    }

    if (syllabusName.length > 60) {
      showToast('Syllabus name must be less than 60 characters', 'error');
      return; // Ngăn chặn việc submit nếu dữ liệu không hợp lệ
    }

    try {
      // Tạo object chứa các giá trị cần gửi đến backend
      const syllabusData = {
        topicName: syllabusName,
        level: level,
        technicalGroup: techReq,
        trainingAudience: attendeeNumber,
        topicOutline: courseObj,
        publishStatus: PublishStatus.DRAFT,
      };

      // Gọi hàm createSyllabus với object chứa dữ liệu syllabusData
      const createSyllabus = await createSyllabusAPI(syllabusData);
      // Xử lý kết quả từ backend nếu cần
      console.log('Syllabus created:', createSyllabus);

      // Kiểm tra nếu phản hồi thành công (status code 200) và có chứa topicCode
      if (createSyllabus && createSyllabus.topicCode) {
        showToast('Save as draf', 'success');
        const receivedTopicCode = createSyllabus.topicCode;
        console.log('Topic code:', receivedTopicCode);
        setTopicCode(receivedTopicCode);

        if (dataDays.length > 0) {
          const convertDataDaysToBackendFormat = async (dataDays) => {
            const transformedData = [];

            for (const day of dataDays) {
              for (const unit of day.units) {
                const trainingUnit = {
                  trainingUnit: {
                    syllabusCode: receivedTopicCode, // Đặt giá trị tương ứng với mã chủ đề bạn nhận được từ backend
                    unitName: unit.name, // Tên unit
                    dayNumber: day.id, // Số thứ tự ngày
                    saveAsDraft: true, // Lưu dữ liệu như bản nháp (hoặc theo giá trị cần thiết)
                  },
                  trainingContentList: [], // Khởi tạo trainingContentList trong trainingUnit
                };

                unit.cards.forEach((card) => {
                  const trainingContent = {
                    contentName: card.nameLession, // Tên bài học
                    deliveryType: card.deliveryType, // Loại giao hàng (thay 'string' bằng giá trị thực tế)
                    duration: parseInt(card.hours), // Thời lượng (chuyển đổi sang số nguyên)
                    note: '',
                    learningObjective: parseInt(card.outputStandard), // Mục tiêu học tập (có thể thay bằng giá trị thực tế)
                    online: card.isStatus, // Trạng thái online (hoặc theo giá trị cần thiết)
                  };
                  trainingUnit.trainingContentList.push(trainingContent);
                });

                transformedData.push(trainingUnit);
              }
            }

            return transformedData;
          };

          const transformedDataToSend = await convertDataDaysToBackendFormat(
            dataDays
          );

          for (const day of transformedDataToSend) {
            try {
              const createSyllabusUnitData = await createSyllabusUnitDetailAPI(
                day
              );
              console.log('Syllabus unit created:', createSyllabusUnitData);
            } catch (error) {
              console.error('Error creating syllabus unit:', error);
              showToast('Error creating syllabus unit', 'error');
            }
          }
        }

        if (
          othersData.editorContent ||
          othersData.quizPercentage ||
          othersData.assignmentPercentage ||
          othersData.finalPercentage ||
          othersData.finalTheoryPercentage ||
          othersData.finalPracticePercentage ||
          othersData.gpaPercentage
        ) {
          const createOthersData = {
            topicCode: receivedTopicCode,
            trainingPrinciples: othersData.editorContent,
            assessmentScheme: {
              quiz: othersData.quizPercentage,
              assignment: othersData.assignmentPercentage,
              finalPoint: othersData.finalPercentage,
              finalTheory: othersData.finalTheoryPercentage,
              finalPractical: othersData.finalPracticePercentage,
              gpa: othersData.gpaPercentage,
            },
            saveAsDraft: true,
          };

          // Gửi request để tạo Others
          const createOthersRes = await createOthers(createOthersData);
          console.log('Others created:', createOthersRes);
        } else {
          console.error('Error: Missing topicCode in response');
        }

        // Chuyển hướng đến trang detail sau khi saveAsDraf thành công
        navigate(`/dashboard/syllabus/detail`);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log((error, 'error'));
    }
  };

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'x-small',
  };

  const tabStyles = {
    margin: '0.1%',
    backgroundColor: 'silver',
    borderTopRadius: '3xl',
    _hover: { opacity: '0.7', backgroundColor: '#2D3748' },
    _default: {
      color: 'black', // Màu chữ mặc định khi tab không active
    },
    _selected: {
      backgroundColor: '#2D3748',
      _focus: { boxShadow: 'none' },
      color: 'white', // Màu chữ khi tab active
    },
  };

  return (
    <>
      <VStack spacing={4} align='stretch' height='100%' width='100%'>
        <Box>
          <Flex justifyContent='flex-start' alignItems='center'>
            <Box flex='1/5'>
              <Text m={2} textAlign='left' mt={3} fontWeight='semibold'>
                {t('syllabus')}
              </Text>
            </Box>
            <Box p={4} pt={6} width={{ base: '100%', md: 'xs' }}>
              <Slider
                boxShadow='md'
                aria-label='slider-ex-6'
                opacity={0.9}
                borderRadius={6}
                onChange={(val) => setSliderValue(val)}
                value={sliderValue}
                display='flex'
                justifyContent='flex-start'
              >
                <SliderMark value={25} {...labelStyles}>
                  {t('general')}
                </SliderMark>
                <SliderMark value={50} {...labelStyles}>
                  {t('outline')}
                </SliderMark>
                <SliderMark value={75} {...labelStyles}>
                  {t('others')}
                </SliderMark>
                <SliderMark value={100} {...labelStyles} fontSize='x-small'>
                  {t('done')}
                </SliderMark>
                <SliderTrack bg='silver'>
                  <SliderFilledTrack bg='orange' />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>
          </Flex>
        </Box>
        <Divider borderColor='black' w='100%' />
        <Box>
          <Flex direction={{ base: 'column', md: 'row' }}>
            <Box flex={{ base: '1', md: '7/10' }} boxShadow='lg' mb={10}>
              <Flex>
                <Box p='4'>
                  <HStack spacing='24px'>
                    <Box>
                      <Text fontSize='sm' as='b'>
                        {t('syllabus_name')}
                        <span style={{ color: 'red' }}>*</span>
                      </Text>
                    </Box>

                    <Box>
                      <Input
                        borderRadius={10}
                        size='sm'
                        borderColor='silver.50'
                        onInput={handleSyllabusNameChange}
                      />
                    </Box>
                  </HStack>
                </Box>
                <Spacer />
                <Box p='4'>
                  <HStack spacing='15px'>
                    <Box>
                      <Text fontSize='sm' as='b'>
                        {t('code')}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize='lg'>NPL</Text>
                    </Box>
                  </HStack>
                </Box>
                <Spacer />
                <Box p='4'>
                  <HStack spacing='15px'>
                    <Box>
                      <Text fontSize='sm' as='b'>
                        {t('version')}
                      </Text>
                    </Box>
                    <Box>
                      <Text fontSize='lg'>1.0.0</Text>
                    </Box>
                  </HStack>
                </Box>
              </Flex>

              <Tabs isManual variant='enclosed' index={currentTab}>
                <TabList>
                  <Tab
                    {...tabStyles}
                    w={{ base: '100%', sm: '50%', md: '25%' }}
                    onClick={() => handleTabSelect(0)}
                  >
                    {t('general')}
                  </Tab>
                  <Tab
                    {...tabStyles}
                    w={{ base: '100%', sm: '50%', md: '25%' }}
                    onClick={() => handleTabSelect(1)}
                  >
                    {t('outline')}
                  </Tab>
                  <Tab
                    {...tabStyles}
                    w={{ base: '100%', sm: '50%', md: '25%' }}
                    onClick={() => handleTabSelect(2)}
                  >
                    {t('others')}
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <General
                      onLevelChange={handleLevelChange}
                      onAttendeeNumberChange={handleAttendeeNumberChange}
                      onTechReqChange={handleTechReqChange}
                      onCourseObjChange={handleCourseObjChange}
                      clearGeneral={clearGeneral} // Truyền state clearGeneral xuống lớp con
                      setClearGeneral={setClearGeneral} // Truyền setter của clearGeneral xuống lớp con
                    />
                  </TabPanel>
                  <TabPanel>
                    <DayList
                      onPercentageDeliveryType={handlePercentageDeliveryType}
                      onDays={handleDays}
                    />
                  </TabPanel>
                  <TabPanel>
                    <Others onOthersDataChange={handleOthersDataChange} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Box pr={3}>
                <HStack justifyContent='end' mb='10'>
                  <Button
                    color='white'
                    bg='#45474B'
                    // isDisabled={!isInputsFilled}
                    onClick={handleSubmitSaveAsDraf}
                  >
                    {t('saveAsDraft')}
                  </Button>
                  <Button
                    color='white'
                    bg='#1F2544'
                    onClick={(e) => handleNext(e)}
                  >
                    {t('next')}
                  </Button>
                </HStack>
              </Box>
            </Box>
            <Box ml='3' flex={3 / 10} w={{ base: '95%', md: '80%' }} m='8px'>
              <PieChart onPercentageDeliveryType={percentageDeliveryType} />
            </Box>
          </Flex>
        </Box>
      </VStack>
    </>
  );
};
