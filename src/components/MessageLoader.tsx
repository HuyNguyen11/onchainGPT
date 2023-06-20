import { Box, Flex } from '@chakra-ui/react';
import cn from 'classnames';
import React from 'react';
import styles from 'src/styles/components/Loader.module.scss';

function MessageLoader() {
  return (
    <Flex alignItems={'center'} height={'full'}>
      Please wait
      <Box className={cn(styles.loadingBubble)}>
        <Box className={cn(styles.spinner)}>
          <Box className={cn(styles.bounce1)} />
          <Box className={cn(styles.bounce2)} />
          <Box className={cn(styles.bounce3)} />
        </Box>
      </Box>
    </Flex>
  );
}

export default MessageLoader;
