/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Flex,
  Hide,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Show,
  Spinner,
  Text,
} from '@chakra-ui/react';
import cn from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  icClose,
  // icDislike,
  // icLike,
  // icNotepad,
  // icRefresh,
  icSend,
} from 'src/assets/icon';
import rf from 'src/requests/RequestFactory';
// import AppButton from 'src/components/AppButton';
import styles from 'src/styles/page/Chat.module.scss';
import { ERole, IChatGptDetail, IMessage } from 'src/types';
import { useAppDispatch } from 'src/hooks/hooks';
import { setDataChatGpt } from 'src/store/chat';
import { Drawer } from 'antd';
import PDFTab from 'src/components/pdf-tab';
import MessageCard from 'src/components/MessageCard';
import { LOADING_CHAT } from 'src/constants';
import { parsePageNumber } from 'src/utils/chat';

function ChatAzure() {
  const [input, setInput] = useState<string>('');
  const [fileNamePDF, setFileNamePDF] = useState<string>('');
  const ref = useRef<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number | undefined>(undefined);
  const [isOpenSecondTab, setIsOpenSecondTab] = useState<boolean>(false);

  const [detailData, setDetailData] = useState<IChatGptDetail>({
    _id: '',
    temperature: 0,
    model_type: '',
    source: '',
    user_id: '',
    messages: [],
  });
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const fetchChatConversationId = useCallback(async () => {
    setLoading(true);
    try {
      const res = await rf
        .getRequest('AzureRequest')
        .getChatConversationById(id);

      setDetailData(res.data);
    } catch (e) {
      console.log(e, 'Error');
    }
    setLoading(false);
  }, [id]);

  const updateChatConversations = async () => {
    try {
      const res = await rf.getRequest('AzureRequest').getChatConversations();
      const { data } = res;
      dispatch(setDataChatGpt({ data }));
    } catch (e) {
      console.log(e, 'Error');
    }
  };

  const sendChatConversation = async () => {
    setLoading(true);
    setInput('');

    const newMessageByUser = [
      ...detailData?.messages,
      {
        role: ERole.USER,
        content: input,
      },
    ];
    setDetailData((pre: IChatGptDetail) => {
      return {
        ...pre,
        messages: [
          ...newMessageByUser,
          {
            role: ERole.ASSISTANT,
            content: LOADING_CHAT,
          },
        ],
      };
    });
    try {
      const res = await rf.getRequest('AzureRequest').sendChatMessage({
        content: input,
        conversation_id: id,
      });
      const { answer } = res.data;

      setDetailData((pre: IChatGptDetail) => {
        return {
          ...pre,
          messages: [
            ...newMessageByUser,
            {
              role: ERole.ASSISTANT,
              content: answer,
            },
          ],
        };
      });

      if (!detailData.messages.length) {
        updateChatConversations();
      }
    } catch (e) {
      setDetailData((pre: IChatGptDetail) => {
        return {
          ...pre,
          messages: [
            ...newMessageByUser,
            {
              role: ERole.ASSISTANT,
              content: 'Sorry, I have some problems',
            },
          ],
        };
      });
    }
    setLoading(false);
  };

  const onClickPDF = async (fileName: string) => {
    const { filename, pageNumber: page } = parsePageNumber(fileName);
    setLoading(true);
    setPageNumber(page);
    setIsOpenSecondTab(true);
    if (!Number.isInteger(Number(page))) {
      setFileNamePDF(fileName);
      setLoading(false);
      return;
    }
    if (fileName === filename) {
      setLoading(false);
      return;
    }

    try {
      await rf.getRequest('AzureRequest').getFilePDF(filename);
      setFileNamePDF(`${filename}`);
    } catch (error: any) {
      setFileNamePDF(fileName);
    }
    setLoading(false);
  };

  const onToggleTab = () => {
    setIsOpenSecondTab(false);
  };

  useEffect(() => {
    if (ref) {
      ref.current.focus();
    }
    return () => {
      setIsOpenSecondTab(false);
    };
  }, [ref, id]);

  useEffect(() => {
    fetchChatConversationId();
  }, [fetchChatConversationId]);

  return (
    <Box className={cn(styles.chatContainer)}>
      <Flex className={cn(styles.chatWrapper)}>
        <Box
          position={'relative'}
          w={{ base: 'full', lg: isOpenSecondTab ? '50%' : 'full' }}
        >
          <Box
            pb={'160px'}
            pt={'30px'}
            px={'20px'}
            className={cn(styles.chatContent)}
          >
            {detailData?.messages?.map((el: IMessage, index) => (
              <MessageCard
                message={el}
                onOpenPDF={onClickPDF}
                key={index + el.role}
              />
            ))}
          </Box>
          <Box className={cn(styles.bottomWrapper)}>
            {/* <Flex justifyContent={'center'}>
              <AppButton
                borderRadius={'6px'}
                size={'lg'}
                variant="gray"
                className={cn(styles.btn_login)}
                mx={'auto'}
              >
                <Image src={icRefresh} mr={2} alt="icon" /> Regenerate response
              </AppButton>
            </Flex> */}
            <Box className={cn(styles.inputWrapper)}>
              <Box maxW={'full'} mx={'auto'}>
                <InputGroup
                  size={'lg'}
                  className={cn(styles.inputGroup)}
                  mt={8}
                >
                  <InputRightElement>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Send "
                      isDisabled={loading || !input}
                      onClick={sendChatConversation}
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
                    autoFocus={true}
                    className={cn(styles.input)}
                    variant="filled"
                    placeholder="Send a message..."
                    value={input}
                    onChange={(event) => {
                      setInput(event.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && input && !loading) {
                        sendChatConversation();
                      }
                    }}
                  />
                </InputGroup>
                <Text pt={4} className={cn(styles.inputDescription)}>
                  Free research Previe. Chatbot may produce inaccurated
                  information about people, places, or facts.{' '}
                  <span>Chatbot may 12 Version.</span>
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box w={{ base: 0, lg: isOpenSecondTab ? '50%' : 0 }}>
          <Hide breakpoint="lg">
            {isOpenSecondTab && (
              <PDFTab
                page={pageNumber}
                onClose={onToggleTab}
                fileName={fileNamePDF}
              />
            )}
          </Hide>
          <Show below="lg">
            <Drawer
              rootClassName={cn(styles.drawerPDF)}
              width={'700px'}
              placement="right"
              onClose={onToggleTab}
              open={isOpenSecondTab}
              closeIcon={<Image src={icClose} alt="close" />}
            >
              {!!fileNamePDF && (
                <PDFTab onClose={onToggleTab} fileName={fileNamePDF} />
              )}
            </Drawer>
          </Show>
        </Box>
      </Flex>
    </Box>
  );
}

export default ChatAzure;
