import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Routes, Route } from 'react-router-dom';
import LogIn from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import { AppLayout } from './layouts';
import Home from './pages/home';
import GoogleCallBack from './pages/google-callback';
import Storage from 'src/utils/storage';
import { clearUser, fetchUserInfo } from './store/myAccount';
import { useMyHistory } from './context/HistoryContext';
import AuthRoute from './components/AuthRoute';
import SignUp from './pages/sign-up';
import Chat from './pages/chat';
import { useAppDispatch } from './hooks/hooks';
import ChatAzure from './pages/chat-azure';

/**
 * Main App routes.
 */

const RouteHistory = () => {
  const { pathname } = useLocation();
  const accessToken = Storage.getAccessToken();
  const dispatch = useAppDispatch();

  const { push } = useMyHistory();
  const location = useLocation();

  useEffect(() => {
    push(location.pathname);
  }, [location]);

  const isExpireTimeToken =
    Storage.getExpireTimeToken() &&
    new Date().getTime() >= Number(Storage.getExpireTimeToken());

  // scroll to top when route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!accessToken || isExpireTimeToken) {
      dispatch(clearUser());
      return;
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchUserInfo());
      return;
    }
  }, [accessToken]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<AuthRoute element={<LogIn />} />} />
        <Route path="/sign-up" element={<AuthRoute element={<SignUp />} />} />
        <Route
          path="/google/callback"
          element={<AuthRoute element={<GoogleCallBack />} />}
        />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<PrivateRoute element={<Home />} />} />
          <Route
            path="/chat-gpt"
            index
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            path="/chat-gpt-3"
            index
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            path="/chat-gpt-3/:id"
            index
            element={<PrivateRoute element={<Chat />} />}
          />
          <Route
            path="/chat-gpt-new"
            index
            element={<PrivateRoute element={<Home />} />}
          />

          <Route
            path="/chat-gpt-new/:id"
            index
            element={<PrivateRoute element={<Chat />} />}
          />


          <Route
            path="/azure-open-ai"
            index
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            path="/azure-open-ai/:id"
            index
            element={<PrivateRoute element={<ChatAzure />} />}
          />

        </Route>
      </Routes>
    </>
  );
};

/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default RouteHistory;
