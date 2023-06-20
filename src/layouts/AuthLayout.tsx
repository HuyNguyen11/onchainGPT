import React, { FC } from 'react';
import { Box, Flex } from '@chakra-ui/react';

import cn from 'classnames';

import styles from 'src/styles/layout/AuthLayout.module.scss';

type CProps = {
  children: React.ReactNode;
};
const AuthLayout: FC<CProps> = ({ children }) => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      className={cn(styles.authLayout)}
    >
      <Box
        p={{ base: '30px 20px', sm: '40px' }}
        margin={'20px'}
        className={cn(styles.main)}
      >
        {children}
      </Box>
    </Flex>
  );
};

export default AuthLayout;
