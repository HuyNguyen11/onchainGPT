/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthLayout } from 'src/layouts';
import rf from 'src/requests/RequestFactory';
import cn from 'classnames';
import AppButton from 'src/components/AppButton';
import { Box, Image, Text } from '@chakra-ui/react';
import { LogoSingle } from 'src/assets/images';
import styles from 'src/styles/page/Login.module.scss';
import {
  icGoogle,
  // icMicrosoft, icApple
} from 'src/assets/icon';
import { useState } from 'react';
// import EmailForm from './form/EmailForm';
import LoginForm from './form/LoginForm';

function LogIn() {
  const [isPasswordPart, setIsPasswordPart] = useState<boolean>(false);

  const [form, setForm] = useState<{
    email: string;
    password: string;
  }>({
    email: '',
    password: '',
  });

  const onLoginGoogle = async () => {
    try {
      const res = await rf.getRequest('AuthRequest').getLoginGoogle();
      const url: string = res.data.url;
      window.location.href = url;
    } catch (e) {
      console.error(e, 'Error');
    }
  };

  const onSubmit = (values: any) => {
    setForm({ ...form, ...values });
    setIsPasswordPart(!isPasswordPart);
  };

  const _renderEmailPart = () => {
    return (
      <>
        {/* <EmailForm onSubmit={onSubmit} />

        <Box className={cn(styles.divide)} py={5} position={'relative'}>
          <Text m={0} className={cn(styles.content)}>
            OR
          </Text>
        </Box> */}
        <Text className={cn(styles.title)} pt={4} textAlign={'center'}>
          Welcome back
        </Text>
        <AppButton
          onClick={onLoginGoogle}
          borderRadius={'6px'}
          size={{ base: 'md', sm: 'lg' }}
          width={'full'}
          className={cn(styles.btn_login)}
          variant="outline"
          mt={6}
          mb={3}
        >
          <Image src={icGoogle} pr={2} alt="logo" />
          Continue with Google
        </AppButton>
        {/* <AppButton
          borderRadius={'6px'}
          size={{ base: 'md', sm: 'lg' }}
          variant="outline"
          className={cn(styles.btn_login)}
          width={'full'}
          mb={3}
        >
          <Image src={icMicrosoft} pr={2} alt="logo" />
          Continue with Microsoft Account
        </AppButton>
        <AppButton
          borderRadius={'6px'}
          variant="outline"
          size={{ base: 'md', sm: 'lg' }}
          className={cn(styles.btn_login)}
          width={'full'}
          mb={3}
        >
          <Image src={icApple} pr={2} alt="logo" />
          Continue with Apple
        </AppButton> */}
      </>
    );
  };

  const _renderPasswordPart = () => {
    return <LoginForm values={form} onSubmit={onSubmit} />;
  };

  return (
    <AuthLayout>
      <Box className={cn(styles.containerWrapper)}>
        <Image
          mx={'auto'}
          w={{ base: '40px', sm: 'auto' }}
          src={LogoSingle}
          pr={2}
          alt="logo"
        />
        {isPasswordPart ? _renderPasswordPart() : _renderEmailPart()}
      </Box>
    </AuthLayout>
  );
}

export default LogIn;
