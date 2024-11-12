import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Heading, FormControl, FormLabel, Input, Button, Text, Stack } from '@chakra-ui/react';
import { validateEmail } from '@/utils/validate.js';
import { MPLanguageSwitcher } from '@/core/components/MPLanguageSwitcher.jsx';

export const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState(null);
  const [errors, setErrors] = useState({
    email: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (errors.email.length === 0 && errors.password.length === 0) {
    //     // API to send email validation here
    // }
  };

  React.useEffect(() => {
    if (email != null) {
      let emailErrosList = validateEmail(email);
      setErrors({
        password: errors.password,
        email: emailErrosList
      });
    }
  }, [email]);

  return (
    <Box
      textAlign="center"
      p={4} width='100%'
      maxWidth='360px'
      backgroundColor='#FFF'
      borderRadius='12px'
    >
      <Heading fontSize='20px' fontWeight='semibold' textAlign="center" mb={4}>
        {t('reset_password')}
        <Stack top={0} right={0}>
          <MPLanguageSwitcher/>
        </Stack>
      </Heading>

      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.email.length !== 0}>
          <FormLabel fontSize='14px' fontWeight='semibold' htmlFor="email">
            Email*
          </FormLabel>
          <Input value={email !== null ? email : ''} id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder={t('enter_your_email')} required/>
          {
            errors.email.length !== 0 &&
            errors.email.map((e) => (
              <Text textAlign='left' fontSize='small' color="red">
                {e}
              </Text>
            ))
          }
        </FormControl>

        <Button name='Send Link' width='100%' type="submit" mt={4} colorScheme="blue" variant="solid">
          {t('send_link')}
        </Button>

        <Link to='/login'>
          <Text marginTop={3} fontSize='small' fontWeight='normal'>{t('back_to_login')}</Text>
        </Link>
      </form>
    </Box>
  );
}
