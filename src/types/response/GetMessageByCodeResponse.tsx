interface User {
    name: string;
    avatar: string | null;
    username: string;
}

export interface GetMessageByCodeResponse {
    id: string;
    text: string;
    sender: User;
    receiver: User;
    createdAt: string;
    status: number;
}