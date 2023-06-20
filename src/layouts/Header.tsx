import { Box, Flex, Hide, Image, Show } from '@chakra-ui/react';
import styles from 'src/styles/layout/AppLayout.module.scss';
import cn from 'classnames';
import { icArrowDown, icClose, icMenu, icThreeDot } from 'src/assets/icon';
import { logoReact } from 'src/assets/images';
import AppButton from 'src/components/AppButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { useEffect } from 'react';
import { setCurrentAI } from 'src/store/chat';
import { EAIMode } from 'src/types';
import { Dropdown, MenuProps } from 'antd';
import { Select } from 'antd';
import { clearUser } from 'src/store/myAccount';

type CProps = {
  openDrawer: boolean;
  onShowDrawer: () => void;
  onCloseDrawer: () => void;
};

const options = [
  {
    label: 'OpenAI Chat GPT-3',
    value: EAIMode.CHAT_GPT_OLD,
  },
  {
    label: 'OpenAI Chat GPT-3.5',
    value: EAIMode.CHAT_GPT_NEW,
  },

  {
    label: 'Azure OpenAI & Cognitive Search',
    value: EAIMode.AZURE_OPEN_AI,
  },
];

const Header = ({ onShowDrawer, onCloseDrawer, openDrawer }: CProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { currentAI } = useAppSelector((state) => state.chat);
  const { user } = useAppSelector((state) => state.myAccount);
  const dispatch = useAppDispatch();

  const isCurrentPage = (current: string) => {
    return currentAI === current;
  };

  useEffect(() => {
    if (pathname.includes(EAIMode.AZURE_OPEN_AI)) {
      dispatch(setCurrentAI(EAIMode.AZURE_OPEN_AI));
    }
  }, [pathname, dispatch]);

  const handleChange = (value: EAIMode) => {
    navigate(value);
    dispatch(setCurrentAI(value));
  };

  const menuItem: MenuProps['items'] = [
    {
      label: <Box w={150}>Log Out</Box>,
      key: '0',
      onClick: () => {
        dispatch(clearUser());
        navigate('/login');
      },
    },
  ];

  return (
    <Flex
      alignItems={'center'}
      px={{ base: 5, tablet: '50px' }}
      className={cn(styles.header)}
    >
      <Show breakpoint="(max-width: 1180px)">
        <Image
          width={'30px'}
          height={'30px'}
          onClick={openDrawer ? onCloseDrawer : onShowDrawer}
          src={openDrawer ? icClose : icMenu}
          mr={2}
          alt="menu"
        />
      </Show>
      <Hide breakpoint="(max-width: 1180px)">
        <Box cursor={'pointer'} onClick={() => navigate('/')}>
          <img
            src="/images/logo.png"
            alt="logo"
            className={cn(styles.headerLogo)}
          />
        </Box>
      </Hide>
      <Flex
        flex={1}
        justifyContent={'flex-start'}
        pl={{ base: 5, tablet: '100px' }}
      >
        <Show breakpoint="(max-width: 1180px)">
          <Select
            className={cn(styles.selectAI)}
            placeholder="Please select"
            value={currentAI}
            onChange={handleChange}
            style={{ width: 180, height: 30 }}
            suffixIcon={<Image w={5} src={icArrowDown} alt="arow" />}
            options={options}
          />
        </Show>
        <Hide breakpoint="(max-width: 1180px)">
          <>
            {options.map((el) => (
              <AppButton
                borderRadius={'6px'}
                size={'md'}
                variant={'no-effects'}
                onClick={() => {
                  navigate(el.value);
                  dispatch(setCurrentAI(el.value));
                }}
                className={cn(styles.btn_route, {
                  [styles.active]: isCurrentPage(el.value),
                })}
              >
                {el.label}
              </AppButton>
            ))}
          </>
        </Hide>
      </Flex>
      <Box className={cn(styles.info)}>
        <Flex
          className={cn(styles.btn_info)}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <button>
            <Image
              width={'30px'}
              height={'30px'}
              src={logoReact}
              mr={2}
              alt="AvatarChatbot"
            />

            <Hide breakpoint="(max-width: 1180px)">{user?.email}</Hide>
          </button>
          <Dropdown menu={{ items: menuItem }} trigger={['click']}>
            <Box cursor={'pointer'} onClick={(e) => e.preventDefault()}>
              <Image ml={2} src={icThreeDot} alt="icThreeDot" />
            </Box>
          </Dropdown>
        </Flex>
      </Box>
    </Flex>
  );
};
export default Header;
