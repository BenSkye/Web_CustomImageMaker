import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import LoginBG from '@/assets/images/bg-login.webp';

export const LoginPage = () => {
  return (
    <>
      <Flex
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
        backgroundImage={LoginBG}
        backgroundSize='cover'
        backgroundBlendMode='multiply'
        backgroundColor='rgba(0, 0, 0, 0.4)'
      >
        <Outlet />
      </Flex>
    </>
  );
}