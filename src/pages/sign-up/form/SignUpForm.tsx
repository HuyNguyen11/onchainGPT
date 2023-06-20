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

const SignUpForm = ({ onSubmit, values }: Props) => {
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
          <FormControl isInvalid={!!errors.email}>
            <InputGroup
              size={{ base: 'md', sm: 'lg' }}
              className={cn(styles.inputGroup)}
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
                type={isPasswordView ? 'password' : 'text'}
                variant="outline"
                placeholder="Password"
                {...register('password')}
              />
              <InputRightElement
                className={cn(styles.inputIcon)}
                cursor={'pointer'}
              >
                {isPasswordView ? (
                  <ViewIcon color="gray.200" onClick={onChangeView} />
                ) : (
                  <ViewOffIcon color="gray.200" onClick={onChangeView} />
                )}
              </InputRightElement>
            </InputGroup>{' '}
            {!!errors.password && (
              <Box className={cn(styles.passwordContain)}>
                <Text className={cn(styles.label)}>
                  Your password must contain:
                </Text>
                <Box className={cn(styles.text)}>At least 8 characters</Box>
              </Box>
            )}
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

          <Text className={cn(styles.description)} mt={5}>
            Already have an account?{' '}
            <Link className={cn(styles.link)} to={'/login'}>
              Log in
            </Link>
          </Text>
        </>
      </form>
    </Box>
  );
};

export default SignUpForm;
