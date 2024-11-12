import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { LiaHotjar } from "react-icons/lia";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { IoHomeOutline, IoBookOutline, IoSchoolOutline, IoCalendarOutline, IoFolderOutline, IoSettingsOutline } from 'react-icons/io5';

export const AppSidebar = ({ width = '266px' }) => {
  const [isToggleSidebar, setIsToggleSidebar] = React.useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return isToggleSidebar ? (
    <Flex position='relative' width={width} flexDirection='column' paddingX={2} paddingTop={3} rowGap={3}>
      <Accordion width='100%' allowMultiple>
        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px' onClick={() => navigate('/dashboard/home')}>
              <Flex alignItems='center' columnGap={2}>
                <IoHomeOutline size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('home')}
                  </Text>
                </Box>
              </Flex>
              <Spacer />
            </AccordionButton>
          </h2>
        </AccordionItem>

        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px'>
              <Flex alignItems='center' columnGap={2}>
                <IoBookOutline size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('syllabus')}
                  </Text>
                </Box>
              </Flex>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/syllabus/detail'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('syllabus_view')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>

          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/syllabus/create'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('syllabus_create')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px'>
              <Flex alignItems='center' columnGap={2}>
                <LiaHotjar size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('training_program')}
                  </Text>
                </Box>
              </Flex>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/training-program/list'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('training_program_view')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/training-program/create'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('training_program_create')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px'>
              <Flex alignItems='center' columnGap={2}>
                <IoSchoolOutline size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('class')}
                  </Text>
                </Box>
              </Flex>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/class/detail'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('class_view')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>

          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/class/create'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('class_create')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px' onClick={() => navigate('/dashboard/calendar')}>
              <Flex alignItems='center' columnGap={2}>
                <IoCalendarOutline size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Link to='/dashboard/calendar'>
                    <Text fontSize='small' fontWeight='semibold'>
                      {t('training_calendar')}
                    </Text>
                  </Link>
                </Box>
              </Flex>
              <Spacer />
            </AccordionButton>
          </h2>
        </AccordionItem>

        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px'>
              <Flex alignItems='center' columnGap={2}>
                <HiOutlineUserCircle size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('user_management')}
                  </Text>
                </Box>
              </Flex>
              <Spacer />
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/user-management/list'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('user_management_list')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>

          <AccordionPanel pb={4}>
            <Flex alignItems='start' columnGap={2}>
              <HiOutlineUserCircle color={'transparent'} size='20' />
              <Box as='span' flex='1' textAlign='left'>
                <Link to='/dashboard/user-management/permission'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('user_management_permission')}
                  </Text>
                </Link>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px' onClick={() => navigate('/dashboard/material')}>
              <Flex alignItems='center' columnGap={2}>
                <IoFolderOutline size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('learning_material')}
                  </Text>
                </Box>
              </Flex>
              <Spacer />
            </AccordionButton>
          </h2>
        </AccordionItem>

        <AccordionItem border='0px'>
          <h2>
            <AccordionButton borderRadius='8px' onClick={() => navigate('/dashboard/settings')}>
              <Flex alignItems='center' columnGap={2}>
                <IoSettingsOutline size='20' />
                <Box as='span' flex='1' textAlign='left'>
                  <Text fontSize='small' fontWeight='semibold'>
                    {t('settings')}
                  </Text>
                </Box>
              </Flex>
              <Spacer />
            </AccordionButton>
          </h2>
        </AccordionItem>

      </Accordion>
    </Flex>
  ) : (
    <></>
  );
};
