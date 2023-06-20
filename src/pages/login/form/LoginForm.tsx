/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import AppButton from 'src/components/AppButton';
import {
  Box,
  InputLeftElement,
  Text,
  InputGroup,
  Input,
  FormErrorMessage,
  FormControl,
  InputRightElement,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import styles from 'src/styles/page/Login.module.scss';
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

type Props = {
  onSubmit: (values: any) => void;
  values: any;
};

const schema = yup.object().shape({
  email: yup.string().nullable().required('Wrong email or password'),
  password: yup.string().nullable().required('Wrong email or password'),
});

const LoginForm = ({ onSubmit, values }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: values,
  });

  const [isPasswordView, setIsPasswordView] = useState<boolean>(true);

  const onChangeView = () => {
    setIsPasswordView(!isPasswordView);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Text className={cn(styles.title)} pt={4} textAlign={'center'}>
            Enter your password
          </Text>
          <FormControl isInvalid={!!errors.email}>
            <InputGroup
              size={{ base: 'md', sm: 'lg' }}
              className={cn(styles.inputGroup)}
              mt={8}
            >
              <InputLeftElement
                className={cn(styles.inputIcon)}
                pointerEvents="none"
              >
                <EmailIcon color="gray.200" />
              </InputLeftElement>
              <Input
                className={cn(styles.input)}
                variant="outline"
                placeholder="Email address"
                {...register('email')}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors?.email?.message as string}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup
              size={{ base: 'md', sm: 'lg' }}
              className={cn(styles.inputGroup)}
              mt={8}
            >
              <InputLeftElement
                className={cn(styles.inputIcon)}
                pointerEvents="none"
              >
                <LockIcon color="gray.200" />
              </InputLeftElement>
              <Input
                className={cn(styles.input)}
                type="password"
                variant="outline"
                placeholder="Password"
                {...register('password')}
              />
              <InputRightElement cursor={'pointer'}>
                {isPasswordView ? (
                  <ViewIcon color="gray.200" onClick={onChangeView} />
                ) : (
                  <ViewOffIcon color="gray.200" onClick={onChangeView} />
                )}
              </InputRightElement>
            </InputGroup>{' '}
            <FormErrorMessage>
              {errors?.password?.message as string}
            </FormErrorMessage>
          </FormControl>

          <Text className={cn(styles.description)} pt={5}>
            <Link className={cn(styles.link)} to={'/'}>
              Forgot password?
            </Link>
          </Text>
          <AppButton
            borderRadius={'6px'}
            size={{ base: 'md', sm: 'lg' }}
            width={'full'}
            type="submit"
            mt={6}
            variant="primary"
            className={cn(styles.btnSubmit)}
            mb={3}
          >
            Continue
          </AppButton>

          <Text className={cn(styles.description)}>
            Don’t have an account?{' '}
            <Link className={cn(styles.link)} to={'/sign-up'}>
              Sign up
            </Link>
          </Text>
        </>
      </form>
    </Box>
  );
};

export default LoginForm;
