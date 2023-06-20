import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Storage from 'src/utils/storage';
import rf from 'src/requests/RequestFactory';
import {
  setAuthorizationToRequest,
  TIME_EXPIRE_TOKEN_CLIENT,
} from 'src/utils/utils-auth';
import { IUserInfo } from 'src/types';

export type UserAuthType = {
  accessToken: string;
};

interface MyAccountState {
  auth: UserAuthType;
  loading: boolean;
  user?: IUserInfo;
}

const initialState: MyAccountState = {
  auth: {
    accessToken: Storage.getAccessToken() || '',
  },
  loading: false,
};

export const fetchUserInfo = createAsyncThunk('myAccount/user', async () => {
  try {
    const response = await rf.getRequest('AuthRequest').getUser();
    if (response) {
      return response;
    }
  } catch (error) {
    return error;
  }
});

export const myAccount = createSlice({
  name: 'myAccount',
  initialState,
  reducers: {
    setUserAuth: (
      state: { auth: { accessToken: string } },
      action: { payload: { accessToken: string } },
    ) => {
      const { accessToken } = action.payload;
      state.auth = { accessToken };
      const timeExpireToken = new Date().getTime() + TIME_EXPIRE_TOKEN_CLIENT;
      setAuthorizationToRequest(accessToken);
      Storage.setAccessToken(accessToken, timeExpireToken);
    },
    clearUser: () => {
      Storage.clearAccessToken();

      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchUserInfo.rejected, (state) => {
      state.user = undefined;
      state.loading = false;
    });
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { clearUser, setUserAuth } = myAccount.actions;
export default myAccount.reducer;
