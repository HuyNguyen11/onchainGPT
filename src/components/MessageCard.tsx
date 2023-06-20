import { Box, Flex, Image } from '@chakra-ui/react';
import cn from 'classnames';
import React, { FC } from 'react';
import { AvatarChatbot, logoReact } from 'src/assets/images';
import { LOADING_CHAT } from 'src/constants';
import styles from 'src/styles/page/Chat.module.scss';
import { ERole, IMessage } from 'src/types';
import { parseAnswerToHtml } from 'src/utils/chat';
import MessageLoader from './MessageLoader';

interface CProps {
  message: IMessage;
  onOpenPDF?: (fileName: string) => void;
}

const MessageCard: FC<CProps> = ({ message, onOpenPDF }) => {
  const isChatBox = ERole.ASSISTANT === message.role;
  const { citations, fragments } = parseAnswerToHtml(message.content);

  const messageContent = fragments?.map((el) =>
    citations.includes(el) ? (
      <span
        onClick={() => {
          onOpenPDF?.(el);
        }}
        className={cn(styles.spanFile)}
      >
        {citations.findIndex((e) => el === e) + 1}
      </span>
    ) : (
      el
    ),
  );

  return (
    <Box className={cn(styles.chatItem, { [styles.chatBox]: isChatBox })}>
      <Flex gap={6} className={cn(styles.chatItem_content)}>
        <Box>
          <Image
            width={'30px'}
            height={'30px'}
            src={isChatBox ? AvatarChatbot : logoReact}
            alt="AvatarChatbot"
            borderRadius="full"
          />
        </Box>
        <Box flex={1}>
          {message.content === LOADING_CHAT ? (
            <MessageLoader />
          ) : (
            <>
              <Box>{messageContent}</Box>
              {citations?.map((el, index) => (
                <Box
                  onClick={() => {
                    onOpenPDF?.(el);
                  }}
                  className={cn(styles.linkPdf)}
                  pt={2}
                >
                  {index + 1}. {el}
                </Box>
              ))}
            </>
          )}
        </Box>
      </Flex>
      {/* <Flex justifyContent={'flex-end'}>
        {isChatBox && (
          <Flex gap={3} height={'22px'}>
            <Image src={icNotepad} alt="icon" />
            <Image src={icLike} alt="icon" />
            <Image src={icDislike} alt="icon" />
          </Flex>
        )}
      </Flex> */}
    </Box>
  );
};

export default MessageCard;
