import BaseRequest from './BaseRequest';
import config from 'src/config';

export interface IResponseSuccess<T> {
  data: T[];
  meta: {
    count: number;
  };
}

export default class ChatGptRequest extends BaseRequest {
  getUrlPrefix() {
    return config.api.baseUrlApi;
  }

  getChatConversations() {
    const url = `/api/azure-openai/chat-conversations/`;
    return this.get(url);
  }
  createChatConversations(payload: {
    temperature: number;
    model_type: string;
  }) {
    const url = `/api/azure-openai/chat-conversations/`;
    return this.post(url, payload);
  }

  getChatConversationById(id: number) {
    const url = `/api/azure-openai/chat-conversations/${id}`;
    return this.get(url);
  }
  deleteChatConversations(id: number) {
    const url = `/api/azure-openai/chat-conversations/${id}`;
    return this.delete(url);
  }
  sendChatMessage(payload: { content: string; conversation_id: string }) {
    const url = `/api/azure-openai/chat-messages/`;
    return this.post(url, payload);
  }

  getFilePDF(fileName: string) {
    const url = `/content/${fileName}`;
    return this.get(url);
  }
}
