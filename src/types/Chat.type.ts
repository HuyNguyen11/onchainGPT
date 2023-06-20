export interface IChatInfo {
  _id: string;
  user_id: string;
  source: string;
  model: string;
  messages: IMessage[];
}

export interface IMessage {
  role: ERole;
  content: string;
}

export interface IChatGptDetail {
  _id: string;
  temperature: number;
  model_type: string;
  source: string;
  user_id: string;
  messages: IMessage[];
}

export enum EAIMode {
  CHAT_GPT_OLD = '/chat-gpt-3',
  CHAT_GPT_NEW = '/chat-gpt-new',
  AZURE_OPEN_AI = '/azure-open-ai',
}

export enum ERole {
  USER = 'user',
  ASSISTANT = 'assistant',
}
