import { Box, Flex, Image, Spinner } from '@chakra-ui/react';
import cn from 'classnames';
import { useEffect, FC, useState, useMemo } from 'react';
import { icClose } from 'src/assets/icon';
import config from 'src/config';
import styles from 'src/styles/page/Chat.module.scss';

interface PDFTabProps {
  fileName: string;
  page?: number;
  onClose?: () => void;
}

const domainApi = config.api.baseUrlApi;

const PDFTab: FC<PDFTabProps> = ({ fileName, page, onClose }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [random, setRandom] = useState<number>(0);

  const url = useMemo(() => {
    return page
      ? `${domainApi}/content/${fileName}#page=${page + 1}`
      : `${domainApi}/content/${fileName}`;
  }, [page, fileName]);

  useEffect(() => {
    setLoading(true);
  }, [url, page]);

  const handleLoaded = () => {
    setLoading(false);
  };

  const resetIframe = () => {
    setRandom(random + 1);
  };

  useEffect(() => {
    resetIframe();
  }, [page]);

  return (
    <Flex flexDir={'column'} w={'full'} h={'full'}>
      {onClose && (
        <Box cursor={'pointer'} p={4}>
          <Image src={icClose} onClick={onClose} alt="close" />
        </Box>
      )}
      <Box flex={'1 1 0'} position={'relative'}>
        <embed
          id="pdfDoc"
          key={random}
          src={url}
          type="application/pdf"
          style={{ width: '100%', height: '100%' }}
          onLoad={handleLoaded}
        />
        {loading && (
          <Flex
            alignItems={'center'}
            color={'white'}
            position={'absolute'}
            className={cn(styles.loadingPDF)}
          >
            <Spinner mr={4} /> Loading ....
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default PDFTab;
