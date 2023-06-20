import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EAIMode, IChatInfo } from 'src/types';
import rf from 'src/requests/RequestFactory';

interface ChatGptState {
  data: IChatInfo[];
  detail?: IChatInfo;
  loading: boolean;
  currentAI: EAIMode;
}

const initialState: ChatGptState = {
  data: [],
  loading: true,
  currentAI: EAIMode.CHAT_GPT_OLD,
};

export const fetchChatGptConversations = createAsyncThunk(
  'conversations/chat_gpt',
  async (currentAI: EAIMode) => {
    try {
      const response = await rf
        .getRequest('ChatGptRequest')
        .getChatConversations(currentAI);
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  },
);

export const fetchChatAzureConversations = createAsyncThunk(
  'conversations/azure_ai',
  async () => {
    try {
      const response = await rf
        .getRequest('AzureRequest')
        .getChatConversations();
      if (response) {
        return response;
      }
    } catch (error) {
      return error;
    }
  },
);

export const chatGpt = createSlice({
  name: 'chatStore',
  initialState,
  reducers: {
    setDataChatGpt: (
      state: ChatGptState,
      action: { payload: { data: IChatInfo[] } },
    ) => {
      state.data = action.payload.data;
    },
    setCurrentAI: (state: ChatGptState, action: { payload: EAIMode }) => {
      state.currentAI = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatGptConversations.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchChatGptConversations.rejected, (state) => {
      state.loading = false;
      state.data = [];
    });
    builder.addCase(fetchChatGptConversations.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchChatAzureConversations.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.loading = false;
    });
    builder.addCase(fetchChatAzureConversations.rejected, (state) => {
      state.loading = false;
      state.data = [];
    });
    builder.addCase(fetchChatAzureConversations.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { setDataChatGpt, setCurrentAI } = chatGpt.actions;
export default chatGpt.reducer;
