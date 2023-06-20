import { FC, useEffect, useState } from 'react';
import { Navbar } from 'src/layouts';
import cn from 'classnames';
import { Box, Flex, Show } from '@chakra-ui/react';

import { Outlet, useLocation } from 'react-router-dom';

import styles from 'src/styles/layout/AppLayout.module.scss';
import Header from './Header';
import DrawerNavbar from './DrawerNavbar';

const AppLayout: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { pathname } = useLocation();

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    onClose();
  }, [pathname]);

  return (
    <Flex height={'100svh'}>
      <Header
        openDrawer={openDrawer}
        onCloseDrawer={onClose}
        onShowDrawer={showDrawer}
      />
      <Show breakpoint="(min-width: 1180px)">
        <Navbar />
      </Show>
      <Box
        className={cn(styles.main)}
        pl={{ base: 0, tablet: '322px' }}
        maxHeight={{ base: '100svh' }}
        overflow={'hidden'}
      >
        <DrawerNavbar
          width={322}
          placement={'left'}
          closable={false}
          onClose={onClose}
          open={openDrawer}
          getContainer={false}
        />
        <Outlet />
      </Box>
    </Flex>
  );
};

export default AppLayout;
