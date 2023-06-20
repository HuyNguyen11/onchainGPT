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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import styles from 'src/styles/page/Login.module.scss';
import { EmailIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Props = {
  onSubmit: (values: any) => void;
};

const schema = yup.object().shape({
  email: yup.string().nullable().required('Wrong email or password'),
});

const EmailForm = ({ onSubmit }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text className={cn(styles.title)} pt={4} textAlign={'center'}>
          Welcome back
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

        <AppButton
          borderRadius={'6px'}
          size={{ base: 'md', sm: 'lg' }}
          width={'full'}
          mt={6}
          variant="primary"
          mb={3}
          type="submit"
          className={cn(styles.btnSubmit)}
        >
          Continue
        </AppButton>

        <Text className={cn(styles.description)}>
          Don’t have an account?{' '}
          <Link className={cn(styles.link)} to={'/sign-up'}>
            Sign up
          </Link>
        </Text>
      </form>
    </Box>
  );
};

export default EmailForm;
