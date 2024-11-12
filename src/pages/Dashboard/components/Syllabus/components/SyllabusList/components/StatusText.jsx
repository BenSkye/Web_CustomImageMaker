import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { BsThreeDots } from 'react-icons/bs';

export const StatusText = ({ data, number = false, id }) => {
  const navigate = useNavigate();
  let bgColor = 'facebook';

  if (number) {
    switch (data) {
      case 1:
        data = 'Active';
        bgColor = 'facebook';
        break;
      case 3:
        data = 'Draft';
        bgColor = 'blue';
        break;
      default:
        data = 'Inactive';
        bgColor = 'gray';
        break;
    }
  } else {
    if (data.length > 0) {
      return (
        <Flex>
          {data.map((item, index) => {
            if (index <= 2) {
              return (
                <Button
                  marginX={'0.4rem'}
                  key={`status-${index}`}
                  colorScheme={bgColor}
                  borderRadius={'12px'}
                  width={'5rem'}
                  size='sm'
                  cursor={'default'}
                >
                  {item.name}
                </Button>
              );
            } else if (index === 3) {
              return (
                <Flex
                  key={`status-${index}`}
                  onClick={() => navigate(`${id}`)}
                  align={'end'}
                  cursor={'pointer'}
                  _hover={{ opacity: '0.2 ' }}
                >
                  <BsThreeDots aria-label='more' paddingtop={'2px'} key={`status-${index}`} />
                </Flex>
              );
            }
            return null;
          })}
        </Flex>
      );
    }
  }

  let icon = false;

  return (
    <Button
      margin={'2px'}
      borderRadius={'12px'}
      width={'5rem'}
      colorScheme={bgColor}
      size='sm'
      cursor={'default'}
    >
      {data} {icon ? <IoCloseCircleOutline /> : ''}
    </Button>
  );
};
