import React from 'react';
import {
  Badge,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import 'react-quill/dist/quill.snow.css';
import { IoIosStarOutline } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PiUsers } from "react-icons/pi";
import { GoShieldCheck } from 'react-icons/go';
import { CiSettings } from 'react-icons/ci';
import { LiaVectorSquareSolid } from 'react-icons/lia';

export const GeneralTab = () => {
  const syllabusDetail = useSelector(
    (state) => state.syllabusDetail.syllabusDetailData
  );
  const { t } = useTranslation();
  const handleInformation = (data) => {
    if (!data) {
      return <></>;
    } else {
      const lines = data.split('\n').filter((line) => line.trim() !== '');
      return (
        <>
          {lines.map((line, index) => (
            <Text key={index}>{line.trim()}</Text>
          ))}
        </>
      );
    }
  };
  return (
    <>
      <Flex mt={7} h={'fit-content'}>
        <Box
          w={'45%'}
          h={'fit-content'}
          border={'1px gray'}
          py={5}
          px={5}
          borderRadius={'1.5em'}
          style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
        >
          <Flex mb={4}>
            <Box w={'40%'}>
              <Flex>
                <Text justifyContent={'center'} w={'10%'} fontSize={'lg'}>
                  <IoIosStarOutline
                    style={{ width: '100%', marginTop: '5px' }}
                  />
                </Text>
                <Text fontSize={'lg'} fontWeight={'semibold'}>
                  {t('level')}
                </Text>
              </Flex>
            </Box>
            <Box w={'60%'}>
              <Text fontSize={'lg'}>{t(syllabusDetail?.level)}</Text>
            </Box>
          </Flex>
          <Flex mb={4}>
            <Box w={'40%'}>
              <Flex>
                <Text justifyContent={'center'} w={'10%'} fontSize={'lg'}>
                  <PiUsers style={{ width: '100%', marginTop: '5px' }} />
                </Text>
                <Text fontSize={'lg'} fontWeight={'semibold'}>
                  {t('attendee_number')}
                </Text>
              </Flex>
            </Box>
            <Box w={'60%'}>
              <Text fontSize={'lg'}>{syllabusDetail?.trainingAudience}</Text>
            </Box>
          </Flex>
          <Flex>
            <Box w={'40%'}>
              <Flex>
                <Text justifyContent={'center'} w={'10%'} fontSize={'lg'}>
                  <GoShieldCheck style={{ width: '100%', marginTop: '5px' }} />
                </Text>
                <Text fontSize={'lg'} fontWeight={'semibold'}>
                  {t('output_standard')}
                </Text>
              </Flex>
            </Box>
            <Box w={'60%'}>
              <Text fontSize={'lg'}>
                {[
                  ...new Set(
                    syllabusDetail?.learningObjectives?.map(
                      (e) => e?.description
                    )
                  ),
                ].map((description, index) => (
                  <Badge
                    key={index}
                    ml={{ base: 0 }}
                    variant='solid'
                    mr={2}
                    color={'white'}
                    px={3}
                    py={1}
                    bg='#2D3748'
                    borderRadius={'30px'}
                    border={'solid 2px'}
                  >
                    {description}
                  </Badge>
                ))}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box
          ml={10}
          w={'50%'}
          h={'fit-content'}
          border={'1px gray'}
          py={5}
          px={5}
          borderRadius={'1.5em'}
          style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
        >
          <Box w={'100%'}>
            <Flex>
              <CiSettings style={{ fontSize: '25px' }} />
              <Text fontSize={'lg'} fontWeight={'semibold'}>
                {t('technicalRequirement')}
              </Text>
            </Flex>
            {handleInformation(syllabusDetail?.technicalGroup)}
          </Box>
        </Box>
      </Flex>
      <Box w={'100%'} mt={7} ml={5}>
        <Flex>
          <LiaVectorSquareSolid style={{ fontSize: '25px' }} />
          <Text fontSize={'lg'} fontWeight={'semibold'}>
            {t('courseObjects')}
          </Text>
        </Flex>
        {/* <ReactQuill
          value={syllabusDetail?.topicOutline || ''}
          readOnly={true}
          theme='snow'
          modules={modules}
          
        /> */}
        <div
          dangerouslySetInnerHTML={{
            __html: syllabusDetail?.topicOutline,
          }}
        ></div>
      </Box>
    </>
  );
};
