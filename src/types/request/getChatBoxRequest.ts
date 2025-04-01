interface Sender {
  name: string;
  avatar: string | null;
  username: string;
}

export interface GetChatBoxRequest {
  sender: Sender;
  lastMessage: string;
  countMessNotRead: number;
  code: string;
}
