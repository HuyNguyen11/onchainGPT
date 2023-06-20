import * as React from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { RenderZoomInProps, RenderZoomOutProps } from '@react-pdf-viewer/zoom';
import {
  MinusOutlined,
  EllipsisOutlined,
  PlusOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Button } from 'antd';
import { icClose, icListUIAlt, icSave, icSearch } from 'src/assets/icon';

interface CustomViewerProps {
  fileUrl: string;
  onClose?: () => void;
}

const CustomViewer: React.FC<CustomViewerProps> = ({ fileUrl, onClose }) => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  const divine = <Box width={'1px'} mx={2} bg={'#CBCBCB'} h={6} />;

  return (
    <Flex
      flexDirection={'column'}
      height={'full'}
      style={{
        border: '1px solid rgba(0, 0, 0, 0.3)',
      }}
    >
      {onClose && (
        <Box cursor={'pointer'} p={4}>
          <Image src={icClose} onClick={onClose} alt="close" />
        </Box>
      )}

      <Flex
        alignItems={'center'}
        px={4}
        py={4}
        style={{
          backgroundColor: '#eeeeee',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        color={'black'}
      >
        <Toolbar>
          {(props: ToolbarSlot) => {
            const { CurrentPageInput, NumberOfPages, ZoomIn, ZoomOut } = props;
            return (
              <>
                {/* <Box px={'2px'}>
                  <Button shape="circle" type="text">
                    <Image
                      mx={'auto'}
                      w={'20px'}
                      src={icListUIAlt}
                      alt="icon"
                    />
                  </Button>
                </Box>
                {divine} */}
                {/* <Box px={'2px'}>
                    <Button shape="circle" type="text">
                      <EllipsisOutlined style={{ fontSize: '20px' }} />
                    </Button>
                  </Box> */}
                <Box px={'2px'}>
                  <ZoomOut>
                    {(props: RenderZoomOutProps) => (
                      <Button
                        shape="circle"
                        type="text"
                        onClick={props.onClick}
                      >
                        <MinusOutlined style={{ fontSize: '20px' }} />
                      </Button>
                    )}
                  </ZoomOut>
                </Box>

                <Box px={'2px'}>
                  <ZoomIn>
                    {(props: RenderZoomInProps) => (
                      <Button
                        shape="circle"
                        type="text"
                        onClick={props.onClick}
                      >
                        <PlusOutlined style={{ fontSize: '20px' }} />
                      </Button>
                    )}
                  </ZoomIn>
                </Box>

                <Box px={'2px'} w={'3rem'}>
                  <CurrentPageInput />
                </Box>
                <Box px={2}>
                  of <NumberOfPages />
                </Box>
                {/* {divine} */}
                {/* <Box px={'2px'}>
                  <Button shape="circle" type="text">
                    <ReloadOutlined style={{ fontSize: '20px' }} />
                  </Button>
                </Box> */}
                <Box ml={'auto'} />
                {/* <Box px={'2px'} ml={'auto'}>
                  <Button shape="circle" type="text">
                    <Image mx={'auto'} w={'20px'} src={icSearch} alt="icon" />
                  </Button>
                </Box> */}
                {/* {divine}
                  <Box px={'2px'}>
                    <Button shape="circle" type="text">
                      <Image mx={'auto'} w={'20px'} src={icSave} alt="icon" />
                    </Button>
                  </Box>
                  <Box px={'2px'}>
                    <Button shape="circle" type="text">
                      <EllipsisOutlined style={{ fontSize: '20px' }} />
                    </Button>
                  </Box> */}
              </>
            );
          }}
        </Toolbar>
      </Flex>
      <Box
        style={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <Viewer fileUrl={fileUrl} plugins={[toolbarPluginInstance]} />
      </Box>
    </Flex>
  );
};

export default CustomViewer;
