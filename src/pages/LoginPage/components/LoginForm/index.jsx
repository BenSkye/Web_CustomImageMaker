import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Stack, useToast } from '@chakra-ui/react';
import { validateEmail, validatePassword } from '@/utils/validate';
import { signIn } from '@/core/services/auth';
import { setTokens } from '@/core/store/auth/authenticate';
import { MPLanguageSwitcher } from '@/core/components/MPLanguageSwitcher';

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast()
  const { i18n, t } = useTranslation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(email === null || password === null) return;

    let emailErrosList = validateEmail(email);
    setErrors({
      password: errors.password,
      email: emailErrosList,
    });

    let passwordErrosList = validatePassword(password);
    setErrors({
      password: passwordErrosList,
      email: errors.email,
    });

    if (errors.email.length === 0 && errors.password.length === 0) {
      signIn(email, password)
        .then((res) => {
          const data = res?.data;
          dispatch(setTokens(data));
        })
        .then(() => {
          navigate('/dashboard/home', { replace: true });
        })
        .catch(() => {
          toast({
            title: t('login'),
            status: 'error',
            description: t("Invalid with username or password!"),
            duration: 5000,
            isClosable: true,
            position: 'top-right'
          });
        });
    }
  };

  React.useEffect(() => {
    if (email !== null) {
      let emailErrosList = validateEmail(email);
      setErrors({
        password: errors.password,
        email: emailErrosList,
      });
    }

    if (password !== null) {
      let passwordErrosList = validatePassword(password);
      setErrors({
        password: passwordErrosList,
        email: errors.email,
      });
    }
  }, [email, password]);

  return (
    <Box
      textAlign='center'
      p={4}
      width='100%'
      maxWidth='360px'
      backgroundColor='#FFF'
      borderRadius='12px'
    >
      <Heading fontSize='20px' fontWeight='semibold' textAlign='center' mb={4}>
        {t('login')}
        <Stack top={0} right={0}>
          <MPLanguageSwitcher i18n={i18n} />
        </Stack>
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.email.length !== 0}>
          <FormLabel fontSize='14px' fontWeight='semibold' htmlFor='email'>
            Email*
          </FormLabel>

          <Input
            id='email'
            type='email'
            value={email !== null ? email : ''}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('enter_your_email')}
            required
          />

          {errors.email.length !== 0 &&
            errors.email.map((e, index) => (
              <Text key={index} textAlign='left' fontSize='small' color='red'>
                {t(`${e}`)}
              </Text>
            ))}
        </FormControl>

        <FormControl mt={4} isInvalid={errors.password.length !== 0}>
          <FormLabel fontSize='14px' fontWeight='semibold' htmlFor='password'>
            {t('password')}*
          </FormLabel>
          <Input
            id='password'
            type='password'
            value={password !== null ? password : ''}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('enter_your_password')}
            required
          />

          {errors.password.length !== 0 &&
            errors.password.map((e, index) => (
              <Text key={index} textAlign='left' fontSize='small' color='red'>
                {t(`${e}`)}
              </Text>
            ))}
        </FormControl>

        <Button width='100%' id='login' type='submit' mt={4} colorScheme='blue' variant='solid'>
          {t('login')}
        </Button>

        <Link to='/login/password-reset'>
          <Text marginTop={3} fontSize='small' fontWeight='normal'>
            {t('password_forgot')}
          </Text>
        </Link>
      </form>
    </Box>
  );
};
