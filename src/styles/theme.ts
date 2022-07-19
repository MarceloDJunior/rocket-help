import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#996DFF',
    },
    secondary: {
      700: '#FBA94C',
    },
    green: {
      700: '#00875F',
      500: '#00B37E',
      300: '#04D361',
    },
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
    },
    white: '#FFFFFF',
  },
  fontConfig: {
    Roboto: {
      100: {
        normal: 'Roboto_400Regular',
      },
      200: {
        normal: 'Roboto_400Regular',
      },
      300: {
        normal: 'Roboto_400Regular',
      },
      400: {
        normal: 'Roboto_400Regular',
      },
      500: {
        normal: 'Roboto_400Regular',
      },
      600: {
        normal: 'Roboto_700Bold',
      },
      700: {
        normal: 'Roboto_700Bold',
      },
      800: {
        normal: 'Roboto_700Bold',
      },
      900: {
        normal: 'Roboto_700Bold',
      },
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
