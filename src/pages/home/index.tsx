/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import rf from 'src/requests/RequestFactory';
import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { icAlert, icLightning, icSend, icSun } from 'src/assets/icon';
import { HomeGrid } from 'src/constants';
import styles from 'src/styles/page/Home.module.scss';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import { setDataChatGpt } from 'src/store/chat';
import { useNavigate } from 'react-router-dom';
import { EAIMode } from 'src/types';

function Home() {
  const [input, setInput] = useState<string>('');
  const { currentAI } = useAppSelector((state) => state.chat);

  const navigate = useNavigate();
  const ref = useRef<any>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const request =
    currentAI === EAIMode.AZURE_OPEN_AI ? 'AzureRequest' : 'ChatGptRequest';

  const updateChatConversations = async () => {
    try {
      const res = await rf.getRequest(request).getChatConversations();
      const { data } = res;
      dispatch(setDataChatGpt({ data }));
    } catch (e) {
      console.log(e, 'Error');
    }
  };

  const addNewChat = async () => {
    setLoading(true);
    try {
      const model_type = currentAI === EAIMode.CHAT_GPT_OLD ? 'OLD' : 'NEW';
      const res = await rf.getRequest(request).createChatConversations({
        temperature: 0.7,
        model_type,
      });

      const { inserted_id } = res.data;

      await rf.getRequest(request).sendChatMessage({
        content: input,
        conversation_id: inserted_id,
      });
      updateChatConversations();

      navigate(`${currentAI}/${inserted_id}`);
    } catch (e) {
      console.log(e, 'Error');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (ref) {
      ref.current.focus();
    }
  }, [ref]);

  return (
    <Flex
      flexDirection={'column'}
      position={'relative'}
      className={cn(styles.homeContainer)}
      pt={'10vh'}
    >
      <Box flex={1} overflow={'auto'}>
        <Box pb={{ base: '200px', sm: 0 }} className={cn(styles.topWrapper)}>
          <Text
            pt={{ base: 10, md: '12vh' }}
            className={cn(styles.title)}
            mb={8}
          >
            Chatbot
          </Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={'16px'}>
            <Box>
              <Image src={icSun} alt="icon" mx={'auto'} />
              <Text className={cn(styles.label)}>Examples</Text>
              {HomeGrid.example.map((value) => (
                <Flex
                  px={5}
                  mb={'16px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className={cn(styles.gridItem)}
                  height="100px"
                  onClick={() => {
                    setInput(value);
                    ref.current.focus();
                  }}
                >
                  {value}
                </Flex>
              ))}
            </Box>
            <Box>
              <Image src={icLightning} alt="icon" mx={'auto'} />
              <Text className={cn(styles.label)}>Capabilities</Text>
              {HomeGrid.capabilities.map((value) => (
                <Flex
                  px={5}
                  mb={'16px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className={cn(styles.gridItem)}
                  height="100px"
                  onClick={() => {
                    setInput(value);
                    ref.current.focus();
                  }}
                >
                  {value}
                </Flex>
              ))}
            </Box>
            <Box>
              <Image src={icAlert} alt="icon" mx={'auto'} />
              <Text className={cn(styles.label)}>Limitations</Text>
              {HomeGrid.limitations.map((value) => (
                <Flex
                  px={5}
                  mb={'16px'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  className={cn(styles.gridItem)}
                  height="100px"
                  onClick={() => {
                    setInput(value);
                    ref.current.focus();
                  }}
                >
                  {value}
                </Flex>
              ))}
            </Box>
          </SimpleGrid>
        </Box>
      </Box>

      <Box className={cn(styles.bottomWrapper)}>
        <Box
          className={cn(styles.inputWrapper)}
          boxShadow={{
            base: '0px -1px 0px rgba(255, 255, 255, 0.1)',
            md: 'none',
          }}
        >
          <Box width={927} px={5} maxW={'full'} mx={'auto'}>
            <InputGroup size={'lg'} className={cn(styles.inputGroup)} mt={8}>
              <InputRightElement>
                <IconButton
                  variant="outline"
                  colorScheme="teal"
                  aria-label="Send "
                  isDisabled={loading || !input}
                  onClick={addNewChat}
                  className={cn(styles.btnSend)}
                  icon={
                    loading ? (
                      <Spinner color="white" />
                    ) : (
                      <Image src={icSend} alt="icon" />
                    )
                  }
                />
              </InputRightElement>
              <Input
                ref={ref}
                className={cn(styles.input)}
                variant="filled"
                placeholder="Send a message..."
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && input && !loading) {
                    addNewChat();
                  }
                }}
              />
            </InputGroup>
            <Text pt={4} className={cn(styles.inputDescription)}>
              Free research Previe. Chatbot may produce inaccurated information
              about people, places, or facts.{' '}
              <span>Chatbot may 12 Version.</span>
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Home;
