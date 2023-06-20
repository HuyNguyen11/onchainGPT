import { Box, Flex, Image, Spinner, Text } from '@chakra-ui/react';

import styles from 'src/styles/layout/AppLayout.module.scss';
import cn from 'classnames';
import {
  icChat,
  icPlus,
  //  icUser
} from 'src/assets/icon';
import AppButton from 'src/components/AppButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { useEffect } from 'react';
import {
  fetchChatAzureConversations,
  fetchChatGptConversations,
} from 'src/store/chat';
import { EAIMode } from 'src/types';

const Navbar = () => {
  const { data, loading, currentAI } = useAppSelector((state) => state.chat);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const addNewChat = async () => {
    navigate(`/`);
  };

  useEffect(() => {
    if (currentAI === EAIMode.AZURE_OPEN_AI) {
      dispatch(fetchChatAzureConversations());
    } else {
      dispatch(fetchChatGptConversations(currentAI));
    }
  }, [dispatch, currentAI]);

  return (
    <Flex flexDirection={'column'} className={cn(styles.navbar)}>
      <AppButton
        borderRadius={'6px'}
        size={'md'}
        width={'full'}
        variant="primary"
        mt={'60px'}
        onClick={addNewChat}
        className={cn(styles.btn_chat)}
      >
        <Image src={icPlus} mr={2} />
        New chat
      </AppButton>

      <Box flex={'1 1 0'} overflowY={'auto'} maxH={'full'} mt={6}>
        {!loading ? (
          data?.map((chatItem) => (
            <AppButton
              borderRadius={'6px'}
              size={'md'}
              width={'full'}
              variant={id === chatItem._id ? 'gray' : 'no-effects'}
              mb={3}
              className={cn(styles.btn_chat)}
              onClick={() => {
                navigate(`${currentAI}/${chatItem._id}`);
              }}
            >
              <Image src={icChat} mr={2} />
              <Text m={0}>
                {chatItem?.messages?.[0]?.content || 'New chat'}
              </Text>
            </AppButton>
          ))
        ) : (
          <Flex justifyContent={'center'} alignItems={'center'} height={100}>
            <Spinner color="#fff" />
          </Flex>
        )}
      </Box>
      {/* <Box className={cn(styles.btnWrapper)} pt={3}>
        <Flex
          className={cn(styles.btn)}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <button>
            <Image src={icUser} pr={2} alt="icUser" />
            Upgrade to Plus
          </button>
          <span>New</span>
        </Flex>
      </Box> */}
    </Flex>
  );
};
export default Navbar;
