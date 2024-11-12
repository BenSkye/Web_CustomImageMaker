import React from 'react';
import {
  Box,
  Button,
  Flex,
  Link,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import { MdOutlineHomeWork } from 'react-icons/md';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { IoIosStarOutline } from 'react-icons/io';

export const Task = ({ isWeekShow, task, attendeeType }) => {
  if (attendeeType === 'Fresher') {
    attendeeType = 'FF7568';
  } else if (attendeeType === 'Online fee-fresher') {
    attendeeType = '2F903F';
  } else if (attendeeType === 'Offline fee-fresher') {
    attendeeType = 'D45B13';
  } else {
    attendeeType = '2D3748';
  }

  const [isFocus, setIsFocus] = useBoolean();
  return (
    <>
      <Popover
        isOpen={isFocus}
        onOpen={setIsFocus.on}
        onClose={setIsFocus.off}
        closeOnBlur={true}
        isLazy
        lazyBehavior='keepMounted'
      >
        <PopoverAnchor>
          <PopoverTrigger>
            <Button
              display={isWeekShow ? 'block' : 'inline'}
              margin={isWeekShow ? '4' : '0 4rem'}
              bg={`#${attendeeType}`}
              h='40px'
            >
              <Text color={'#fff'}>{task}</Text>
            </Button>
          </PopoverTrigger>
        </PopoverAnchor>

        <PopoverContent fontSize={isWeekShow && 16} bg='#8EB1DA'>
          <PopoverBody>
            <Text fontSize={'16'} mb={4} fontWeight={'700'}>
              Business Analyst Foundation
            </Text>
            <Box mb={4}>
              <Text>Day 10 of 20</Text>
              <Flex>
                <Text marginRight={12}>Unit 6</Text>{' '}
                <Text fontWeight={'700'}>MVC Architecture in ASP.NET</Text>
              </Flex>
            </Box>
            <Flex gap={2} color={'#000'} flexDir={'column'}>
              <Flex justifyContent={'space-between'}>
                <Flex gap={1}>
                  <MdOutlineHomeWork />
                  Location
                </Flex>
                <Box width={'150px'}>
                  <Text fontWeight={'500'}>HN.Fville</Text>
                </Box>
              </Flex>
              <Flex justifyContent={'space-between'}>
                <Flex gap={1}>
                  <MdOutlinePeopleAlt />
                  Trainer
                </Flex>
                <Box width={'150px'}>
                  <Link color={'#fff'} textDecoration={'underline'}>
                    Dinh Vu Quoc Trung
                  </Link>
                </Box>
              </Flex>
              <Flex justifyContent={'space-between'}>
                <Flex gap={1}>
                  <IoIosStarOutline />
                  Admin
                </Flex>
                <Box width={'150px'}>
                  <Link color={'#fff'} textDecoration={'underline'}>
                    Ly Lien Lien Dung
                  </Link>
                </Box>
              </Flex>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
