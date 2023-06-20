import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import RouteHistory from 'src/routes';
import { Provider } from 'react-redux';
import theme from 'src/themes';
import React from 'react';
import 'src/styles/global.scss';
import configureStore from 'src/store';
import config from './config';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { MyHistoryProvider } from './context/HistoryContext';
import 'antd/dist/reset.css';

const clientId = config.auth.googleClientId;

function App() {
  const { store } = configureStore();

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <MyHistoryProvider>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode="dark" />
            <React.StrictMode>
              <BrowserRouter>
                <RouteHistory />
              </BrowserRouter>
            </React.StrictMode>
          </ChakraProvider>
        </Provider>
      </MyHistoryProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
