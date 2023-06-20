import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import rf from 'src/requests/RequestFactory';
import queryString from 'query-string';
import { AuthLayout } from 'src/layouts';
import { Flex, Spinner } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setUserAuth } from 'src/store/myAccount';

function GoogleCallBack() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const parsed = queryString.parse(search);

  const getAccessToken = async () => {
    try {
      const res = await rf.getRequest('AuthRequest').getLoginAccessToken({
        code: parsed?.code || '',
      });
      const accessToken: string = res.data.access_token;
      dispatch(setUserAuth({ accessToken }));
      navigate('/');
    } catch (e) {
      console.log(e, 'Error');
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return (
    <AuthLayout>
      <Flex
        height={150}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        color={"black"}
      >
        <Spinner size="xl" mb={6} /> Please wait...
      </Flex>
    </AuthLayout>
  );
}

export default GoogleCallBack;
