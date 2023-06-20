import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { globalStyles } from 'src/themes/styles';
import { appButtonStyles } from 'src/components/AppButton';
import { cardStyles } from 'src/components/AppCard';

// Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  tablet: '1180px',
  xl: '1200px',
  '2xl': '1536px',
};

export default extendTheme({
  config,
  styles: globalStyles.styles,
  colors: globalStyles.colors,
  components: {
    Button: appButtonStyles,
    Card: cardStyles,
    // Input: appInputStyles,
  },
  breakpoints,
});
