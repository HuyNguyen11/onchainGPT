import { forwardRef } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { StyleProps } from '@chakra-ui/system';

interface AppButtonProps extends ButtonProps {
  variant?:
    | 'brand'
    | 'darkBrand'
    | 'lightBrand'
    | 'light'
    | 'outline'
    | 'no-effects'
    | 'primary'
    | 'gray';
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  (props, ref) => {
    const { variant = 'brand', children, ...rest } = props;
    return (
      <Button {...rest} variant={variant} ref={ref}>
        {children}
      </Button>
    );
  },
);

export default AppButton;

export const appButtonStyles = {
  baseStyle: {
    borderRadius: '16px',
    boxShadow: '45px 76px 113px 7px rgba(112, 144, 176, 0.08)',
    transition: '.25s all ease',
    boxSizing: 'border-box',
    _focus: {
      boxShadow: 'none',
    },
    _active: {
      boxShadow: 'none',
    },
  },
  variants: {
    outline: () => ({
      borderRadius: '16px',
    }),
    brand: (props: StyleProps) => ({
      bg: mode('brand.500', 'brand.400')(props),
      color: 'white',
      _focus: {
        bg: mode('brand.500', 'brand.400')(props),
      },
      _active: {
        bg: mode('brand.500', 'brand.400')(props),
      },
      _hover: {
        bg: mode('brand.600', 'brand.400')(props),
        _disabled: {
          bg: mode('brand.600', 'brand.400')(props),
        },
      },
    }),
    darkBrand: (props: StyleProps) => ({
      bg: mode('brand.900', 'brand.400')(props),
      color: 'white',
      _focus: {
        bg: mode('brand.900', 'brand.400')(props),
      },
      _active: {
        bg: mode('brand.900', 'brand.400')(props),
      },
      _hover: {
        bg: mode('brand.800', 'brand.400')(props),
        _disabled: {
          bg: mode('brand.800', 'brand.400')(props),
        },
      },
    }),
    lightBrand: (props: StyleProps) => ({
      bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
      color: mode('brand.500', 'white')(props),
      _focus: {
        bg: mode('#F2EFFF', 'whiteAlpha.100')(props),
      },
      _active: {
        bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      },
      _hover: {
        bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
        _disabled: {
          bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
        },
      },
    }),
    light: (props: StyleProps) => ({
      bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      color: mode('secondaryGray.900', 'white')(props),
      _focus: {
        bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      },
      _active: {
        bg: mode('secondaryGray.300', 'whiteAlpha.100')(props),
      },
      _hover: {
        bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
        _disabled: {
          bg: mode('secondaryGray.400', 'whiteAlpha.200')(props),
        },
      },
    }),
    primary: (props: StyleProps) => ({
      bg: mode('primary.100', 'primary.100')(props),
      color: 'white',
      _focus: {
        bg: mode('primary.100', 'primary.100')(props),
      },
      _active: {
        bg: mode('primary.100', 'primary.100')(props),
      },
      _hover: {
        bg: mode('primary.100', 'primary.100')(props),

        _disabled: {
          bg: mode('primary.100', 'primary.100')(props),
        },
      },
    }),
    gray: (props: StyleProps) => ({
      bg: mode('gray.200', 'gray.200')(props),
      color: 'white',
      _focus: {
        bg: mode('gray.200', 'gray.200')(props),
      },
      _active: {
        bg: mode('gray.200', 'gray.200')(props),
      },
      _hover: {
        bg: mode('gray.200', 'gray.200')(props),
        border: '1px solid gray.200',

        _disabled: {
          bg: mode('gray.200', 'gray.200')(props),
        },
      },
    }),
  },
};
